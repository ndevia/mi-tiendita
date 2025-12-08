const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CompraPlanta = sequelize.define("compra_planta", {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "compra_planta",
  underscored: true
});

module.exports = CompraPlanta;