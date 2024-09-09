//index.js
const express = require('express');
const User = require('./FarmersLogin');
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
        // Check if user already exists by email
        const userExists = await FarmersLogin.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newFarmer = new FarmersLogin({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save user to Farmers.LoginCredentials collection
        await newFarmer.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// User Login (for Farmers)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await FarmersLogin.findOne({ email });
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
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
