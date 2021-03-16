const router = require("express").Router();
const {
  userRegister,
  userVerification,
} = require("../controller/UserController");
const {
  checkRegister,
  checkVerificationToken,
} = require("../helpers/middleware");

router.post("/signup", checkRegister, userRegister);
router.post("/verification", checkVerificationToken, userVerification);

module.exports = router;
