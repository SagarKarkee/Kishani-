const mongoose = require('mongoose');

// Define schema for Farmers login credentials
const FarmersLoginSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'farmer',
  },
});

// Create the model
const FarmersLogin = mongoose.model('FarmersLogin', FarmersLoginSchema, 'Farmers.LoginCredentials');

module.exports = FarmersLogin;
