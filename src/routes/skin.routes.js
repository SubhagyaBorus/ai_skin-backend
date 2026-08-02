const express = require('express');
const { analyzeSkin } = require('../controllers/skin.controller');
const router = express.Router();

router.post('/analyze', analyzeSkin);

module.exports = router;