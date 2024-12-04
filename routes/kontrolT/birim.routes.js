const express = require('express');
const router = express.Router();

const {
	getBirim,
	createBirim,
	updateBirim,
	deleteBirim
} = require('../../controllers/kontrolT/birim.controller');

router.get('/:id', getBirim);
router.post('/', createBirim);
router.put('/:id', updateBirim);
router.delete('/:id', deleteBirim);

module.exports = router;