const router = require("express").Router();
const {
  userRegister,
  userVerification,
  userLogin,
  userSendReset,
  userChangePassword,
  userCheck,
  userSecurityQuestion,
  getUserAddress,
  addNewUserAddress,
  editUserAddress,
  deleteUserAddress,
} = require("../controller/UserController");
const {
  checkRegister,
  checkVerificationToken,
  checkInputData,
  checkUser,
  checkEmail,
} = require("../helpers/middleware");

router.post("/signup", checkRegister, checkInputData, userRegister);
router.post("/verification", checkVerificationToken, userVerification);
router.post("/login", checkUser, userLogin);
router.post("/reset-password", checkEmail, userSendReset);
router.post("/change-password", checkVerificationToken, userChangePassword);
router.post("/verified-check", userCheck);
router.post("/security-question", userSecurityQuestion);

router.get("/address/:id", getUserAddress);
router.post("/address/:id", addNewUserAddress);
router.patch("/address/:id", editUserAddress);
router.delete("/address/:id", deleteUserAddress);

module.exports = router;
