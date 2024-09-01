const express = require('express');
const User = require('./User'); // Import User model

const bcrypt = require('bcrypt');
const dotenv = require('dotenv'); // Import dotenv package
const connectDB = require('./connection'); // Import database connection function
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // This will allow all origins; adjust configuration as needed
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// User Signup
app.post('/signup', async (req, res) => {
    const { phoneNumber, email, password } = req.body;

    // Check if user already exists by phone number or email
    const userExists = await User.findOne({ $or: [{ phoneNumber }, { email }] });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
        phoneNumber,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
});

// User Login
app.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Logged in successfully" });
});



const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
