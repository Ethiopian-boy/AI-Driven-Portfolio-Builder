// aiDocumentController.js
const Document = require('../models/Document');
const JobApplication = require('../models/JobApplication');
const Portfolio = require('../models/Portfolio');
const { generatePortfolioInsights, modifyDocument } = require('../services/aiService');

exports.generateDocumentUpdates = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findOne({ _id: documentId, user: req.user });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    
    const portfolio = await Portfolio.findOne({ user: req.user });
    const structuredPortfolio = portfolio
      ? {
          title: portfolio.title,
          description: portfolio.description,
          projects: portfolio.projects.map(proj => ({
            name: proj.name,
            description: proj.description,
            link: proj.link,
          })),
        }
      : "No portfolio data provided.";
    
    const documentWithPortfolio = {
      ...document.toObject(),
      portfolioData: structuredPortfolio,
    };

    const aiOutput = await generatePortfolioInsights(documentWithPortfolio.portfolioData);
    const outputContent = aiOutput.content;
    document.generatedCV = outputContent;
    document.iterations.push({ content: outputContent });
    await document.save();
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.modifyDocumentField = async (req, res) => {
  try {
    const { documentId, outputType } = req.params;
    const document = await Document.findOne({ _id: documentId, user: req.user });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    
    const portfolio = await Portfolio.findOne({ user: req.user });
    const structuredPortfolio = portfolio
      ? {
          title: portfolio.title,
          description: portfolio.description,
          projects: portfolio.projects.map(proj => ({
            name: proj.name,
            description: proj.description,
            link: proj.link,
          })),
        }
      : "No portfolio data provided.";
    
    const documentWithPortfolio = {
      ...document.toObject(),
      portfolioData: structuredPortfolio,
    };
    
    const jobApp = await JobApplication.findOne({ user: req.user }).sort({ createdAt: -1 });
    const jobDetails = {
      outputType,
      position: jobApp ? jobApp.position : "[Position]",
      company: jobApp ? jobApp.companyName : "[Company]",
      jobDescription: jobApp ? jobApp.jobDescription : "[Job Description]",
    };

    const aiOutput = await modifyDocument(documentWithPortfolio, jobDetails);
    const outputContent = aiOutput.content;
    
    if (outputType === "CV") {
      document.modifiedCV = outputContent;
    } else if (outputType === "CoverLetter") {
      document.modifiedCoverLetter = outputContent;
    } else if (outputType === "Portfolio") {
      document.modifiedPortfolio = outputContent;
    }
    
    document.iterations.push({ content: outputContent });
    await document.save();
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
