import { sequelize } from "./models/conn";
import { Auth, User, Pets } from "./models/index";
// User.sync({ force: true }).then((res) => {
//   console.log(res);
// });
// Auth.sync({ force: true }).then((res) => {
//   console.log(res);
// });

Pets.sync({ force: true }).then((res) => {
  console.log(res);
});
