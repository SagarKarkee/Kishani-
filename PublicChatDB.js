const mongoose = require('mongoose');

// Define the Public Chat Schema
const publicChatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
    },
    date: {
        type: Date,
        default: Date.now, // Automatically sets the current date
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Ensures consistent email format
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    likes: {
        type: Number,
        default: 0, // Default like count is 0
    },
});

// Export only the schema
module.exports = publicChatSchema;
