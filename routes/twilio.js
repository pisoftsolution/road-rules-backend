const express = require('express');
const router = express.Router();
const twilio = require("../controllers/twilio");

router.get('/phone-otp', twilio.phoneOtpSend);
router.post('/phone-otp-verify', twilio.phoneOtpVerify)

module.exports = router;