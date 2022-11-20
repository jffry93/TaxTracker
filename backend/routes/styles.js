// const { json } = require('express');
const express = require('express');
const { getShapes } = require('../controllers/styleController');

const router = express.Router();
//GET DATA
router.get('/', getShapes);

module.exports = router;
