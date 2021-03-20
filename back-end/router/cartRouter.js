const router = require("express").Router();
const {
	cartController: {
		userAddProductToCart,
		userGetCart,
		userSubtractProductFromCart,
		userDeleteProductInCart,
		userFetchTotalAndAvailableProducts,
	},
} = require("../controller");

router.get("/total", userFetchTotalAndAvailableProducts);
router.get("/:id", userGetCart);
router.post("/add", userAddProductToCart);
router.post("/sub", userSubtractProductFromCart);
router.delete("/remove", userDeleteProductInCart);
module.exports = router;
