const router = require("express").Router();
const {
  userRegister,
  userVerification,
} = require("../controller/UserController");
const {
  checkRegister,
  checkVerificationToken,
  checkInputData,
} = require("../helpers/middleware");

router.post("/signup", checkRegister, checkInputData, userRegister);
router.post("/verification", checkVerificationToken, userVerification);

module.exports = router;
