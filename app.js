const express = require("express");
const app = express();

const SignUpRoute = require("./routes/signuproute");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/", SignUpRoute);

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
