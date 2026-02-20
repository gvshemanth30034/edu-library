import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, LogOut, Maximize2, Menu, X } from 'lucide-react';

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
  const [language, setLanguage] = useState('EN');
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('uiExtension-isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('uiExtension-user') || '{}');
        setUserName(user.name || user.email || 'User');
        setUserRole(user.role || 'user');
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
    <nav className="ndl-navbar bg-white shadow-sm sticky top-0 z-50 border-b-2 border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              📚
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-blue-900 leading-tight">NATIONAL</h1>
              <p className="text-xs text-blue-700">DIGITAL LIBRARY</p>
            </div>
          </Link>

          {/* Middle Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/catalogs" className="text-gray-700 hover:text-blue-900 text-sm font-medium transition">
              Browse
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-900 text-sm font-medium transition">
              Guidelines
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-900 text-sm font-medium transition">
              About
            </a>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer"
            >
              <option value="EN">EN</option>
              <option value="HI">हिंदी</option>
              <option value="TA">தமிழ்</option>
              <option value="TE">తెలుగు</option>
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
                <span className="text-xs font-medium text-gray-700 px-2 py-1 bg-blue-50 rounded">
                  👤 {userName}
                  {userRole === 'admin' && <span className="text-red-600 ml-1">👑</span>}
                </span>
                {userRole === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="text-xs font-medium text-red-600 hover:text-red-700 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition flex items-center gap-1"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-medium text-blue-900 hover:text-blue-700 transition"
                >
                  Log-in
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-900 hover:bg-blue-800 rounded transition"
                >
                  Sign-up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/catalogs"
              className="block text-gray-700 hover:text-blue-900 text-sm font-medium px-3 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="EN">English</option>
              <option value="HI">हिंदी</option>
              <option value="TA">தமிழ்</option>
              <option value="TE">తెలుగు</option>
            </select>
            
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-700">👤 {userName}</div>
                {userRole === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="block text-red-600 hover:text-red-700 text-sm font-medium px-3 py-2 hover:bg-red-50 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 text-sm text-blue-900 border border-blue-900 rounded hover:bg-blue-50 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log-in
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-3 py-2 text-sm text-white bg-blue-900 rounded hover:bg-blue-800 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign-up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
