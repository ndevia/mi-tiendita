const Planta = require("./Planta");
const Compra = require("./Compra");
const CompraPlanta = require("./CompraPlanta");
const sequelize = require("../config/db");

// relación entre Planta y CompraPlanta (1 a muchos)
Compra.hasMany(CompraPlanta, {
  foreignKey: "compraId",
  onDelete: "CASCADE"
});

CompraPlanta.belongsTo(Compra, {
  foreignKey: "compraId",
  onDelete: "CASCADE" 
});

// relación entre Planta y CompraPlanta (1 a muchos)
Planta.hasMany(CompraPlanta, {
  foreignKey: "plantaId",
  onDelete: "CASCADE" 
});

CompraPlanta.belongsTo(Planta, { 
  foreignKey: "plantaId",
  onDelete: "CASCADE"  
});

module.exports = {
  sequelize,
  Planta,
  Compra,
  CompraPlanta    
}