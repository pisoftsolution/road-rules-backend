const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
    city: {
    type: String,
    required: true,
    },
    province: {
    type: String,
    required: true,
    },
    street: {
    type: String,
    required: true,
    },
    postalCode: {
    type: String,
    required: true,
    },
  });

  module.exports = new mongoose.model("Address", AddressSchema);