const models = require("../models");
const {
  hashPassword,
  createJWTToken,
  transpostPromise,
} = require("../helpers");

// PWP-9-10
const userRegister = async (req, res) => {
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
};

// PWP-9-10 VERIFY EMAIL
const userVerification = async (req, res) => {
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
};

module.exports = {
  userRegister,
  userVerification,
};
