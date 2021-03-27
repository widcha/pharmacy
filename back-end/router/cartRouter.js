const router = require("express").Router();
const {
	cartController: {
		userAddProductToCart,
		userGetCart,
		userSubtractProductFromCart,
		userDeleteProductInCart,
		userFetchTotalAndAvailableProducts,
		userCheckout,
		userCustomIncrement,
		userCustomDecrement,
	},
} = require("../controller");

const { checkToken } = require("../helpers");

router.get("/total", checkToken, userFetchTotalAndAvailableProducts);
router.get("/:id", checkToken, userGetCart);
router.post("/add", checkToken, userAddProductToCart);
router.post("/sub", checkToken, userSubtractProductFromCart);
router.post("/check-out", checkToken, userCheckout);
router.patch("/customAdd", checkToken, userCustomIncrement);
router.patch("/customSub", checkToken, userCustomDecrement);
router.delete("/remove", checkToken, userDeleteProductInCart);
module.exports = router;
