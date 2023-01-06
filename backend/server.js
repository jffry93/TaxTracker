//dotenv dependency
require('dotenv').config();
//add routes from routes folder
const mongoose = require('mongoose');
const express = require('express');
//routes
const transactionsRoutes = require('./routes/transactions');
const userRoutes = require('./routes/user');
const styleRoutes = require('./routes/styles');
const cors = require('cors');
//express app
const app = express();

//MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(
	cors({
		origin: ['http://localhost:3000', 'https://taxtracker.onrender.com/'],
	})
);
//This is used to show the URL path and HTTP Method in the terminal
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
// PAYMENT ROUTE
app.use('/api/styles', styleRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/user', userRoutes);

//Connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		//listen for requests
		app.listen(process.env.PORT, () => {
			console.log('Connected to database & listening on port 4000!!');
		});
	})
	.catch((error) => {
		console.log(error);
		console.log('could not connect to the database');
	});
``;
