const express = require('express');
const router = express.Router();

const {
	getAllSehir,
	getSehir,
	createSehir,
	updateSehir,
	deleteSehir
} = require('../../controllers/kontrolT/sehir.controller')

router.get('',getAllSehir);
router.get('/:id', getSehir);
router.post('/', createSehir);
router.put('/:id', updateSehir);
router.delete('/:id', deleteSehir);

module.exports = router;