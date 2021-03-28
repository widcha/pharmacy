const models = require("../models");
const {
  hashPassword,
  createJWTToken,
  transpostPromise,
} = require("../helpers");
const pify = require("pify");
const { uploader } = require("../handlers");
const fs = require("fs");
const {
  User_Address,
  Cart,
  Custom_Product,
  Product,
  Admin_Notif,
  User_Notif,
} = require("../models");
const { Op } = require("sequelize");
const { emailOne, emailTwo } = require("../helpers/emailTemplate");

// PWP-9-10
const userRegister = async (req, res) => {
  try {
    const { username, email, password, security_question } = req.body;
    const encryptedPassword = hashPassword(password);
    const user = await models.User.create({
      user_username: username,
      user_email: email,
      user_password: encryptedPassword,
      user_security_question: security_question,
    });

    const token = createJWTToken({ ...user });

    const mailOptions = {
      from: "Pharma <pwd.pharma@gmail.com>",
      to: email,
      subject: "Your Pharma account: Email address verification",
      html: emailOne(email, token),
    };
    await transpostPromise(mailOptions);

    return res.send({ message: "New user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Register Error" });
  }
};

// PWP-9-10 VERIFY EMAIL
const userVerification = async (req, res) => {
  try {
    const { user_id } = req.user;
    const response = await models.User.update(
      { user_isverified: 1 },
      {
        where: {
          user_id,
        },
      }
    );

    return res.send({ message: "Verification success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Verification Error" });
  }
};

// PWP-8-11-12 LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = hashPassword(password);
    const user = await models.User.findAll({
      where: {
        user_email: email,
        user_password: encryptedPassword,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "user_password"] },
    });

    const fetch_cart1 = await Cart.findAll({
      where: {
        [Op.and]: {
          user_id: {
            [Op.eq]: user[0].user_id,
          },
          custom_product_id: {
            [Op.eq]: null,
          },
        },
      },

      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    const fetch_cart2 = await Custom_Product.findAll({
      where: {
        [Op.and]: {
          user_id: user[0].user_id,
          is_checkout: 0,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Cart,
          include: [
            {
              model: Product,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    const responseData = { ...user[0].dataValues };
    const token = createJWTToken(responseData);
    responseData.token = token;
    responseData.cart = [...fetch_cart1, ...fetch_cart2];

    return res.send(responseData);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Login Error" });
  }
};

// PWP-14 SEND RESET EMAIL
const userSendReset = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = req.user;

    const token = createJWTToken({ ...userData });

    const mailOptions = {
      from: "Pharma <pwd.pharma@gmail.com>",
      to: email,
      subject: "Your Pharma account: Reset password",
      html: emailTwo(token),
    };
    await transpostPromise(mailOptions);

    return res.send({ message: "Reset password sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Send Reset Email Error" });
  }
};

// PWP-14 CHANGE PASSWORD
const userChangePassword = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { password } = req.body;
    const encryptedPassword = hashPassword(password);

    const response = await models.User.update(
      {
        user_password: encryptedPassword,
      },
      {
        where: {
          user_id,
        },
      }
    );

    return res.send({ message: "Change password success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Change Password Error" });
  }
};

// PWP-14 CHECK USER VERIFIED
const userCheck = async (req, res) => {
  try {
    const { email } = req.body;

    const response = await models.User.findAll({
      where: {
        user_email: email,
      },
    });

    if (response.length !== 0) {
      if (response[0].user_isverified == 1) {
        return res.send({ message: "User is verified" });
      } else if (response[0].user_isverified == 0) {
        return res.send({ message: "User is not verified" });
      }
    } else {
      return res.send({ message: "Email is not registered" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Check user error" });
  }
};

// PWP-14 CHECK USER SERCURITY QUESTION
const userSecurityQuestion = async (req, res) => {
  try {
    const { email, answer } = req.body;

    const response = await models.User.findAll({
      where: {
        user_email: email,
      },
    });

    const token = createJWTToken({ ...response[0] });

    if (response[0].user_security_question === answer) {
      return res.send({ message: token });
    } else {
      return res.send({ message: "Your answer is wrong" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Security question error" });
  }
};

// PWP-47 USER ADDRESS
const addNewUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_address } = req.body;
    await User_Address.create({
      user_address,
      user_id: id,
    });
    return res.status(200).send({ message: "New Address Successfully Added" });
  } catch (err) {
    return res.status(500).send({ message: "Failed to Add New Address" });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User_Address.findAll({
      where: {
        user_id: id,
      },
    });

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send({
      message: "Failed to Get the Address",
    });
  }
};
const editUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_address } = req.body;
    await User_Address.update(
      { user_address },
      {
        where: { user_address_id: id },
      }
    );
    return res.status(200).send({ message: "Address Updated" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Failed to Update the Selected Address" });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await User_Address.destroy({
      where: { user_address_id: id },
    });
    return res.status(200).send({ message: "Address deleted" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Failed to Delete the Selected Address" });
  }
};

const userAddRecipes = async (req, res) => {
  try {
    const path = "/recipes";
    const upload = pify(uploader(path, "RCP").fields([{ name: "image" }]));

    upload(req, res, async (err) => {
      const { image } = req.files;
      const { user_id } = JSON.parse(req.body.data);
      const imagepath = image ? `${path}/${image[0].filename}` : null;

      const response = await models.Recipes.create({
        user_id,
        recipes_status: "Pending",
        recipes_image_path: imagepath,
      });
      if (response) {
        await Admin_Notif.create({
          admin_notif_messages: "User upload prescription",
          admin_notif_status: 0,
          user_id: user_id,
          order_status_id: 7,
        });
        return res.status(201).send(response);
      } else {
        fs.unlinkSync(`public${imagepath}`);
        return res.status(500).send(err.message);
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getNotifUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    const findRes = await User_Notif.findAll({
      where: {
        user_id,
        user_notif_status: 0,
      },
    });
    if (findRes.length == 1) {
      const response = await User_Notif.findAll({
        where: {
          [Op.and]: {
            user_id,
            user_notif_status: 0,
          },
        },
        attributes: {
          exclude: ["updatedAt"],
        },
      });
      return res.status(200).send(response);
    } else {
      const response = await User_Notif.findAll({
        where: {
          [Op.and]: {
            user_id,
            user_notif_status: 0,
          },
        },
        // order: ["createdAt", "DESC"],
        attributes: {
          exclude: ["updatedAt"],
        },
      });
      return res.status(200).send(response);
    }
  } catch (err) {
    return res.status(500).send({ message: "Failed to get user notification" });
  }
};

const userNotifRead = async (req, res) => {
  try {
    const { user_notif_id } = req.body;

    const response = await User_Notif.update(
      { user_notif_status: 1 },
      {
        where: {
          [Op.and]: {
            user_notif_id,
          },
        },
      }
    );
    return res.send({ message: "Notif mark as read" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Failed to mark user notification" });
  }
};

module.exports = {
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
};
