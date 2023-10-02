const express = require("express");
const route = express.Router();
const signUpController = require("../controllers/signup"); // the controller

route.get("/", signUpController.getPage);

route.post("/signUp", signUpController.postLogin);

module.exports = route;
