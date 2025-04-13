// src/pages/AddPortfolioPage.jsx
import React, { useState, useEffect } from 'react';
import { createPortfolio, updatePortfolio, getUserPortfolios } from '../services/api';

const AddPortfolioPage = () => {
  const token = localStorage.getItem('jwtToken');
  const [portfolioId, setPortfolioId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState({ name: '', description: '', link: '' });
  const [loading, setLoading] = useState(false);

  // On mount, fetch existing portfolio details for the user
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getUserPortfolios(token);
        if (res.data && res.data.length > 0) {
          const userPortfolio = res.data[0];
          setPortfolioId(userPortfolio._id);
          setTitle(userPortfolio.title);
          setDescription(userPortfolio.description || '');
          setProjects(userPortfolio.projects || []);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    if (token) {
      fetchPortfolio();
    }
  }, [token]);

  const handleAddProject = () => {
    if (!projectInput.name.trim()) return;
    setProjects([...projects, projectInput]);
    setProjectInput({ name: '', description: '', link: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const portfolioData = { title, description, projects };
    try {
      let res;
      if (portfolioId) {
        res = await updatePortfolio(portfolioId, portfolioData, token);
      } else {
        res = await createPortfolio(portfolioData, token);
        setPortfolioId(res.data._id);
      }
      alert('Portfolio saved successfully!');
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Error saving portfolio. Please check the console.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{portfolioId ? 'Update Your Portfolio' : 'Create Your Portfolio'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Description: </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Projects</h3>
          {projects.map((proj, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Name:</strong> {proj.name}</p>
              <p><strong>Description:</strong> {proj.description}</p>
              <p><strong>Link:</strong> {proj.link}</p>
            </div>
          ))}
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Project Name"
              value={projectInput.name}
              onChange={(e) => setProjectInput({ ...projectInput, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Description"
              value={projectInput.description}
              onChange={(e) => setProjectInput({ ...projectInput, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Link"
              value={projectInput.link}
              onChange={(e) => setProjectInput({ ...projectInput, link: e.target.value })}
            />
            <button type="button" onClick={handleAddProject}>
              Add Project
            </button>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPortfolioPage;
