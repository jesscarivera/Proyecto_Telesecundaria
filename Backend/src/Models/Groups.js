const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Usuario = require('./Usuarios');

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
  },
  maestroId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', 
      key: 'id'
    }
  }
}, {
  tableName: 'Groups',
  timestamps: false
});

//Relación con el modelo Usuario
Group.belongsTo(Usuario, { 
  foreignKey: 'maestroId', 
  as: 'maestro' 
});

Usuario.hasMany(Group, { 
  foreignKey: 'maestroId', 
  as: 'grupos' 
});

module.exports = Group;
