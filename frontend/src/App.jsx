// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import CVTemplatePage from './pages/CVTemplatePage';
import JobApplicationPage from './pages/JobApplicationPage';
import ResultsPage from './pages/ResultsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import AddPortfolioPage from './pages/AddPortfolioPage';


function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '20px' }}>
          <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
          path="/cv-template"
          element={
            <ProtectedRoute>
              <CVTemplatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-application"
          element={
            <ProtectedRoute>
              <JobApplicationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-portfolio"
          element={
            <ProtectedRoute>
              <AddPortfolioPage />
            </ProtectedRoute>
          }
        />

            {/*<Route path="/cv-template" element={<CVTemplatePage />} />
            <Route path="/job-application" element={<JobApplicationPage />} />
            <Route path="/results" element={<ResultsPage />} />*/}
          </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
