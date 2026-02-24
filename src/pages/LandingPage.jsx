import React, { useState, useRef, useEffect } from 'react';
import { LandingNavbar } from '../components/LandingNavbar.jsx';
import { LandingHero } from '../components/LandingHero.jsx';
import { LandingContentSlider } from '../components/LandingContentSlider.jsx';
import { LandingFooter } from '../components/LandingFooter.jsx';
import { LoginModal } from '../components/LoginModal.jsx';
import { RecoveryModal } from '../components/RecoveryModal.jsx';
import { Search, Download, Globe, Landmark, Shield, Smartphone, UserPlus, Rocket } from 'lucide-react';

function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

const FEATURES = [
  { icon: Search, title: 'Smart Search',       desc: 'Full-text search across 5M+ resources in 30+ languages instantly.',     bg: '#ccfbf1', accent: '#0d9488' },
  { icon: Download, title: 'Free Downloads',     desc: 'Download PDFs, research papers, e-books and study material at no cost.', bg: '#d1fae5', accent: '#059669' },
  { icon: Globe, title: 'Multilingual',       desc: 'Access content in Hindi, Tamil, Telugu, Bengali, Marathi and more.',    bg: '#e8fdf5', accent: '#0f766e' },
  { icon: Landmark, title: '1000+ Institutions', desc: 'Resources from NCERT, IITs, IIMs, universities and research labs.',     bg: '#f0fdfa', accent: '#008080' },
  { icon: Shield, title: 'Secure & Trusted',   desc: 'Government-backed digital library — verified, safe and reliable.',      bg: '#ecfdf5', accent: '#2e7d32' },
  { icon: Smartphone, title: 'Any Device',         desc: 'Access on mobile, tablet or desktop, anytime, anywhere.',               bg: '#cffafe', accent: '#0891b2' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create a Free Account',
    desc: 'Register with your institutional email in under a minute. No credit card needed.',
    color: '#008080',
    bg: '#ccfbf1',
  },
  {
    step: '02',
    icon: Search,
    title: 'Search Anything',
    desc: 'Browse 5M+ resources — books, journals, research papers and e-content across 30+ languages.',
    color: '#059669',
    bg: '#d1fae5',
  },
  {
    step: '03',
    icon: Download,
    title: 'Read & Download Free',
    desc: 'Save resources, download PDFs and access full content from anywhere, on any device.',
    color: '#0f766e',
    bg: '#e8fdf5',
  },
];

export const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar onLoginClick={() => setIsLoginOpen(true)} />
      <LandingHero />

      {/* ── Content Categories Showcase ── */}
      <LandingContentSlider />

      {/* ── Why Choose EDU Library ── */}
      <section style={{ background: '#ffffff', padding: '88px 20px 96px', borderTop: '1px solid #e8f4f1', position: 'relative', overflow: 'hidden' }}>
        {/* decorative background pattern */}
        <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,128,128,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
          <RevealOnScroll delay={0}>
            <div style={{ display: 'inline-block', margin: '0 auto', padding: '6px 16px', borderRadius: '999px', background: 'linear-gradient(90deg, rgba(15,76,76,0.08), rgba(0,128,128,0.08))', border: '1px solid rgba(0,128,128,0.15)', marginBottom: '12px' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#008080', margin: 0 }}>Why EDU Library?</p>
            </div>
            <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '12px', marginTop: '12px' }}>Everything You Need,<br /><span style={{ background: 'linear-gradient(110deg,#0f4c4c,#008080,#059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>In One Platform</span></h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 56px', lineHeight: 1.6 }}>Built for India's students, researchers and educators fully free, always.</p>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {FEATURES.map((f, i) => (
              <RevealOnScroll key={i} delay={0.08 + i * 0.1}>
                <div
                  style={{ 
                    background: 'linear-gradient(to bottom, #ffffff, #fefefe)', 
                    borderRadius: '20px', 
                    padding: '32px 28px', 
                    border: `2px solid ${f.bg}`, 
                    boxShadow: `0 1px 3px rgba(0,0,0,0.05), 0 4px 20px ${f.accent}12`, 
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s', 
                    cursor: 'default', 
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'translateY(-8px)'; 
                    e.currentTarget.style.boxShadow = `0 4px 8px rgba(0,0,0,0.08), 0 16px 48px ${f.accent}28`; 
                    e.currentTarget.style.borderColor = f.accent;
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.05), 0 4px 20px ${f.accent}12`; 
                    e.currentTarget.style.borderColor = f.bg;
                  }}
                >
                  {/* corner accent */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `linear-gradient(135deg, ${f.bg}, transparent)`, borderRadius: '0 20px 0 100%', opacity: 0.4, pointerEvents: 'none' }} />
                  
                  {/* icon container */}
                  <div style={{ 
                    position: 'relative',
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '18px', 
                    background: f.bg, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '20px', 
                    transition: 'transform 0.3s',
                    boxShadow: `0 4px 16px ${f.accent}18, 0 0 0 3px #fff`,
                    border: `2px solid ${f.accent}30`
                  }}>
                    <f.icon size={32} strokeWidth={2} color={f.accent} />
                  </div>
                  
                  <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem', marginBottom: '10px', position: 'relative' }}>{f.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.87rem', lineHeight: 1.7, position: 'relative' }}>{f.desc}</p>
                  
                  {/* accent line */}
                  <div style={{ marginTop: '20px', height: '4px', width: '44px', borderRadius: '999px', background: `linear-gradient(90deg, ${f.accent}, ${f.accent}80)`, position: 'relative' }} />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ background: '#f4f7f6', padding: '80px 20px 88px', borderTop: '1px solid #e8f4f1', position: 'relative', overflow: 'hidden' }}>
        {/* decorative background circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,128,128,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
          <RevealOnScroll delay={0}>
            <div style={{ display: 'inline-block', margin: '0 auto', padding: '6px 16px', borderRadius: '999px', background: 'linear-gradient(90deg, rgba(0,128,128,0.08), rgba(5,150,105,0.08))', border: '1px solid rgba(0,128,128,0.15)', marginBottom: '12px' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#008080', margin: 0 }}>3 Simple Steps</p>
            </div>
            <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '12px', marginTop: '12px' }}>Get Started in <span style={{ background: 'linear-gradient(110deg,#008080,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Minutes</span></h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', marginBottom: '52px', maxWidth: '480px', margin: '0 auto 52px' }}>No setup required. Free for students, researchers and educators across India.</p>
          </RevealOnScroll>

          {/* Step cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', position: 'relative' }}>
            {/* dashed connector line – desktop only */}
            <div style={{ position: 'absolute', top: '56px', left: 'calc(16.6% + 18px)', right: 'calc(16.6% + 18px)', height: '3px', background: 'repeating-linear-gradient(90deg, rgba(0,128,128,0.25) 0 10px, transparent 10px 20px)', pointerEvents: 'none', zIndex: 0 }} />

            {HOW_IT_WORKS.map((step, i) => (
              <RevealOnScroll key={i} delay={0.1 + i * 0.15}>
                <div
                  style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    background: 'linear-gradient(to bottom, #ffffff, #fefefe)', 
                    borderRadius: '24px', 
                    padding: '36px 32px 32px', 
                    boxShadow: `0 1px 3px rgba(0,0,0,0.06), 0 8px 24px ${step.color}18, 0 0 0 1px ${step.bg}`, 
                    border: `2px solid ${step.color}`, 
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)', 
                    cursor: 'default', 
                    height: '100%',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'; 
                    e.currentTarget.style.boxShadow = `0 4px 8px rgba(0,0,0,0.08), 0 20px 48px ${step.color}35, 0 0 0 1px ${step.color}`; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                    e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.06), 0 8px 24px ${step.color}18, 0 0 0 1px ${step.bg}`; 
                  }}
                >
                  {/* background accent blob */}
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: `radial-gradient(circle, ${step.bg} 0%, transparent 70%)`, pointerEvents: 'none', opacity: 0.5 }} />
                  
                  {/* step number badge */}
                  <div style={{ 
                    position: 'relative',
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '50%', 
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`, 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 800, 
                    fontSize: '1.15rem', 
                    marginBottom: '24px', 
                    boxShadow: `0 6px 20px ${step.color}50, 0 0 0 4px ${step.bg}`,
                    border: '3px solid #fff'
                  }}>
                    {step.step}
                  </div>
                  
                  {/* icon */}
                  <div style={{ fontSize: '2.8rem', lineHeight: 1, marginBottom: '18px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <step.icon size={44} strokeWidth={2} color={step.color} />
                  </div>
                  
                  {/* text */}
                  <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.1rem', marginBottom: '10px', lineHeight: 1.3, position: 'relative' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.87rem', lineHeight: 1.7, position: 'relative' }}>{step.desc}</p>
                  
                  {/* bottom accent line */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${step.color}, transparent)`, borderRadius: '0 0 24px 24px' }} />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA */}
          <RevealOnScroll delay={0.55}>
            <div style={{ textAlign: 'center', marginTop: '52px' }}>
              <button
                onClick={() => setIsLoginOpen(true)}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  padding: '16px 40px', 
                  borderRadius: '999px', 
                  background: 'linear-gradient(135deg, #008080, #059669)', 
                  color: '#fff', 
                  border: 'none', 
                  fontWeight: 700, 
                  fontSize: '1rem', 
                  cursor: 'pointer', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 8px 28px rgba(0,128,128,0.35)', 
                  transition: 'transform 0.2s, box-shadow 0.2s', 
                  letterSpacing: '0.01em',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'; 
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.12), 0 12px 40px rgba(0,128,128,0.45)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1), 0 8px 28px rgba(0,128,128,0.35)'; 
                }}
              >
                <Rocket size={20} strokeWidth={2.5} /> Start Free Now
              </button>
              <p style={{ marginTop: '12px', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '0.02em' }}>No credit card • Instant access • All resources free</p>
            </div>
          </RevealOnScroll>
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
