const Compaign = require("../models/Compaign.model");
const Product = require("../models/Product.model");
const _ = require("lodash");
const getBlurDataURL = require("../config/getBlurDataURL");
const { getVendor, getAdmin, getUser } = require("../config/getUser");
const { singleFileDelete } = require("../config/uploader");
// Admin apis
const getAdminCompaigns = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalCompaigns = await Compaign.countDocuments();

    const compaigns = await Compaign.find({}, null, {
      skip: skip,
      limit: parseInt(limit),
    })
      .select([
        "slug",
        "status",
        "products",
        "name",
        "startDate",
        "endDate",
        "discount",
        "discountType",
      ])
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: compaigns,
      count: Math.ceil(totalCompaigns / limit),
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const createCompaign = async (req, res) => {
  try {
    const admin = await getAdmin(req, res);
    const { cover, products, discountType, discount, ...others } = req.body;
    const productsWithPrice = await Product.find({
      _id: { $in: products },
    }).select(["price", "priceSale"]);
    for (const product of productsWithPrice) {
      const newPriceSale =
        discountType === "percent"
          ? product.price * (1 - discount / 100)
          : product.price - discount;
      await Product.updateOne(
        { _id: product._id },
        { $set: { priceSale: newPriceSale, oldPriceSale: product.priceSale } }
      );
    }
    const coverBlurDataURL = await getBlurDataURL(cover.url);

    await Compaign.create({
      ...others,
      products,
      discountType,
      discount,
      cover: {
        ...cover,
        blurDataURL: coverBlurDataURL,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Compaign created",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
