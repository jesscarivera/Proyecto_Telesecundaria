const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); 

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Events',
  timestamps: true 
});

module.exports = Event;
