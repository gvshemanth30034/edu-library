import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BrandingPage = () => {
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
          Branding Guidelines
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>NDLI Logo Usage</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            The National Digital Library of India logo represents the mission of democratizing education through digital access. Proper use of our brand assets helps maintain consistency and recognition.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Brand Colors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '20px', background: '#008080', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Primary Teal</div>
              <div style={{ fontSize: '0.9rem' }}>#008080</div>
            </div>
            <div style={{ padding: '20px', background: '#0f4c4c', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Dark Teal</div>
              <div style={{ fontSize: '0.9rem' }}>#0f4c4c</div>
            </div>
            <div style={{ padding: '20px', background: '#059669', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Emerald</div>
              <div style={{ fontSize: '0.9rem' }}>#059669</div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Usage Guidelines</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Maintain minimum clear space around the logo</li>
            <li>Do not alter logo colors or proportions</li>
            <li>Do not rotate, skew, or distort the logo</li>
            <li>Use official logo files only (avoid recreation)</li>
            <li>Ensure sufficient contrast on backgrounds</li>
            <li>Do not combine with other logos without approval</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Download Assets</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            Authorized partners and institutions can download official brand assets including logos, color palettes, and typography guidelines. Please contact branding@ndli.gov.in for access to the complete brand toolkit.
          </p>
        </section>

        <div style={{ marginTop: '32px', background: '#e0f2f1', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
          <p style={{ margin: 0, color: '#0f4c4c', fontSize: '0.95rem' }}>
            <strong>🎨 Note:</strong> Unauthorized use of NDLI branding is prohibited. For licensing inquiries, contact our brand team.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
