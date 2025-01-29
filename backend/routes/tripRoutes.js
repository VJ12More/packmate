const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Create Trip
router.post('/create', async (req, res) => {
  const { tripDetails, people } = req.body;
  try {
    const newTrip = new Trip({ tripDetails, people });
    await newTrip.save();
    res.status(201).json({ message: 'Trip created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
