import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const SponsorPage = () => {
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
          Sponsor NDLI
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Partnership Opportunities</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            The National Digital Library of India welcomes partnerships with institutions, corporations, and philanthropic organizations committed to advancing educational access and digital learning in India.
          </p>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            By sponsoring NDLI, you contribute to democratizing education and providing millions of learners with access to world-class educational resources.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Sponsorship Benefits</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Recognition on NDLI platform reaching millions of users</li>
            <li>Brand visibility in educational institutions across India</li>
            <li>CSR alignment with national education initiatives</li>
            <li>Collaborative research and development opportunities</li>
            <li>Exclusive access to usage analytics and impact reports</li>
            <li>Naming rights for specific collections or features</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Contact for Sponsorship</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            For sponsorship inquiries, please contact us at:
          </p>
          <div style={{ background: '#e0f2f1', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
            <p style={{ margin: '8px 0', color: '#0f4c4c' }}><strong>Email:</strong> partnerships@ndli.gov.in</p>
            <p style={{ margin: '8px 0', color: '#0f4c4c' }}><strong>Phone:</strong> 1800-XXX-XXXX</p>
            <p style={{ margin: '8px 0', color: '#0f4c4c' }}><strong>Office:</strong> IIT Kharagpur, West Bengal 721302</p>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};
