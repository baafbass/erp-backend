const express = require('express')
const router = express.Router()

const {
	getAllMalzemeBilgileri,
	getMalzemeBilgileri,
	createMalzemeBilgileri,
	updateMalzemeBilgileri,
	deleteMalzemeBilgileri
} = require('../../controllers/MalzemeBilgileri/malzemeBilgileri.controller')


router.get('',getAllMalzemeBilgileri);
router.get('/:firma_kodu/:malzeme_tipi/:malzeme_kodu/:gecer_bas/:gecer_bit/:dil_kodu',getMalzemeBilgileri)
router.post('/',createMalzemeBilgileri);
router.put('/',updateMalzemeBilgileri);
router.delete('/:firma_kodu/:malzeme_tipi/:malzeme_kodu/:gecer_bas/:gecer_bit/:dil_kodu',deleteMalzemeBilgileri);

module.exports = router;