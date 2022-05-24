const mongoose = require("mongoose");

const PlaneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  normal_calls: {
    type: String,
    required: true,
  },
  additional_calls: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  date_time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planes", PlaneSchema);
