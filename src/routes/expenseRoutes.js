const express = require("express");
const router = express.Router();
const { addExpense } = require("../controllers/expense/insert");
const { validateUser } = require("../utils/authValidation");
const { updateExpense } = require("../controllers/expense/update");
const validation = require("../utils/validation");

router.post("/add", [validation.validateExpense, validateUser], addExpense);
router.put(
  "/update",
  [validation.validateUpdateExpense, validateUser],
  updateExpense
);

module.exports = router;
