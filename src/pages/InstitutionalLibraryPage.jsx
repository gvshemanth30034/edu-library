import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const InstitutionalLibraryPage = () => {
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
          Institutional Digital Library
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Transform Your Library</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            NDLI offers comprehensive solutions to help educational institutions build and manage their digital libraries, combining local collections with NDLI's vast repository of resources.
          </p>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            Our institutional library service provides a unified platform for discovering, accessing, and managing both institutional and NDLI resources.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Service Components</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li><strong>Integrated Search:</strong> Single search interface for local and NDLI resources</li>
            <li><strong>Custom Portal:</strong> Branded institutional portal with customized interface</li>
            <li><strong>Resource Management:</strong> Tools for cataloging and organizing local collections</li>
            <li><strong>User Management:</strong> Role-based access control and user authentication</li>
            <li><strong>Analytics Dashboard:</strong> Comprehensive usage statistics and reports</li>
            <li><strong>Mobile Access:</strong> Responsive design for all devices</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Implementation Process</h2>
          <ol style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Initial consultation and requirement analysis</li>
            <li>System configuration and customization</li>
            <li>Integration with existing library systems</li>
            <li>Content migration and metadata mapping</li>
            <li>Staff training and capacity building</li>
            <li>Go-live support and ongoing maintenance</li>
          </ol>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Benefits</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>24/7 access to millions of educational resources</li>
            <li>Reduced infrastructure and maintenance costs</li>
            <li>Enhanced visibility of institutional content</li>
            <li>Improved user experience and satisfaction</li>
            <li>Regular updates and new features</li>
            <li>Technical support and training</li>
          </ul>
        </section>

        <div style={{ marginTop: '32px', background: '#e8f5e9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2e7d32' }}>
          <p style={{ margin: 0, color: '#1b5e20', fontSize: '0.95rem' }}>
            <strong>🏛️ Contact Us:</strong> Email institutional-library@ndli.gov.in to schedule a consultation.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
