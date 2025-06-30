const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment.ctl");

// Import verifyToken function
const verifyToken = require("../config/jwt");

// admin routes

router.post("/admin/payments", verifyToken, payment.createPayment);

router.get("/admin/payments", verifyToken, payment.getPaymentsByAdmin);
router.get("/admin/payments/:pid", verifyToken, payment.getPaymentDetailsById);
router.get("/admin/shops/:slug/income", verifyToken, payment.getIncomeByShop);
router.put("/admin/payments/:id", verifyToken, payment.updatePayment);
router.put(
  "/admin/payments/:pid/status",
  verifyToken,
  payment.updatePaymentStatus
);
router.delete("/admin/payments/:id", verifyToken, payment.deletePayment);
router.get("/admin/payouts", verifyToken, payment.getPayoutsByAdmin);

// Vender routes
router.get("/vendor/shops/income", verifyToken, payment.getIncomeByVendor);
router.get("/vendor/payments", verifyToken, payment.getPaymentsByVender);
router.get("/vendor/payments/:pid", verifyToken, payment.getPaymentDetailsById);

module.exports = router;
