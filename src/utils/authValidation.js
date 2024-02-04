require("dotenv").config("../../.env");
const jwt = require("jsonwebtoken");
const { errorMessageFunction } = require("../utils/errorMessage");

const JWT_SECRET = process.env.JWT_SECRET;
const validateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    const errorObj = {
      message: "Token not present",
      data: err,
    };
    let errorResponse = errorMessageFunction(401, errorObj);
    res.status(401).send(errorResponse);
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      const errorObj = {
        message: "Verification Unauthorized",
        data: err,
      };
      let errorResponse = errorMessageFunction(401, errorObj);
      res.status(401).send(errorResponse);
    }
    req.id = decoded.id;
    next();
  });
};
module.exports = { validateUser };
