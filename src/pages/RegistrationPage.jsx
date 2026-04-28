import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/authApi.js';

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
    role: 'student',
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

  const stateDistrictMap = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'Guntur', 'Krishna', 'Nellore', 'Prakasam', 'Visakhapatnam', 'Vizianagaram'],
    'Arunachal Pradesh': ['Anjaw', 'Changlang', 'East Siang', 'Lohit', 'Papum Pare', 'Tawang', 'West Siang'],
    Assam: ['Baksa', 'Barpeta', 'Cachar', 'Dibrugarh', 'Kamrup', 'Nagaon', 'Sonitpur'],
    Bihar: ['Araria', 'Bhagalpur', 'Darbhanga', 'Gaya', 'Muzaffarpur', 'Patna', 'Purnia'],
    Chhattisgarh: ['Balod', 'Bilaspur', 'Durg', 'Janjgir-Champa', 'Korba', 'Raipur', 'Rajnandgaon'],
    Delhi: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North West Delhi', 'South Delhi', 'West Delhi'],
    Goa: ['North Goa', 'South Goa'],
    Gujarat: ['Ahmedabad', 'Bhavnagar', 'Gandhinagar', 'Kutch', 'Rajkot', 'Surat', 'Vadodara'],
    Haryana: ['Ambala', 'Faridabad', 'Gurugram', 'Hisar', 'Karnal', 'Panipat', 'Rohtak'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Shimla'],
    Jharkhand: ['Bokaro', 'Dhanbad', 'East Singhbhum', 'Hazaribagh', 'Palamu', 'Ranchi', 'West Singhbhum'],
    Karnataka: ['Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Dharwad', 'Mysuru', 'Shivamogga'],
    Kerala: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Thiruvananthapuram'],
    'Madhya Pradesh': ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Rewa', 'Sagar', 'Ujjain'],
    Maharashtra: ['Ahmednagar', 'Aurangabad', 'Kolhapur', 'Mumbai City', 'Nagpur', 'Nashik', 'Pune'],
    Manipur: ['Bishnupur', 'Chandel', 'Imphal East', 'Imphal West', 'Senapati', 'Thoubal', 'Ukhrul'],
    Meghalaya: ['East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills'],
    Mizoram: ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Serchhip'],
    Nagaland: ['Dimapur', 'Kiphire', 'Kohima', 'Mokokchung', 'Mon', 'Peren', 'Tuensang'],
    Odisha: ['Balasore', 'Cuttack', 'Ganjam', 'Khordha', 'Mayurbhanj', 'Puri', 'Sundargarh'],
    Punjab: ['Amritsar', 'Bathinda', 'Gurdaspur', 'Jalandhar', 'Ludhiana', 'Patiala', 'Sangrur'],
    Rajasthan: ['Ajmer', 'Alwar', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
    Sikkim: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Erode', 'Madurai', 'Salem', 'Thanjavur', 'Tiruchirappalli'],
    Telangana: ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Nalgonda', 'Nizamabad', 'Warangal'],
    Tripura: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'West Tripura'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ghaziabad', 'Kanpur Nagar', 'Lucknow', 'Prayagraj', 'Varanasi'],
    Uttarakhand: ['Almora', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Tehri Garhwal', 'Udham Singh Nagar'],
    'West Bengal': ['Alipurduar', 'Darjeeling', 'Howrah', 'Kolkata', 'Murshidabad', 'North 24 Parganas', 'South 24 Parganas'],
  };

  const districts = formData.state ? (stateDistrictMap[formData.state] || []) : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Keep district in sync with state selection.
    if (name === 'state') {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: '',
      }));
      setError('');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
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
    if (!formData.role) {
      setError('Account type is required');
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
    if (!formData.district) {
      setError('District is required');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        name: `${formData.firstName} ${formData.lastName || ''}`.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'student',
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
          <h3 className="heading-entrance heading-premium">👤+ Account Registration</h3>
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

            {/* Account Type Row */}
            <div className="form-row">
              <label>Account Type <span>*</span></label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="register-inline-input"
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
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
                  disabled={!formData.state}
                  required
                >
                  <option value="">{formData.state ? 'Select district' : 'Select state first'}</option>
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
