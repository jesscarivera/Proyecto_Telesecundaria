const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); 

const Books = sequelize.define('Books', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year_publication: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  editorial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  copies_availables: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'Books',
  timestamps: true 
});

module.exports = Books;
