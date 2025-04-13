const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  jobDescription: { type: String, required: true },
  position: { type: String },
  companyName: { type: String },
  requirements: { type: String },
  // You can add other fields as needed (e.g., applicationDate, status)
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
