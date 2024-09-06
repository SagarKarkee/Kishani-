// server/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    enum: ['farmer', 'buyer'], // Farmer or buyer
    default: 'farmer',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
