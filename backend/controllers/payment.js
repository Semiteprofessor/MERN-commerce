const Payment = require("../models/Payment");
const Shop = require("../models/Shop");
const Orders = require("../models/Order");
const { getVendor } = require("../config/getUser");
const moment = require("moment");
const getPaymentsByAdmin = async (req, res) => {
  try {
    let { limit, page = 1, shop, status } = req.query;

    const skip = parseInt(limit) || 8;
    let query = {};

    // Add shopid filter if provided
    if (shop) {
      const currentShop = await Shop.findOne({ slug: shop }).select(["_id"]);
      query.shop = currentShop._id;
    }

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    const totalPayments = await Payment.countDocuments(query);

    const payments = await Payment.find(query)
      .skip(skip * (parseInt(page) - 1 || 0))
      .limit(skip)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments,
      count: Math.ceil(totalPayments / skip),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
