// src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// Auth related endpoints
export const registerUser = async (userData) => {
  return axios.post(`${API_BASE}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_BASE}/auth/login`, userData);
};

// Documents endpoints
export const getUserDocuments = async (token) => {
  return axios.get(`${API_BASE}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const generateDocumentUpdates = async (documentId, token) => {
  return axios.post(
    `${API_BASE}/ai-documents/${documentId}/generate`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const modifyDocumentField = async (documentId, outputType, token) => {
  return axios.post(
    `${API_BASE}/ai-documents/${documentId}/modify/${outputType}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const downloadModifiedDocument = async (documentId, token, outputType) => {
  return axios.get(`${API_BASE}/documentDownload/${documentId}/download?type=${outputType}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
};

// Portfolio endpoints
export const createPortfolio = async (portfolioData, token) => {
  return axios.post(`${API_BASE}/portfolio`, portfolioData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePortfolio = async (portfolioId, portfolioData, token) => {
  return axios.put(`${API_BASE}/portfolio/${portfolioId}`, portfolioData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserPortfolios = async (token) => {
  return axios.get(`${API_BASE}/portfolio`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
