const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDB = require('./connection');
const farmersLoginSchema = require('./FarmersLogin'); // Import the schema directly
const buyersLoginSchema = require('./BuyersLogin'); // Import the schema directly

dotenv.config();
const app = express();

connectDB(); // Establish connection to MongoDB Atlas

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Initialize FarmersLogin model globally once the database connection is established
let FarmersLogin;
let BuyersLogin;
mongoose.connection.on('connected', () => {
    const farmersDb = mongoose.connection.useDb('Farmers');
    FarmersLogin = farmersDb.model('FarmersLogin', farmersLoginSchema, 'LoginData');
    console.log('FarmersLogin model initialized');

    const buyersDb = mongoose.connection.useDb('Buyers');
    BuyersLogin = buyersDb.model('BuyersLogin', buyersLoginSchema, 'BLoginData');
    console.log('BuyersLogin model initialized.');
});


// Farmer's Signup route 
app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
        const existingUser = await FarmersLogin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new FarmersLogin({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Farmer's Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await FarmersLogin.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If the passwords match, return user data (including name)
      res.status(200).json({
        message: 'Login successful',
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }

});


// Buyers Signup Route

app.post('/bsignup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
        const existingUser = await BuyersLogin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new BuyersLogin({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Buyer account created successfully' });
    } catch (error) {
        console.error('BSignup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Buyers Login Route


app.post('/blogin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!BuyersLogin) {
        console.error('BuyersLogin model is not initialized');
        return res.status(500).json({ message: 'Server error' });
      }
  
      const user = await BuyersLogin.findOne({ email });
  
      if (!user) {
        console.error(`User not found for email: ${email}`);
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.error('Password mismatch for email:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
