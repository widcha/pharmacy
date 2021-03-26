const {
  fetchUserHistoryDetail,
  repurchaseCustomProduct,
} = require("../controller/historyController");
const router = require("express").Router();

router.get("/get", fetchUserHistoryDetail);
router.post("/repurchase", repurchaseCustomProduct);

module.exports = router;
