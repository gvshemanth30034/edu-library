import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AboutPage = () => {
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
        <h1 style={{ color: '#0f4c4c', fontSize: '2rem', marginBottom: '24px', borderBottom: '3px solid #008080', paddingBottom: '12px' }}>About National Digital Library of India</h1>
        
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#008080', fontSize: '1.4rem', marginBottom: '16px' }}>Our Mission</h2>
          <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '16px' }}>
            The National Digital Library of India (NDLI) is a project under the Ministry of Education, Government of India. 
            Our mission is to provide a single-window platform for accessing educational content across all disciplines, languages, and levels.
          </p>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            We aim to democratize access to knowledge by bringing together content from various sources including IITs, NITs, 
            universities, research institutions, and content aggregators from across the country.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#008080', fontSize: '1.4rem', marginBottom: '16px' }}>Key Features</h2>
          <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '24px' }}>
            <li>Access to over 5 million+ educational resources</li>
            <li>Content available in 30+ Indian languages</li>
            <li>Resources from 1000+ institutions nationwide</li>
            <li>Free access to students, researchers, and educators</li>
            <li>Advanced search and filtering capabilities</li>
            <li>Multi-device accessibility (mobile, tablet, desktop)</li>
          </ul>
        </section>

        <section>
          <h2 style={{ color: '#008080', fontSize: '1.4rem', marginBottom: '16px' }}>Vision</h2>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            We envision a digitally empowered India where quality educational content is accessible to every learner, 
            regardless of their geographical location or economic background. Through NDLI, we are working towards 
            creating a knowledge-based society and supporting the Atmanirbhar Bharat initiative.
          </p>
        </section>

        <div style={{ marginTop: '40px', padding: '20px', background: '#e0f2f1', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
          <p style={{ color: '#0f4c4c', fontStyle: 'italic', margin: 0 }}>
            "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family." - Kofi Annan
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
