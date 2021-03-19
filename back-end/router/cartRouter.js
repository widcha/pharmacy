const router = require("express").Router();
const {
	cartController: {
		userAddProductToCart,
		userGetCart,
		userSubtractProductFromCart,
	},
} = require("../controller");

router.post("/add", userAddProductToCart);
router.post("/sub", userSubtractProductFromCart);
router.get("/:id", userGetCart);
module.exports = router;
