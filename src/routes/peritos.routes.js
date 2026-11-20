const express = require('express');
const router = express.Router();
const { getPeritos } = require('../controllers/peritos.controller');

router.get('/', getPeritos);

module.exports = router;