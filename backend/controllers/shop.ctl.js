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

async function getTotalEarningsByShopId(shopId) {
  // const result = await Payment.find({ shop: shopId });
  const pipeline = [
    {
      $match: {
        shop: shopId,
        status: "paid", // Filter by shop ID and paid status
      },
    },
    {
      $group: {
        _id: null, // Group all documents (optional, set shop ID for grouping by shop)
        totalEarnings: { $sum: "$totalIncome" }, // Calculate sum of totalIncome for paid payments
        totalCommission: { $sum: "$totalCommission" }, // Calculate sum of totalIncome for paid payments
      },
    },
  ];

  const result = await Payment.aggregate(pipeline);

  if (result.length > 0) {
    return result[0]; // Return total earnings from paid payments
  } else {
    return {
      totalEarnings: 0,
      totalCommission: 0,
    }; // Return 0 if no paid payments found for the shop
  }
}

const getOneShopByAdmin = async (req, res) => {
  try {
    // const admin = await getAdmin(req, res);
    const { slug } = req.params;
    const shop = await Shop.findOne({ slug: slug });
    if (!shop) {
      return res.status(404).json({ message: "Shop Not Found" });
    }
    const { totalCommission, totalEarnings } = await getTotalEarningsByShopId(
      shop._id
    );
    // stats
    const totalProducts = await Product.countDocuments({
      shop: shop._id,
    });
    const totalOrders = await Orders.countDocuments({
      "items.shop": shop._id,
    });

    return res.status(200).json({
      success: true,
      data: shop,
      totalOrders,
      totalEarnings,
      totalCommission,
      totalProducts,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateOneShopByAdmin = async (req, res) => {
  try {
    const { slug } = req.params;
    const admin = await getAdmin(req, res);
    const shop = await Shop.findOne({ slug });

    // Check if the shop exists
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    const { logo, cover, status, ...others } = req.body;
    const logoBlurDataURL = await getBlurDataURL(logo.url);
    const coverBlurDataURL = await getBlurDataURL(cover.url);

    const updatedShop = await Shop.findOneAndUpdate(
      { slug: slug },
      {
        ...others,
        logo: { ...logo, blurDataURL: logoBlurDataURL },
        cover: { ...cover, blurDataURL: coverBlurDataURL },
        status: status, // Update shop status
      },
      { new: true, runValidators: true }
    );

    // Find the vendor associated with the updated shop
    const vendor = await User.findById(updatedShop.vendor);

    // Email message
    let message;
    if (status === "approved") {
      message = "Your shop is now approved.";
    } else {
      message = "Your shop is not approved.";
    }

    // Create nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.RECEIVING_EMAIL, // Your Gmail email
        pass: process.env.EMAIL_PASSWORD, // Your Gmail password
      },
    });

    // Email options
    let mailOptions = {
      from: process.env.RECEIVING_EMAIL, // Your Gmail email
      to: vendor.email, // User's email
      subject: "Shop Status Update", // Email subject
      text: message, // Email body
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Updated Shop" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateShopStatusByAdmin = async (req, res) => {
  try {
    const { sid } = req.params;
    const admin = await getAdmin(req, res);
    const { status } = req.body;
    const updateStatus = await Shop.findOneAndUpdate(
      {
        _id: sid,
        vendor: admin._id,
      },
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Updated Status",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteOneShopByAdmin = async (req, res) => {
  try {
    const admin = await getAdmin(req, res);
    const { slug } = req.params;
    const shop = await Shop.findOne({ slug, vendor: admin._id });
    if (!shop) {
      return res.status(404).json({ message: "Shop Not Found" });
    }
    await singleFileDelete(shop.cover._id);
    await singleFileDelete(shop.logo._id);
    // const dataaa = await singleFileDelete(shop?.logo?._id,shop?.cover?._id);
    await Shop.deleteOne({ slug }); // Corrected to pass an object to deleteOne method
    return res.status(200).json({
      success: true,
      message: "Shop Deleted Successfully", // Corrected message typo
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Vendor apis
const createShopByVendor = async (req, res) => {
  try {
    const vendor = await getVendor(req, res);
    const { logo, cover, ...others } = req.body;
    const logoBlurDataURL = await getBlurDataURL(logo?.url);
    const coverBlurDataURL = await getBlurDataURL(cover?.url);

    const shop = await Shop.create({
      vendor: vendor._id.toString(),
      ...others,
      logo: {
        ...logo,
        blurDataURL: logoBlurDataURL,
      },
      cover: {
        ...cover,
        blurDataURL: coverBlurDataURL,
      },
      status: "pending",
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

const createShopByUser = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const { logo, cover, ...others } = req.body;
    const logoBlurDataURL = await getBlurDataURL(logo?.url);
    const coverBlurDataURL = await getBlurDataURL(cover?.url);
    // const shop = user?.shop ? await Shop.findById(user?.shop.toString()) : null;
    // if (shop) {
    //   await Shop.findByIdAndUpdate(shop._id, {
    //     ...others,
    //     logo: {
    //       ...logo,
    //       blurDataURL: logoBlurDataURL,
    //     },
    //     cover: {
    //       ...cover,
    //       blurDataURL: coverBlurDataURL,
    //     },
    //     status: 'pending',
    //   });
    //   return res.status(200).json({
    //     success: true,
    //     message: 'Shop updated',
    //   });
    // }
    const createdShop = await Shop.create({
      vendor: user._id.toString(),
      ...others,
      logo: {
        ...logo,
        blurDataURL: logoBlurDataURL,
      },
      cover: {
        ...cover,
        blurDataURL: coverBlurDataURL,
      },
      status: "pending",
    });
    await User.findByIdAndUpdate(user._id.toString(), {
      shop: createdShop._id.toString(),
      role: "vendor",
    });

    return res.status(200).json({
      success: true,
      message: "Shop created",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getOneShopByVendor = async (req, res) => {
  try {
    const vendor = await getVendor(req, res);

    const shop = await Shop.findOne({ vendor: vendor._id });
    if (!shop) {
      return res.status(404).json({ message: "Shop Not Found" });
    }
    return res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
const getShopByUser = async (req, res) => {
  try {
    const user = await getUser(req, res);

    const shop = await Shop.findOne({ vendor: user._id });
    if (!shop) {
      return res.status(200).json({ success: false, data: null });
    }
    return res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
  