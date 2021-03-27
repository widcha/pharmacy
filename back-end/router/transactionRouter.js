const {
	fetchUserTransactionDetail,
	userUploadPaymentSlip,
	userCancelOrder,
	userConfirmOrder,
	userComplainOrder,
	fetchAdminTransaction,
} = require("../controller/transactionController");

const router = require("express").Router();

const { checkToken } = require("../helpers");

router.get("/get", checkToken, fetchUserTransactionDetail);
router.post("/payment_upload", checkToken, userUploadPaymentSlip);
router.patch("/cancel_order", checkToken, userCancelOrder);
router.patch("/confirm_order", checkToken, userConfirmOrder);
router.patch("/complain_order", checkToken, userComplainOrder);
router.get("/admin-get", fetchAdminTransaction);
module.exports = router;
