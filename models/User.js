const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["doctor", "patient"] },

  profileImage: String,
  specialization: String,
  clinicAddress: String,

  location: {
  type: {
    type: String,
    enum: ["Point"],
    required: false
  },
  coordinates: {
    type: [Number],
    required: false
  }
}
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);