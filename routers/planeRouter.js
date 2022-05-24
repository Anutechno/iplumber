const express = require("express");
const router = express.Router();

const {
  createPlanes,
  getPlanes,
  updatePlanes,
  getAllPlanes,
  deletePlanes,
} = require("../controllers/planeController");

router.route("/createplane").post(createPlanes);
router.route("/getplane").get(getPlanes);
router.route("/updateplane/update/:id").put(updatePlanes);
router.route("/allplane").get(getAllPlanes);
router.route("/plane/:id").delete(deletePlanes);

module.exports = router;
