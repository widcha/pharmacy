const {
  fetchUserTransactionDetail,
  userUploadPaymentSlip,
  fetchAdminTransaction,
} = require("../controller/transactionController");

const router = require("express").Router();

router.get("/get", fetchUserTransactionDetail);
router.get("/admin-get", fetchAdminTransaction);
router.post("/payment-upload", userUploadPaymentSlip);
module.exports = router;
