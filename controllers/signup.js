const path = require("path");

exports.getPage = (req, res) => {
  const Filename = path.join(__dirname, "../", "views", "index.html");
  res.sendFile(Filename);
};

exports.postLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await post.create({
      name: name,
      email: email,
      password: password,
    });
    return res.status(201);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
