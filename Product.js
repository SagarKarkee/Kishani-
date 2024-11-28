const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    farmerEmail: { 
        type: String, 
        required: true, 
        ref: 'FarmersLogin' 
      },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
});

module.exports = productSchema;
