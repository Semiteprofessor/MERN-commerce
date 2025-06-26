const CouponCode = require("../models/CouponCode");

const getCouponCodeByCode = async (req, res) => {
  try {
    const code = req.params.code;
    const getCouponCode = await CouponCode.findOne({ code: code });

    if (!getCouponCode) {
      return res.status(404).json({
        success: false,
        message: "CouponCode Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: getCouponCode,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
