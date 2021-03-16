const jwt = require("jsonwebtoken");

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

module.exports = {
  checkRegister,
  checkVerificationToken,
};
