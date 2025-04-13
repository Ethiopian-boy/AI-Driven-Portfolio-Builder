const Portfolio = require('../models/Portfolio');

// Create a new portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, projects } = req.body;
    // req.user comes from the authentication middleware
    const portfolio = new Portfolio({
      user: req.user,
      title,
      description,
      projects
    });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all portfolios for the authenticated user
exports.getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a portfolio (using portfolio ID)
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: id, user: req.user },
      req.body,
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findOneAndDelete({ _id: id, user: req.user });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
