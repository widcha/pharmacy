const {
	fetchUserTransactionDetail,
	userUploadPaymentSlip,
} = require("../controller/transactionController");

const router = require("express").Router();

router.get("/get", fetchUserTransactionDetail);
router.post("/payment-upload", userUploadPaymentSlip);
module.exports = router;
