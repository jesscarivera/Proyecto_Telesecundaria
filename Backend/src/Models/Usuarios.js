const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: "unique_correo"  
    },
    validate: {
      isEmail: true 
    }
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('director', 'maestro'),
    allowNull: false,
    defaultValue: 'maestro'
  },
  estatus: {
    type: DataTypes.ENUM('activo', 'inactivo', 'suspendido'),
    allowNull: false,
    defaultValue: 'activo'
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});

module.exports = Usuario;
