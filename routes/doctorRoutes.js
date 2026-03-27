const router = require("express").Router();
const { getNearbyDoctors } = require("../controllers/doctorController");

router.get("/nearby", getNearbyDoctors);

module.exports = router;