import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const DisclaimerPage = () => {
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
        <h1 style={{ color: '#0f4c4c', fontSize: '2rem', marginBottom: '24px', borderBottom: '3px solid #008080', paddingBottom: '12px' }}>Disclaimer</h1>
        
        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>General Information</h3>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            The information provided on the National Digital Library of India (NDLI) platform is for general educational 
            and informational purposes only. While we strive to maintain accurate and up-to-date content, we make no 
            representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
            or availability of the information.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>Content Ownership</h3>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            All content available on NDLI is either created by us, provided by partner institutions, or made available 
            under appropriate licenses. We respect intellectual property rights and expect our users to do the same. 
            If you believe any content infringes on your copyright, please contact us immediately.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>Third-Party Links</h3>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            NDLI may contain links to external websites that are not under our control. We are not responsible for 
            the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ color: '#008080', fontSize: '1.2rem', marginBottom: '12px' }}>Limitation of Liability</h3>
          <p style={{ color: '#555', lineHeight: 1.8 }}>
            In no event shall NDLI, its affiliates, or partners be liable for any indirect, incidental, special, 
            consequential, or punitive damages arising out of or relating to your use of the platform.
          </p>
        </section>

        <div style={{ marginTop: '32px', padding: '20px', background: '#fff3e0', borderRadius: '8px', borderLeft: '4px solid #f57c00' }}>
          <p style={{ color: '#e65100', fontWeight: 600, margin: 0 }}>
            ⚠️ Note: This disclaimer is subject to change without notice. Please review it periodically for updates.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
