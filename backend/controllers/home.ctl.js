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

const getTopRatedProducts = async (req, res) => {
  try {
    const bestSellingProduct = await Product.aggregate([
      {
        $lookup: {
          from: "productreviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
          image: { $arrayElemAt: ["$images", 0] },
        },
      },

      {
        $sort: {
          averageRating: -1,
        },
      },
      {
        $limit: 8,
      },
      {
        $project: {
          image: { url: "$image.url", blurDataURL: "$image.blurDataURL" },
          name: 1,
          slug: 1,
          colors: 1,
          discount: 1,
          likes: 1,
          priceSale: 1,
          price: 1,
          averageRating: 1,
          vendor: 1,
          shop: 1,
          createdAt: 1,
        },
      },
    ]);
    res.status(201).json({ success: true, data: bestSellingProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
  