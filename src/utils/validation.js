const joi = require("joi");
const { errorMessageFunction } = require("./errorMessage");

const userSchema = joi.object({
  username: joi.string().max(50).required,
  email: joi.string().max(100).required,
  password: joi.string().max(255).required,
});

const expenseSchema = joi.object({
  category_id: joi.number().required(),
  amount: joi.number().required(),
  description: joi.string().required(),
  details: joi.object({
    location: joi.string().required(),
    tags: joi.array().items(joi.string()).required(),
    last_updated: joi.date().iso().required(),
  }),
  createdDate: joi.date().iso().required(),
});

const updateExpenseSchema = joi.object({
  expense_id: joi.number().required(),
  amount_paid: joi.number().required(),
});

const validateUser = (req, res, next) => {
  try {
    const user = req.body.data;
    const { value, error } = userSchema.validate(user);
    if (error) {
      throw error;
    }
    next();
  } catch (err) {
    let errorResponse = errorMessageFunction(500, err);
    res.status(500).send(errorResponse);
  }
};

const validateUpdateExpense = (req, res, next) => {
  try {
    const expense = req.body.data;
    const { value, error } = updateExpenseSchema.validate(expense);
    if (error) {
      throw error;
    }
    next();
  } catch (err) {
    let errorResponse = errorMessageFunction(500, err);
    res.status(500).send(errorResponse);
  }
};

const validateExpense = (req, res, next) => {
  try {
    const expense = req.body.data;
    const { value, error } = expenseSchema.validate(expense);
    if (error) {
      throw error;
    }
    next();
  } catch (err) {
    let errorResponse = errorMessageFunction(500, err);
    res.status(500).send(errorResponse);
  }
};

module.exports = {
  validateUser,
  validateExpense,
  validateUpdateExpense,
};
