const express = require('express');
const router = express.Router();

const {
	getAllUlke,
	getUlke,
	createUlke,
	updateUlke,
	deleteUlke
} = require('../../controllers/kontrolT/ulke.controller')

router.get('',getAllUlke);
router.get('/:id', getUlke);
router.post('/', createUlke);
router.put('/:id', updateUlke);
router.delete('/:id', deleteUlke);

module.exports = router;