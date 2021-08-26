const mongoose = require("mongoose");
const Instructor =  mongoose.Schema({
    fullName: {
    type: String,
    required: true,
    },
    // img: {
    //   type: String,
    //   required: true,
    // },
    phone :{
    type: String,
    required: true,
    },
    email :{
      type: String,
    required: true,
    },
    
});

module.exports = new mongoose.model("Instructor", Instructor);