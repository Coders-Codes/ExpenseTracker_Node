const express = require("express");
const route = express.Router();
const expenseController = require("../controllers/expenseController");

route.post("/addexpense", expenseController.addExpense);

route.get("/getexpenses", expenseController.getExpenses);

route.delete("/deleteExpenses/:id", expenseController.deleteExpense);

module.exports = route;
