const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/UserController');


router.post('/agregar', usuarioController.agregarUsuario);

module.exports = router;
