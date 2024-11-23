const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerEmail: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: String, required: true },  
  price: { type: String, required: true },     
  date: { type: String, required: true },      
});



module.exports = productSchema; // Export the schema directly
