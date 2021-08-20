const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors')

const authRoute = require('./routes/auth');
// const twilio = require('./routes/twilio');
const sgRoute = require('./routes/sendgrid');
const adminADD = require('./routes/admin');
const instRoute = require('./routes/instructor');
const slotRoute = require('./routes/slot');

const dbURI = "mongodb://localhost/authentication"; 

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api/auth',authRoute);
// app.use('/api/phone-verify' ,twilio);
app.use('/api/verify',sgRoute);
app.use('/api/instructor',instRoute);
app.use('/api/admin',adminADD);

app.use('/api/slot',slotRoute);
 
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err)=> {console.error(err)});

db.once("open", ()=>{console.log("DB Started Successfully")});

app.listen(8095, ()=>{console.log("Server Started : 8095")});