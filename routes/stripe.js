const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe');
const middleware = require('../middleware/authorization');

router.post('/create-checkout-session' , middleware.verify, stripe.checkout); 
router.post('/confirm-payment' , middleware.verify, stripe.confirmPayment);

module.exports = router;