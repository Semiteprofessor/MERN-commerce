// controllers/userController.js
const User = require("../models/User.model");
const Products = require("../models/Product.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { getUser } = require("../config/getUser");
