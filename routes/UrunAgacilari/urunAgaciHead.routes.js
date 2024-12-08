const express = require('express');
const router = express.Router();

const {
	getAllUrunAgaciHead,
	getUrunAgaciHead,
	createUrunAgaciHead,
	updateUrunAgaciHead,
	deleteUrunAgaciHead
} = require('../../controllers/UrunAgacilari/urunAgaciHead.controller')

router.get('/all',getAllUrunAgaciHead)
router.get('/',getUrunAgaciHead)
router.post('/',createUrunAgaciHead)
router.put('/',updateUrunAgaciHead)
router.delete('/',deleteUrunAgaciHead)

module.exports = router;