const express = require("express");
const app = express();

const SignUpRoute = require("./routes/userRoute");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));
// app.use("/", SignUpRoute);
app.use("/user", SignUpRoute);

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
