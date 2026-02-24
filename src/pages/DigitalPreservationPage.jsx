import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const DigitalPreservationPage = () => {
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
          Digital Preservation Centre
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Preserving Knowledge for Future Generations</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            NDLI's Digital Preservation Centre ensures long-term preservation and accessibility of digital educational content, protecting India's educational heritage from technological obsolescence and digital decay.
          </p>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            We follow international standards and best practices to ensure that today's digital resources remain accessible for decades to come.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Preservation Services</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li><strong>Format Migration:</strong> Converting files to preservation-friendly formats</li>
            <li><strong>Fixity Checking:</strong> Regular verification of file integrity</li>
            <li><strong>Redundant Storage:</strong> Multiple copies across geographically distributed locations</li>
            <li><strong>Metadata Management:</strong> Comprehensive descriptive and technical metadata</li>
            <li><strong>Access Copies:</strong> Generating user-friendly access versions</li>
            <li><strong>Disaster Recovery:</strong> Robust backup and recovery procedures</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Technical Infrastructure</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            Our preservation infrastructure includes enterprise-grade storage systems, automated monitoring tools, and compliance with OAIS (Open Archival Information System) reference model.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>For Content Providers</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            Institutions and publishers can entrust their digital content to NDLI for long-term preservation. We offer customized preservation plans based on content type, value, and institutional requirements.
          </p>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Free preservation services for educational content</li>
            <li>Regular preservation status reports</li>
            <li>Access control as per institutional policies</li>
            <li>Migration and emulation strategies</li>
          </ul>
        </section>

        <div style={{ marginTop: '32px', background: '#e0f2f1', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
          <p style={{ margin: 0, color: '#0f4c4c', fontSize: '0.95rem' }}>
            <strong>🔒 Secure & Reliable:</strong> Contact preservation@ndli.gov.in to discuss preservation services for your digital collections.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
