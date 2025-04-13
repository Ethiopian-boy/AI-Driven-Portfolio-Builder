const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true } // URL/path to the template file (could be stored in cloud storage)
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
