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
router.get('/:id', getFirma);
router.post('/', createFirma);
router.put('/:id', updateFirma);
router.delete('/:id', deleteFirma);

module.exports = router;