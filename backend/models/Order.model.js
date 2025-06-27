const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: [true, "Payment Method is required."],
    enum: ["Stripe", "PayPal", "COD"],
  },
  orderNo: {
    type: String,
    required: [true, "Order No is required."],
  },
  paymentId: {
    type: String,
  },
  subTotal: {
    type: Number,
    required: [true, "Subtotal is required."],
  },
  total: {
    type: Number,
    required: [true, "Total is required."],
  },
  totalItems: {
    type: Number,
    required: [true, "Total items is required."],
  },
  shipping: {
    type: Number,
    required: [true, "ShippingFee is required."],
  },
  discount: {
    type: Number,
  },
});