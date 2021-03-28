const {
  fetchUserHistoryDetail,
  repurchaseCustomProduct,
} = require("../controller/historyController");
const { checkToken } = require("../helpers");
const router = require("express").Router();

router.get("/get", checkToken, fetchUserHistoryDetail);
router.post("/repurchase", checkToken, repurchaseCustomProduct);

module.exports = router;
