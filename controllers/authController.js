const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
  name,
  email,
  password: hash,
  role,
  location: undefined // 🔥 important
});

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, bio, specialization, clinicAddress, qualifications, experience, profileImage } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
        bio,
        specialization,
        clinicAddress,
        qualifications,
        experience,
        profileImage
      },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const { phone, bio, specialization, experience, profileImage } = req.body;
    
    if (!phone || !bio || !specialization || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        phone,
        bio,
        specialization,
        experience,
        profileImage,
        profileComplete: true
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user,
      message: "Profile completed successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Error completing profile", error: error.message });
  }
};