const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Alumno = sequelize.define('Estudiante', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  grado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grupo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'alumnos',
  timestamps: true
});

module.exports = Alumno;
