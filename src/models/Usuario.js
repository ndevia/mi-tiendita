const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Usuario = sequelize.define("usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM("admin", "cliente"),
    defaultValue: "cliente"  
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true  
  }
}, {
    tableName: "usuarios",
});

module.exports = Usuario;