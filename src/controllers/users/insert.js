const c = require("../../utils/db");
const bcrypt = require("bcrypt");
const { successMessageFunction } = require("../../utils/successMessage");
const { errorMessageFunction } = require("../../utils/errorMessage");
const { insertQuery } = require("../../utils/query");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body.user;
    const newPassword = await bcrypt.hash(password, 10);
    const query = insertQuery();
    let dataObtained;
    const queryParam = [`${username}`, `${email}`, `${newPassword}`];
    const response = c.executeQuery(query, [queryParam]);
    dataObtained = response[0].affectedRows;
    const successObj = {
      message: `${dataObtained} Inserted Successfully`,
      data: { username, email },
    };
    let successResponse = successMessageFunction(200, successObj);
    res.status(200).send(successResponse);
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
  registerUser,
};
