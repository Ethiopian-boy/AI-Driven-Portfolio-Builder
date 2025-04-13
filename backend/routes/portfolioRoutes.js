
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPortfolio,
  getUserPortfolios,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController');

// Protect all portfolio routes with authentication middleware
router.use(authMiddleware);

router.post('/', createPortfolio);
router.get('/', getUserPortfolios);
router.put('/:id', updatePortfolio); // You can also use PATCH if you prefer partial updates
router.delete('/:id', deletePortfolio);

module.exports = router;
