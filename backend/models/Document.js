const mongoose = require('mongoose');

const IterationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  feedback: { type: String }, // User's feedback on this iteration
  createdAt: { type: Date, default: Date.now }
});

const DocumentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  originalCVUrl: { type: String }, // URL/path of the uploaded CV (if provided)
  selectedTemplate: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Template' 
  },
  // AI-generated outputs
  generatedCV: { type: String },
  generatedCoverLetter: { type: String },
  generatedPortfolio: { type: String },
  // Store iteration history for changes/feedback
  modifiedCV: { type: String },
  modifiedCoverLetter: { type: String },
  iterations: [IterationSchema]
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
