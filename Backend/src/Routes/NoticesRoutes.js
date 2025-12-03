const express = require("express");
const router = express.Router();
const controller = require("../Controllers/NoticesControllers");

router.get("/", controller.obtenerAvisos);
router.post("/", controller.crearAviso);
router.put("/:id", controller.actualizarAviso);   
router.delete("/:id", controller.eliminarAviso);

module.exports = router;
