const express = require('express');
const router = express.Router();
const sgMail = require("../controllers/sendgrid");
const middleware = require("../middleware/authorization");

router.get('/email-otp' , middleware.verify , sgMail.emailOTPSend);
module.exports = router