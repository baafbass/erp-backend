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
router.get('/:is_merkezi/:firma_kodu', getIsMerkezi);
router.post('/', createIsMerkezi);
router.put('/', updateIsMerkezi);
router.delete('/:is_merkezi/:firma_kodu', deleteIsMerkezi);

module.exports = router;