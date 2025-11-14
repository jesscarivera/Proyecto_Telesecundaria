const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); 
const Category = require('./Category');

const InventoryItem = sequelize.define('InventoryItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre del artículo',
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Descripción del artículo',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Cantidad disponible',
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'unidad',
    comment: 'Unidad de medida (pieza, litro, paquete...)',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ubicación dentro de la escuela',
  },
  estado: {
    type: DataTypes.ENUM('nuevo', 'buen estado', 'mal estado'),
    allowNull: false,
    defaultValue: 'nuevo',
    comment: 'Estado del artículo',
  }
}, {
  tableName: 'inventory_items',
  timestamps: true,
});

// Relación: cada item pertenece a una categoría
InventoryItem.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(InventoryItem, { foreignKey: 'category_id', as: 'items' });

module.exports = InventoryItem;