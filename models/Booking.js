const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  slotTime: String,

  status: {
    type: String,
    enum: ["pending", "done", "cancelled"],
    default: "pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);