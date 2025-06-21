const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  status: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: "Brand",
  },
  likes: {
    type: Number,
  },
  description: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: [true, "please provide a category id"],
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SubCategory",
    required: [true, "please provide a sub category id"],
  },
  gender: {
    type: String,
  },
  tags: [String],
  sku: {
    type: String,
    required: [true, "SKU is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  priceSale: {
    type: Number,
    required: [true, "Sale price is required."],
  },
  oldPriceSale: {
    type: Number,
  },
  available: {
    type: Number,
    required: [true, "Available quantity is required."],
  },
  sold: {
    type: Number,
    default: 0,
  },
});