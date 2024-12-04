const express = require('express');
const router = express.Router();

const {
	getRota,
	createRota,
	updateRota,
	deleteRota
} = require('../../controllers/kontrolT/rota.controller')

router.get('/:id', getRota);
router.post('/', createRota);
router.put('/:id', updateRota);
router.delete('/:id', deleteRota);

module.exports = router;