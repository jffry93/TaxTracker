const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    client: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageData: {
      type: {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
