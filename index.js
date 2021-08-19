const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors')

const authRoute = require('./routes/auth');
const twilio = require('./routes/twilio');
const sgRoute = require('./routes/sendgrid');

const dbURI = "mongodb://localhost/authentication"; 

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api/auth' , authRoute);
app.use('/api/phone-verify' ,twilio);
app.use('/api/verify' , sgRoute);
 
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err)=> {console.error(err)});

db.once("open", ()=>{console.log("DB Started Successfully")});

app.listen(8090, ()=>{console.log("Server Started : 8090")});