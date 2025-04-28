const express = require('express');
const router = express.Router();
const { criar, listar } = require('../Controllers/triagemController');

router.post('/triagens', criar);
router.get('/triagens', listar);

module.exports = router;