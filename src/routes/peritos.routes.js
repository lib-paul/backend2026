const express = require('express');
const router = express.Router();
const { getPeritos, getPeritoById } = require('../controllers/peritos.controller');

router.get('/', getPeritos);
router.get('/:id', getPeritoById);

module.exports = router;