const express = require('express');
const router = express.Router();

const {
	getAllOperasyon,
	getOperasyon,
	createOperasyon,
	updateOperasyon,
	deleteOperasyon
} = require('../../controllers/kontrolT/operasyon.controller')

router.get('',getAllOperasyon)
router.get('/:id', getOperasyon);
router.post('/', createOperasyon);
router.put('/:id', updateOperasyon);
router.delete('/:id', deleteOperasyon);

module.exports = router;