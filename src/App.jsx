import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';
import { BrowseCatalogsPage } from './pages/BrowseCatalogsPage.jsx';
import { SavedResourcesPage } from './pages/SavedResourcesPage.jsx';
import { DownloadsPage } from './pages/DownloadsPage.jsx';
import { RequestResourcePage } from './pages/RequestResourcePage.jsx';
import { MyRequestsPage } from './pages/MyRequestsPage.jsx';
import { AnnouncementsPage } from './pages/AnnouncementsPage.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import './index.css';

/**
 * MAIN APP COMPONENT WITH ROUTING
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const loggedIn = localStorage.getItem('uiExtension-isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Listen for storage changes (to sync logout across tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem('uiExtension-isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing Page - Always accessible (new home page design) */}
        <Route path="/" element={<LandingPage />} />

        {/* Home Page - Resource browsing page */}
        <Route path="/home" element={<HomePage />} />

        {/* Register Page - Full-width registration page */}
        <Route path="/register" element={<RegistrationPage />} />

        {/* Login Page - Redirect to home if already logged in */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* Register Page - Redirect to home if already logged in */}
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        {/* Browse Catalogs - Always accessible */}
        <Route path="/catalogs" element={<BrowseCatalogsPage />} />
        <Route path="/saved-resources" element={<SavedResourcesPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/request-resource" element={<RequestResourcePage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />

        {/* ROLE SYSTEM: Admin Dashboard - Protected route for admins only */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ROLE SYSTEM: Student Dashboard - Protected route for students only */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* 404 Handler - Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
