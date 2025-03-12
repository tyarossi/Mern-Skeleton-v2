const express = require('express');
const router = express.Router();
const Line = require('../models/lineModel');

// Create a new line
router.post('/lines', async (req, res) => {
  try {
    const newLine = new Line(req.body);
    const savedLine = await newLine.save();
    res.status(201).json(savedLine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all lines
router.get('/lines', async (req, res) => {
  try {
    const lines = await Line.find();
    res.status(200).json(lines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single line by ID
router.get('/lines/:id', async (req, res) => {
  try {
    const line = await Line.findById(req.params.id);
    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json(line);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a line by ID
router.put('/lines/:id', async (req, res) => {
  try {
    const updatedLine = await Line.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLine) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json(updatedLine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a line by ID
router.delete('/lines/:id', async (req, res) => {
  try {
    const deletedLine = await Line.findByIdAndDelete(req.params.id);
    if (!deletedLine) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json({ message: 'Line deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;