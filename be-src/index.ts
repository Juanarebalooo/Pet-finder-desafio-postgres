import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { User, Auth, Pets } from "./models/index";
import cors from "cors";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { index } from "./lib/algolia";
import { transporter } from "./lib/nodemailer";
import path from "path";
import { sgMail } from "./lib/sendgrid";
const URL = "https://pet-finder-desafio-postgres-production.up.railway.app";
const secret = process.env.SECRETO;

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));
const PORT = process.env.PORT || 3000;

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
      },
    });
    const [auth, authCreated] = await Auth.findOrCreate({
      where: { user_id: user.get("id") },
      defaults: {
        email,
        password: getSHA256ofString(password),
        user_id: user.get("id"),
      },
    });
    if (!created) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con ese email, prueba otro." });
    }
    res.json({ message: "Usuario creado Correctamente." });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passwordHasheado = getSHA256ofString(password);
  const auth = await Auth.findOne({
    where: { email, password: passwordHasheado },
  });
  if (auth) {
    const token = jwt.sign({ id: auth.get("user_id") }, secret);
    res.json(token);
  } else {
    res.status(400).json({ error: "Email o contraseña incorrectos" });
  }
});
function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, secret);
    req._user = data;
    next();
  } catch (err) {
    res.status(401).json({ error: true });
  }
}
app.get("/me", authMiddleware, async (req, res) => {
  const userFind = await User.findByPk(req._user.id, {
    include: [Pets],
  });
  res.json(userFind);
});

app.put("/me", authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.update(
      {
        full_name: name,
      },
      { where: { id: req._user.id } },
    );
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
app.put("/me/coords", authMiddleware, async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const user = await User.update(
      {
        lng,
        lat,
      },
      { where: { id: req._user.id } },
    );
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
app.put("/auth/password", authMiddleware, async (req, res) => {
  const { password } = req.body;
  const passwordHasheado = getSHA256ofString(password);
  try {
    const auth = await Auth.update(
      {
        password: passwordHasheado,
      },
      { where: { user_id: req._user.id } },
    );
    res.json({ message: "Contraseña cambiada correctamente" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.post("/pet", authMiddleware, async (req, res) => {
  const { name, img, lat, lng, location } = req.body;
  const userId = req._user.id;
  try {
    const newPet = await Pets.create({
      name,
      img,
      lat,
      lng,
      location,
      userId,
    });
    const newPetAlg = await index.saveObject({
      objectID: newPet.get("id"),
      name,
      img,
      location,
      _geoloc: {
        lat,
        lng,
      },
    });
    res.json({
      message: "Tu mascota ya fue publicada, esperemos encontrarla pronto!",
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
app.put("/pet/:id", authMiddleware, async (req, res) => {
  const { name, img, lat, lng, location } = req.body;
  const { id } = req.params;
  try {
    await Pets.update({ name, img, lat, lng, location }, { where: { id } });
    await index.saveObject({
      objectID: id,
      name,
      img,
      location,
      _geoloc: {
        lat,
        lng,
      },
    });
    res.json({ message: "Datos de la mascota actualizados correctamente." });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
app.get("/pets-around", async (req, res) => {
  const { lat, lng } = req.query;
  const petsCercanos = await index.search("", {
    aroundLatLng: `${lat},${lng}`,
    aroundRadius: 1000,
  });
  res.json(petsCercanos.hits);
});
app.delete("/pet/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Pets.destroy({ where: { id } });
    await index.deleteObject(id);
    res.json({ message: "Mascota eliminada correctamente." });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
app.post("/report-found", async (req, res) => {
  const { petId, finderName, finderPhone, info } = req.body;
  try {
    const pet = await Pets.findByPk(petId, { include: [User] });
    const petAsJson = pet.toJSON();
    const ownerEmail = petAsJson.user.email;
    await sgMail.send({
      from: process.env.GMAIL_USER,
      to: ownerEmail,
      subject: `¡Encontraron a ${petAsJson.name}!`,
      html: `
    <h1>Buenas noticias!</h1>
    <p><b>${finderName}</b> encontró a tu mascota <b>${petAsJson.name}</b>.</p>
    <p>Teléfono de contacto: ${finderPhone}</p>
    <p>Información: ${info}</p>
    `,
    });
    res.json({ message: "Email enviado correctamente." });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const userAuth = await Auth.findOne({ where: { email } });
    if (!userAuth) {
      return res.status(400).json({ message: "Email no encontrado" });
    }
    const token = jwt.sign({ id: userAuth.get("user_id") }, secret, {
      expiresIn: "1h",
    });
    await sgMail.send({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Recupera tu contraseña",
      html: `<p>Clickeá el link para cambiar tu contraseña:<a href="${URL}/reset-password/${token}">Cambiar contraseña</a></p>`,
    });
    res.json({ message: "Revisa tu email para poder cambiar tu contraseña." });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(PORT, () => {
  console.log("Andando en el puerto: ", PORT);
});
