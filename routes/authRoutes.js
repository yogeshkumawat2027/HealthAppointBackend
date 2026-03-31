const router = require("express").Router();
const { register, login, getUser, updateUser, completeProfile } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getUser);
router.put("/profile", auth, updateUser);
router.post("/complete-profile", auth, completeProfile);

module.exports = router;