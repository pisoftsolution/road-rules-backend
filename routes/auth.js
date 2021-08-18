const express = require('express');
const router = express.Router();
const client = require('../controllers/user');
const middleware = require('../middleware/authorization') 

router.post('/signup' , client.registerUser);
router.get('/login' , client.loginUser);

module.exports = router;