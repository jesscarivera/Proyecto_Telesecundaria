const express = require('express');
const app = express();
const PORT = 3000;
const sequelize = require('./db');

const userRoutes = require('./src/Routes/userRoutes');
const authRoutes = require('./src/Routes/authRoutes');
const studentRoutes = require('./src/Routes/studentsRoutes');
const LibraryRoutes = require('./src/Routes/LibraryRoutes');
const LoansRoutes = require('./src/Routes/LoansRoutes');
const CategoryRoutes = require('./src/Routes/CategoryRoutes');
const InventoryRoutes = require('./src/Routes/InventoryRoutes');
const GroupsRoutes = require('./src/Routes/GroupsRoutes');
const EventsRoutes = require('./src/Routes/EventsRoutes');
const NoticesRoutes = require('./src/Routes/NoticesRoutes');


// MODELOS 
require('./src/Models/Students');
require('./src/Models/Usuarios');
require('./src/Models/Library');
require('./src/Models/Loans');
require('./src/Models/Category');
require('./src/Models/Inventory');
require('./src/Models/Groups');
require('./src/Models/Events');
require('./src/Models/Notices');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use('/api/usuarios', userRoutes);
app.use('/api', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/library', LibraryRoutes);
app.use('/api/loans', LoansRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/inventory', InventoryRoutes);
app.use('/api/groups', GroupsRoutes);
app.use('/api/events', EventsRoutes);
app.use('/api/notices', NoticesRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada correctamente.');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

iniciarServidor();
