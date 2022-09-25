const Transaction = require('../models/transactionModel');
const mongoose = require('mongoose');
const { cloudinary } = require('../utils/cloudinary');
const calculateTax = require('../funky/calculateTax');

//GET ALL PAYMENTS
const getTransactions = async (req, res) => {
  const { email } = req.body;
  try {
    //.sort will return the collection in the order it is createdAt because of the object passed
    const transactions = await Transaction.find({ user: email }).sort({
      createdAt: -1,
    });
    //PAYMENT TOTAL OF CURRENT USER LOGGED IN
    const payment = await Transaction.find({ type: 'payment', user: email });
    let paymentTotal = payment.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.amount;
    }, 0);
    //PURCHASE TOTAL OF CURRENT USER LOGGED IN
    const purchase = await Transaction.find({ type: 'purchase', user: email });
    let purchaseTotal = purchase.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.amount;
    }, 0);
    //CALCULATE TAX
    const remainingIncome = paymentTotal - purchaseTotal;
    const taxObject = calculateTax(remainingIncome);
    // console.log(taxObject);

    res
      .status(200)
      .json({ transactions, paymentTotal, purchaseTotal, ...taxObject });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      error: error._message,
    });
  }
};

//GET SINGLE PAYMENT
const getTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such payment' });
  }

  const payment = await Transaction.findById(id);

  if (!payment) {
    return res.status(404).json({ error: 'No such Payment' });
  }

  res.status(200).json(payment);
};

//CREATE PAYMENT
const createTransaction = async (req, res) => {
  const { title, amount, description, type, client, user, image, imageValue } =
    req.body;

  let emptyFields = [];
  // if (!client) {
  //   emptyFields.push('client');
  // }
  if (!title) {
    emptyFields.push('title');
  }
  if (!amount) {
    emptyFields.push('amount');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!imageValue) {
    emptyFields.push('image');
  }

  try {
    let uploadResponse;
    if (title && amount && description && image) {
      const imageString = image;
      uploadResponse = await cloudinary.uploader.upload(imageString, {
        upload_preset: 'vr6hp6xz',
      });
      console.log('added to cloudinary');
    }

    //.create() is asynchronous so you must include async await
    const transaction = await Transaction.create({
      client,
      user,
      title,
      amount,
      description,
      type,
      imageData: {
        name: imageValue,
        public_id: uploadResponse.public_id,
        url: uploadResponse.url,
      },
    });

    //PAYMENT TOTAL OF CURRENT USER LOGGED IN
    const payment = await Transaction.find({ user, type: 'payment' });
    let paymentTotal = payment.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.amount;
    }, 0);
    //PURCHASE TOTAL OF CURRENT USER LOGGED IN
    const purchase = await Transaction.find({ user, type: 'purchase' });
    let purchaseTotal = purchase.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.amount;
    }, 0);
    //CALCULATE TAX
    const remainingIncome = paymentTotal - purchaseTotal;
    const taxObject = calculateTax(remainingIncome);

    res
      .status(200)
      .json({ transaction, purchaseTotal, paymentTotal, ...taxObject });
  } catch (error) {
    console.log(error._message);
    res.status(400).json({
      error: 'Highlighted fields required',
      emptyFields,
    });
  }
};

//DELETE PAYMENT
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const { public } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such payment' });
  }
  const transaction = await Transaction.findOneAndDelete({ _id: id });

  //DELETE IMAGE IN CLOUDINARY
  const uploadedResponse = await cloudinary.uploader.destroy(
    public,
    (options = {})
  );
  //PAYMENT TOTAL OF CURRENT USER LOGGED IN
  const payment = await Transaction.find({
    type: 'payment',
    user: transaction.user,
  });
  let paymentTotal = payment.reduce((prevValue, currentItem) => {
    return prevValue + currentItem.amount;
  }, 0);

  //PURCHASE TOTAL OF CURRENT USER LOGGED IN
  const purchase = await Transaction.find({
    type: 'purchase',
    user: transaction.user,
  });
  let purchaseTotal = purchase.reduce((prevValue, currentItem) => {
    return prevValue + currentItem.amount;
  }, 0);
  //CALCULATE TAX
  const remainingIncome = paymentTotal - purchaseTotal;
  const taxObject = calculateTax(remainingIncome);

  if (!transaction) {
    return res.status(404).json({ error: 'No such Payment' });
  }
  res
    .status(200)
    .json({ transaction, paymentTotal, purchaseTotal, ...taxObject });
};

// UPDATE A PAYMENT
const updateTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such payment' });
  }

  const payment = await Transaction.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!payment) {
    return res.status(404).json({ error: 'No such Payment' });
  }
  res.status(200).json(payment);
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
