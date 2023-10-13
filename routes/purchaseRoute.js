const express = require("express");
const route = express.Router();
const purchaseController = require("../controllers/purchaseController");
const userAuthentication = require("../middleware/auth");

route.get(
  "/premiumMembership",
  userAuthentication.authenticate,
  purchaseController.purchasepremium
);

route.post(
  "/updateTransactionStatus",
  userAuthentication.authenticate,
  purchaseController.updateTransactionStatus
);

module.exports = route;
