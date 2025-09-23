const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proyecto_telesecundaria', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

module.exports = sequelize;
