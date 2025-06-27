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
  