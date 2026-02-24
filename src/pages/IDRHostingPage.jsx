import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const IDRHostingPage = () => {
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
          IDR Hosting Service
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>What is IDR Hosting?</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            NDLI provides free Institutional Digital Repository (IDR) hosting services to educational institutions, enabling them to create, manage, and preserve their digital collections without infrastructure costs.
          </p>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            Our IDR solution is built on industry-standard DSpace platform, ensuring compatibility and long-term sustainability.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Key Features</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Cloud-based hosting with guaranteed uptime</li>
            <li>Customizable institution branding and themes</li>
            <li>Multi-format support (PDF, images, video, audio)</li>
            <li>Metadata management and OAI-PMH compliance</li>
            <li>Search and discovery tools</li>
            <li>Usage statistics and analytics</li>
            <li>Long-term digital preservation</li>
            <li>Technical support and training</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Eligible Institutions</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            All Indian educational institutions including universities, colleges, research institutions, and schools are eligible to apply for free IDR hosting services.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>How to Apply</h2>
          <ol style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Submit online application with institution details</li>
            <li>Provide institutional authorization letter</li>
            <li>Attend orientation and training session</li>
            <li>Receive repository credentials and access</li>
            <li>Configure repository settings and branding</li>
            <li>Start uploading content and collections</li>
          </ol>
        </section>

        <div style={{ marginTop: '32px', background: '#e0f2f1', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
          <p style={{ margin: 0, color: '#0f4c4c', fontSize: '0.95rem' }}>
            <strong>📚 Get Started:</strong> Contact idr-support@ndli.gov.in to apply for IDR hosting services.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
