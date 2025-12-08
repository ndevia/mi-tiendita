const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Compra = sequelize.define("compra", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }, 
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  tableName: "compras"
});

module.exports = Compra;