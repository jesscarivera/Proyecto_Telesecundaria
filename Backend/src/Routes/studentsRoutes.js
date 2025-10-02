const express = require('express');
const router = express.Router();
const StudentsController = require('../Controllers/StudentsController')

router.post('/add', StudentsController.agregarEstudiante);            
router.get('/get', StudentsController.obtenerEstudiantes);           
router.get('/get/:enrollment', StudentsController.obtenerEstudiante); 
router.put('/edit/:enrollment', StudentsController.editarEstudiante);  
router.delete('/delete/:enrollment', StudentsController.eliminarEstudiante); 

module.exports = router;