const express = require('express')
const router = express.Router()

const {
	getAllMaliyetMerkezleri,
	getMaliyetMerkezi,
	createMaliyetMerkezi,
	updateMaliyetMerkezi,
	deleteMaliyetMerkezi
} = require('../../controllers/MaliyetMerkezleri/maliyetMerkezleri.controller')


router.get('',getAllMaliyetMerkezleri)
router.get('/:firma_kodu/:maliyet_merk_tipi/:maliyet_merk_kodu/:gecer_bas/:gecer_bit/:dil_kodu',getMaliyetMerkezi)
router.post('/',createMaliyetMerkezi)
router.put('/',updateMaliyetMerkezi)
router.delete('/:firma_kodu/:maliyet_merk_tipi/:maliyet_merk_kodu/:gecer_bas/:gecer_bit/:dil_kodu',deleteMaliyetMerkezi)

module.exports = router;