const router = require("express").Router();
const {
	cartController: {
		userAddProductToCart,
		userGetCart,
		userSubtractProductFromCart,
		userDeleteProductInCart,
		userFetchTotalAndAvailableProducts,
		userCheckout,
	},
} = require("../controller");

router.get("/total", userFetchTotalAndAvailableProducts);
router.get("/:id", userGetCart);
router.post("/add", userAddProductToCart);
router.post("/sub", userSubtractProductFromCart);
router.post("/check-out", userCheckout);
router.delete("/remove", userDeleteProductInCart);
module.exports = router;
