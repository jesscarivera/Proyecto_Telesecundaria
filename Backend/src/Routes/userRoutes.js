const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/UserController');


router.post('/agregar', usuarioController.agregarUsuario);
router.get('/obtener', usuarioController.obtenerUsuarios);       
router.get('/obtener/:id', usuarioController.obtenerUsuario);    
router.put('/editar/:id', usuarioController.editarUsuario);     // Editar
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);// Eliminar

module.exports = router;
