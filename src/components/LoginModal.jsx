import React, { useState, useEffect, useRef } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, X, UserPlus, KeyRound, GraduationCap, ShieldCheck, Loader2 } from 'lucide-react';

/**
 * Login Modal - Modern Animated Design
 * Teal/green theme matching the Digital Library branding
 */
export const LoginModal = ({ isOpen, onClose, onRecoveryClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setTimeout(() => emailRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const handleAnimatedClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 280);
  };

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

    if (!formData.email.trim()) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError('Please enter a valid email'); return; }
    if (!formData.password.trim()) { setError('Password is required'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setIsLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('uiExtension-users') || '[]');
      const user = users.find(u => u.email === formData.email);

      if (!user) {
        setError('Email not found. Please register first.');
        setIsLoading(false);
        return;
      }

      const normalizedRole = user.role === 'user' ? 'student' : (user.role || 'student');
      const userSession = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: user.name,
        role: normalizedRole,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('uiExtension-user', JSON.stringify(userSession));
      localStorage.setItem('uiExtension-isLoggedIn', 'true');
      localStorage.setItem('uiExtension-userRole', normalizedRole);

      if (formData.keepLoggedIn) {
        localStorage.setItem('uiExtension-rememberMe', 'true');
      }

      setIsLoading(false);
      setSuccessLogin(true);
      setTimeout(() => {
        onClose();
        window.location.href = normalizedRole === 'admin' ? '/admin-dashboard' : '/student-dashboard';
      }, 700);
    }, 600);
  };

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

    setSuccessLogin(true);
    setTimeout(() => {
      onClose();
      window.location.href = role === 'admin' ? '/admin-dashboard' : '/student-dashboard';
    }, 700);
  };

  const handleRecoveryClick = () => {
    if (onRecoveryClick) onRecoveryClick();
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`lm-overlay ${isClosing ? 'lm-overlay--closing' : ''}`}
      onClick={handleAnimatedClose}
    >
      <div
        className={`lm-card ${isClosing ? 'lm-card--closing' : ''} ${successLogin ? 'lm-card--success' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top accent */}
        <div className="lm-accent-bar" />

        {/* Floating particles */}
        <div className="lm-particles">
          <span /><span /><span /><span /><span />
        </div>

        {/* Close button */}
        <button className="lm-close-btn" onClick={handleAnimatedClose} aria-label="Close">
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Header */}
        <div className="lm-header">
          <div className="lm-logo-circle">
            {successLogin ? (
              <ShieldCheck size={28} strokeWidth={2} />
            ) : (
              <LogIn size={28} strokeWidth={2} />
            )}
          </div>
          <h2 className="lm-title">{successLogin ? 'Welcome Back!' : 'Sign In'}</h2>
          <p className="lm-subtitle">
            {successLogin ? 'Redirecting you now...' : 'Access the Digital Library'}
          </p>
        </div>

        {successLogin ? (
          <div className="lm-success-animation">
            <div className="lm-success-checkmark">
              <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none" />
                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          </div>
        ) : (
          <form className="lm-form" onSubmit={handleSubmit}>
            {/* Error */}
            {error && (
              <div className="lm-error">
                <span className="lm-error-icon">!</span>
                {error}
              </div>
            )}

            {/* Email */}
            <div className={`lm-input-wrap ${emailFocused || formData.email ? 'lm-input-wrap--active' : ''}`}>
              <Mail size={18} className="lm-input-icon" />
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="lm-input"
                placeholder=" "
                autoComplete="email"
              />
              <label className="lm-float-label">Email address</label>
              <div className="lm-input-highlight" />
            </div>

            {/* Password */}
            <div className={`lm-input-wrap ${passwordFocused || formData.password ? 'lm-input-wrap--active' : ''}`}>
              <Lock size={18} className="lm-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="lm-input"
                placeholder=" "
                autoComplete="current-password"
              />
              <label className="lm-float-label">Password</label>
              <button
                type="button"
                className="lm-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <div className="lm-input-highlight" />
            </div>

            {/* Remember + Forgot */}
            <div className="lm-options-row">
              <label className="lm-checkbox-label">
                <input
                  type="checkbox"
                  name="keepLoggedIn"
                  checked={formData.keepLoggedIn}
                  onChange={handleChange}
                  className="lm-checkbox"
                />
                <span className="lm-checkbox-custom" />
                Keep me signed in
              </label>
              <button
                type="button"
                className="lm-link-btn"
                onClick={handleRecoveryClick}
                disabled={!onRecoveryClick}
              >
                <KeyRound size={13} /> Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className="lm-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={18} className="lm-spinner" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>

            {/* Divider */}
            <div className="lm-divider">
              <span>or try a quick demo</span>
            </div>

            {/* Demo buttons */}
            <div className="lm-demo-row">
              <button type="button" className="lm-demo-btn lm-demo-btn--student" onClick={() => createDemoSession('student')}>
                <GraduationCap size={16} />
                Student
              </button>
              <button type="button" className="lm-demo-btn lm-demo-btn--admin" onClick={() => createDemoSession('admin')}>
                <ShieldCheck size={16} />
                Admin
              </button>
            </div>

            {/* Register link */}
            <p className="lm-register-text">
              Don't have an account?{' '}
              <a href="/register" className="lm-register-link">
                <UserPlus size={14} /> Create one
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
