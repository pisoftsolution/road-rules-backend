const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoute = require('./routes/auth');


const dbURI = "mongodb://localhost/authentication";
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/auth' , authRoute);
// app.use('/api/verify' , sgRoute);



mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", (err)=> {console.error(err)});

db.once("open", ()=>{console.log("DB started successfully")});

app.listen(8080, ()=>{console.log("Server started : 8080")});