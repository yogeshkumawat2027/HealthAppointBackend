const Booking = require("../models/Booking");
const Appointment = require("../models/Appointment");

exports.bookSlot = async (req, res) => {
  const { appointmentId, slotTime } = req.body;

  const appointment = await Appointment.findById(appointmentId);

  const slot = appointment.slots.find(s => s.time === slotTime);

  if (slot.isBooked) return res.status(400).json("Already booked");

  slot.isBooked = true;
  await appointment.save();

  const booking = await Booking.create({
    appointment: appointmentId,
    doctor: appointment.doctor,
    patient: req.user.id,
    slotTime
  });

  res.json(booking);
};