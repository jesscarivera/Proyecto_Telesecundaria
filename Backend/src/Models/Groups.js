const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); 

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Groups',
  timestamps: false
});

module.exports = Group;
