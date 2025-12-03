const express = require("express");
const router = express.Router();
const plantasController = require("../controllers/plantasController");

// listar todas las plantas
router.get("/", plantasController.index);

module.exports = router;