const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors')

const authRoute = require('./routes/auth');

const dbURI = "mongodb://localhost/authentication";

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api/auth' , authRoute);
 
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err)=> {console.error(err)});

db.once("open", ()=>{console.log("DB started successfully")});

app.listen(8090, ()=>{console.log("Server started : 8090")});