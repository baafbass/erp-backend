const express = require('express');
const router = express.Router();

const {
	getAllRota,
	getRota,
	createRota,
	updateRota,
	deleteRota
} = require('../../controllers/kontrolT/rota.controller')

router.get('',getAllRota);
router.get('/:rota_tipi/:firma_kodu', getRota);
router.post('/', createRota);
router.put('/', updateRota);
router.delete('/:rota_tipi/:firma_kodu', deleteRota);

module.exports = router;