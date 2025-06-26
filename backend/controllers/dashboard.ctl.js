// controllers/newsController.js
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const Notifications = require("../models/Notification");
const Payment = require("../models/Payment");
const moment = require("moment");
const { getVendor } = require("../config/getUser");
const Shop = require("../models/Shop");

const calculateExpirationDate = (days) => {
  const now = new Date();
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const commissionRate = process.env.COMMISSION / 100;
    const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
    const getLastWeeksDate = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    };

    const getOrdersReport = (ordersByYears) =>
      [...new Array(12)].map(
        (_, i) =>
          ordersByYears?.filter(
            (v) => new Date(v.createdAt).getMonth() + 1 === i + 1
          ).length
      );

    const getIncomeReport = (prop, ordersByYears) => {
      const newData = ordersByYears.filter((item) =>
        prop === "year"
          ? true
          : prop === "week"
          ? new Date(item.createdAt).getMonth() === new Date().getMonth() &&
            new Date(item.createdAt).getTime() > getLastWeeksDate().getTime()
          : new Date(item.createdAt).getMonth() === new Date().getMonth()
      );

      return [
        ...new Array(
          prop === "week"
            ? 7
            : prop === "year"
            ? 12
            : getDaysInMonth(
                new Date().getMonth() + 1,
                new Date().getFullYear()
              )
        ),
      ].map((_, i) =>
        prop === "week"
          ? newData
              ?.filter(
                (v) =>
                  new Date(v.createdAt).getDate() ===
                    getLastWeeksDate().getDate() + 1 + i &&
                  v.status !== "cancelled" &&
                  v.status !== "returned"
              )
              .reduce((partialSum, a) => partialSum + Number(a.total), 0)
          : prop === "year"
          ? newData
              ?.filter(
                (v) =>
                  new Date(v.createdAt).getMonth() === i &&
                  v.status !== "cancelled" &&
                  v.status !== "returned"
              )
              .reduce((partialSum, a) => partialSum + Number(a.total), 0)
          : newData
              ?.filter(
                (v) =>
                  new Date(v.createdAt).getDate() === i + 1 &&
                  v.status !== "cancelled" &&
                  v.status !== "returned"
              )
              .reduce((partialSum, a) => partialSum + Number(a.total), 0)
      );
    };

    const totalUsers = await User.countDocuments({
      role: "user",
    }).select("createdAt");
    const totalVendors = await User.countDocuments({
      role: "vendor",
    });
    const totalShops = await Shop.countDocuments();
    const totalPendingOrders = await Order.countDocuments({
      status: "pending",
    });
    const totalReturnOrders = await Order.countDocuments({
      status: "returned",
    });

    const totalProducts = await Product.countDocuments();
    const lastYearDate = calculateExpirationDate(-365).getTime();
    const todayDate = new Date().getTime();
    const ordersByYears = await Order.find({
      createdAt: { $gt: lastYearDate, $lt: todayDate },
    }).select(["createdAt", "status", "total"]);
    const todaysOrders = ordersByYears.filter(
      (v) =>
        new Date(v.createdAt).toLocaleDateString() ===
        new Date().toLocaleDateString()
    );
    // Fetching best-selling products
    const bestSellingProducts = await Product.find()
      .sort({ sold: -1 })
      .limit(5);

    const data = {
      salesReport: getOrdersReport(ordersByYears),
      bestSellingProducts: bestSellingProducts,
      ordersReport: [
        "pending",
        "ontheway",
        "delivered",
        "returned",
        "cancelled",
      ].map(
        (status) => ordersByYears.filter((v) => v.status === status).length
      ),
      incomeReport: {
        week: getIncomeReport("week", ordersByYears),
        month: getIncomeReport("month", ordersByYears),
        year: getIncomeReport("year", ordersByYears),
      },
      commissionReport: {
        week: getIncomeReport("week", ordersByYears).map((value) => {
          if (value !== 0) {
            return value - (value - value * commissionRate); // Calculate 20%
          } else {
            return value; // Keep zeros as zeros
          }
        }),
        month: getIncomeReport("month", ordersByYears).map((value) => {
          if (value !== 0) {
            return value - (value - value * commissionRate); // Calculate 20%
          } else {
            return value; // Keep zeros as zeros
          }
        }),
        year: getIncomeReport("year", ordersByYears).map((value) => {
          if (value !== 0) {
            return value - (value - value * commissionRate); // Calculate 20%
          } else {
            return value; // Keep zeros as zeros
          }
        }),
      },
      totalUsers,
      totalVendors,
      totalShops,
      totalPendingOrders,
      totalReturnOrders,
      totalProducts,
      dailyOrders: todaysOrders.length,
      dailyEarning: todaysOrders
        .filter(
          (order) => order.status !== "cancelled" && order.status !== "returned"
        )
        .reduce((partialSum, order) => partialSum + Number(order.total), 0),
    };
    res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getVendorAnalytics = async (req, res) => {
  try {
    const vendor = await getVendor(req, res);
    const shop = await Shop.findOne({
      vendor: vendor._id.toString(),
    });
    if (!shop) {
      res.status(404).json({ success: false, message: "Shop not found" });
    }
    // Aggregate orders for the provided date
    const totalProducts = await Product.countDocuments({
      shop: shop._id,
    });

    const bestSellingProducts = await Product.find({
      shop: shop._id,
    })
      .sort({ sold: -1 })
      .limit(5);

    const startOfDay = moment().startOf("day");
    const endOfDay = moment().endOf("day");
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    const getOrderStats = async (prop) => {
      const data = await Order.aggregate([
        // Match orders within the provided date range
        {
          $match: {
            createdAt: {
              $gte:
                prop === "month" ? startOfMonth.toDate() : startOfDay.toDate(),
              $lte: prop === "month" ? endOfMonth.toDate() : endOfDay.toDate(),
            },
          },
        },
        // Unwind the items array to get individual items
        { $unwind: "$items" },
        {
          $match: {
            "items.shop": shop._id,
          },
        },
        // Group by vendorId and calculate total earnings for each vendor
        {
          $group: {
            _id: 1,
            totalEarnings: { $sum: "$items.total" },
            totalOrders: { $sum: 1 }, // Count the number of orders
          },
        },
      ]);
      return data;
    };
    const dailyStats = await getOrderStats("day");
    const monthlyStats = await getOrderStats("month");
    // Format the result as an object with vendorId as keys and earnings as values
    let dailyEarningsByVendor = 0;
    let totalOrders = 0; // Initialize totalOrders variable
    let monthlyEarningsByVendor = 0;

    dailyStats.forEach((order) => {
      dailyEarningsByVendor = order.totalEarnings;
      totalOrders += order.totalOrders; // Accumulate the total number of orders
    });
    monthlyStats.forEach((order) => {
      monthlyEarningsByVendor = order.totalEarnings;
    });

    // sales report

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Initialize the sales report array with zeros for each month
    let salesReport = Array(12).fill(0);

    // Loop through each month and aggregate orders
    for (let month = 0; month < 12; month++) {
      // Get the start and end date for the current month
      const startDate = moment([currentYear, month, 1])
        .startOf("month")
        .toDate();
      const endDate = moment([currentYear, month, 1])
        .endOf("month")
        .toDate();

      // Aggregate orders for the current month
      const orders = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        // Unwind the items array to get individual items
        { $unwind: "$items" },
        {
          $match: {
            "items.shop": shop._id,
          },
        },
        // Group by vendorId and calculate total earnings for each vendor
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 }, // Count the number of orders
          },
        },
      ]);

      // If there are orders for the current month, update the sales report
      if (orders.length > 0) {
        salesReport[month] = orders[0].totalOrders;
      }
    }

    // income report
    // Initialize income report arrays for week, month, and year
    const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
    const getLastWeeksDate = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    };

    const getIncomeReport = (prop, ordersByYears) => {
      const newData = ordersByYears.filter((item) =>
        prop === "year"
          ? true
          : prop === "week"
          ? new Date(item.createdAt).getMonth() === new Date().getMonth() &&
            new Date(item.createdAt).getTime() > getLastWeeksDate().getTime()
          : new Date(item.createdAt).getMonth() === new Date().getMonth()
      );

      return [
        ...new Array(
          prop === "week"
            ? 7
            : prop === "year"
            ? 12
            : getDaysInMonth(
                new Date().getMonth() + 1,
                new Date().getFullYear()
              )
        ),
      ].map((_, i) =>
        prop === "week"
          ? newData
              ?.filter(
                (v) =>
                  new Date(v.createdAt).getDate() ===
                    getLastWeeksDate().getDate() + 1 + i &&
                  v.status !== "cancelled" &&
                  v.status !== "returned"
              )
              .reduce((partialSum, a) => partialSum + Number(a.total), 0)
          : prop === "year"
          ? newData
              ?.filter(
                (v) =>
                  new Date(v.createdAt).getMonth() === i &&
                  v.status !== "cancelled" &&
                  v.status !== "returned"
              )
              .reduce((partialSum, a) => partialSum + Number(a.total), 0)
          : newData
              ?.filter(
                (v) =>
                  new Date(v.createdAt).getDate() === i + 1 &&
                  v.status !== "cancelled" &&
                  v.status !== "returned"
              )
              .reduce((partialSum, a) => partialSum + Number(a.total), 0)
      );
    };

    const lastYearDate = calculateExpirationDate(-365).getTime();
    const todayDate = new Date().getTime();
    const ordersByYears = await Order.find({
      "items.shop": shop._id,
      createdAt: { $gt: lastYearDate, $lt: todayDate },
    }).select(["createdAt", "status", "total"]);
    const totalPendingOrders = await Order.countDocuments({
      "items.shop": shop._id,
      status: "pending",
    });
    const commissionRate = process.env.COMMISSION / 100;
    res.status(201).json({
      success: true,
      data: {
        bestSellingProducts,
        dailyEarning: dailyEarningsByVendor,
        dailyOrders: totalOrders,
        totalProducts,
        totalPendingOrders,
        salesReport,

        ordersReport: [
          "pending",
          "ontheway",
          "delivered",
          "returned",
          "cancelled",
        ].map(
          (status) => ordersByYears.filter((v) => v.status === status).length
        ),
        incomeReport: {
          week: getIncomeReport("week", ordersByYears).map((value) => {
            if (value !== 0) {
              return value - value * commissionRate; // Calculate 20%
            } else {
              return value; // Keep zeros as zeros
            }
          }),
          month: getIncomeReport("month", ordersByYears).map((value) => {
            if (value !== 0) {
              return value - value * commissionRate; // Calculate 20%
            } else {
              return value; // Keep zeros as zeros
            }
          }),
          year: getIncomeReport("year", ordersByYears).map((value) => {
            if (value !== 0) {
              return value - value * commissionRate; // Calculate 20%
            } else {
              return value; // Keep zeros as zeros
            }
          }),
        },
        monthlyEarningsByVendor,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getNofications = async (req, res) => {
  try {
    // Extract query parameters for pagination

    const { page: pageQuery, limit: limitQuery } = req.query;

    // Set default limit and page number
    const limit = parseInt(limitQuery) || 10;
    const page = parseInt(pageQuery) || 1;
    const skip = limit * (page - 1); // Calculate skip value

    // Count total notifications
    const totalNotifications = await Notifications.countDocuments();

    // Count total unread notifications
    const totalUnreadNotifications = await Notifications.countDocuments({
      opened: false,
    });

    // Fetch notifications
    const notifications = await Notifications.find({}, null, {
      limit: limit,
      skip: skip,
    }).sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      data: notifications,
      totalNotifications: totalNotifications,
      totalUnread: totalUnreadNotifications,
      count: Math.ceil(totalUnreadNotifications / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
  