//index.js
const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const connectDB = require('./connection');
const cors = require('cors');

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// User Signup for Farmers
app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: 'farmer', // Sign up as farmer
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email, role: 'farmer' });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
