const express = require("express");
const route = express.Router();
const premiumController = require("../controllers/premiumController");
const userAuthentication = require("../middleware/auth");

route.get(
  "/showLeaderBoard",
  userAuthentication.authenticate,
  premiumController.getLeaderBoard
);

module.exports = route;
