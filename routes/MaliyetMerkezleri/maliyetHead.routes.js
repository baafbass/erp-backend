const express = require('express');
const router = express.Router();

const {
	getAllMaliyetHead,
	getMaliyetHead,
	createMaliyetHead,
	updateMaliyetHead,
	deleteMaliyetHead
} = require('../../controllers/MaliyetMerkezleri/maliyetHead.controller')

router.get('/all',getAllMaliyetHead)
router.get('/',getMaliyetHead)
router.post('/',createMaliyetHead)
router.put('/',updateMaliyetHead)
router.delete('/',deleteMaliyetHead)

module.exports = router;