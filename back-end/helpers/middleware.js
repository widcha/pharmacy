const jwt = require("jsonwebtoken");
const { hashPassword } = require(".");
const models = require("../models");

const checkRegister = (req, res, next) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  const { email, security_question, password } = req.body;

  // VALIDATION EMAIL, PASSWORD
  if (email.match(emailRegex)) {
    if (password.match(passwordRegex)) {
      if (security_question.length > 1) {
        return next();
      } else {
        return res.status(500).send({
          message: "Security Answer is required",
          status: "Security answer is not valid",
        });
      }
    } else {
      return res.status(500).send({
        message:
          "Password must have 6 or more characters and contain 1 number and 1 special character",
        status: "Password not valid",
      });
    }
  } else {
    return res.status(500).send({
      message: "Email format is not valid",
      status: "Email is not valid",
    });
  }
};

// CHECK VERIFICATION TOKEN FROM QUERY
const checkVerificationToken = async (req, res, next) => {
  const { token } = req.body;

  jwt.verify(token, "pharmaKey", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: err.message,
        status: "Invalid Token",
      });
    }
    req.user = decoded.dataValues;
    next();
  });
};

// PWP-9-17 CHECK IF USERNAME/EMAIL ALREADY REGISTERED
const checkInputData = async (req, res, next) => {
  const { username, email } = req.body;

  const usernameResult = await models.User.findAll({
    where: {
      user_username: username,
    },
  });

  const emailResult = await models.User.findAll({
    where: {
      user_email: email,
    },
  });
  if (usernameResult.length !== 0) {
    return res.status(500).send({
      message: "Username already taken",
      status: "Username taken",
    });
  }
  if (emailResult.length !== 0) {
    return res.status(500).send({
      message: "Email already registered",
      status: "Email registered",
    });
  }

  return next();
};

// PWP-8-16 CHECK EMAIL & PASSWORD
const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  const encryptedPassword = hashPassword(password);

  const emailResult = await models.User.findAll({
    where: {
      user_email: email,
    },
  });

  if (emailResult.length == 0) {
    return res.status(500).send({
      message: "This email is not registered",
      status: "Not registered",
    });
  } else if (emailResult[0].user_password !== encryptedPassword) {
    return res.status(500).send({
      message: "Password is wrong",
      status: "Wrong password",
    });
  }
  return next();
};

module.exports = {
  checkRegister,
  checkVerificationToken,
  checkInputData,
  checkUser,
};
