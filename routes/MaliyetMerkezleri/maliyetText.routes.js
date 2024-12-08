const express = require('express');
const router = express.Router();

const {
	getAllMaliyetText,
	getMaliyetText,
	createMaliyetText,
	updateMaliyetText,
	deleteMaliyetText
} = require('../../controllers/MaliyetMerkezleri/maliyetText.controller')

router.get('/all',getAllMaliyetText)
router.get('/',getMaliyetText)
router.post('/',createMaliyetText)
router.put('/',updateMaliyetText)
router.delete('/',deleteMaliyetText)

module.exports = router;