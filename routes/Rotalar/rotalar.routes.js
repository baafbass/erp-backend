const express = require('express');
const router = express.Router();

const {
	getAllRotalar,
	getRota,
	createRota,
	updateRota,
	deleteRota
} = require('../../controllers/Rotalar/rotalar.controller');

router.get('',getAllRotalar)
router.get('/:firma_kodu/:urun_agaci_tipi/:urun_agaci_kodu/:gecer_bas/:gecer_bit/:malzeme_tipi/:malzeme_kodu/:rota_tipi/:rota_numarasi/:opr_numarasi/:icerik_numarasi',getRota)
router.post('/',createRota)
router.put('/',updateRota)
router.delete('/:firma_kodu/:urun_agaci_tipi/:urun_agaci_kodu/:gecer_bas/:gecer_bit/:malzeme_tipi/:malzeme_kodu/:rota_tipi/:rota_numarasi/:opr_numarasi/:icerik_numarasi',deleteRota)

module.exports = router;