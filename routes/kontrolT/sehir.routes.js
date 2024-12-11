const express = require('express');
const router = express.Router();

const {
	getAllSehir,
	getSehir,
	createSehir,
	updateSehir,
	deleteSehir
} = require('../../controllers/kontrolT/sehir.controller')

router.get('',getAllSehir);
router.get('/:sehir_kodu/:firma_kodu', getSehir);
router.post('/', createSehir);
router.put('/', updateSehir);
router.delete('/:sehir_kodu/:firma_kodu', deleteSehir);

module.exports = router;