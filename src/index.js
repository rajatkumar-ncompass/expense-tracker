require("dotenv").config("../.env");
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const userRoutes = require("../src/routes/userRoutes");
const expenseRoutes = require("../src/routes/expenseRoutes");
const path = require("path");
app.set("views", path.join(__dirname, "views"));

//MIDDLEWARES
app.use(express.json());
app.set("view engine", "ejs");

//ROUTES
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

app.get("/", (req, res) => {
  res.render("expense");
});

app.listen(PORT);
