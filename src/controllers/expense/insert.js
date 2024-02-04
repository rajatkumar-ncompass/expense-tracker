const c = require("../../utils/db");
const { successMessageFunction } = require("../../utils/successMessage");
const { errorMessageFunction } = require("../../utils/errorMessage");
const { insertExpenseQuery } = require("../../utils/query");

const addExpense = async (req, res) => {
  try {
    const { category_id, amount, description, details, createdDate } =
      req.body.data;
    const amount_due = amount;
    const user_id = req.id;
    const query = insertExpenseQuery();
    let dataObtained;
    const queryParams = [
      user_id,
      category_id,
      amount,
      amount_due,
      description,
      JSON.stringify(details),
      createdDate,
    ];
    await c.executeQuery(query, [queryParams]).then((response) => {
      dataObtained = response[0].affectedRows;
      console.log(dataObtained);
    });
    const successObj = {
      message: `${dataObtained} Inserted Successfully`,
      data: req.body.data,
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
  addExpense,
};
