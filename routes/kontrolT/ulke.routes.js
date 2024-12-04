const express = require('express');
const router = express.Router();

const {
	getUlke,
	createUlke,
	updateUlke,
	deleteUlke
} = require('../../controllers/kontrolT/ulke.controller')

router.get('/:id', getUlke);
router.post('/', createUlke);
router.put('/:id', updateUlke);
router.delete('/:id', deleteUlke);

module.exports = router;