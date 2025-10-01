const express = require('express');
const app = express();
const PORT = 3000;
const sequelize = require('./db');     
const userRoutes = require('./src/Routes/userRoutes');  
const authRoutes = require('./src/Routes/authRoutes');
const studentRoutes = require('./src/Routes/studentsRoutes');
const LibraryRoutes = require('./src/Routes/LibraryRoutes');
require('./src/Models/Students')
require('./src/Models/Usuarios')
require('./src/Models/Library')
require('./src/Models/Loans');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/usuarios', userRoutes);
app.use('/api', authRoutes); 
app.use('/api/students', studentRoutes);
app.use('/api/library', LibraryRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

async function iniciarServidor() {
  try {
    // Conexión a MySQL
    await sequelize.authenticate();
    console.log('Base de datos conectada correctamente.');

    // Sincronizar todos los modelos importados
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente.');

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(' Error al iniciar el servidor:', error);
  }
}

iniciarServidor();
