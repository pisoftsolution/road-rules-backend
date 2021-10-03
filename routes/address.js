const express = require('express');
const router = express.Router();
const address = require('../controllers/address');

router.post('/add-address',address.addAddress);
// router.get('/get-address',address.getAddress);
// router.get('/get-client',address.getClient);

module.exports = router;  
