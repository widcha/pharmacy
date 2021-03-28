const {
  fetchUserTransactionDetail,
  userUploadPaymentSlip,
  userCancelOrder,
  userConfirmOrder,
  userComplainOrder,
  fetchAdminTransaction,
  testHandlebars,
} = require("../controller/transactionController");
const {checkAdminToken} = require("../helpers/middleware");
const router = require("express").Router();

const {checkToken} = require("../helpers");

router.get("/get", checkToken, fetchUserTransactionDetail);
router.post("/payment_upload", checkToken, userUploadPaymentSlip);
router.patch("/cancel_order", checkToken, userCancelOrder);
router.patch("/confirm_order", checkToken, userConfirmOrder);
router.patch("/complain_order", checkToken, userComplainOrder);
router.get("/testhandle", testHandlebars);

router.get("/admin-get", checkAdminToken, fetchAdminTransaction);
module.exports = router;
