const Users = require("../models/userModel");
const Token = require("../Utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const crypto = require("crypto");

// Uer register in database
exports.registerUser = catchAsyncErrors(async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const name = await Users.findOne({ email: email });
    if (name) {
      res.status(400).json({ mesaage: "User Already exist" });
    }
    const user = await Users(req.body);
    await user.save();
    res.status(200).json({ data: user, mesaage: "user signup Succesfull" });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

//get user in database
exports.getUser = catchAsyncErrors(async (req, res) => {
  try {
    const { email } = req.body;
    const Userdata = await Users.findOne({ email: email });
    if (!Userdata) {
      res.status(400).json({ mesaage: "User not found " });
      return;
    }
    res
      .status(200)
      .json({ data: Userdata, mesaage: "Get user details Succesfull" });
  } catch (error) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

// updateProfile
exports.updateProfile = catchAsyncErrors(async (req, res) => {
  try {
    const userName = await Users.findById(req.params.id);
    console.log(userName);

    if (!userName) {
      res.status(400).json({ mesaage: "User not found " });
      return;
    } else {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      console.log(user);

      res
        .status(200)
        .json({ data: user, mesaage: "Update user details Succesfull" });
    }
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Update Error" });
  }
});

// getAllUser
exports.getAllUser = catchAsyncErrors(async (req, res) => {
  try {
    const Userdata = await Users.find();
    if (!Userdata) {
      res.status(400).json({ mesaage: "User not found " });
      return;
    }
    res
      .status(200)
      .json({ data: Userdata, mesaage: "Get user details Succesfull" });
  } catch (error) {
    res.status(400).json({ data: error, mesaage: "Error" });
  }
});


