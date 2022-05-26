const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  loginUser,
  logoutUser,
  updateProfile,
  getAllUser,
<<<<<<< HEAD
  deleteUser
=======
>>>>>>> 959ec3303450710a02b4bdf119b02bddf6fd46a6
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/getuser").get(getUser);
router.route("/profile/update/:id").put(updateProfile);
router.route("/admin").get(getAllUser);
router.route("/admin/user/:id").delete(deleteUser);

module.exports = router;
