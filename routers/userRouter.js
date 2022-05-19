const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  updateProfile,
  getAllUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/getuser").get(getUser);
router.route("/profile/update/:id").put(updateProfile);
router.route("/admin").get(getAllUser);

module.exports = router;
