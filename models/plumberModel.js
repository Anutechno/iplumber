const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");

const PlumberSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true, 
  },
  license_num: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip_code: {
    type: Number,
    default: 400002,
  },
  mob_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  plum_bio: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

PlumberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt sign token
PlumberSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Compare password
PlumberSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Plumber", PlumberSchema);
