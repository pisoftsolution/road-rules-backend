const mongoose = require("mongoose");
const SlotSchema =  mongoose.Schema({
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    clientLimit: {
      type: Number,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    booking :{
      type: String,
    }
});
module.exports = new mongoose.model("slot", SlotSchema);