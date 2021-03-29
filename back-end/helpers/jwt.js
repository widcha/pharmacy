const jwt = require("jsonwebtoken");

const createJWTToken = (payload) => {
  return jwt.sign(payload, "pharmaKey", {
    expiresIn: "24h",
  });
};

const checkToken = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    jwt.verify(req.token, "pharmaKey", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: err.message,
          status: "Unauthorized",
        });
      }
      req.user = decoded;
      next();
    });
  }
};

//ADMIN CREATE TOKEN
const createAdminToken = (payload) => {
  return jwt.sign(payload, "adminSpcPharmaKey", {
    expiresIn: "24h",
  });
};

module.exports = {
  createJWTToken,
  checkToken,
  createAdminToken,
};
