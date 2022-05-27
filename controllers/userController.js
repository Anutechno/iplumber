const Users = require("../models/userModel");
const Token = require("../Utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const e = require("express");
// const crypto = require("crypto");

// Uer register in database
exports.registerUser = catchAsyncErrors(async (req, res) => {
  console.log(req.body);
  try {
    const { email, role } = req.body;
    const name = await Users.findOne({ email: email, role: role });
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

//User login in database
exports.loginUser = catchAsyncErrors(async (role, req, res) => {
  console.log(req.body);
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ data: email, mesaage: "please enter and password" });
    }
    const userEmailPass = await Users.findOne({ email: email }).select(
      "+password"
    );
    const findRole = await Users.findOne({ role: role });

    console.log(userEmailPass);
    console.log(findRole);

    if (!userEmailPass) {
      res
        .status(401)
        .json({ data: email, mesaage: "Envalid email and password" });
    }
    if (!findRole) {
      return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
        success: false,
      });
    }
    const isMatchPass = await userEmailPass.comparePassword(password);
    if (!isMatchPass) {
      res.status(4011).json({
        data: isMatchPass,
        mesaage: "please enter current email and password",
      });
    } else {
      console.log("ismatched: ", isMatchPass);
      res
        .status(200)
        .json({ data: userEmailPass, mesaage: "user signin Successfull" });
    }
    let result = {
      username: userEmailPass.username,
      role: findRole.role,
      email: userEmailPass.email,
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true,
    });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

//User logout in database
exports.logoutUser = catchAsyncErrors(async (req, res) => {
  try {
    const { email } = req.body;
    const Userdata = await Users.findOne({ email: email });
    console.log("info", Userdata);
    const token = Token.createToken(email);
    res
      .status(200)
      .clearCookie("token", token)
      .json({ data: Userdata, mesaage: "user logout seccessfully" });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

//get user in database
exports.getUser = catchAsyncErrors(async (req, res) => {
  try {
    const { email } = req.body;
    const Userdata = await Users.findOne({ email: email });
    // console.log(req.query.user);
    // console.log(req.query.plumber);
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
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const userName = await Users.findById(req.params.id, newUserData, {
      new: true,
      // runValidators: true,
      // useFindAndModify: false,
    });
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

//deleteUser
exports.deleteUser = catchAsyncErrors(async (req, res) => {
  try {
    const Userdata = await Users.findById(req.params.id);

    if (!Userdata) {
      res.status(400).json({ data: err, mesaage: "User Not Found" });
    }
    Users.findByIdAndDelete(req.params.id, { new: true }, (err, data) => {
      if (err) {
        throw err;
      }
      res
        .status(200)
        .json({ data: data, mesaage: "Delete User Details Successfull" });
    });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error in delete user" });
  }
});
