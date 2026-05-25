const { where } = require('sequelize');
const {Planta, Compra, CompraPlanta} = require('../models');

const plantas = [
  {
    genero: "Cotyledon",
    especie: "Tomentosa",
    nombre_comun: "Garritas de Oso",
    precio: 4.50,
    cantidad: 10,
    disponible: true
  },
  {
    genero: "Crassula",
    especie: "Ovata",
    nombre_comun: "Árbol de Jade",
    precio: 2.50,
    cantidad: 20,
    disponible: true
  },
  {
    genero: "Echeveria",
    especie: "Secunda",
    precio: 2.50,
    cantidad: 10,
    disponible: true
  },
  {
    genero: "Echeveria",
    especie: "Perle von Nürnberg",
    precio: 2.99,
    cantidad: 8,
    disponible: true
  },
  {
    genero: "Adromischus",
    especie: "Cooperi",
    nombre_comun: "Patitas de Tortuga",
    precio: 5.99,
    cantidad: 7,
    disponible: true
  },
  {
    genero: "Graptoveria",
    especie: "Fred Ives",
    precio: 2.00,
    cantidad: 15,
    disponible: true
  },
  {
    genero: "Graptoveria",
    especie: "Debbie",
    precio: 5.50,
    cantidad: 7,
    disponible: true
  },
  {
    genero: "Graptoveria",
    especie: "Opalina",
    precio: 10.00,
    cantidad: 7,
    disponible: true
  },
  {
    genero: "Sempervivum",
    especie: "Calcareum",
    nombre_comun: "Uñas de Señorita",
    precio: 3.50,
    cantidad: 12,
    disponible: true
  }
];

const seedPlantas = async () => {
  try {
    await CompraPlanta.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

    await Compra.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

    await Planta.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

    await Planta.bulkCreate(plantas);

    console.log("Plantas creadas correctamente.");
  } catch (error) {
    console.error("Error al crear plantas:", error);
  }
};

seedPlantas();