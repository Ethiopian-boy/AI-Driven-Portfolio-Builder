// src/components/Footer.js
import React from 'react';

const Footer = () => (
  <footer style={{ background: '#333', padding: '20px', color: '#fff', textAlign: 'center' }}>
    <p>&copy; {new Date().getFullYear()} AI-Driven Portfolio Builder. All Rights Reserved.</p>
  </footer>
);

export default Footer;
