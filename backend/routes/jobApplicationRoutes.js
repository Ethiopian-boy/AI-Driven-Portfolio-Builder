const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createJobApplication } = require('../controllers/jobApplicationController');

router.use(authMiddleware);
router.post('/', createJobApplication);

module.exports = router;
