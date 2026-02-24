import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const GuidelinesPage = () => {
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
        <h1 style={{ fontSize: '2rem', color: '#008080', marginBottom: '12px', paddingBottom: '12px', borderBottom: '3px solid #008080' }}>
          Institutional Registration
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Who Can Register</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            NDLI welcomes registration from all educational institutions including schools, colleges, universities, research institutions, and libraries across India and abroad.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Registration Process</h2>
          <ol style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Visit the official NDLI portal and navigate to Institutional Registration</li>
            <li>Fill the online registration form with institution details</li>
            <li>Upload required documents (registration certificate, authorization letter)</li>
            <li>Submit the form for verification</li>
            <li>Receive confirmation and access credentials via email</li>
            <li>Configure institutional dashboard and user management</li>
          </ol>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Required Documents</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Institution registration/affiliation certificate</li>
            <li>Authorization letter from Head of Institution</li>
            <li>Contact details of nodal officer</li>
            <li>Proof of address</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Benefits</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Access to premium educational resources</li>
            <li>Institutional dashboard for usage tracking</li>
            <li>Bulk user registration facility</li>
            <li>Customized resource collections</li>
            <li>Analytics and usage reports</li>
            <li>Priority support and training</li>
          </ul>
        </section>

        <div style={{ marginTop: '32px', background: '#e8f5e9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2e7d32' }}>
          <p style={{ margin: 0, color: '#1b5e20', fontSize: '0.95rem' }}>
            <strong>📝 Note:</strong> Registration is completely free. Contact institutional-support@ndli.gov.in for assistance.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
