const router = require("express").Router();
const {
  userRegister,
  userVerification,
  userLogin,
} = require("../controller/UserController");
const {
  checkRegister,
  checkVerificationToken,
  checkInputData,
  checkUser,
} = require("../helpers/middleware");

router.post("/signup", checkRegister, checkInputData, userRegister);
router.post("/verification", checkVerificationToken, userVerification);
router.post("/login", checkUser, userLogin);

module.exports = router;
