// routes/loanRoutes.js

const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Routes prêts
router.post('/loans', loanController.createLoan);
router.get('/loans/:userId', loanController.getLoansByUser);
router.delete('/loans/:loanId', loanController.deleteLoan);

module.exports = router;
