const express = require('express');
const router = express.Router();
const address = require('../controllers/address');

router.post('/add-address',address.addAddress);

module.exports = router;  
