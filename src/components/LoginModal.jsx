import React, { useState } from 'react';

/**
 * Login Modal - Compact Design
 * - Email and password inputs
 * - Register and Account recovery links
 * - Keep me logged in checkbox
 * - Modal overlay with backdrop
 */
export const LoginModal = ({ isOpen, onClose, onRecoveryClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate login
    setIsLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('uiExtension-users') || '[]');
      const user = users.find(u => u.email === formData.email);

      if (!user) {
        setError('Email not found. Please register first.');
        setIsLoading(false);
        return;
      }

      // Create session
      const userSession = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: user.name,
        role: user.role || 'user',
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('uiExtension-user', JSON.stringify(userSession));
      localStorage.setItem('uiExtension-isLoggedIn', 'true');
      localStorage.setItem('uiExtension-userRole', user.role || 'user');

      if (formData.keepLoggedIn) {
        localStorage.setItem('uiExtension-rememberMe', 'true');
      }

      setIsLoading(false);
      onClose();
      window.location.href = '/home';
    }, 600);
  };

  const handleRecoveryClick = () => {
    if (onRecoveryClick) {
      onRecoveryClick();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2>
            <span className="login-icon">➜]</span> Log-in
          </h2>
          <span className="close-btn" onClick={onClose}>
            &times;
          </span>
        </div>

        {/* Modal Body */}
        <form className="modal-body" onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: '4px',
              padding: '10px 15px',
              marginBottom: '20px',
              color: '#c33',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="input-group">
            <span className="icon">✉</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Helper Links */}
          <div className="helper-links">
            <div className="link-item">
              <p>Do not have an account?</p>
              <a href="/register">
                <span className="green-icon">👤+</span> Register Now
              </a>
            </div>
            <div className="link-item">
              <p>Forgot your password?</p>
              <button
                type="button"
                className="link-button"
                onClick={handleRecoveryClick}
                disabled={!onRecoveryClick}
                aria-disabled={!onRecoveryClick}
              >
                <span className="red-icon">👤🕒</span> Account recovery
              </button>
            </div>
          </div>

          {/* Footer & Buttons */}
          <div className="modal-footer">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="keepLoggedIn"
                checked={formData.keepLoggedIn}
                onChange={handleChange}
              />
              {' '}Keep me Logged-in
            </label>
            <div className="button-group">
              <button
                type="submit"
                className="btn-login"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Logging in...' : '➜] Log-in'}
              </button>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              >
                ✖ Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
