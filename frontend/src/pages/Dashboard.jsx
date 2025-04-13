// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <h2>Welcome to Your Dashboard</h2>
    <p>Get started by choosing an option:</p>
    <ul>
      <li><Link to="/cv-template">Upload CV / Select Template</Link></li>
      <li><Link to="/job-application">Enter Job Application Details</Link></li>
      <li><Link to="/add-portfolio">Add/Update Portfolio</Link></li>
      <li><Link to="/results">View AI-Generated Results</Link></li>
    </ul>
  </div>
);

export default Dashboard;
