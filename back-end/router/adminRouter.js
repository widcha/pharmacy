const {
  adminController: {
    getRecipe,
    editRecipeStatus,
    getPaymentImages,
    changeTransactionStatus,
    getStockFlow,
    getStockFlowById,
    addPaymentMethods,
    addOrderStatus,
    adminFetchTransaction,
    getNotifAdmin,
  },
} = require("../controller");
const express = require("express");
const router = express.Router();

router.get("/get/stock-flow", getStockFlow);
router.get("/get/flow/:id", getStockFlowById);

router.get("/get/recipe", getRecipe);
router.patch("/change/recipe/:id", editRecipeStatus);

router.get("/get/payment-proof", getPaymentImages);
router.patch("/change/transaction", changeTransactionStatus);

router.get("/get-all-transaction", adminFetchTransaction);

router.get("/get-notif", getNotifAdmin);

// PUNYA ADHI
router.post("/addPayment", addPaymentMethods);
router.post("/addOrderStatus", addOrderStatus);

module.exports = router;
