const express = require("express");
const route = express.Router();
const expenseController = require("../controllers/expenseController");
const userAuthentication = require("../middleware/auth");

route.post(
  "/addexpense",
  userAuthentication.authenticate,
  expenseController.addExpense
);

route.get(
  "/getExpenses",
  userAuthentication.authenticate,
  expenseController.getExpenses
);

route.delete(
  "/deleteExpenses/:id",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);

module.exports = route;
