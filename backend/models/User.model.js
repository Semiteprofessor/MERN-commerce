const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your firstName"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastName"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter a password"],
    minlength: 8,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Please enter a gender"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter a password"],
    minlength: 8,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Please enter a gender"],
  },
  cover: {
    _id: {
      type: String,
    },
    url: { type: String },
    blurDataURL: {
      type: String,
    },
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});
