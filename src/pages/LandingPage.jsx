import React, { useState } from 'react';
import { LandingNavbar } from '../components/LandingNavbar.jsx';
import { LandingHero } from '../components/LandingHero.jsx';
import { LandingContentSlider } from '../components/LandingContentSlider.jsx';
import { LandingFooter } from '../components/LandingFooter.jsx';
import { LoginModal } from '../components/LoginModal.jsx';
import { RecoveryModal } from '../components/RecoveryModal.jsx';

const FEATURES = [
  { icon: '🔍', title: 'Smart Search',      desc: 'Full-text search across 5M+ resources in 30+ languages instantly.' },
  { icon: '📥', title: 'Free Downloads',    desc: 'Download PDFs, research papers, e-books and study material at no cost.' },
  { icon: '🌐', title: 'Multilingual',      desc: 'Access content in Hindi, Tamil, Telugu, Bengali, Marathi and more.' },
  { icon: '🏛️', title: '1000+ Institutions', desc: 'Resources from NCERT, IITs, IIMs, universities and research labs.' },
  { icon: '🔒', title: 'Secure & Trusted',  desc: 'Government-backed digital library — verified, safe and reliable.' },
  { icon: '📱', title: 'Any Device',        desc: 'Access on mobile, tablet or desktop, anytime, anywhere.' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📝',
    title: 'Create a Free Account',
    desc: 'Register with your institutional email in under a minute. No credit card needed.',
    color: '#0d9488',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Search Anything',
    desc: 'Browse 5M+ resources — books, journals, research papers and e-content across 30+ languages.',
    color: '#7c3aed',
  },
  {
    step: '03',
    icon: '📥',
    title: 'Read & Download Free',
    desc: 'Save resources, download PDFs and access full content from anywhere, on any device.',
    color: '#ea580c',
  },
];

export const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar onLoginClick={() => setIsLoginOpen(true)} />
      <LandingHero />

      {/* How It Works */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '28px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', fontWeight: 600, textAlign: 'center' }}>Get Started in 3 Simple Steps</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', justifyContent: 'center', position: 'relative' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <div
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 24px', borderRadius: '14px', background: '#fff', border: `1px solid ${step.color}22`, minWidth: '240px', maxWidth: '300px', boxShadow: `0 2px 12px ${step.color}11`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${step.color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 2px 12px ${step.color}11`; }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{step.icon}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: step.color, letterSpacing: '0.05em' }}>{step.step}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem', marginBottom: '4px' }}>{step.title}</p>
                    <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <span style={{ fontSize: '1.2rem', color: '#cbd5e1', padding: '0 10px', flexShrink: 0 }}>→</span>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
              <button
                onClick={() => setIsLoginOpen(true)}
                style={{ padding: '10px 22px', borderRadius: '999px', background: '#0d9488', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 14px #0d948840', transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0f766e'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0d9488'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Start Free →
              </button>
            </div>
          </div>
        </div>
      </div>

      <LandingContentSlider />

      {/* Why Choose Us */}
      <section style={{ background: '#fff', padding: '40px 20px 44px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 700, color: '#0f4c4c', marginBottom: '6px' }}>Why Choose EDU Library?</h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '30px' }}>Everything a student, researcher or educator needs — in one place</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,128,128,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{f.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#0f4c4c', marginBottom: '4px', fontSize: '0.95rem' }}>{f.title}</p>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <div style={{ background: 'linear-gradient(90deg,#0f4c4c,#0d9488)', color: '#fff', padding: '12px 20px', textAlign: 'center', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1rem' }}>📢</span>
        <span><strong>New:</strong> Research paper submission deadline extended — <strong>30 May 2026</strong>. Library hours extended till 10PM during exam week.</span>
        <button onClick={() => setIsLoginOpen(true)} style={{ marginLeft: '16px', padding: '5px 14px', borderRadius: '999px', background: '#fff', color: '#0d9488', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Log In →</button>
      </div>

      <LandingFooter />
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRecoveryClick={() => {
          setIsLoginOpen(false);
          setIsRecoveryOpen(true);
        }}
      />
      <RecoveryModal isOpen={isRecoveryOpen} onClose={() => setIsRecoveryOpen(false)} />
    </div>
  );
};
