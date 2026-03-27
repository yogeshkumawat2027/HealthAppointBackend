const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { bookSlot } = require("../controllers/bookingController");

router.post("/", auth, bookSlot);

module.exports = router;