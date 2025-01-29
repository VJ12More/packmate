// /backend/server.js
require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');  // Import auth routes

// Initialize the express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());  // For parsing JSON data
app.use(cors());          // Enable Cross-Origin Resource Sharing

// Use new auth routes (signup) under /api prefix
app.use('/api', authRoutes); // Prefix all routes in authRoutes with /api

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sign-up Route (this route is already defined in authRoutes, so no need to repeat it here)
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Set the server port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
