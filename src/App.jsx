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
import { CategoryContentPage } from './pages/CategoryContentPage.jsx';
import { DepartmentsPage } from './pages/DepartmentsPage.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import { ResourcesAnalytics } from './pages/ResourcesAnalytics.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { DisclaimerPage } from './pages/DisclaimerPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { SponsorPage } from './pages/SponsorPage.jsx';
import { CopyrightPage } from './pages/CopyrightPage.jsx';
import { GuidelinesPage } from './pages/GuidelinesPage.jsx';
import { SitemapPage } from './pages/SitemapPage.jsx';
import { BrandingPage } from './pages/BrandingPage.jsx';
import { NDLIClubPage } from './pages/NDLIClubPage.jsx';
import { IDRHostingPage } from './pages/IDRHostingPage.jsx';
import { InstitutionalLibraryPage } from './pages/InstitutionalLibraryPage.jsx';
import { DigitalPreservationPage } from './pages/DigitalPreservationPage.jsx';
import { FeedbackPage } from './pages/FeedbackPage.jsx';
import { RecentUploads } from './pages/RecentUploads.jsx';
import { RequestsLog } from './pages/RequestsLog.jsx';
import { AdminAnnouncements } from './pages/AdminAnnouncements.jsx';
import { UsersLog } from './pages/UsersLog.jsx';
import { AdminSettings } from './pages/AdminSettings.jsx';
import { VideoPlayerPage } from './pages/VideoPlayerPage.jsx';
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

        {/* Footer Pages - Always accessible */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/copyright" element={<CopyrightPage />} />
        <Route path="/registration" element={<GuidelinesPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/branding" element={<BrandingPage />} />
        <Route path="/ndli-club" element={<NDLIClubPage />} />
        <Route path="/idr-hosting" element={<IDRHostingPage />} />
        <Route path="/institutional-library" element={<InstitutionalLibraryPage />} />
        <Route path="/digital-preservation" element={<DigitalPreservationPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />

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
        <Route path="/category/:slug" element={<CategoryContentPage />} />
        <Route path="/saved-resources" element={<SavedResourcesPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/request-resource" element={<RequestResourcePage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />

        {/* ROLE SYSTEM: Admin Dashboard - Protected route for admins only */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/resources-analytics/:section?" element={<ResourcesAnalytics />} />
        <Route path="/recent-uploads" element={<RecentUploads />} />
        <Route path="/requests-log" element={<RequestsLog />} />
        <Route path="/admin-announcements" element={<AdminAnnouncements />} />
        <Route path="/users-log" element={<UsersLog />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/videos/:slug" element={<VideoPlayerPage />} />

        {/* ROLE SYSTEM: Student Dashboard - Protected route for students only */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* 404 Handler - Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
