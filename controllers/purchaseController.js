const RazorPay = require("razorpay");
// const env = require("dotenv").config();
const Order = require("../models/order");
const env = require("dotenv");
env.config();

exports.purchasepremium = async (req, res) => {
  try {
    var rzp = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    // console.log(rzp);

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      // console.log("printorder::", order);
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went Wrong" });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFULL",
    });
    const promise2 = req.user.update({ ispremiumuser: true });

    Promise.all([promise1, promise2])
      .then(() => {
        return res
          .status(202)
          .json({ success: true, message: "Transaction Successfull" });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(403).josn({ error: err, message: "Something went Wrong" });
  }
};
