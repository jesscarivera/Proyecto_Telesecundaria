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
    unique: true, 
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
  }
}, {
  tableName: 'usuarios', 
  timestamps: true 
});

module.exports = Usuario;
