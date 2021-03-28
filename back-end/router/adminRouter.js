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
    getNotifAdmin,
    getAllLength,
    getFinanceReport,
    getAllUserInfo,
    changeUserBannedStatus,
    changeNotifAdmin,
  },
} = require("../controller");
const express = require("express");
const {checkAdminToken} = require("../helpers/middleware");
const {createReport} = require("../controller/adminController");
const router = express.Router();

router.get("/get/stock-flow", checkAdminToken, getStockFlow);
router.get("/get/flow/:id", checkAdminToken, getStockFlowById);

router.get("/get/recipe", checkAdminToken, getRecipe);
router.patch("/change/recipe/:id", checkAdminToken, editRecipeStatus);

router.get("/get/payment-proof", checkAdminToken, getPaymentImages);
router.patch("/change/transaction", checkAdminToken, changeTransactionStatus);

router.get("/users-data", checkAdminToken, getAllUserInfo);
router.post("/create-report", checkAdminToken, createReport);
router.get("/get-notif", getNotifAdmin);
router.patch("/read-notif", checkAdminToken, changeNotifAdmin);
router.get("/get-all-length", checkAdminToken, getAllLength);
router.get("/finance-report", checkAdminToken, getFinanceReport);

router.patch("/ban-user", checkAdminToken, changeUserBannedStatus);

// PUNYA ADHI
router.post("/addPayment", checkAdminToken, addPaymentMethods);
router.post("/addOrderStatus", checkAdminToken, addOrderStatus);

module.exports = router;
