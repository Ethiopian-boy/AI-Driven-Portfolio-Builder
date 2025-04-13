// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount using the same key ("jwtToken")
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Mark loading complete after checking localStorage
  }, []);

  const login = (newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
