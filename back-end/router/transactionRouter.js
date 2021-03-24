const { addSumn } = require("../controller/transactionController");

const router = require("express").Router();
router.post("/", addSumn);
module.exports = router;
