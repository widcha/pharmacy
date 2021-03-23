const { addCustomProduct } = require("../controller/customProductController");

const router = require("express").Router();

router.post("/", addCustomProduct);

module.exports = router;
