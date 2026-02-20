import React, { useState } from 'react';
import { LandingNavbar } from '../components/LandingNavbar.jsx';
import { LandingHero } from '../components/LandingHero.jsx';
import { LandingContentSlider } from '../components/LandingContentSlider.jsx';
import { LandingFooter } from '../components/LandingFooter.jsx';
import { LoginModal } from '../components/LoginModal.jsx';
import { RecoveryModal } from '../components/RecoveryModal.jsx';

export const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar onLoginClick={() => setIsLoginOpen(true)} />
      <LandingHero />
      <LandingContentSlider />
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
