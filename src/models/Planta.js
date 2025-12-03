const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Planta = sequelize.define("planta", {
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre_comun: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentales: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "plantas",
});

module.exports = Planta;