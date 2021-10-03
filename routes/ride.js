const express = require('express');
const router = express.Router();
const ride = require('../controllers/ride');

router.post('/add-ride-cash',ride.addRideCash);
router.post('/add-booking-cash',ride.addBookingCash);
router.get('/all-rides',ride.allRides);
router.get('/ride',ride.getRideById);
// router.get('/my-rides', middleware.verify,ride.myRides);
// router.get('/end-ride',middleware.verify, ride.endRide);
// router.post('/feedback', middleware.verify,ride.feedback);
module.exports = router;