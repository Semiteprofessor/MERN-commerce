const Brand = require("../models/Brand.model");
const Product = require("../models/Product.model");
const Shop = require("../models/Shop.model");
const Category = require("../models/Category.model");
const SubCategory = require("../models/SubCategory.model");
const Compaign = require("../models/Compaign.model");
const _ = require("lodash");
const { multiFilesDelete } = require("../config/uploader");
const blurDataUrl = require("../config/getBlurDataURL");
const getProducts = async (req, res) => {
  try {
    const query = req.query; // Extract query params from request

    var newQuery = { ...query };
    delete newQuery.page;
    delete newQuery.limit;
    delete newQuery.prices;
    delete newQuery.sizes;
    delete newQuery.colors;
    delete newQuery.name;
    delete newQuery.date;
    delete newQuery.price;
    delete newQuery.top;
    delete newQuery.brand;
    delete newQuery.rate;
    delete newQuery.gender;
    for (const [key, value] of Object.entries(newQuery)) {
      newQuery = { ...newQuery, [key]: value.split("_") };
    }
    const brand = await Brand.findOne({
      slug: query.brand,
    }).select("slug");
    const skip = Number(query.limit) || 12;
    const totalProducts = await Product.countDocuments({
      ...newQuery,
      ...(Boolean(query.brand) && { brand: brand._id }),
      ...(query.sizes && { sizes: { $in: query.sizes.split("_") } }),
      ...(query.colors && { colors: { $in: query.colors.split("_") } }),
      priceSale: {
        $gt: query.prices
          ? Number(query.prices.split("_")[0]) / Number(query.rate || 1)
          : 1,
        $lt: query.prices
          ? Number(query.prices.split("_")[1]) / Number(query.rate || 1)
          : 1000000,
      },
      status: { $ne: "disabled" },
    }).select([""]);

    const minPrice = query.prices
      ? Number(query.prices.split("_")[0]) / Number(query.rate || 1)
      : 1;
    const maxPrice = query.prices
      ? Number(query.prices.split("_")[1]) / Number(query.rate || 1)
      : 10000000;

    const products = await Product.aggregate([
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
        $match: {
          ...(Boolean(query.brand) && {
            brand: brand._id,
          }),

          ...(query.isFeatured && {
            isFeatured: Boolean(query.isFeatured),
          }),

          ...(query.gender && {
            gender: { $in: query.gender.split("_") },
          }),
          ...(query.sizes && {
            sizes: { $in: query.sizes.split("_") },
          }),

          ...(query.colors && {
            colors: { $in: query.colors.split("_") },
          }),
          ...(query.prices && {
            priceSale: {
              $gt: minPrice,
              $lt: maxPrice,
            },
          }),
          status: { $ne: "disabled" },
        },
      },
      {
        $project: {
          image: { url: "$image.url", blurDataURL: "$image.blurDataURL" },
          name: 1,
          available: 1,
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
      {
        $sort: {
          ...((query.date && { createdAt: Number(query.date) }) ||
            (query.price && {
              priceSale: Number(query.price),
            }) ||
            (query.name && { name: Number(query.name) }) ||
            (query.top && { averageRating: Number(query.top) }) || {
              averageRating: -1,
            }),
        },
      },
      {
        $skip: Number(skip * parseInt(query.page ? query.page[0] - 1 : 0)),
      },
      {
        $limit: Number(skip),
      },
    ]);

    res.status(200).json({
      success: true,
      data: products,
      total: totalProducts,
      count: Math.ceil(totalProducts / skip),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};