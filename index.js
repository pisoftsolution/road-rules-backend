const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');

const authRoute = require('./routes/auth');
const sgRoute = require('./routes/sendgrid');
const twilio = require('./routes/twilio');
const adminADD = require('./routes/admin');
const instRoute = require('./routes/instructor');
const slotRoute = require('./routes/slot');
const stripeRoute = require('./routes/stripe');
const addressRoute = require('./routes/address');
const rideRoute = require('./routes/ride');
const testimonialRoute = require('./routes/testimonial');
const about = require('./routes/about');
const aboutCards = require('./routes/aboutCards');
const chooseRoute = require('./routes/choose');
const contact = require('./routes/contact');

// const dbURI = "mongodb+srv://root:junaid@cluster0.qxafi.mongodb.net/test"; 
const dbURI = "mongodb://localhost/authentication";

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/phone-verify', twilio);
app.use('/api/verify', sgRoute);
app.use('/api/instructor', instRoute);
app.use('/api/admin', adminADD);
app.use('/api/slot', slotRoute);
app.use('/api/stripe', stripeRoute);
app.use('/api/address', addressRoute);
app.use('/api/ride', rideRoute);
app.use('/api/testimonial', testimonialRoute);
app.use('/api/about', about);
app.use('/api/aboutcards', aboutCards);
app.use('/api/choose', chooseRoute);
app.use('/api/contact', contact);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => { console.error(err) });

db.once('open', () => { console.log('DB Started Successfully'); });

app.listen(8092, () => { console.log("Server Started : 8092") });

