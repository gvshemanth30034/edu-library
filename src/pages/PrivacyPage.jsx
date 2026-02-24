import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f6', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
        <h1 style={{ color: '#0f4c4c', fontSize: '2rem', marginBottom: '24px', borderBottom: '3px solid #008080', paddingBottom: '12px' }}>Privacy Policy</h1>
        
        <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '28px', fontStyle: 'italic' }}>
          Last Updated: February 24, 2026
        </p>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>Information We Collect</h3>
          <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '12px' }}>
            We collect information that you provide directly to us when you:
          </p>
          <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '24px' }}>
            <li>Create an account or register for the platform</li>
            <li>Search for and access educational content</li>
            <li>Submit feedback or contact us</li>
            <li>Participate in surveys or promotions</li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>How We Use Your Information</h3>
          <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '12px' }}>
            We use the information we collect to:
          </p>
          <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '24px' }}>
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your learning experience</li>
            <li>Send you technical notifications and updates</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Ensure the security and integrity of our platform</li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>Data Security</h3>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            We implement appropriate technical and organizational security measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
            the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>Your Rights</h3>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            You have the right to access, update, or delete your personal information at any time. You may also opt-out 
            of receiving promotional communications from us by following the unsubscribe instructions in those messages.
          </p>
        </section>

        <div style={{ marginTop: '32px', padding: '20px', background: '#e8f5e9', borderRadius: '8px', borderLeft: '4px solid #2e7d32' }}>
          <p style={{ color: '#1b5e20', fontWeight: 600, margin: 0 }}>
            🔒 Your privacy is important to us. If you have any questions about this policy, please contact our Data Protection Officer.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
