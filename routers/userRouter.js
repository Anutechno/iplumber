const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  loginUser,
  logoutUser,
  updateProfile,
  getAllUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/getuser").get(getUser);
router.route("/profile/update/:id").put(updateProfile);
router.route("/admin").get(getAllUser);
router.route("/admin/user/:id").delete(deleteUser);

module.exports = router;
