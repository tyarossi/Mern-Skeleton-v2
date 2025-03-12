const express = require('express');
const router = express.Router();
const Trip = require('../models/TripModel');

// Create a new Trip
router.post('/Trips', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Trips
router.get('/Trips', async (req, res) => {
  try {
    const Trips = await Trip.find();
    res.status(200).json(Trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single Trip by ID
router.get('/Trips/:id', async (req, res) => {
  try {
    const Trip = await Trip.findById(req.params.id);
    if (!Trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(Trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Trip by ID
router.put('/Trips/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Trip by ID
router.delete('/Trips/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;