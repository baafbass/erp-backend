const express = require('express');
const router = express.Router();

const {
	getOperasyon,
	createOperasyon,
	updateOperasyon,
	deleteOperasyon
} = require('../../controllers/kontrolT/operasyon.controller')

router.get('/:id', getOperasyon);
router.post('/', createOperasyon);
router.put('/:id', updateOperasyon);
router.delete('/:id', deleteOperasyon);

module.exports = router;