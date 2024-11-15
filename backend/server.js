const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://aasisshrestha9898:fK67jzRl8umr2qSs@kishani-app.tm2bt.mongodb.net/farmerdb?retryWrites=true&w=majority&appName=Kishani-App";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected to farmerdb"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema for Signup (stored under 'signup' collection in 'farmerdb')
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = mongoose.model("signup", userSchema); // Explicitly mention 'signup' as the collection name

// Login History Schema (stored under 'loginHistory' collection in 'farmerdb')
const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup' },
  loginTime: { type: Date, default: Date.now },
  isSuccess: Boolean,
  ipAddress: String,  // Optional: if you want to store IP address
});

const LoginHistory = mongoose.model("loginHistory", loginHistorySchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ fullName, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    // Save failed login attempt
    const loginHistory = new LoginHistory({
      userId: null,  // No user found, save null or leave empty
      isSuccess: false,
      ipAddress: req.ip,
    });
    await loginHistory.save();

    return res.status(400).json({ message: "User not found" });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  // Save login attempt (successful or failed)
  const loginHistory = new LoginHistory({
    userId: user._id,
    isSuccess: isMatch,
    ipAddress: req.ip,  // You can use 'req.ip' to get the client's IP address
  });
  await loginHistory.save();

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // If the passwords match, return success
  res.status(200).json({ message: "Login successful", user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
