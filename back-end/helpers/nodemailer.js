const nodemailer = require("nodemailer");
const util = require("util");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pwd.pharma@gmail.com",
    pass: "uxlfypqklzfwucks",
  },
});

const transpostPromise = util.promisify(transporter.sendMail).bind(transporter);

module.exports = {
  transporter,
  transpostPromise,
};
