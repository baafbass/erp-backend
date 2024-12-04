const express = require('express');
const router = express.Router();

const {
	getMaliyetMerkezi,
	createMaliyetMerkezi,
	updateMaliyetMerkezi,
	deleteMaliyetMerkezi
} = require('../../controllers/kontrolT/maliyetMerkezi.controller')

router.get('/:id', getMaliyetMerkezi);
router.post('/', createMaliyetMerkezi);
router.put('/:id', updateMaliyetMerkezi);
router.delete('/:id', deleteMaliyetMerkezi);

module.exports = router;