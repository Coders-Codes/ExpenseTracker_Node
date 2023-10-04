const path = require("path");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };
    console.log(newUser);

    await User.create({
      name: name,
      email: email,
      password: password,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      if (user[0].password === password) {
        res
          .status(200)
          .json({ success: true, message: "User logged in Successfully" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Password is Incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User Does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};
