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
