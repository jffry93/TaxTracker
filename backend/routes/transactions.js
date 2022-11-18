// const { json } = require('express');
const express = require('express');
const {
	getTransactions,
	getTransaction,
	createTransaction,
	deleteTransaction,
	updateTransaction,
} = require('../controllers/transactionController');

const router = express.Router();
//GET ALL
router.post('/user', getTransactions);
// GET SINGLE
router.get('/:id/', getTransaction);
//POST NEW
router.post('/', createTransaction);
//DELETE NEW
router.delete('/:id', deleteTransaction);
//UPDATE NEW
router.patch('/:id', updateTransaction);

module.exports = router;
