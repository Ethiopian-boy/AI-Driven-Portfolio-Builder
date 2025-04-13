// src/pages/JobApplicationPage.js
import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationPage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [requirements, setRequirements] = useState('');
  const token = localStorage.getItem('jwtToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the payload to send
    const payload = {
      jobDescription,
      position,
      companyName,
      requirements,
    };

    try {
      // Adjust the endpoint URL if your backend route is different
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/jobapplications`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Job application saved:', res.data);
      alert('Job application submitted successfully!');
      
      // Optionally, clear the form fields
      setJobDescription('');
      setPosition('');
      setCompanyName('');
      setRequirements('');
    } catch (error) {
      console.error('Error submitting job application:', error);
      alert('Error submitting job application. Check the console for details.');
    }
  };

  return (
    <div>
      <h2>Enter Job Application Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="4"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Requirements:</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows="4"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationPage;
