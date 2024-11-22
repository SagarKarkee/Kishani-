const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    farmerEmail: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
  });
  

  module.exports = productSchema;
  