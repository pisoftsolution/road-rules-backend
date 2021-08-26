const mongoose = require("mongoose");
const SuccessSchema =  mongoose.Schema({
  session_id: {
  type: String,
  required: true,
  },
  user_id: {
  type: String,
  required: true,
  },
});

module.exports = new mongoose.model("Confirmation", SuccessSchema);