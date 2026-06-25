# 🐾 Pet Finder

Aplicación web fullstack para reportar y encontrar mascotas perdidas.

🔗 **[Ver demo en vivo](https://pet-finder-desafio-postgres-production.up.railway.app/home)**

---

## ¿Qué es Pet Finder?

Pet Finder es una plataforma que permite a los usuarios reportar mascotas perdidas y ver reportes de mascotas perdidas cerca de su ubicación. Si encontrás una mascota que coincide con algún reporte, podés contactar directamente al dueño a través de la app.

---

## Funcionalidades

- 📝 Registro e inicio de sesión con autenticación JWT
- 👤 Perfil de usuario con nombre y ubicación
- 🔑 Recuperación de contraseña por email
- 📍 Búsqueda de mascotas perdidas cercanas usando geolocalización
- 🐶 Publicación de reportes de mascotas perdidas con imagen y ubicación
- ✏️ Edición y eliminación de reportes propios
- 📧 Notificación por email al dueño cuando alguien reporta haber visto su mascota

---

## Tecnologías utilizadas

### Frontend
- TypeScript
- Parcel
- Mapbox GL (mapas interactivos)
- Web Components nativos

### Backend
- Node.js + Express
- TypeScript + tsx
- Sequelize + PostgreSQL (Neon)
- JWT para autenticación
- SendGrid para envío de emails
- Algolia para búsqueda geolocalizada
- Cloudinary para almacenamiento de imágenes

### Deploy
- Railway

---

## Variables de entorno

Para correr el proyecto localmente necesitás crear un archivo `.env` con las siguientes variables:

```
PORT=3202
DATABASE_URL=
SECRETO=
MAPBOX_TOKEN=
ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
GMAIL_USER=
SENDGRID_API_KEY=
```

---

## Correr el proyecto localmente

```bash
# Instalar dependencias
yarn install

# Correr el frontend
yarn dev:fe

# Correr el backend
yarn dev:be

# Build de producción
yarn build
```

---

## Autor

Desarrollado como un desafio parte del nivel 3 de la carrera programación de [apx.school](https://apx.school)
