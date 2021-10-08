const express = require('express');
const router = express.Router();
const address = require('../controllers/address');

router.post('/add-address',address.addAddress);
router.get('/get-address-by-id',address.getAddressById);

module.exports = router;  
