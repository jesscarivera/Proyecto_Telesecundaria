const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  Last_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  enrollment: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true   // ← IMPORTANTE
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  grade: {
    type: DataTypes.STRING,
    allowNull: true
  },

  group: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  tableName: 'Students',
  timestamps: true
});

module.exports = Student;
