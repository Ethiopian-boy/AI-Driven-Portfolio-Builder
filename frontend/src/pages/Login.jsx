// src/pages/Login.jsx
import React, { useState, useContext  } from 'react';
import axios from 'axios';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // Ensure response.data.token exists
      if (response.data.token) {
        login(response.data.token);
        localStorage.setItem('jwtToken', response.data.token);
        navigate('/dashboard');
      } else {
        console.error('No token returned from API');
      }
    {/* try {
      const response = await loginUser({ email, password });
      const token = response.data.token; // Adjust based on your backend's response structure
      localStorage.setItem('jwtToken', token);
      // Redirect to the dashboard or results page after successful login
      navigate('/'); */}
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
