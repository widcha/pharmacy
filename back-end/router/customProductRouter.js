const { addCustomProduct } = require("../controller/customProductController");
const { checkToken } = require("../helpers");

const router = require("express").Router();

router.post("/", checkToken, addCustomProduct);

module.exports = router;
