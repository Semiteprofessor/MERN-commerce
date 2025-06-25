const Products = require("../models/Product.model");
const Users = require("../models/User.model");
const { getUser } = require("../config/getUser");

const getWishlist = async (req, res) => {
  try {
    const user = await getUser(req, res);
    //  Fetch wishlist and related products
    const wishlist = user.wishlist;
    const products = await Products.aggregate([
      {
        $match: {
          _id: { $in: wishlist }, // Match products with IDs present in the Pids array
        },
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
          createdAt: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
