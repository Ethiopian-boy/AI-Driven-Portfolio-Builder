// controllers/documentDownloadController.js
const PDFDocument = require('pdfkit');
const Document = require('../models/Document');

exports.downloadModifiedCV = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findOne({ _id: documentId, user: req.user });
    if (!document || !document.modifiedCV) {
      return res.status(404).json({ message: "Modified CV not found" });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=modified_cv.pdf');
    res.setHeader('Content-type', 'application/pdf');

    doc.text(document.modifiedCV);
    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
