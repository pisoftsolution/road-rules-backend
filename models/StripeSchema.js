const mongoose = require("mongoose");
const StripeSchema =  mongoose.Schema({

  amount: {
      type: String,
      required: true,
    },
});

module.exports = new mongoose.model("Stripe", StripeSchema);