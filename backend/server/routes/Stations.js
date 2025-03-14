const express = require("express");
const router = express.Router();
const axios = require("axios");
const Stop = require("../models/stationModel"); // Ensure correct model path

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env

// GET all stops (from DB)
router.get("/getAllStations", async (req, res) => {
  try {
    const stops = await Stop.find().populate("lines");
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: "Server error retrieving stops." });
  }
});

// GET stop by ID
router.get("/getStationById", async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id).populate("lines");
    if (!stop) return res.status(404).json({ error: "Stop not found." });
    res.json(stop);
  } catch (err) {
    res.status(500).json({ error: "Server error retrieving stop." });
  }
});

// SYNC stops from MBTA API
router.get("/syncStations", async (req, res) => {
  try {
    const response = await axios.get(`${MBTA_API_BASE}/stops`, {
      params: { api_key: MBTA_API_KEY }
    });

    const mbtaStops = response.data.data.map(stop => ({
      mbtaId: stop.id,
      color: stop.attributes.color,
      address: stop.attributes.address,
    }));

    for (const stopData of mbtaStops) {
      await Stop.findOneAndUpdate(
        { mbtaId: stopData.mbtaId },
        stopData,
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Stops synchronized with MBTA API." });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stops from MBTA API." });
  }
});

// POST create a new stop
router.post("/createStations", async (req, res) => {
  try {
    const { mbtaId, color, address } = req.body;
    const newStop = new Stop({ mbtaId, color, address });
    await newStop.save();
    res.status(201).json(newStop);
  } catch (err) {
    res.status(400).json({ error: "Error creating stop." });
  }
});

// PUT update a stop
router.put("/updateStations", async (req, res) => {
  try {
    const updatedStop = await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStop) return res.status(404).json({ error: "Stop not found." });
    res.json(updatedStop);
  } catch (err) {
    res.status(400).json({ error: "Error updating stop." });
  }
});

// DELETE a stop
router.delete("/deleteStations", async (req, res) => {
  try {
    const deletedStop = await Stop.findByIdAndDelete(req.params.id);
    if (!deletedStop) return res.status(404).json({ error: "Stop not found." });
    res.json({ message: "Stop deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting stop." });
  }
});

module.exports = router;