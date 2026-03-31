const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["doctor", "patient"] },

  profileImage: String,
  phone: String,
  bio: String,
  
  // Doctor specific fields
  specialization: String,
  clinicAddress: String,
  consultationFee: { type: Number, default: 0 },
  experience: String,
  qualifications: String,
  profileComplete: { type: Boolean, default: false },

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
  },
  
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);