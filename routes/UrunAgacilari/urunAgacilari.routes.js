const express = require('express');
const router = express.Router();

const {
  getAllUrunAgacilari,
  getUrunAgaci,
  createUrunAgaci,
  updateUrunAgaci,
  deleteUrunAgaci
} = require('../../controllers/UrunAgacilari/urunAgacilari.controller');

router.get('',getAllUrunAgacilari);
router.get('/:firma_kodu/:urun_agaci_tipi/:urun_agaci_kodu/:gecer_bas/:gecer_bit/:malzeme_tipi/:malzeme_kodu/:icerik_numarasi',getUrunAgaci);
router.post('/',createUrunAgaci);
router.put('/',updateUrunAgaci);
router.delete('/:firma_kodu/:urun_agaci_tipi/:urun_agaci_kodu/:gecer_bas/:gecer_bit/:malzeme_tipi/:malzeme_kodu/:icerik_numarasi',deleteUrunAgaci);

module.exports = router;


