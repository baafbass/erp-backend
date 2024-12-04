const express = require('express');
const router = express.Router();

const {
	getSehir,
	createSehir,
	updateSehir,
	deleteSehir
} = require('../../controllers/kontrolT/sehir.controller')

router.get('/:id', getSehir);
router.post('/', createSehir);
router.put('/:id', updateSehir);
router.delete('/:id', deleteSehir);

module.exports = router;