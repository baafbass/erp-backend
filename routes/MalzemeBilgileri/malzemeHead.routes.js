const express = require('express');
const router = express.Router();

const {
	getAllMalzemeHead,
	getMalzemeHead,
	createMalzemeHead,
	updateMalzemeHead,
	deleteMalzemeHead
} = require('../../controllers/MalzemeBilgileri/malzemeHead.controller')

router.get('/all',getAllMalzemeHead)
router.get('/',getMalzemeHead)
router.post('/',createMalzemeHead)
router.put('/',updateMalzemeHead)
router.delete('/',deleteMalzemeHead)

module.exports = router;