const router = require('express').Router();
const slot = require('../controllers/slot');
const middleware = require('../middleware/authorization');

router.post('/add-slot', middleware.verify, slot.addSlot);
router.put('/modify-slot', middleware.verify, slot.modifySlot);
router.get('/all-slots', middleware.verify, slot.getSlots);
router.get('/slot', middleware.verify, slot.getSlotById);
router.get('/search-slot', middleware.verify, slot.searchSlotByDate);
router.delete('/delete-slot', middleware.verify, slot.deleteSlot);

module.exports = router;
