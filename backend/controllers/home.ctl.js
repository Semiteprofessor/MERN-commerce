// controllers/newsController.js
const BrandModel = require("../models/Brand");
const Category = require("../models/Category");
const Product = require("../models/Product");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .select(["name", "cover", "slug", "status"])
      .limit(6)
      .sort({
        createdAt: -1,
      });
    res.status(201).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
