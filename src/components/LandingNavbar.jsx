import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingNavbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <nav>
      <div className="logo">NATIONAL DIGITAL LIBRARY</div>
      <div className="nav-links">
        <a href="#language">Language</a>
        <a href="#login" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Log-in</a>
        <a href="#fullscreen" onClick={(e) => { e.preventDefault(); handleFullscreen(); }}>Fullscreen</a>
      </div>
    </nav>
  );
};
