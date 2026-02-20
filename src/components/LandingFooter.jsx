import React from 'react';

export const LandingFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>ⓘ About</h4>
          <ul>
            <li>About NDLI</li>
            <li>Disclaimer</li>
            <li>Sponsor</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>? Guidelines</h4>
          <ul>
            <li>Copyright Guide</li>
            <li>Institutional Registration</li>
            <li>Sitemap</li>
            <li>Branding</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>⚙ Our Services</h4>
          <ul>
            <li>NDLI Club</li>
            <li>IDR Hosting Service</li>
            <li>Institutional Digital Library</li>
            <li>Digital Preservation Centre</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>📞 Contact Us</h4>
          <ul>
            <li>Contact</li>
            <li>Feedback</li>
          </ul>
          <div className="app-section">
            <p style={{ fontSize: '0.8rem', color: '#fff' }}>Available on</p>
            <div className="app-icons">
              <div className="app-btn">🍎</div>
              <div className="app-btn">🤖</div>
              <div className="app-btn">🌐</div>
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
          <span style={{ background: '#3b5998' }}>f</span>
          <span style={{ background: '#000' }}>𝕏</span>
          <span style={{ background: '#e4405f' }}>i</span>
          <span style={{ background: '#0077b5' }}>in</span>
        </div>
      </div>
    </footer>
  );
};
