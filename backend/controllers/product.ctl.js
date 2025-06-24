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

const getProductsByCategory = async (req, res) => {
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
    delete newQuery.gender;
    delete newQuery.rate;
    for (const [key, value] of Object.entries(newQuery)) {
      newQuery = { ...newQuery, [key]: value.split("_") };
    }
    const brand = await Brand.findOne({
      slug: query.brand,
    }).select("slug");
    const category = await Category.findOne({
      slug: req.params.category,
    }).select("slug");

    const skip = Number(query.limit) || 12;
    const totalProducts = await Product.countDocuments({
      ...newQuery,
      ...(Boolean(query.brand) && { brand: brand._id }),
      category: category._id,
      // ...(Boolean(req.params.category) && { category: category._id }),
      ...(query.sizes && { sizes: { $in: query.sizes.split("_") } }),
      ...(query.colors && { colors: { $in: query.colors.split("_") } }),

      priceSale: {
        $gt: query.prices
          ? Number(query.prices.split("_")[0]) / Number(query.rate)
          : 1,
        $lt: query.prices
          ? Number(query.prices.split("_")[1]) / Number(query.rate)
          : 1000000,
      },
      status: { $ne: "disabled" },
    }).select([""]);

    const minPrice = query.prices
      ? Number(query.prices.split("_")[0]) / Number(query.rate)
      : 1;
    const maxPrice = query.prices
      ? Number(query.prices.split("_")[1]) / Number(query.rate)
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
          category: category._id,
          // ...(Boolean(req.params.category) && {
          //   category: category._id,
          // }),
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
          available: 1,
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

const getProductsByCompaign = async (req, res) => {
  try {
    const query = req.query; // Extract query params from request

    var newQuery = { ...query };
    delete newQuery.page;
    delete newQuery.limit;
    delete newQuery.name;
    delete newQuery.date;
    delete newQuery.price;
    delete newQuery.top;
    delete newQuery.rate;
    for (const [key, value] of Object.entries(newQuery)) {
      newQuery = { ...newQuery, [key]: value.split("_") };
    }
    const compaign = await Compaign.findOne({
      slug: req.params.slug,
    });
    const skip = Number(query.limit) || 12;
    const totalProducts = await Product.countDocuments({
      _id: { $in: compaign.products },

      status: { $ne: "disabled" },
    }).select([""]);

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
          _id: { $in: compaign.products },
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
          available: 1,
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

const getProductsBySubCategory = async (req, res) => {
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
    const subCategory = await SubCategory.findOne({
      slug: req.params.subcategory,
    }).select("slug");

    const skip = Number(query.limit) || 12;
    const totalProducts = await Product.countDocuments({
      ...newQuery,
      ...(Boolean(query.brand) && { brand: brand._id }),
      subCategory: subCategory._id,
      // ...(Boolean(req.params.subcategory) && { subCategory: subCategory._id }),
      ...(query.sizes && { sizes: { $in: query.sizes.split("_") } }),
      ...(query.colors && { colors: { $in: query.colors.split("_") } }),

      priceSale: {
        $gt: query.prices
          ? Number(query.prices.split("_")[0]) / Number(query.rate)
          : 1,
        $lt: query.prices
          ? Number(query.prices.split("_")[1]) / Number(query.rate)
          : 1000000,
      },
      status: { $ne: "disabled" },
    }).select([""]);
    const minPrice = query.prices
      ? Number(query.prices.split("_")[0]) / Number(query.rate)
      : 1;
    const maxPrice = query.prices
      ? Number(query.prices.split("_")[1]) / Number(query.rate)
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
          subCategory: subCategory._id,
          // ...(Boolean(req.params.subcategory) && {
          //   subCategory: subCategory._id,
          // }),
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
          slug: 1,
          colors: 1,
          discount: 1,
          likes: 1,
          priceSale: 1,
          price: 1,
          available: 1,
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

const getProductsByShop = async (req, res) => {
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
    const shop = await Shop.findOne({
      slug: req.params.shop,
    }).select("slug");

    const skip = Number(query.limit) || 12;
    const totalProducts = await Product.countDocuments({
      ...newQuery,
      shop: shop._id,
      ...(Boolean(query.brand) && { brand: brand._id }),
      ...(query.sizes && { sizes: { $in: query.sizes.split("_") } }),
      ...(query.colors && { colors: { $in: query.colors.split("_") } }),

      priceSale: {
        $gt: query.prices
          ? Number(query.prices.split("_")[0]) / Number(query.rate)
          : 1,
        $lt: query.prices
          ? Number(query.prices.split("_")[1]) / Number(query.rate)
          : 1000000,
      },
      status: { $ne: "disabled" },
    }).select([""]);

    const minPrice = query.prices
      ? Number(query.prices.split("_")[0]) / Number(query.rate)
      : 1;
    const maxPrice = query.prices
      ? Number(query.prices.split("_")[1]) / Number(query.rate)
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
          shop: shop._id,
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
          slug: 1,
          colors: 1,
          discount: 1,
          likes: 1,
          priceSale: 1,
          price: 1,
          averageRating: 1,
          vendor: 1,
          available: 1,
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

const getFilters = async (req, res) => {
  try {
    const totalProducts = await Product.find({
      status: { $ne: "disabled" },
    }).select(["colors", "sizes", "gender", "price"]);
    const Shops = await Shop.find({
      status: { $ne: "disabled" },
    }).select(["title"]);
    const brands = await Brand.find({
      status: { $ne: "disabled" },
    }).select(["name", "slug"]);
    const total = totalProducts.map((item) => item.gender);
    const totalGender = total.filter((item) => item !== "");
    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }
    const mappedColors = totalProducts?.map((v) => v.colors);
    const mappedSizes = totalProducts?.map((v) => v.sizes);
    const mappedPrices = totalProducts?.map((v) => v.price);
    const min = mappedPrices[0] ? Math.min(...mappedPrices) : 0;
    const max = mappedPrices[0] ? Math.max(...mappedPrices) : 100000;
    const response = {
      colors: _.union(...mappedColors),
      sizes: _.union(...mappedSizes),
      prices: [min, max],
      genders: totalGender.filter(onlyUnique),
      brands: brands,
      Shops: Shops,
    };
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getProductsByAdmin = async (request, response) => {
  try {
    const {
      page: pageQuery,
      limit: limitQuery,
      search: searchQuery,
      shop,
      category,
      brand,
    } = request.query;

    const limit = parseInt(limitQuery) || 10;
    const page = parseInt(pageQuery) || 1;

    // Calculate skip correctly
    const skip = limit * (page - 1);

    let matchQuery = {};

    if (shop) {
      const currentShop = await Shop.findOne({
        slug: shop,
      }).select(["slug", "_id"]);

      matchQuery.shop = currentShop._id;
    }
    if (category) {
      const currentCategory = await Category.findOne({
        slug: category,
      }).select(["slug", "_id"]);

      matchQuery.category = currentCategory._id;
    }
    if (brand) {
      const currentBrand = await Brand.findOne({
        slug: brand,
      }).select(["slug", "_id"]);

      matchQuery.brand = currentBrand._id;
    }

    const totalProducts = await Product.countDocuments({
      name: { $regex: searchQuery || "", $options: "i" },
      ...matchQuery,
    });

    const products = await Product.aggregate([
      {
        $match: {
          ...matchQuery,
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

    response.status(200).json({
      success: true,
      data: products,
      total: totalProducts,
      count: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};
