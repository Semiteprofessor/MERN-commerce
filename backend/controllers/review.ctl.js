const Review = require("../models/Review.model");
const { getUser, getAdmin } = require("../config/getUser");

const getReviews = async (req, res) => {
  try {
    const skip = 10;
    const ReviewTotal = await Review.find({}, null, {});

    const reviews = await Review.find({}, null, {
      skip: skip * (page - 1),
      limit: skip,
    })
      .populate({
        path: "user",
        select: ["firstName", "lastName", "cover", "orders"],
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: reviews,
      count: Math.ceil(ReviewTotal.length / skip),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
