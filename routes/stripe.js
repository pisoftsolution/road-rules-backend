const router = require('express').Router();
const stripe = require('../controllers/stripe');

router.post('/add-amount', stripe.shoppingOnline);
// router.post('/create-checkout-session', stripe.paymentIntent);
// router.get('/success', stripe.successPayment);
// router.get('/cancel', stripe.cancelPayment);

module.exports = router;