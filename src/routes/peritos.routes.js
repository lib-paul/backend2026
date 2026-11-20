const express = require('express');
const router = express.Router();
const { getPeritos, getPeritoById, createPerito } = require('../controllers/peritos.controller');

router.get('/', getPeritos);
router.get('/:id', getPeritoById);
router.post('/', createPerito);

module.exports = router;