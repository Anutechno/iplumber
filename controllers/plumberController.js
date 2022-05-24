const Plumbers = require("../models/plumberModel");
const Token = require("../Utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const e = require("express");
// const crypto = require("crypto");

//Plumbers register in database
exports.registerPlumber = catchAsyncErrors(async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const name = await Plumbers.findOne({ email: email });
    if (name) {
      res.status(400).json({ mesaage: "Plumber Already exist" });
    }
    const user = await Plumbers(req.body);
    await user.save();
    res.status(200).json({ data: user, mesaage: "Plumber signup Succesfull" });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

//Plumbers login in database
exports.loginPlumber = catchAsyncErrors(async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ data: email, mesaage: "please enter and password" });
    }
    const userEmailPass = await Plumbers.findOne({ email: email }).select(
      "+password"
    );
    console.log(userEmailPass);

    if (!userEmailPass) {
      res
        .status(401)
        .json({ data: email, mesaage: "Envalid email and password" });
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
        .json({ data: userEmailPass, mesaage: "Plumber signin Successfull" });
    }
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

//Plumbers logout in database
exports.logoutPlumber = catchAsyncErrors(async (req, res) => {
  try {
    const { email } = req.body;
    const Plumberdata = await Plumbers.findOne({ email: email });
    console.log("info", Plumberdata);
    const token = Token.createToken(email);
    res
      .status(200)
      .clearCookie("token", token)
      .json({ data: Plumberdata, mesaage: "Plumber logout seccessfully" });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

//get Plumbers in database
exports.getPlumber = catchAsyncErrors(async (req, res) => {
  try {
    const { email } = req.body;
    const Plumberdata = await Plumbers.findOne({ email: email });
    if (!Plumberdata) {
      res.status(400).json({ mesaage: "Plumber not found " });
      return;
    }
    res
      .status(200)
      .json({ data: Plumberdata, mesaage: "Get Plumber details Succesfull" });
  } catch (error) {
    res.status(400).json({ data: err, mesaage: "Error" });
  }
});

// updatePlumbersProfile
exports.updateProfile = catchAsyncErrors(async (req, res) => {
  try {
    const PlumberName = await Plumbers.findById(req.params.id);
    console.log(PlumberName);

    if (!PlumberName) {
      res.status(400).json({ mesaage: "User not found " });
      return;
    } else {
      const Plumber = await Plumbers.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      console.log(Plumber);

      res
        .status(200)
        .json({ data: user, mesaage: "Update Plumber details Succesfull" });
    }
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Update Error" });
  }
});

// getAllPlumbers
exports.getAllPlumber = catchAsyncErrors(async (req, res) => {
  try {
    const Plumberdata = await Plumbers.find();
    if (!Plumberdata) {
      res.status(400).json({ mesaage: "Plumber not found " });
      return;
    }
    res
      .status(200)
      .json({ data: Plumberdata, mesaage: "Get Plumber details Succesfull" });
  } catch (error) {
    res.status(400).json({ data: error, mesaage: "Error" });
  }
});

//deletePlumbers
exports.deletePlumber = catchAsyncErrors(async (req, res) => {
  try {
    const Plumberdata = await Plumbers.findById(req.params.id);

    if (!Plumberdata) {
      res.status(400).json({ data: err, mesaage: "Plumber Not Found" });
    }
    Plumbers.findByIdAndDelete(req.params.id, { new: true }, (err, data) => {
      if (err) {
        throw err;
      }
      res
        .status(200)
        .json({ data: data, mesaage: "Delete Plumber Details Successfull" });
    });
  } catch (err) {
    res.status(400).json({ data: err, mesaage: "Error in delete user" });
  }
});

// Create New Review or Update the review
exports.createPlumberReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, plumberId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Plumbers.findById(plumberId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get allReviews of a Plumbers
exports.getPlumberReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Plumbers.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Plumbers Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Plumbers.findById(req.query.plumberId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Plumbers.findByIdAndUpdate(
    req.query.plumberId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
