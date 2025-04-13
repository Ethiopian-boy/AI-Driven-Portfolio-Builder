// src/pages/CVTemplatePage.js
import React, { useState } from 'react';
import axios from 'axios';

const CVTemplatePage = () => {
  const [cvFile, setCvFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const token = localStorage.getItem('jwtToken');

  const handleTemplateSelect = (template) => setSelectedTemplate(template);

  const handleSubmit = async (e) => {
  e.preventDefault();
  // For file upload, use FormData:
  const formData = new FormData();
  formData.append("originalCVUrl", cvFile); // This will be handled by your backend upload logic
  formData.append("selectedTemplate", selectedTemplate); // Ensure this is a valid ID if needed
  
  // Make your API call to upload CV (adjust endpoint as necessary)
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE}/documents`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Document uploaded:", res.data);
  } catch (error) {
    console.error("Upload error:", error);
  }
};


  {/*
    const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send cvFile and selectedTemplate to your backend
    console.log('CV File:', cvFile);
    console.log('Selected Template:', selectedTemplate);
  };
  */}

  return (
    <div>
      <h2>Upload Your CV or Choose a Template</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload CV: </label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <label>Select a Template:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => handleTemplateSelect('Template1')}>Template 1</button>
            <button type="button" onClick={() => handleTemplateSelect('Template2')}>Template 2</button>
            <button type="button" onClick={() => handleTemplateSelect('Template3')}>Template 3</button>
          </div>
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Save & Continue</button>
      </form>
    </div>
  );
};

export default CVTemplatePage;
