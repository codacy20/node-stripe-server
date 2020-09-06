var express = require("express");
var router = express.Router();
const { resolve } = require("path");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // This is your real test secret API key.
  const stripe = require("stripe")(
    "sk_test_51HMTkaKix1IQrXIBqDBHOQiuk2nqP6IjtgwbukH00GgteKkgAI44Q9mRpgn2RZpwiopHhyMSPfhqgMyv5yGAp4sU00UFXj2lL3"
  );
  express.use(express.static("."));
  express.use(express.json());
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  express.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });
});

module.exports = router;
