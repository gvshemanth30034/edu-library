import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, HelpCircle, Settings, Phone, Apple, Smartphone, Globe as GlobeIcon } from 'lucide-react';

export const LandingFooter = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4><Info size={18} /> About</h4>
          <ul>
            <li onClick={() => handleNavigation('/about')}>About NDLI</li>
            <li onClick={() => handleNavigation('/disclaimer')}>Disclaimer</li>
            <li onClick={() => handleNavigation('/sponsor')}>Sponsor</li>
            <li onClick={() => handleNavigation('/privacy')}>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4><HelpCircle size={18} /> Guidelines</h4>
          <ul>
            <li onClick={() => handleNavigation('/copyright')}>Copyright Guide</li>
            <li onClick={() => handleNavigation('/registration')}>Institutional Registration</li>
            <li onClick={() => handleNavigation('/sitemap')}>Sitemap</li>
            <li onClick={() => handleNavigation('/branding')}>Branding</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4><Settings size={18} /> Our Services</h4>
          <ul>
            <li onClick={() => handleNavigation('/ndli-club')}>NDLI Club</li>
            <li onClick={() => handleNavigation('/idr-hosting')}>IDR Hosting Service</li>
            <li onClick={() => handleNavigation('/institutional-library')}>Institutional Digital Library</li>
            <li onClick={() => handleNavigation('/digital-preservation')}>Digital Preservation Centre</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4><Phone size={18} /> Contact Us</h4>
          <ul>
            <li onClick={() => handleNavigation('/contact')}>Contact</li>
            <li onClick={() => handleNavigation('/feedback')}>Feedback</li>
          </ul>
          <div className="app-section">
            <p style={{ fontSize: '0.85rem', color: '#e0f2f1', fontWeight: 500, marginBottom: '12px' }}>Available on</p>
            <div className="app-icons">
              <div className="app-btn" title="iOS App">
                <Apple size={20} strokeWidth={2} color="#008080" />
              </div>
              <div className="app-btn" title="Android App">
                <Smartphone size={20} strokeWidth={2} color="#008080" />
              </div>
              <div className="app-btn" title="Web App">
                <GlobeIcon size={20} strokeWidth={2} color="#008080" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <p>Site best viewed in 1280 x 720 pixels resolution or higher.</p>
          <p>© Copyright 2026 National Digital Library of India</p>
        </div>
        <div className="social-bar">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ background: '#008080' }} title="Facebook">
            <span>f</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ background: '#005959' }} title="X (Twitter)">
            <span>𝕏</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ background: '#0d9488' }} title="Instagram">
            <span>i</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ background: '#059669' }} title="LinkedIn">
            <span>in</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
