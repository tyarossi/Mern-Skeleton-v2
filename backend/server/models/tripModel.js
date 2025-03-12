const mongoose = require("mongoose");

//trip schema/model
const newTripSchema = new mongoose.Schema(
  {
    tripID: {
      type: Number,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    direction: {
      required: true,
      type: Boolean,
      label: direction ? "Inbound" : "Outbound",
    },
    headsign: {
      type: String,
      required: true,
      label: "Headsign",
    },
    Status: {
        type: Boolean,
        required: true,
        label: Status ? "Running" : "Out of Service",
    },
    Routes: {
        type: String,
        required: true,

    },
    Vehicle: {
        type: String,
        required: true,

    },
  },
  { collection: "trips" }
);

module.exports = mongoose.model('trips', newTripSchema)