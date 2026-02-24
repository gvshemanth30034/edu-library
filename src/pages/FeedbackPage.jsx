import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare, Send, ArrowLeft } from 'lucide-react';

export const FeedbackPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    rating: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback! We appreciate your input.');
    setFormData({ name: '', email: '', category: '', rating: '', message: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f6', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateX(-4px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 128, 128, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateX(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <div style={{ background: 'white', padding: '50px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <MessageSquare size={48} color="#008080" style={{ marginBottom: '16px' }} />
          <h1 style={{ fontSize: '2rem', color: '#008080', marginBottom: '12px' }}>
            We Value Your Feedback
          </h1>
          <p style={{ color: '#666', fontSize: '1.05rem' }}>
            Help us improve NDLI by sharing your thoughts, suggestions, and experiences
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#0f4c4c', fontWeight: '500' }}>
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1.5px solid #d1fae5',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#0f4c4c', fontWeight: '500' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1.5px solid #d1fae5',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#0f4c4c', fontWeight: '500' }}>
              Feedback Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1.5px solid #d1fae5',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="">Select a category</option>
              <option value="usability">Website Usability</option>
              <option value="content">Content Quality</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
              <option value="general">General Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', color: '#0f4c4c', fontWeight: '500' }}>
              Overall Experience *
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Excellent', 'Good', 'Average', 'Poor'].map((rating) => (
                <label key={rating} style={{ flex: 1, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={formData.rating === rating}
                    onChange={handleChange}
                    required
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    padding: '12px',
                    border: `2px solid ${formData.rating === rating ? '#008080' : '#d1fae5'}`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    background: formData.rating === rating ? '#e0f2f1' : 'white',
                    color: formData.rating === rating ? '#008080' : '#666',
                    fontWeight: formData.rating === rating ? '600' : '400',
                    transition: 'all 0.2s'
                  }}>
                    {rating}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#0f4c4c', fontWeight: '500' }}>
              Your Feedback *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Please share your detailed feedback, suggestions, or report any issues..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1.5px solid #d1fae5',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #008080 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(0, 128, 128, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Send size={20} />
            Submit Feedback
          </button>
        </form>

        <div style={{ marginTop: '32px', padding: '20px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f4c4c', marginBottom: '12px', fontWeight: '600' }}>
            Other Ways to Reach Us
          </h3>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <strong>Email:</strong> feedback@ndli.gov.in<br />
            <strong>Phone:</strong> 1800-XXX-XXXX<br />
            <strong>Response Time:</strong> We typically respond within 2-3 business days
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
