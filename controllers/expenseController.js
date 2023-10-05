const Expense = require("../models/expense");

//CREATING A NEW EXPENSE BY POST METHOD FUNCTIONALITY
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const newExpense = { amount, description, category };
    console.log(newExpense);

    await Expense.create({ amount, description, category });

    return res
      .status(201)
      .json({ success: true, message: "expense added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//GETTING THE DETAILS OF ALL THE EXPENSES ON SCREEN BY GET METHOF FUNCTIONALITY
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    // console.log(expenses);
    return res.status(200).json({ expenses, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// DELETING ALL THE EXPENSES BY AND SPECIFIC ID BY USING DELETE METHOD DESTROY FUNCTIONALITY
exports.deleteExpense = (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      console.log("DESTROYED EXPENSE");
      return res
        .status(204)
        .json({ success: true, message: "Deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};
