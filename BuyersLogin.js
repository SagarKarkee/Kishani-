const mongoose = require('mongoose');

const buyersLoginSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

module.exports = buyersLoginSchema;
