import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NDLIClubPage = () => {
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
          NDLI Club Initiative
        </h1>
        
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>About NDLI Clubs</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            NDLI Clubs are student-led initiatives at educational institutions that promote digital learning, organize workshops, and create awareness about the vast educational resources available through NDLI.
          </p>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '16px' }}>
            These clubs serve as local champions of digital literacy and help bridge the gap between resources and learners.
          </p>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Club Activities</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Awareness campaigns and orientation sessions for new students</li>
            <li>Workshops on effective use of digital resources</li>
            <li>Resource contribution drives and content curation</li>
            <li>Peer learning sessions and study groups</li>
            <li>Feedback collection and improvement suggestions</li>
            <li>Inter-institutional collaboration events</li>
          </ul>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>How to Start a Club</h2>
          <ol style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Identify interested students and faculty coordinator</li>
            <li>Register your club on NDLI portal</li>
            <li>Receive official NDLI Club recognition and materials</li>
            <li>Organize kickoff event and recruit members</li>
            <li>Plan and execute awareness activities</li>
            <li>Submit quarterly activity reports</li>
          </ol>
        </section>

        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f4c4c', marginBottom: '16px' }}>Support Provided</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '24px' }}>
            <li>Official NDLI Club certificate and recognition</li>
            <li>Training materials and presentation templates</li>
            <li>Access to exclusive webinars and events</li>
            <li>Networking opportunities with other clubs</li>
            <li>Recognition for outstanding contributions</li>
          </ul>
        </section>

        <div style={{ marginTop: '32px', background: '#e8f5e9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2e7d32' }}>
          <p style={{ margin: 0, color: '#1b5e20', fontSize: '0.95rem' }}>
            <strong>🎓 Join the Movement:</strong> Contact ndli-club@ndli.gov.in to start your NDLI Club today!
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
