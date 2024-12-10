const express = require('express');
const router = express.Router();

const {
	getAllBirim,
	getBirim,
	createBirim,
	updateBirim,
	deleteBirim
} = require('../../controllers/kontrolT/birim.controller');

router.get('',getAllBirim);
router.get('/:birim_kodu/:firma_kodu', getBirim);
router.post('/', createBirim);
router.put('/', updateBirim);
router.delete('/:birim_kodu/:firma_kodu', deleteBirim);

module.exports = router;