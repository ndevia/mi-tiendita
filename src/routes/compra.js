const express = require("express");
const router = express.Router();
const comprasController = require("../controllers/comprasController");

// ruta para listar todas las compras
router.get("/", comprasController.index);

// ruta para generar una nueva compra
router.get("/new", comprasController.new);
router.post("/", comprasController.create);

module.exports = router;