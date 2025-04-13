// routes/documentDownloadRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { downloadModifiedCV } = require('../controllers/documentDownloadController');

router.use(authMiddleware);
router.get('/:documentId/download', downloadModifiedCV);

module.exports = router;
