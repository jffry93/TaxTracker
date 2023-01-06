//dotenv dependency
require('dotenv').config();
//add routes from routes folder
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//routes
const transactionsRoutes = require('./routes/transactions');
const userRoutes = require('./routes/user');
const styleRoutes = require('./routes/styles');

//express app
const app = express();

//MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Methods',
		'OPTIONS, HEAD, GET, PUT, POST, DELETE'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use(morgan('tiny'));
app.use(
	cors({
		origin: ['https://taxtracker.onrender.com', 'https://localhost:3000'],
	})
);

// PAYMENT ROUTE
app.use('/api/styles', styleRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/user', userRoutes);
//404 ERROR
app.get('*', (req, res) => {
	res.status(404).json({
		status: 404,
		message: 'This is obviously not what you are looking for.',
	});
});

mongoose.set('strictQuery', false);
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
