const express = require('express');
const router = express.Router();

const {
    getAllMalzeme,
    getMalzeme,
    createMalzeme,
    deleteMalzeme,
    updateMalzeme
} = require('../../controllers/kontrolT/malzeme.controller');

router.get('/', getAllMalzeme);
router.get('/:id', getMalzeme);
router.post('/', createMalzeme);
router.put('/:id', updateMalzeme);
router.delete('/:id', deleteMalzeme);

module.exports = router;
