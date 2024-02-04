const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/users/insert");
const { loginUser } = require("../controllers/users/login");
const {
  fetchUserExpenseByCategory,
  downloadUserExpenseByCategory,
} = require("../controllers/users/fetchExpenseByCategory");
const { validateUser } = require("../utils/authValidation");
const validation = require("../utils/validation");

router.post("/register", validation.validateUser, registerUser);
router.post("/login", loginUser);
router.get("/expenses", validateUser, fetchUserExpenseByCategory);
router.get("/downloadexpense", validateUser, downloadUserExpenseByCategory);

module.exports = router;
