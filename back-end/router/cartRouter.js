const router = require("express").Router();
const {
	cartController: { userAddProductToCart },
} = require("../controller");

router.post("/add", userAddProductToCart);
module.exports = router;
