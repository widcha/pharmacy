const models = require("../models");
const {
  hashPassword,
  createJWTToken,
  transpostPromise,
} = require("../helpers");

// PWP-9-10
const userRegister = async (req, res) => {
  try {
    const { username, email, password, security_question } = req.body;
    console.log(security_question);
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
      html: `<h2>Hi ${username},</h2><h2>Welcome to Pharma</h2><br><p>Please verify your email</p><br><a href='http://localhost:3000/verification?token=${token}'>Click here to verify your email</a>`,
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

    const responseData = { ...user[0].dataValues };
    const token = createJWTToken(responseData);
    responseData.token = token;

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
      html: `<h4>Hi ${userData.user_username},</h4><h4>Welcome to Pharma</h4><br><h4>We got a request to reset your Pharma password</h4><br><a href='http://localhost:3000/change-password?token=${token}'>Click here to reset your password</a><br><h4>If you ignore this message, your password will not be changed.<h4/>`,
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

module.exports = {
  userRegister,
  userVerification,
  userLogin,
  userSendReset,
  userChangePassword,
  userCheck,
  userSecurityQuestion,
};
