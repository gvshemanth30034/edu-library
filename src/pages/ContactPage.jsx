import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';

export const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f6', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
        <h1 style={{ color: '#0f4c4c', fontSize: '2.2rem', marginBottom: '12px', textAlign: 'center' }}>Contact Us</h1>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '48px', fontSize: '1rem' }}>
          We'd love to hear from you. Get in touch with us for any queries or support.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Contact Information */}
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#008080', fontSize: '1.4rem', marginBottom: '24px' }}>Get in Touch</h2>
            
            <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={20} color="#008080" />
              </div>
              <div>
                <h4 style={{ color: '#0f4c4c', marginBottom: '4px' }}>Email</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>support@ndli.gov.in</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} color="#008080" />
              </div>
              <div>
                <h4 style={{ color: '#0f4c4c', marginBottom: '4px' }}>Phone</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>1800-XXX-XXXX (Toll Free)</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} color="#008080" />
              </div>
              <div>
                <h4 style={{ color: '#0f4c4c', marginBottom: '4px' }}>Address</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  National Digital Library of India<br />
                  IIT Kharagpur, West Bengal<br />
                  India - 721302
                </p>
              </div>
            </div>

            <div style={{ marginTop: '32px', padding: '16px', background: '#e0f2f1', borderRadius: '8px' }}>
              <p style={{ color: '#0f4c4c', fontSize: '0.85rem', margin: 0 }}>
                <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#008080', fontSize: '1.4rem', marginBottom: '24px' }}>Send us a Message</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#0f4c4c', marginBottom: '8px', fontWeight: 500 }}>Name *</label>
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
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#0f4c4c', marginBottom: '8px', fontWeight: 500 }}>Email *</label>
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
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#0f4c4c', marginBottom: '8px', fontWeight: 500 }}>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1.5px solid #d1fae5',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#0f4c4c', marginBottom: '8px', fontWeight: 500 }}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1.5px solid #d1fae5',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #008080, #059669)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 12px rgba(0,128,128,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,128,128,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,128,128,0.3)';
                }}
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
