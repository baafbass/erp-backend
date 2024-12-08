const express = require('express');
const router = express.Router();

const {
	getAllUrunAgaciContent,
	getUrunAgaciContent,
	createUrunAgaciContent,
	updateUrunAgaciContent,
	deleteUrunAgaciContent
} = require('../../controllers/UrunAgacilari/urunAgaciContent.controller')

router.get('/all',getAllUrunAgaciContent)
router.get('/',getUrunAgaciContent)
router.post('/',createUrunAgaciContent)
router.put('/',updateUrunAgaciContent)
router.delete('/',deleteUrunAgaciContent)

module.exports = router;