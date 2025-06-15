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

const getAllHeaderCategories = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    await SubCategories.findOne();
    const categories = await Categories.find()
      .sort({
        createdAt: -1,
      })
      .select(["name", "slug", "subCategories"])
      .populate({ path: "subCategories", select: ["name", "slug"] });

    res.status(201).json({
      success: true,
      data: categories,
      ...(!userCount && {
        adminPopup: true,
      }),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    await SubCategories.findOne();
    const categories = await Categories.find()
      .sort({
        createdAt: -1,
      })
      .select(["name", "slug"])
      .populate({ path: "subCategories", select: ["name", "slug"] });

    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCategoriesByAdmin = async (req, res) => {
  try {
    const categories = await Categories.find()
      .sort({
        createdAt: -1,
      })
      .select(["name", "slug"]);

    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCategoryByAdmin = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categories.findOne({ slug });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categories.findOne({ slug }).select([
      "name",
      "description",
      "metaTitle",
      "metaDescription",
      "cover",
      "slug",
    ]);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};