import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
  <header style={{ background: '#333', padding: '20px', color: '#fff' }}>
    <h1>AI-Driven Portfolio Builder</h1>
    <nav>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
        {isAuthenticated ? (
          <>
          <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
        <li><Link to="/cv-template" style={{ color: '#fff', textDecoration: 'none' }}>CV / Template</Link></li>
        <li><Link to="/job-application" style={{ color: '#fff', textDecoration: 'none' }}>Job Application</Link></li>
        <li><Link to="/add-portfolio" style={{ color: '#fff' }}>Add/Update Portfolio</Link></li>
        <li><Link to="/results" style={{ color: '#fff', textDecoration: 'none' }}>Results</Link></li>
        <li><button onClick={logout} >Logout</button></li>
          </>
        ) : (
          <>
          <li><Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link></li>
          <li><Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>Sign Up</Link></li>
          </>
        )}
        {/*
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
        <li><Link to="/cv-template" style={{ color: '#fff', textDecoration: 'none' }}>CV / Template</Link></li>
        <li><Link to="/job-application" style={{ color: '#fff', textDecoration: 'none' }}>Job Application</Link></li>
        <li><Link to="/results" style={{ color: '#fff', textDecoration: 'none' }}>Results</Link></li>
        <li><Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link></li>
        <li><Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>Sign Up</Link></li>
      */}
        </ul>
    </nav>
  </header>
);
};
export default Header;
