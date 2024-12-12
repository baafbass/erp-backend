const express = require('express');
const router = express.Router();

const {
	getAllMaliyetMerkezi,
	getMaliyetMerkezi,
	createMaliyetMerkezi,
	updateMaliyetMerkezi,
	deleteMaliyetMerkezi
} = require('../../controllers/kontrolT/maliyetMerkezi.controller')

router.get('',getAllMaliyetMerkezi)
router.get('/:maliyet_merkezi/:firma_kodu', getMaliyetMerkezi);
router.post('/', createMaliyetMerkezi);
router.put('/', updateMaliyetMerkezi);
router.delete('/:maliyet_merkezi/:firma_kodu', deleteMaliyetMerkezi);

module.exports = router;