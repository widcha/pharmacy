const {
  fetchUserTransactionDetail,
  userUploadPaymentSlip,
  userCancelOrder,
  userConfirmOrder,
  userComplainOrder,
  fetchAdminTransaction,
} = require("../controller/transactionController");

const router = require("express").Router();

router.get("/get", fetchUserTransactionDetail);
router.post("/payment_upload", userUploadPaymentSlip);
router.patch("/cancel_order", userCancelOrder);
router.patch("/confirm_order", userConfirmOrder);
router.patch("/complain_order", userComplainOrder);
router.get("/admin-get", fetchAdminTransaction);
module.exports = router;
