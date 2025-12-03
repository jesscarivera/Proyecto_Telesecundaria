const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Notices = sequelize.define("Notices", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Notices;
