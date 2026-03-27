const Appointment = require("../models/Appointment");
const generateSlots = require("../utils/slotGenerator");

exports.createAppointment = async (req, res) => {
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
};

exports.getDoctorAppointments = async (req, res) => {
  const { date } = req.query;

  const data = await Appointment.find({
    doctor: req.user.id,
    date: new Date(date)
  });

  res.json(data);
};