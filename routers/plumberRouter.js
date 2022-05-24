const express = require("express");
const router = express.Router();
const {
  registerPlumber,
  getPlumber,
  loginPlumber,
  logoutPlumber,
  updateProfile,
  getAllPlumber,
  deletePlumber,
  createPlumberReview,
  getPlumberReviews,
  deleteReview,
} = require("../controllers/plumberController");

router.route("/plumregister").post(registerPlumber);
router.route("/plumlogin").post(loginPlumber);
router.route("/plumlogout").get(logoutPlumber);
router.route("/getplumber").get(getPlumber);
router.route("/plumprofile/update/:id").put(updateProfile);
router.route("/plumber").get(getAllPlumber);
router.route("/admin/plumber/:id").delete(deletePlumber);
router.route("/review").put(createPlumberReview);
router.route("/review").get(getPlumberReviews).delete(deleteReview);

module.exports = router;
