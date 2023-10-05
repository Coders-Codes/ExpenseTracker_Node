const express = require("express");
const app = express();

const SignUpRoute = require("./routes/userRoute");
const ExpenseRoute = require("./routes/expenseRoute");

const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));
app.use("/user", SignUpRoute);
app.use("/expense", ExpenseRoute);

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
