const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createAppointment,
  getDoctorAppointments
} = require("../controllers/appointmentController");

router.post("/", auth, createAppointment);
router.get("/", auth, getDoctorAppointments);

module.exports = router;