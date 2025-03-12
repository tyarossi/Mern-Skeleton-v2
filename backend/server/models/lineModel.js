const mongoose = require("mongoose");

//user schema/model
const newLineSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
      label: "Color",
    },
    lineID: {
      type: Number,
      required: true,
      label: "LineID",
    },
    stationID: {
      required: true,
      type: Number,
      label: "StationID",
    }
  },
  { collection: "lines" }
);

module.exports = mongoose.model('line', newLineSchema)