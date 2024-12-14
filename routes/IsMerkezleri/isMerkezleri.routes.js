const express = require('express')
const router = express.Router()

const {
	getAllIsMerkezleri,
	getIsMerkezi,
	createIsMerkezi,
	updateIsMerkezi,
	deleteIsMerkezi
} = require('../../controllers/IsMerkezleri/isMerkezleri.controller.js');

router.get('',getAllIsMerkezleri);
router.get('/:firma_kodu/:is_merk_tipi/:is_merk_kodu/:gecer_bas/:gecer_bit/:dil_kodu/:opr_kodu',getIsMerkezi)
router.post('/',createIsMerkezi)
router.put('/',updateIsMerkezi)
router.delete('/:firma_kodu/:is_merk_tipi/:is_merk_kodu/:gecer_bas/:gecer_bit/:dil_kodu/:opr_kodu',deleteIsMerkezi)

module.exports = router;