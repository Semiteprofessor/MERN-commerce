const User = require("../models/User.model");
const Categories = require("../models/Category.model");
const SubCategories = require("../models/SubCategory.model");
const { singleFileDelete } = require("../config/uploader");
const getBlurDataURL = require("../config/getBlurDataURL");

const createCategory = async (req, res) => {
  try {
    const { cover, ...others } = req.body;
    // Validate if the 'blurDataURL' property exists in the logo object

    // If blurDataURL is not provided, generate it using the 'getBlurDataURL' function
    const blurDataURL = await getBlurDataURL(cover.url);

    await Categories.create({
      ...others,
      cover: {
        ...cover,
        blurDataURL,
      },
    });

    res.status(201).json({ success: true, message: "Category Created" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
