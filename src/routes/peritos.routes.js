const express = require('express');
const router = express.Router();
const { getPeritos, getPeritoById, createPerito, deletePerito } = require('../controllers/peritos.controller');

router.get('/', getPeritos);
router.get('/:id', getPeritoById);
router.post('/', createPerito);
router.delete('/:id', deletePerito);

module.exports = router;