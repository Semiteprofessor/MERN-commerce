const Product = require("../models/Product.model");
const Shop = require("../models/Shop.model");
const Category = require("../models/Category.model");
const Brand = require("../models/Brand.model");
const _ = require("lodash");
const { multiFilesDelete } = require("../config/uploader");
const blurDataUrl = require("../config/getBlurDataURL");
const { getVendor } = require("../config/getUser");

const getProductsByVendor = async (req, res) => {
  try {
    const vendor = await getVendor(req, res);
    const shop = await Shop.findOne({
      vendor: vendor._id.toString(),
    });
    if (!shop) {
      res.status(404).json({ success: false, message: "Shop not found" });
    }
    const {
      page: pageQuery,
      limit: limitQuery,
      search: searchQuery,
    } = req.query;

    const limit = parseInt(limitQuery) || 10;
    const page = parseInt(pageQuery) || 1;

    // Calculate skip correctly
    const skip = limit * (page - 1);

    const totalProducts = await Product.countDocuments({
      name: { $regex: searchQuery || "", $options: "i" },
      ...(Boolean(shop) && { shop: shop._id }),
    });

    const products = await Product.aggregate([
      {
        $match: {
          ...(Boolean(shop) && { shop: shop._id }),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
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
          available: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: products,
      total: totalProducts,
      count: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
