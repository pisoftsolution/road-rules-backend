const express = require('express');
const router = express.Router();
const choose = require('../controllers/choose');

router.post('/add-choose', choose.addChoose);
router.get('/choose', choose.getChoose);
router.put('/update-choose', choose.updateChoose);

module.exports = router;
