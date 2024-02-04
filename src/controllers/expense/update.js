const c = require("../../utils/db");
const { successMessageFunction } = require("../../utils/successMessage");
const { errorMessageFunction } = require("../../utils/errorMessage");
const {
  updateExpenseQuery,
  checkAuthorQuery,
  fetchAmountQuery,
} = require("../../utils/query");

const updateExpense = async (req, res) => {
  try {
    const author_id = req.id;
    const { expense_id, amount_paid } = req.body.data;
    let dataObtained;
    let finalAmount;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    await c.executeQuery(fetchAmountQuery(), [expense_id]).then((response) => {
      finalAmount = response[0][0].amountDue - amount_paid;
    });

    await c
      .executeQuery(checkAuthorQuery(), [expense_id])
      .then(async (response) => {
        if (response[0][0].userId === author_id) {
          if (finalAmount > 0) {
            await c
              .executeQuery(updateExpenseQuery(), [
                formattedDate,
                finalAmount,
                expense_id,
              ])
              .then((response) => {
                dataObtained = response[0].affectedRows;
              });

            const successObj = {
              message: "Data Updated Successfully",
              data: `${dataObtained} inserted`,
            };

            let successResponse = successMessageFunction(200, successObj);
            res.status(200).send(successResponse);
          }
          else;
          {
            const errorObj = {
              message: "Some Error Occurred",
              data: "Final Amount Can't go below 0",
            };
            let errorResponse = errorMessageFunction(400, errorObj);
            res.status(400).send(errorResponse);
          }
        } else {
          const errorObj = {
            message: "Some Error Occurred",
            data: "",
          };
          let errorResponse = errorMessageFunction(400, errorObj);
          res.status(400).send(errorResponse);
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

module.exports = { updateExpense };
