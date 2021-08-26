const express = require('express');
const router = express.Router();
const ride = require('../controllers/ride');
const middleware = require('../middleware/authorization') 

router.post('/add-ride-cash', middleware.verify , ride.addRideCash);
router.post('/add-booking-cash', middleware.verify,ride.addBookingCash);
router.get('/all-rides',middleware.verify, ride.allRides);
router.get('/ride', middleware.verify , ride.getRideById);
// router.get('/my-rides', middleware.verify,ride.myRides);
// router.get('/end-ride',middleware.verify, ride.endRide);
// router.post('/feedback', middleware.verify,ride.feedback);
module.exports = router;