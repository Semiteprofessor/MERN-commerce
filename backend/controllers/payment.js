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

// Create payment
const createPayment = async (req, res) => {
    try {
      const newPayment = await Payment.create(req.body);
      res
        .status(201)
        .json({ success: true, message: 'Payment created', data: newPayment });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // update payment
  const updatePayment = async (req, res) => {
    try {
      const { id } = req.params;
      // Find the existing payment
      const existingPayment = await Payment.findById(id);
  
      if (!existingPayment) {
        return res
          .status(404)
          .json({ success: false, message: 'Payment not found' });
      }
  
      const updatedPayment = await Payment.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      );
  
      if (!updatedPayment) {
        return res
          .status(404)
          .json({ success: false, message: 'Payment not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Payment updated',
        data: updatedPayment,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
// Delete payment
const deletePayment = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPayment = await Payment.findByIdAndDelete(id);
      if (!deletedPayment) {
        return res
          .status(404)
          .json({ success: false, message: 'Payment not found' });
      }
      res.status(200).json({ success: true, message: 'Payment deleted' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  const getPaymentsByVender = async (req, res) => {
    try {
      const vendor = await getVendor(req, res);
      if (!vendor) {
        return res.status(400).json({ success: false, message: 'Not Allowed' });
      }
      const { limit, page = 1 } = req.query;
  
      const skip = parseInt(limit) || 8;
      const totalPayments = await Payment.find().countDocuments();
      const payments = await Payment.find()
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
  