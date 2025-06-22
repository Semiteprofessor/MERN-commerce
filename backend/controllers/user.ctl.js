const User = require("../models/User");
const Orders = require("../models/Order");
const bcrypt = require("bcrypt");
const { getUser } = require("../config/getUser");

const getOneUser = async (req, res) => {
  try {
    const user = await getUser(req, res);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getUserByAdmin = async (req, res) => {
  try {
    const id = req.params.uid;

    const pageQuery = req.params.page;
    const limitQuery = req.params.limit;

    const limit = parseInt(limitQuery) || 10;
    const page = parseInt(pageQuery) || 1;

    // Calculate skip correctly
    const skip = limit * (page - 1);

    const currentUser = await User.findOne({ _id: id });

    const totalOrders = await Orders.countDocuments({ "user._id": id });

    const orders = await Orders.find({ "user._id": id }, null, {
      skip: skip * (page - 1),
      limit: skip,
    }).sort({ createdAt: -1 });

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        user: currentUser,
        orders,
        count: Math.ceil(totalOrders / limit),
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await getUser(req, res);

  const uid = user._id.toString();

  try {
    const data = await req.body;
    const profile = await User.findByIdAndUpdate(
      uid,
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
  