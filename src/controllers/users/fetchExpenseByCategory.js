const c = require("../../utils/db");
const { successMessageFunction } = require("../../utils/successMessage");
const { errorMessageFunction } = require("../../utils/errorMessage");
const {
  fetchUserExpensesByCategoryQuery,
  countUserExpensesQuery,
} = require("../../utils/query");
const puppeteer = require("puppeteer");
const path = require("path");
const ejs = require("ejs");

const fetchUserExpenseByCategory = async (req, res) => {
  try {
    const userId = req.id;
    let result = {};
    const response = await c.executeQuery(fetchUserExpensesByCategoryQuery(), [
      userId,
    ]);

    let category = "category";
    response[0].map((key) => {
      let currentCategory = category + key.categoryId;
      result[currentCategory] = [];
    });

    response[0].map((key) => {
      let expenseObj = {};

      expenseObj.category = key.categoryName;
      expenseObj.amount = key.amount;
      expenseObj.description = key.eventDescription;
      expenseObj.details = key.eventDetails;
      expenseObj.createdDate = key.createdDate;

      result["category" + key.categoryId].push(expenseObj);
    });

    const successObj = {
      message: "Data Fetched Successfully",
      data: result,
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

const downloadUserExpenseByCategory = async (req, res) => {
  try {
    const userId = req.id;
    let result = {};
    let expenseCount;
    await c
      .executeQuery(countUserExpensesQuery(), [userId])
      .then(async (response) => {
        console.log(response[0][0].totalExpense);
        expenseCount = response[0][0].totalExpense;
        console.log(path.resolve(__dirname, "../../views", "expense.ejs"));

        const html = await ejs.renderFile(
          path.resolve(__dirname, "../../views", "expense.ejs"),
          { expenseCount }
        );

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf();
        await browser.close();

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader(
          "Content-Disposition",
          'attachment; filename="expenses.pdf"'
        );

        res.status(200).send(pdf);
      });
  } catch (error) {
    let errorResponse = errorMessageFunction(400, error);
    res.status(400).send(errorResponse);
  }
};

module.exports = { fetchUserExpenseByCategory, downloadUserExpenseByCategory };
