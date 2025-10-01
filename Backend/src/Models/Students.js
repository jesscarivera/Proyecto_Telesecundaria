const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Student = sequelize.define('Students', {
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
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Students',
  timestamps: true
});

module.exports = Student;
