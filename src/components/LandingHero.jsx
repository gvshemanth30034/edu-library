import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';

const STATS = [
  { value: 5000000, label: 'resources', suffix: '+', display: '5M+' },
  { value: 30,      label: 'languages', suffix: '+', display: '30+' },
  { value: 1000,    label: 'institutions', suffix: '+', display: '1K+' },
  { value: 16,      label: 'departments', suffix: '', display: '16' },
];

const FLOATING = [
  { emoji: '📚', style: { top: '18%', left: '6%',  animationDelay: '0s',   animationDuration: '6s'  } },
  { emoji: '🎓', style: { top: '55%', left: '3%',  animationDelay: '1.5s', animationDuration: '7s'  } },
  { emoji: '🔬', style: { top: '20%', right: '5%', animationDelay: '0.8s', animationDuration: '5.5s'} },
  { emoji: '⚖️', style: { top: '60%', right: '4%', animationDelay: '2s',   animationDuration: '8s'  } },
  { emoji: '💡', style: { top: '80%', left: '10%', animationDelay: '1s',   animationDuration: '6.5s'} },
  { emoji: '🖥️', style: { top: '75%', right: '9%', animationDelay: '2.5s', animationDuration: '7.5s'} },
];

export const LandingHero = () => {
  const { language } = useLanguage();
  const [searchText, setSearchText] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  const [counts, setCounts]         = useState(STATS.map(() => 0));
  const countedRef = useRef(false);

  useEffect(() => {
    if (countedRef.current) return;
    countedRef.current = true;
    STATS.forEach((stat, i) => {
      const duration = 1800;
      const steps    = 60;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          clearInterval(timer);
          setCounts(prev => { const n=[...prev]; n[i]=stat.value; return n; });
        } else {
          setCounts(prev => { const n=[...prev]; n[i]=Math.floor(current); return n; });
        }
      }, duration / steps);
    });
  }, []);

  const formatCount = (val, stat) => {
    if (val >= 1000000) return (val/1000000).toFixed(1).replace('.0','') + 'M+';
    if (val >= 1000) return (val/1000).toFixed(0) + 'K+';
    return val + stat.suffix;
  };

  const handleSearch = () => {
    if (searchText.trim()) console.log(`Searching: "${searchText}" in ${selectedLang}`);
  };

  return (
    <header className="hero" style={{ paddingTop: '20px', paddingBottom: '28px', overflow: 'hidden' }}>
      {/* Floating emoji decorations */}
      {FLOATING.map((f, i) => (
        <span key={i} className="hero-float" style={{ ...f.style, animationDuration: f.style.animationDuration, animationDelay: f.style.animationDelay }}>{f.emoji}</span>
      ))}

      <h1 className="heading-entrance heading-premium">{translate('heroTitle', language)} <span>{translate('heroTitleHighlight', language)}</span></h1>
      <p className="heading-entrance heading-entrance-delay-1">{translate('heroSubtitle', language)}</p>

      <div className="search-container">
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          <option>Telugu</option>
          <option>Bengali</option>
          <option>Marathi</option>
        </select>
        <input
          type="text"
          placeholder={translate('searchPlaceholder', language)}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>{translate('searchButton', language)}</button>
      </div>

      {/* Animated stats strip */}
      <div className="hero-stats">
        {STATS.map((stat, i) => (
          <div key={i} className="hero-stat-item">
            <span className="hero-stat-num">{formatCount(counts[i], stat)}</span>
            <span className="hero-stat-label">{translate(stat.label, language)}</span>
          </div>
        ))}
      </div>
    </header>
  );
};
