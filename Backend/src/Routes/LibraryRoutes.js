const express = require('express');
const router = express.Router();
const LibraryController = require('../Controllers/LibraryController');

// CRUD de libros
router.post('/add', LibraryController.agregarLibro);             
router.get('/get', LibraryController.obtenerLibros);             
router.get('/get/:id', LibraryController.obtenerLibro);          
router.put('/edit/:id', LibraryController.editarLibro);          
router.delete('/delete/:id', LibraryController.eliminarLibro);   

module.exports = router;
