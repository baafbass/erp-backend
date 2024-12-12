const express = require('express');
const router = express.Router();

const {
	getAllOperasyon,
	getOperasyon,
	createOperasyon,
	updateOperasyon,
	deleteOperasyon
} = require('../../controllers/kontrolT/operasyon.controller')

router.get('',getAllOperasyon)
router.get('/:operasyon_tipi/:firma_kodu', getOperasyon);
router.post('/', createOperasyon);
router.put('/', updateOperasyon);
router.delete('/:operasyon_tipi/:firma_kodu', deleteOperasyon);

module.exports = router;