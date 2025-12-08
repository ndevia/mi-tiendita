const express = require("express");
const router = express.Router();
const plantasController = require("../controllers/plantasController");

// ruta para listar todas las plantas
router.get("/", plantasController.index);

// rutas para crear plantas
router.get("/new", plantasController.new);
router.post("/", plantasController.create);

// ruta para ver una planta específica
router.get("/:id", plantasController.show);

// rutas para actualizar una planta específica
router.get("/:id/edit", plantasController.edit);
router.put("/:id", plantasController.update);

// ruta para eliminar una planta específica
router.delete("/:id", plantasController.delete);

module.exports = router;