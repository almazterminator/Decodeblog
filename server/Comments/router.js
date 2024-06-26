const express = require('express');
const router = express.Router();
const {saveComm} = require('./controller');

router.post('/api/comment', saveComm); // Путь будет /api/comment

module.exports = router;