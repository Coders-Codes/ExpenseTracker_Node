const express = require("express");
const app = express();

const SignUpRoute = require("./routes/userRoute");
const ExpenseRoute = require("./routes/expenseRoute");
const PurchaseRoute = require("./routes/purchaseRoute");

const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));
app.use("/user", SignUpRoute);
app.use("/expense", ExpenseRoute);
app.use("/purchase", PurchaseRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// app.listen(3000, () => {
//   console.log("connected");
// });
