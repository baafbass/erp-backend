const express = require('express');
const router = express.Router();

const {
	getAllUlke,
	getUlke,
	createUlke,
	updateUlke,
	deleteUlke
} = require('../../controllers/kontrolT/ulke.controller')

router.get('',getAllUlke);
router.get('/:ulke_kodu/:firma_kodu', getUlke);
router.post('/', createUlke);
router.put('/', updateUlke);
router.delete('/:ulke_kodu/:firma_kodu', deleteUlke);

module.exports = router;