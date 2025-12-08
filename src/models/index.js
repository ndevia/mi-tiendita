const Planta = require("./Planta");
const Compra = require("./Compra");
const CompraPlanta = require("./CompraPlanta");
const sequelize = require("../config/db");

// relación entre Planta y CompraPlanta (1 a muchos)
Compra.hasMany(CompraPlanta, {
  as: "comprasPlanta",
  foreignKey: "compraId",
  onDelete: "CASCADE"
});

CompraPlanta.belongsTo(Compra, {
  as: "compra",
  foreignKey: "compraId",
  onDelete: "CASCADE" 
});

// relación entre Planta y CompraPlanta (1 a muchos)
Planta.hasMany(CompraPlanta, {
  as: "comprasPlanta",
  foreignKey: "plantaId",
  onDelete: "CASCADE" 
});

CompraPlanta.belongsTo(Planta, { 
  as: "planta",
  foreignKey: "plantaId",
  onDelete: "CASCADE"  
});

module.exports = {
  sequelize,
  Planta,
  Compra,
  CompraPlanta    
}