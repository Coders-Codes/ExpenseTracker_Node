const express = require("express");
const app = express();

const SignupRoute = require("./routes/signuproute");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // for js files

app.use("/", SignupRoute);

app.listen(3000, () => {
  console.log("connected");
});
