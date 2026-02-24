import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, LogIn, Maximize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';

export const LandingNavbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'];

  return (
    <nav style={{ padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="logo" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#008080', letterSpacing: '0.02em' }}>{translate('logo', language)}</div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Language Dropdown */}
        <div ref={langMenuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e0f2f1',
              background: '#fff',
              color: '#0f4c4c',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f0fdfa';
              e.currentTarget.style.borderColor = '#008080';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,128,128,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e0f2f1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            }}
          >
            <Globe size={16} strokeWidth={2} />
            <span>{language}</span>
          </button>
          {showLangMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              background: '#fff',
              border: '1px solid #e0f2f1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: '140px',
              zIndex: 1001,
              overflow: 'hidden'
            }}>
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    border: 'none',
                    background: language === lang ? '#f0fdfa' : '#fff',
                    color: language === lang ? '#008080' : '#0f172a',
                    fontSize: '0.875rem',
                    fontWeight: language === lang ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0fdfa'}
                  onMouseLeave={e => e.currentTarget.style.background = language === lang ? '#f0fdfa' : '#fff'}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={(e) => { e.preventDefault(); onLoginClick(); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #008080, #059669)',
            color: '#fff',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0,128,128,0.25)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,128,128,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,128,128,0.25)';
          }}
        >
          <LogIn size={16} strokeWidth={2} />
          <span>{translate('login', language)}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={(e) => { e.preventDefault(); handleFullscreen(); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #e0f2f1',
            background: '#fff',
            color: '#0f4c4c',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#f0fdfa';
            e.currentTarget.style.borderColor = '#008080';
            e.currentTarget.style.transform = 'translateY(-1px) rotate(90deg)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,128,128,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.borderColor = '#e0f2f1';
            e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
          }}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          <Maximize2 size={18} strokeWidth={2} />
        </button>
      </div>
    </nav>
  );
};
