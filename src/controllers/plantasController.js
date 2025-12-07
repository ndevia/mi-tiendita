const { Planta } = require("../models/index");

// vista para listar todas las plantas
exports.index = async (req, res, next) => {
  try {
    const plantas = await Planta.findAll({
      order: [['id', 'ASC']],
      raw: true
    });
      
    res.render("plantas/index", { plantas });
  } catch (error) {
    next(error)
  }
} 

// vista para ver detalles de una planta
exports.show = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).render("error", {
        status: 400, message: `El id no es válido.`
      });
    }

    const planta = await Planta.findByPk(id, { raw: true });

    if (!planta) {
      return res.status(404).render("error", {
        status: 404, message: "Planta no encontrada"
      });    
    }
      
    res.render("plantas/show", { planta });
  } catch (error) {
    next(error)
  }
} 

// vista con formulario para agregar una nueva planta
exports.new = async (req, res, next) => {
  try {
    res.render("plantas/new");
  } catch (error) {
    next(error)
  }
} 

// crear nueva planta
exports.create = async (req, res, next) => {
  try {
    const { genero, especie, nombre_comun, precio, cantidad } = req.body;

    // validar que vengan todos los campos obligatorios
    if (!genero || !precio || !cantidad) {
      return res.status(400).render("error", { message: "Faltan campos obligatorios." });
    }

    const nuevaPlanta = {
      genero: genero.trim(),
      especie: especie.trim() || "sp.",
      nombre_comun: nombre_comun.trim() || "No aplica",
      precio: Number(precio),
      cantidad: parseInt(cantidad),
      disponible: req.body.disponible || true
    }

    await Planta.create(nuevaPlanta);
    res.redirect("/plantas");
  } catch (error) {
    next(error)
  }
} 

// vista con formulario para editar una planta
exports.edit = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).render("error", {
        status: 400, message: `El id no es válido.`
      });
    }
    
    const planta = await Planta.findByPk(id, { raw: true });
    
    if (!planta) {
      return res.status(404).render("error", {
        status: 404, message: "Planta no encontrada"
      });    
    }

    res.render("plantas/edit", {planta});
  } catch (error) {
    next(error)
  }
} 

exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).render("error", {
        status: 400, message: `El id no es válido.`
      });
    }

    const planta = await Planta.findByPk(id)
    
    if (!planta) {
      return res.status(404).render("error", {
        status: 404, message: "Planta no encontrada"
      });    
    }

    const { genero, especie, nombre_comun, precio, cantidad } = req.body;

    // validar que vengan todos los campos obligatorios
    if (!genero || !precio || !cantidad) {
      return res.status(400).render("error", { message: "Faltan campos obligatorios." });
    }

    await planta.update({
      genero: genero.trim(),
      especie: especie.trim() || "sp.",
      nombre_comun: nombre_comun.trim() || "No aplica",
      precio: Number(precio),
      cantidad: parseInt(cantidad),
      disponible: req.body.disponible || true
    });
    
    res.redirect("/plantas");
  } catch (error) {
    next(error)
  }
} 

exports.delete = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).render("error", {
        status: 400, message: `El id no es válido.`
      });
    }

    const planta = await Planta.findByPk(id)
    
    if (!planta) {
      return res.status(404).render("error", {
        status: 404, message: "Planta no encontrada"
      });    
    }

    await planta.destroy();
    res.redirect("/plantas");
  } catch (error) {
    next(error)
  }
} 