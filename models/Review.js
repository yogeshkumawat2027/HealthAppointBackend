const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String
});

module.exports = mongoose.model("Review", reviewSchema);