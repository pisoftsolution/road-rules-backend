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
    type: Number,
    required: true,
  },
});
const ClientSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
  },
  emailOtp: {
    type: String,
  },
  phoneOtp: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
  },
  isPhoneVerified: {
    type: Boolean,
  },
  address: [AddressSchema]
})

module.exports = new mongoose.model("UserAuth", ClientSchema);