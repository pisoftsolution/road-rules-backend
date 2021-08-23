const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe');
const middleware = require('../middleware/authorization')

router.post('/add-amount' , middleware.verify, stripe.addAmount);
router.get('/get-amount-by-id' , middleware.verify, stripe.getAmountById);
router.post('/get-payment-intents' , middleware.verify, stripe.payment);
// router.get('/success', stripe.successPayment);
// router.get('/cancel', stripe.cancelPayment);

module.exports = router; 