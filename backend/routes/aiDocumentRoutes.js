const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { generateDocumentUpdates, modifyDocumentField } = require('../controllers/aiDocumentController');

router.use(authMiddleware);

// Endpoint to generate insights (updates recommendations)
router.post('/:documentId/generate', generateDocumentUpdates);

// Endpoint to modify document based on outputType (CV, CoverLetter, Portfolio)
// Example URL: /api/ai-documents/<documentId>/modify/CV
router.post('/:documentId/modify/:outputType', modifyDocumentField);

module.exports = router;
