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
  address: { type: String, default: 'N/A' },
  phoneNumber: { 
    type: String, 
    default: '', 
    validate: { 
      validator: (phone) => validator.isMobilePhone(phone, 'any'), 
      message: 'Invalid phone number format' 
    } 
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
