const express = require('express');
const router = express.Router();

const {
	getAllUrunAgaci,
	getUrunAgaci,
	createUrunAgaci,
	updateUrunAgaci,
	deleteUrunAgaci 
} = require('../../controllers/kontrolT/urunAgaci.controller')

router.get('',getAllUrunAgaci)
router.get('/:urun_agaci_tipi/:firma_kodu', getUrunAgaci);
router.post('/', createUrunAgaci);
router.put('/', updateUrunAgaci);
router.delete('/:urun_agaci_tipi/:firma_kodu', deleteUrunAgaci);

module.exports = router;