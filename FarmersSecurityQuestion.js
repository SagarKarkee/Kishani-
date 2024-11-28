const mongoose = require('mongoose');

const SecurityQuestionSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    ref: 'FarmersLogin' 
  }, 
  question: { type: String, required: true },
  answer: { type: String, required: true }, // Store the hashed answer
});

module.exports = SecurityQuestionSchema;
