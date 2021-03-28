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
  userAddRecipes,
  getNotifUser,
  userNotifRead,
} = require("../controller/UserController");
const {
  checkRegister,
  checkVerificationToken,
  checkInputData,
  checkUser,
  checkEmail,
} = require("../helpers/middleware");
const { checkToken } = require("../helpers");

router.post("/signup", checkRegister, checkInputData, userRegister);
router.post("/verification", checkVerificationToken, userVerification);
router.post("/login", checkUser, userLogin);
router.post("/reset-password", checkEmail, userSendReset);
router.post("/change-password", checkVerificationToken, userChangePassword);
router.post("/verified-check", userCheck);
router.post("/security-question", userSecurityQuestion);

router.get("/address/get/:id", getUserAddress);
router.post("/address/add/:id", addNewUserAddress);
router.patch("/address/edit/:id", editUserAddress);
router.delete("/address/delete/:id", deleteUserAddress);

router.post("/upload", checkToken, userAddRecipes);
router.post("/get-notif", getNotifUser);
router.post("/read-notif", userNotifRead);

module.exports = router;
