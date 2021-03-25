const {
	fetchUserTransactionDetail,
} = require("../controller/transactionController");

const router = require("express").Router();

router.get("/get", fetchUserTransactionDetail);
module.exports = router;
