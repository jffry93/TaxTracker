//dotenv dependency
require('dotenv').config();
//add routes from routes folder
const mongoose = require('mongoose');
const express = require('express');
//routes
const transactionsRoutes = require('./routes/transactions');
//express app
const app = express();

//MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
//This is used to show the URL path and HTTP Method in the terminal
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// PAYMENT ROUTE
app.use('/api/transactions', transactionsRoutes);

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
