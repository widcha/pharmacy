const crypto = require("crypto");
const hashPassword = (pass) => {
  return crypto.createHmac("sha256", "pharmaKey").update(pass).digest("hex");
};

module.exports = hashPassword;
