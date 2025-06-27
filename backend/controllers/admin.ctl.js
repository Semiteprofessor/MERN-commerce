const User = require("../models/User");
const Order = require("../models/Order");

const getUsersByAdmin = async (req, res) => {
  try {
    const { limit = 10, page = 1, search = "" } = req.query;

    const skip = parseInt(limit) * (parseInt(page) - 1) || 0;

    // Constructing nameQuery based on search input
    const nameQuery = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalUserCounts = await User.countDocuments(nameQuery);

    const users = await User.find(nameQuery, null, {
      skip: skip,
      limit: parseInt(limit),
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: users,
      count: Math.ceil(totalUserCounts / parseInt(limit)),
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};