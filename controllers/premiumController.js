const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../config/database");

exports.getLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userAggregatedExpenses = {};
    console.log(expenses);

    expenses.forEach((expense) => {
      if (userAggregatedExpenses[expense.userId]) {
        userAggregatedExpenses[expense.userId] += expense.amount;
      } else {
        userAggregatedExpenses[expense.userId] = expense.amount;
      }
    });
    var userLeaderBoardDetails = [];
    users.forEach((user) => {
      userLeaderBoardDetails.push({
        name: user.name,
        total_cost: userAggregatedExpenses[user.id],
      });
    });

    console.log(userLeaderBoardDetails);
    // userLeaderBoardDetails.sort((a,b) => )
    res.status(200).json(userLeaderBoardDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
