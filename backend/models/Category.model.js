const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
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