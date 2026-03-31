const Appointment = require("../models/Appointment");
const generateSlots = require("../utils/slotGenerator");

exports.createAppointment = async (req, res) => {
  try {
    const slots = generateSlots(
      req.body.startTime,
      req.body.endTime,
      req.body.slotDuration
    );

    const appointment = await Appointment.create({
      ...req.body,
      doctor: req.user.id,
      slots
    });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create appointment" });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { doctor: req.user.id };

    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);
      filter.date = { $gte: dayStart, $lte: dayEnd };
    }

    const data = await Appointment.find(filter).sort({ date: 1, startTime: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch appointments" });
  }
};