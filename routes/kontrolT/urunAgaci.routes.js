const express = require('express');
const router = express.Router();

const {
	getAllUrunAgaci,
	getUrunAgaci,
	createUrunAgaci,
	updateUrunAgaci,
	deleteUrunAgaci 
} = require('../../controllers/kontrolT/urunAgaci.controller')

router.get('',getAllUrunAgaci)
router.get('/:id', getUrunAgaci);
router.post('/', createUrunAgaci);
router.put('/:id', updateUrunAgaci);
router.delete('/:id', deleteUrunAgaci);

module.exports = router;