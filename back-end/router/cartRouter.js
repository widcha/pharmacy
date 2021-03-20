const router = require("express").Router();
const {
	cartController: {
		userAddProductToCart,
		userGetCart,
		userSubtractProductFromCart,
		userDeleteProductInCart,
	},
} = require("../controller");

router.post("/add", userAddProductToCart);
router.post("/sub", userSubtractProductFromCart);
router.delete("/remove", userDeleteProductInCart);
router.get("/:id", userGetCart);
module.exports = router;
