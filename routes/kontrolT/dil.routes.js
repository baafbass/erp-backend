const express = require('express');
const router = express.Router();

const {
	getAllDil,
	getDil,
	createDil,
	updateDil,
	deleteDil
} = require('../../controllers/kontrolT/dil.controller');

router.get('',getAllDil);
router.get('/:id', getDil);
router.post('/', createDil);
router.put('/:id', updateDil);
router.delete('/:id', deleteDil);

module.exports = router;