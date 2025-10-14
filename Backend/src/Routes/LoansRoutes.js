const express = require('express');
const router = express.Router();
const LoanController = require('../Controllers/LoansController');

router.post('/add', LoanController.createLoan);
router.get('/get', LoanController.getLoans);
router.put('/return/:id', LoanController.returnLoan);

module.exports = router;