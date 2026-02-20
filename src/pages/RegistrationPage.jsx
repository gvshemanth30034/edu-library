import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Registration Page
 * - Modal-style form layout
 * - Clean 2-column label + input design
 * - Account Details & Personal Information sections
 * - Form validation with localStorage integration
 */
export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    state: '',
    district: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const districts = [
    'District 1', 'District 2', 'District 3', 'District 4', 'District 5'
  ];

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
    setSuccess('');

    // Validation
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return;
    }
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.dob) {
      setError('Date of birth is required');
      return;
    }
    if (!formData.state) {
      setError('State is required');
      return;
    }

    // Simulate registration
    setIsLoading(true);
    setTimeout(() => {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName || ''}`.trim(),
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        gender: formData.gender,
        state: formData.state,
        district: formData.district,
        role: 'user',
        registeredAt: new Date().toISOString(),
      };

      const users = JSON.parse(localStorage.getItem('uiExtension-users') || '[]');
      users.push(newUser);
      localStorage.setItem('uiExtension-users', JSON.stringify(users));

      setIsLoading(false);
      setSuccess('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: '',
      gender: '',
      state: '',
      district: '',
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="register-page">
      <div className="register-modal-wrapper">
        {/* Modal Header */}
        <div className="register-modal-header">
          <h3>👤+ Account Registration</h3>
          <span 
            className="register-close-btn" 
            onClick={() => navigate('/')}
          >
            &times;
          </span>
        </div>

        {/* Modal Body */}
        <div className="register-modal-body">
          {error && (
            <div className="register-message register-message--error">
              {error}
            </div>
          )}

          {success && (
            <div className="register-message register-message--success">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Account Details Section */}
            <div className="reg-section-title">ⓘ Account Details</div>

            {/* Name Row */}
            <div className="form-row">
              <label>Name <span>*</span></label>
              <div className="input-fields">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name *"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email Row */}
            <div className="form-row">
              <label>Email <span>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="register-inline-input"
              />
            </div>

            {/* Password Row */}
            <div className="form-row">
              <label>Password <span>*</span></label>
              <div className="input-fields">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Type password again"
                  required
                />
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="reg-section-title">ⓘ Personal Information</div>

            {/* Date of Birth Row */}
            <div className="form-row">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="register-inline-input"
              />
            </div>

            {/* Gender Row */}
            <div className="form-row">
              <label>Gender</label>
              <div className="register-gender">
                <label className="register-gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="register-gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="register-gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
            </div>

            {/* State/District Row */}
            <div className="form-row">
              <label>State/District</label>
              <div className="input-fields">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select state/UT</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="">Select district</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="register-modal-footer">
          <button 
            onClick={handleSubmit}
            className="btn btn-green"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Signing up...' : '👤+ Sign up'}
          </button>
          <button 
            onClick={handleReset}
            className="btn btn-orange"
          >
            🔄 Reset
          </button>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-close"
          >
            ✖ Close
          </button>
        </div>
      </div>
    </div>
  );
};
