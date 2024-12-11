const express = require('express');
const router = express.Router();

const {
    getAllMalzeme,
    getMalzeme,
    createMalzeme,
    deleteMalzeme,
    updateMalzeme
} = require('../../controllers/kontrolT/malzeme.controller');

router.get('', getAllMalzeme);
router.get('/:malzeme_tipi/:firma_kodu', getMalzeme);
router.post('/', createMalzeme);
router.put('/', updateMalzeme);
router.delete('/:malzeme_tipi/:firma_kodu', deleteMalzeme);

module.exports = router;
