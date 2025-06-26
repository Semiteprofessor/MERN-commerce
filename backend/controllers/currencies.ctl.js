const Currency = require("../models/Currencies");

const getAdminCurrencies = async (request, response) => {
  try {
    const { page: pageQuery, limit: limitQuery } = request.query;

    const limit = parseInt(limitQuery) || 10;
    const page = parseInt(pageQuery) || 1;

    // Calculate skip correctly
    const skip = limit * (page - 1);

    const currencies = await Currency.aggregate([
      {
        $sort: {
          available: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },

      {
        $project: {
          name: 1,
          code: 1,
          rate: 1,
          country: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ]);

    response.status(200).json({
      success: true,
      data: currencies,
    });
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};
