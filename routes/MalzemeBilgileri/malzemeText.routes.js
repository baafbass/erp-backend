const express = require('express');
const router = express.Router();

const {
	getAllMalzemeText,
	getMalzemeText,
	createMalzemeText,
	updateMalzemeText,
	deleteMalzemeText
} = require('../../controllers/MalzemeBilgileri/malzemeText.controller')

router.get('/all',getAllMalzemeText)
router.get('/',getMalzemeText)
router.post('/',createMalzemeText)
router.put('/',updateMalzemeText)
router.delete('/',deleteMalzemeText)

module.exports = router;