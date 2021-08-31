const express = require('express');
const router = express.Router();
const sgMail = require("../controllers/sendgrid");

router.get('/email-otp', sgMail.emailOTPSend);
router.get('/email-otp-verify', sgMail.emailOTPVerify);

module.exports = router;