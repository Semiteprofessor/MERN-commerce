const Notifications = require('../models/Notification');
const Products = require('../models/Product');
const Orders = require('../models/Order');
const Coupons = require('../models/CouponCode');
const User = require('../models/User');
const Shop = require('../models/Shop');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { getVendor, getAdmin } = require('../config/getUser');
function isExpired(expirationDate) {
  const currentDateTime = new Date();
  return currentDateTime >= new Date(expirationDate);
}
function generateOrderNumber() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let orderNumber = '';

  // Generate a random alphabet character
  orderNumber += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

  // Generate 4 random digits
  for (let i = 0; i < 6; i++) {
    orderNumber += Math.floor(Math.random() * 10);
  }

  return orderNumber;
}