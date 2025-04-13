const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadCV, getUserDocuments  } = require('../controllers/documentController');

router.use(authMiddleware);
router.post('/', uploadCV);
router.get('/', getUserDocuments);


module.exports = router;
