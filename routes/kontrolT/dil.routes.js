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
router.get('/:dil_kodu/:firma_kodu', getDil);
router.post('/', createDil);
router.put('/', updateDil);
router.delete('/:dil_kodu/:firma_kodu', deleteDil);

module.exports = router;