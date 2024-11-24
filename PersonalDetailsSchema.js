const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Each email corresponds to one PersonalDetails entry
  },
  fullName: {
    type: String,
    required: true, // Mandatory, already provided during signup
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
    type: String, // URL or base64 encoded string
    default: null,
  },
});

module.exports = PersonalDetailsSchema;
