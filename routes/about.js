const express = require('express');
const router = express.Router();
const about = require('../controllers/about');

router.post('/add-about', about.addAbout);
router.get('/about', about.getAbout);
router.put('/update-about', about.updateAbout);

module.exports = router;
