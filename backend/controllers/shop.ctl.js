const Shop = require("../models/Shop.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Orders = require("../models/Order.model");
const Payment = require("../models/Payment.model");

const nodemailer = require("nodemailer");
const _ = require("lodash");
const getBlurDataURL = require("../config/getBlurDataURL");
const { getVendor, getAdmin, getUser } = require("../config/getUser");
const { singleFileDelete } = require("../config/uploader");
// Admin apis
const getShopsByAdmin = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalShop = await Shop.countDocuments();

    const shops = await Shop.find({}, null, {
      skip: skip,
      limit: parseInt(limit),
    })
      .select([
        "vendor",
        "logo",
        "slug",
        "status",
        "products",
        "title",
        "approvedAt",
        "approved",
      ])
      .populate({
        path: "vendor",
        select: ["firstName", "lastName", "cover"],
      })

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: shops,
      count: Math.ceil(totalShop / limit),
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const createShopByAdmin = async (req, res) => {
  try {
    const admin = await getAdmin(req, res);
    const { logo, cover, ...others } = req.body;
    const logoBlurDataURL = await getBlurDataURL(logo.url);
    const coverBlurDataURL = await getBlurDataURL(cover.url);

    const shop = await Shop.create({
      vendor: admin._id.toString(),
      ...others,
      logo: {
        ...logo,
        blurDataURL: logoBlurDataURL,
      },
      cover: {
        ...cover,
        blurDataURL: coverBlurDataURL,
      },
      status: "approved",
    });

    return res.status(200).json({
      success: true,
      data: shop,
      message: "Shop created",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
  