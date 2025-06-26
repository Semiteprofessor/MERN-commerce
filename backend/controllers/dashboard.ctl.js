// controllers/newsController.js
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const Notifications = require("../models/Notification");
const Payment = require("../models/Payment");
const moment = require("moment");
const { getVendor } = require("../config/getUser");
const Shop = require("../models/Shop");

const calculateExpirationDate = (days) => {
  const now = new Date();
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
};
