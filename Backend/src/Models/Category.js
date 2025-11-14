const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); 

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'general', 
    // Ejemplo: 'inventory'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

module.exports = Category;
