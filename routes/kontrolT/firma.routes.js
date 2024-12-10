const express = require('express');
const router = express.Router();

const {
	getAllFirma,
	getFirma,
	createFirma,
	updateFirma,
	deleteFirma
} = require('../../controllers/kontrolT/firma.controller')

router.get('',getAllFirma);
router.get('/:firma_kodu', getFirma);
router.post('/', createFirma);
router.put('/', updateFirma);
router.delete('/:firma_kodu', deleteFirma);

module.exports = router;