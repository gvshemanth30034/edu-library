import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, LogOut, Maximize2, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';

/**
 * NDL-INSPIRED NAVBAR
 * - National Digital Library branding
 * - Language selector
 * - Auth links (Login/Register or User profile)
 * - Fullscreen toggle
 */
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('uiExtension-isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('uiExtension-user') || '{}');
        const normalizedRole = user.role === 'user' ? 'student' : (user.role || 'student');
        setUserName(user.name || user.email || 'User');
        setUserRole(normalizedRole);
      }
    };
    
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('uiExtension-user');
    localStorage.removeItem('uiExtension-isLoggedIn');
    localStorage.removeItem('uiExtension-userRole');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    setIsMenuOpen(false);
    navigate('/');
  };

  // Fullscreen toggle
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <nav className="ndl-navbar bg-white shadow-sm sticky top-0 z-50 border-b-2 border-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              📚
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-teal-900 leading-tight">NATIONAL</h1>
              <p className="text-xs text-teal-700">DIGITAL LIBRARY</p>
            </div>
          </Link>

          {/* Middle Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/catalogs" className="text-gray-700 hover:text-teal-900 text-sm font-medium transition">
              {translate('browse', language)}
            </Link>
            <a href="#" className="text-gray-700 hover:text-teal-900 text-sm font-medium transition">
              {translate('guidelines', language)}
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-900 text-sm font-medium transition">
              {translate('about', language)}
            </a>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900 cursor-pointer"
            >
              <option value="English">EN</option>
              <option value="Hindi">हिंदी</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Bengali">বাংলা</option>
              <option value="Marathi">मराठी</option>
            </select>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleFullscreen}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              title="Toggle Fullscreen"
            >
              <Maximize2 size={18} className="text-gray-700" />
            </button>

            {/* Auth Buttons / User Menu */}
            {isLoggedIn ? (
              <>
                <span className="text-xs font-medium text-gray-700 px-2 py-1 bg-teal-50 rounded">
                  👤 {userName}
                  {userRole === 'admin' && <span className="text-red-600 ml-1">👑</span>}
                </span>
                {userRole === 'admin' ? (
                  <Link
                    to="/admin-dashboard"
                    className="text-xs font-medium text-red-600 hover:text-red-700 transition"
                  >
                    {translate('admin', language)}
                  </Link>
                ) : (
                  <Link
                    to="/student-dashboard"
                    className="text-xs font-medium text-teal-900 hover:text-teal-700 transition"
                  >
                    {translate('student', language)}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition flex items-center gap-1"
                >
                  <LogOut size={14} />
                  {translate('logout', language)}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-medium text-teal-900 hover:text-teal-700 transition"
                >
                  {translate('login', language)}
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-medium text-white bg-teal-900 hover:bg-teal-800 rounded transition"
                >
                  {translate('signup', language)}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-teal-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/catalogs"
              className="block text-gray-700 hover:text-teal-900 text-sm font-medium px-3 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate('browse', language)}
            </Link>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Bengali">বাংলা</option>
              <option value="Marathi">मराठी</option>
            </select>
            
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-700">👤 {userName}</div>
                {userRole === 'admin' ? (
                  <Link
                    to="/admin-dashboard"
                    className="block text-red-600 hover:text-red-700 text-sm font-medium px-3 py-2 hover:bg-red-50 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translate('adminDashboard', language)}
                  </Link>
                ) : (
                  <Link
                    to="/student-dashboard"
                    className="block text-teal-900 hover:text-teal-700 text-sm font-medium px-3 py-2 hover:bg-teal-50 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translate('studentDashboard', language)}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition flex items-center gap-2"
                >
                  <LogOut size={14} />
                  {translate('logout', language)}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 text-sm text-teal-900 border border-teal-900 rounded hover:bg-teal-50 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate('login', language)}
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-3 py-2 text-sm text-white bg-teal-900 rounded hover:bg-teal-800 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate('signup', language)}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
