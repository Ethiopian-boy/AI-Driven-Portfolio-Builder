// models/Portfolio.js
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String },
      link: { type: String }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
