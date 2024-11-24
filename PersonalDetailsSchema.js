const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  fullName: {
    type: String,
    required: true, 
  },
  userName: {
    type: String,
    required: true, 
    unique: true, 
  },
  address: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '', 
  },
  citizenshipNumber: {
    type: String,
    default: '', 
  },
  profileImage: {
    type: String, 
    default: null, 
  },
}, {
  timestamps: true, 
});

module.exports = PersonalDetailsSchema;
