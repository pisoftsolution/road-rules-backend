const express = require('express');
const router = express.Router();
const address = require('../controllers/address');

router.post('/add-address',address.addAddress);
// router.get('/get-address-by-user' ,address.getAddressByUser);
router.get('/get-user-by-id' ,address.getUserById); 

module.exports = router; 
