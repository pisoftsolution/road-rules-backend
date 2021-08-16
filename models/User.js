const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    // fullName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // role: {
    //   type: String,
    //   required: true,
    // },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    // emailOtp: {
    //   type: String,
    // },
    // phoneOtp: {
    //   type: String,
    // },
    // isNumberVerified: {
    //   type: Boolean,
    //   required: true,
    // },
    // isEmailVerified: {
    //   type: Boolean,
    //   required: true,
    // },
}) 
module.exports = new mongoose.model("UserAuth", ClientSchema);