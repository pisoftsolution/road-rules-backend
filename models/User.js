const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({

    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: { 
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    }, 
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
}) 

module.exports = new mongoose.model("UserAuth", ClientSchema);