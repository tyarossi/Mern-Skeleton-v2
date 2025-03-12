const express = require('express');
const router = express.Router();
const axios = require('axios');

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; //store key in .env file

// Create a new line
router.post('/lines', async (req, res) => {
  try {
    const response = await axios.post(`${MBTA_API_BASE}/lines`, req.body, {
      headers: {
        'x-api-key': MBTA_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all lines
router.get('/lines', async (req, res) => {
  try {
    const response = await axios.get(`${MBTA_API_BASE}/lines`, {
      headers: {
        'x-api-key': MBTA_API_KEY
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single line by ID
router.get('/lines/:id', async (req, res) => {
  try {
    const response = await axios.get(`${MBTA_API_BASE}/lines/${req.params.id}`, {
      headers: {
        'x-api-key': MBTA_API_KEY
      }
    });
    if (!response.data) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a line by ID
router.put('/lines/:id', async (req, res) => {
  try {
    const response = await axios.put(`${MBTA_API_BASE}/lines/${req.params.id}`, req.body, {
      headers: {
        'x-api-key': MBTA_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    if (!response.data) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a line by ID
router.delete('/lines/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${MBTA_API_BASE}/lines/${req.params.id}`, {
      headers: {
        'x-api-key': MBTA_API_KEY
      }
    });
    if (!response.data) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json({ message: 'Line deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;