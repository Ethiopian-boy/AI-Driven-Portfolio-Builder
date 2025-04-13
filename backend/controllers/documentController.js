const Document = require('../models/Document');

exports.uploadCV = async (req, res) => {
  try {
    const { originalCVUrl, selectedTemplate } = req.body;
    const document = new Document({
      user: req.user,
      originalCVUrl,
      selectedTemplate
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};