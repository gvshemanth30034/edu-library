import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';

/**
 * FRONTEND-ONLY LOGIN PAGE
 * - No backend authentication
 * - Stores fake user session in localStorage
 * - Simulates login with basic validation
 */

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const createDemoSession = (role) => {
    const demoSession = {
      id: Math.random().toString(36).substr(2, 9),
      email: `demo.${role}@library.local`,
      name: role === 'admin' ? 'Admin Demo' : 'Student Demo',
      role,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem('uiExtension-user', JSON.stringify(demoSession));
    localStorage.setItem('uiExtension-isLoggedIn', 'true');
    localStorage.setItem('uiExtension-userRole', role);

    navigate(role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
  };

  // Handle login form submission (frontend only)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation - required fields
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    // Simulate login delay (as if calling API)
    setIsLoading(true);
    setTimeout(() => {
      // ROLE SYSTEM: Look up user from registered users or create default
      const existingUsers = JSON.parse(localStorage.getItem('uiExtension-users') || '[]');
      const registeredUser = existingUsers.find(u => u.email === email);
      
      // Extract role from registered user data, or default to "user"
      const normalizedRole = registeredUser?.role === 'user' ? 'student' : (registeredUser?.role || 'student');
      const userRole = normalizedRole;

      // Create user session object
      const fakeUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: registeredUser?.name || email.split('@')[0],
        role: userRole, // ROLE SYSTEM: Store role
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      // Store session in localStorage
      localStorage.setItem('uiExtension-user', JSON.stringify(fakeUser));
      localStorage.setItem('uiExtension-isLoggedIn', 'true');
      localStorage.setItem('uiExtension-userRole', userRole); // ROLE SYSTEM: Store role separately

      setIsLoading(false);
      // Redirect to role dashboard
      navigate(userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard');
    }, 600);
  };

  return (
    <div className="uiExtension-loginContainer min-h-screen bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center px-4 py-8">
      <div className="uiExtension-loginCard w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
            📚
          </div>
          <h1 className="heading-entrance heading-premium text-3xl font-bold text-teal-900 mb-2">{translate('welcomeBack', language)}</h1>
          <p className="heading-entrance heading-entrance-delay-1 text-gray-600">{translate('signInAccount', language)}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="uiExtension-errorAlert mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {translate('emailAddress', language)}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={translate('emailPlaceholder', language)}
                className="uiExtension-inputField w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {translate('password', language)}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={translate('passwordPlaceholder', language)}
                className="uiExtension-inputField w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
              {/* Show/Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="uiExtension-loginBtn w-full py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-green-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? translate('signingIn', language) : translate('signIn', language)}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">{translate('or', language)}</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            {translate('noAccount', language)}{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-teal-600 font-semibold hover:text-teal-700 transition hover:underline"
            >
              {translate('createOne', language)}
            </button>
          </p>
        </div>

        <div className="demo-login">
          <span>{translate('quickDemo', language)}</span>
          <button type="button" onClick={() => createDemoSession('student')}>
            {translate('demoStudent', language)}
          </button>
          <button type="button" onClick={() => createDemoSession('admin')}>
            {translate('demoAdmin', language)}
          </button>
        </div>

        {/* Demo Credentials Info */}
        <div className="uiExtension-demoInfo mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200">
          <p className="text-xs text-teal-700 font-medium">
            💡 <strong>{translate('demoMode', language)}</strong> {translate('demoModeText', language)}
          </p>
        </div>
      </div>
    </div>
  );
};
