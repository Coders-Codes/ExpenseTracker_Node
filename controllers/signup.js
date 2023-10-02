const path = require("path");
const User = require("../models/signupModel");

exports.getPage = (req, res) => {
  const Filename = path.join(__dirname, "../", "views", "index.html");
  res.sendFile(Filename);
};

exports.postLogin = async (req, res) => {
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
