const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors')

const authRoute = require('./routes/auth');
const twilio = require('./routes/twilio');
const sgRoute = require('./routes/sendgrid');
const adminADD = require('./routes/admin');
const instRoute = require('./routes/instructor');
const slotRoute = require('./routes/slot');
const stripeRoute = require('./routes/stripe');
const addressRoute = require('./routes/address');

const dbURI = "mongodb+srv://root:junaid@cluster0.qxafi.mongodb.net/test"; 

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api/auth',authRoute);
app.use('/api/phone-verify' ,twilio);
app.use('/api/verify',sgRoute);
app.use('/api/instructor',instRoute);
app.use('/api/admin',adminADD);
app.use('/api/slot',slotRoute);
app.use('/api/stripe',stripeRoute);
app.use('/api/address',addressRoute);
 
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err)=> {console.error(err)});

db.once("open", ()=>{console.log("DB Started Successfully")});

app.listen(8092, ()=>{console.log("Server Started : 8092")});