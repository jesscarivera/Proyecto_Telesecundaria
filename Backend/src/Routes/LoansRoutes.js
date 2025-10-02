const express = require('express');
const router = express.Router();
const LoanController = require('../Controllers/LoansController');

// Crear préstamo
router.post('/add', LoanController.createLoan);

// Obtener todos los préstamos
router.get('/get', LoanController.getLoans);

// Devolver préstamo
router.put('/return/:id', LoanController.returnLoan);

module.exports = router;