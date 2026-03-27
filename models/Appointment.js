const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  title: String,
  specialization: String,
  description: String,
  clinicAddress: String,

  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },

  date: Date,
  startTime: String,
  endTime: String,
  slotDuration: Number,

  slots: [
    {
      time: String,
      isBooked: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model("Appointment", appointmentSchema);