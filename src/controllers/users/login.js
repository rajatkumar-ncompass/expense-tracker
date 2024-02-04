require("dotenv").config("../../../.env");
const c = require("../../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { successMessageFunction } = require("../../utils/successMessage");
const { errorMessageFunction } = require("../../utils/errorMessage");
const {
  checkUserquery,
  fetchEncryptedPaswordQuery,
} = require("../../utils/query");

const jwtKey = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  try {
    const { id, username, password } = req.body.data;
    const checkQuery = checkUserquery();
    const fetchUserPasswordquery = fetchEncryptedPaswordQuery();
    let token;
    await c.executeQuery(checkQuery, [id]).then(async (response) => {
      if (response[0][0]["CHECK_USER"] === 1) {
        await c
          .executeQuery(fetchUserPasswordquery, [id])
          .then(async (response) => {
            const isPasswordValid = await bcrypt.compare(
              password,
              response[0][0].password
            );
            if (isPasswordValid) {
              token = jwt.sign(
                { id: id, username: username, password: password },
                jwtKey,
                {
                  expiresIn: "1d",
                }
              );
              const successObj = {
                message: "token generated successfully",
                token: token,
              };
              let successResponse = successMessageFunction(200, successObj);
              res.send(successResponse);
            } else {
              let errorMessage = errorMessageFunction(
                200,
                "Password entered incorrect"
              );
              res.send(errorMessage);
            }
          });
      } else {
        let errorMessage = errorMessageFunction(200, "User Not found");
        res.send(errorMessage);
      }
    });
  } catch (error) {
    const errorObj = {
      message: "Some Error Occured",
      data: error,
    };
    let errorResponse = errorMessageFunction(400, errorObj);
    res.status(400).send(errorResponse);
  }
};

module.exports = {
  loginUser,
};
