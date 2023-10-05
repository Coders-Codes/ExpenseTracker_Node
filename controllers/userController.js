const User = require("../models/user");
const bcrypt = require("bcrypt");

//CREATING THE NEW USR USING POST REQUEST METHOD
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };
    console.log(newUser);

    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    await User.create({ name, email, password: hashedPassword });
    return res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// LOGIN THE EXISTING USER BY POST REQUEST METHOD
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Something went Wrong" });
        }
        if (result == true) {
          res
            .status(200)
            .json({ success: true, message: "User logged in Successfully" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Password is Incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User Does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.dailyExpense = (req, res) => {};
