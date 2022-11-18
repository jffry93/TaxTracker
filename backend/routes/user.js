// const { json } = require('express');
const express = require('express');
const { legitCheckUser, updateUser } = require('../controllers/userController');

const router = express.Router();
//GET DATA
router.post('/', legitCheckUser);
// // GET SINGLE
// router.get('/:id', getTransaction);
// //POST NEW
// router.post('/', createTransaction);
// //DELETE NEW
// router.delete('/:id', deleteTransaction);
//UPDATE NEW
router.patch('/', updateUser);

module.exports = router;
