const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { generatePortfolioInsights } = require('../services/aiService');

// Protect this route with authentication
router.use(authMiddleware);

// POST endpoint to generate insights for a user's portfolio
router.post('/insights', async (req, res) => {
  try {
    // Assume the request body contains the portfolio data you want to analyze
    const portfolioData = req.body;
    
    // Optionally, you could fetch the user's portfolio from the DB using req.user
    // For now, we just work with the submitted data

    const insights = await generatePortfolioInsights(portfolioData);
    res.status(200).json({ insights });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate insights", error: error.message });
  }
});

module.exports = router;
