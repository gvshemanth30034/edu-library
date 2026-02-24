import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CopyrightPage = () => {
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
          Copyright Guide
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Copyright Policy</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            NDLI respects the intellectual property rights of content creators and follows the Copyright Act, 1957 (as amended). All resources available through NDLI are made accessible in compliance with applicable copyright laws.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Content Categories</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li><strong>Open Access:</strong> Resources explicitly marked as open access or in the public domain</li>
            <li><strong>Licensed Content:</strong> Materials made available through institutional licenses and agreements</li>
            <li><strong>Fair Use:</strong> Limited excerpts provided under educational fair use provisions</li>
            <li><strong>Government Publications:</strong> Public documents and reports from government sources</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>User Responsibilities</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            Users must respect copyright restrictions and use materials only for educational and research purposes. Any commercial use, redistribution, or modification requires explicit permission from copyright holders.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Copyright Infringement</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            If you believe any content on NDLI infringes your copyright, please contact us immediately at copyright@ndli.gov.in with details of the alleged infringement. We will investigate and take appropriate action promptly.
          </p>
        </section>

        <div style={{ marginTop: '32px', background: '#fff3e0', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f57c00' }}>
          <p style={{ margin: 0, color: '#e65100', fontSize: '0.95rem' }}>
            <strong>⚖️ Note:</strong> NDLI operates under the educational exceptions provided in Indian copyright law. All users are expected to comply with applicable copyright regulations.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
