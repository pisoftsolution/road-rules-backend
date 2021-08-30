const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const middleware = require('../middleware/authorization');

router.get('/admin/get-users', middleware.verify, admin.getUsers);
router.get('/admin/get-user', middleware.verify, admin.getUserById);

module.exports = router;
