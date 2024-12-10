const express = require('express');
const router = express.Router();

const {
	getAllIsMerkezi,
	getIsMerkezi,
	createIsMerkezi,
	updateIsMerkezi,
	deleteIsMerkezi
} = require('../../controllers/kontrolT/isMerkezi.controller')

router.get('',getAllIsMerkezi)
router.get('/:id', getIsMerkezi);
router.post('/', createIsMerkezi);
router.put('/:id', updateIsMerkezi);
router.delete('/:id', deleteIsMerkezi);

module.exports = router;