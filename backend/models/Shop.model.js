const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  logo: {
    _id: {
      type: String,
      required: [true, "image-id-required-error"],
    },
    url: {
      type: String,
      required: [true, "image-url-required-error"],
    },
    blurDataURL: {
      type: String,
      required: [true, "image-blur-data-url-required-error"],
    },
  },
  cover: {
    _id: {
      type: String,
      required: [true, "image-id-required-error"],
    },
    url: {
      type: String,
      required: [true, "image-url-required-error"],
    },
    blurDataURL: {
      type: String,
      required: [true, "image-blur-data-url-required-error"],
    },
  },
});