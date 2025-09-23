# Proyecto Telesecundaria

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd Proyecto_Telesecundaria

---

### 2. Backend

1. Entrar a la carpeta del backend:

cd Backend

2. Instalar dependencias:

npm install

> Esto instalará todas las librerías necesarias para Node.js, Express y Sequelize (incluyendo `mysql2` para conectarse a MySQL).

3. Ejecutar el backend:

node index.js

> Esto iniciará el servidor y sincronizará los modelos con la base de datos existente.

---

### 3. Frontend

1. Entrar a la carpeta del frontend:

cd ../frontend

2. Instalar dependencias:

npm install

> Esto instalará todas las librerías necesarias para React.

3. Iniciar el frontend:

npm start

> El proyecto se abrirá en el navegador (por defecto http://localhost:3000) y estará conectado al backend.

---

### 4. Requisitos

- Node.js instalado
- npm o yarn
- MySQL o XAMPP corriendo con la base de datos ya disponible

---

### 5. Notas importantes

- Cada vez que agregues un nuevo modelo en el backend, ejecuta `node index.js` para que Sequelize actualice las tablas automáticamente.
- Nunca subas `node_modules` ni la carpeta `frontend/build` al repositorio.
- Asegúrate de configurar correctamente los archivos `.env` si los usas para las credenciales de la base de datos.
