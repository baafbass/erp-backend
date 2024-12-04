const express = require('express');
const router = express.Router();

const {
	getIsMerkezi,
	createIsMerkezi,
	updateIsMerkezi,
	deleteIsMerkezi
} = require('../../controllers/kontrolT/isMerkezi.controller')

router.get('/:id', getIsMerkezi);
router.post('/', createIsMerkezi);
router.put('/:id', updateIsMerkezi);
router.delete('/:id', deleteIsMerkezi);

module.exports = router;