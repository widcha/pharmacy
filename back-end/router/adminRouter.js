const {
	adminController: {
		getRecipe,
		editRecipeStatus,
		getPaymentProof,
		changeTransactionStatus,
		getStockFlow,
		getStockFlowById,
		addPaymentMethods,
		addOrderStatus,
	},
} = require("../controller");
const express = require("express");
const router = express.Router();

router.get("/get/stock-flow", getStockFlow);
router.get("/get/flow/:id", getStockFlowById);

router.get("/get/recipe", getRecipe);
router.patch("/change/recipe/:id", editRecipeStatus);

router.get("/get/payment-proof", getPaymentProof);
router.patch("change/transaction/:id", changeTransactionStatus);

// PUNYA ADHI
router.post("/addPayment", addPaymentMethods);
router.post("/addOrderStatus", addOrderStatus);

module.exports = router;