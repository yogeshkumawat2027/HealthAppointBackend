const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const { uploadProfileImage, deleteProfileImage } = require("../controllers/uploadController");

router.post("/profile-image", auth, upload.single("image"), uploadProfileImage);
router.post("/delete-image", auth, deleteProfileImage);

module.exports = router;
