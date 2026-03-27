const User = require("../models/User");

exports.getNearbyDoctors = async (req, res) => {
  const { lng, lat } = req.query;

  const doctors = await User.find({
    role: "doctor",
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 5000
      }
    }
  });

  res.json(doctors);
};