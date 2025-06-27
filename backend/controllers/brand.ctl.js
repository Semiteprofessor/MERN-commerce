const Brands = require("../models/Brand");
const getBlurDataURL = require("../config/getBlurDataURL");
const { singleFileDelete } = require("../config/uploader");

const createBrand = async (req, res) => {
  try {
    const { logo, ...others } = req.body;

    // Validate if the 'logo' property and its 'url' property exist in the request body
    if (!logo || !logo.url) {
      return res.status(400).json({ message: "Invalid Logo Data" });
    }

    // Validate if the 'blurDataURL' property exists in the logo object

    // If blurDataURL is not provided, generate it using the 'getBlurDataURL' function
    const blurDataURL = await getBlurDataURL(logo.url);

    // Creating a new brand
    const newBrand = await Brands.create({
      ...others,
      logo: {
        ...logo,
        blurDataURL,
      },
      totalItems: 0,
    });

    res
      .status(201)
      .json({ success: true, data: newBrand, message: "Brand Created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrandBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const brand = await Brands.findOne({ slug });

    if (!brand) {
      return res.status(404).json({ message: "Brand Not Found" });
    }

    res.status(201).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
  