const JobApplication = require('../models/JobApplication');

exports.createJobApplication = async (req, res) => {
  try {
    const { jobDescription, position, companyName, requirements } = req.body;
    const jobApp = new JobApplication({
      user: req.user,
      jobDescription,
      position,
      companyName,
      requirements
    });
    await jobApp.save();
    res.status(201).json(jobApp);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ message: error.message });
  }
};
