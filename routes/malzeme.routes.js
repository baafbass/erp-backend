const express = require('express');
const router = express.Router();

const {
    getAllMalzeme,
    getMalzemeById,
    createMalzeme,
    deleteMalzeme,
    updateMalzeme
} = require('../controllers/malzeme.controller');

router.get('/', getAllMalzeme);
router.get('/:id', getMalzemeById);
router.post('/', createMalzeme);
router.put('/:id', updateMalzeme);
router.delete('/:id', deleteMalzeme);

module.exports = router;
