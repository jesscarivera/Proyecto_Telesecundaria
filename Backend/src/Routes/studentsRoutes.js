const express = require('express');
const router = express.Router();
const StudentsController = require('../Controllers/StudentsController')

// CRUD de estudiantes
router.post('/add', StudentsController.agregarEstudiante);            // POST /api/students
router.get('/get', StudentsController.obtenerEstudiantes);           // GET /api/students
router.get('/get/:enrollment', StudentsController.obtenerEstudiante); // GET /api/students/ABC123
router.put('/edit/:enrollment', StudentsController.editarEstudiante);  // PUT /api/students/ABC123
router.delete('/delete/:enrollment', StudentsController.eliminarEstudiante); // DELETE /api/students/ABC123

module.exports = router;