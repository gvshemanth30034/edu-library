import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorySlug } from '../data/categoryContentData';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';

const CARDS_DATA = [
  {
    id: 1,
    titleKey: 'careerDevelopment',
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    links: ['Examinations', 'Resource Types', 'Languages'],
  },
  {
    id: 2,
    titleKey: 'culturalArchives',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
    links: ['Content Providers', 'Resource Types', 'Languages'],
  },
  {
    id: 3,
    titleKey: 'newspaperArchives',
    icon: '📰',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
    links: ['Content Providers', 'Countries', 'Languages'],
  },
  {
    id: 4,
    titleKey: 'judicialResources',
    icon: '⚖️',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    links: ['Content Providers', 'Case Types', 'Laws/Acts'],
  },
  {
    id: 5,
    titleKey: 'patentsStandards',
    icon: '📝',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    links: ['CPC Classification', 'Jurisdictions', 'Issuing Authority'],
  },
  {
    id: 6,
    titleKey: 'schoolEducation',
    icon: '🎒',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    links: ['Educational Boards', 'Educational Levels', 'Subjects'],
  },
  {
    id: 7,
    titleKey: 'higherEducation',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
    links: ['Universities', 'Colleges', 'Research'],
  },
  {
    id: 8,
    titleKey: 'engineering',
    icon: '🛠️',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
    links: ['Mechanical', 'Software', 'Electrical'],
  },
  {
    id: 9,
    titleKey: 'computerScience',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    links: ['Algorithms', 'AI & ML', 'Data Structures'],
  },
  {
    id: 10,
    titleKey: 'medicalSciences',
    icon: '🩺',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    links: ['Anatomy', 'Pharmacology', 'Pathology'],
  },
  {
    id: 11,
    titleKey: 'businessAdmin',
    icon: '📊',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    links: ['Management', 'Marketing', 'Strategy'],
  },
  {
    id: 12,
    titleKey: 'mathematics',
    icon: '📐',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
    links: ['Calculus', 'Linear Algebra', 'Statistics'],
  },
  {
    id: 13,
    titleKey: 'psychology',
    icon: '🧠',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    links: ['Cognitive Science', 'Clinical', 'Developmental'],
  },
  {
    id: 14,
    titleKey: 'physics',
    icon: '⚛️',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
    links: ['Quantum Mechanics', 'Optics', 'Electrodynamics'],
  },
  {
    id: 15,
    titleKey: 'economics',
    icon: '📈',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    links: ['Microeconomics', 'Macroeconomics', 'Econometrics'],
  },
  {
    id: 16,
    titleKey: 'biotechnology',
    icon: '🧬',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
    links: ['Molecular Biology', 'Bioinformatics', 'Fermentation'],
  },
];

export const LandingContentSlider = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const trackRef   = useRef(null);
  const firstCardRef = useRef(null);
  const stepRef    = useRef(270); // card width + gap (measured after mount)
  const indexRef   = useRef(0);   // current card-unit offset
  const inMotion   = useRef(false);
  const timerRef   = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  const TOTAL = CARDS_DATA.length; // 16 — we render 3 copies (48 cards)

  const handleCardClick = (title) => {
    const slug = getCategorySlug(title);
    navigate(`/category/${slug}`);
  };

  /* Measure real card width (+ gap) after first render */
  useEffect(() => {
    if (firstCardRef.current && trackRef.current) {
      const cardW = firstCardRef.current.getBoundingClientRect().width;
      const styles = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(styles.columnGap || styles.gap || '20');
      stepRef.current = cardW + gap;

      // Start positioned at the 2nd copy so we can loop backwards too
      indexRef.current = TOTAL;
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(-${TOTAL * stepRef.current}px)`;
    }
  }, []);

  /* After a slide animation completes, silently re-center if needed */
  const onTransitionEnd = useCallback(() => {
    inMotion.current = false;
    if (!trackRef.current) return;

    if (indexRef.current >= TOTAL * 2) {
      indexRef.current = TOTAL;
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(-${TOTAL * stepRef.current}px)`;
    } else if (indexRef.current < TOTAL) {
      indexRef.current = TOTAL * 2 - 1;
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(-${(TOTAL * 2 - 1) * stepRef.current}px)`;
    }
  }, []);

  /* Slide one card to the left */
  const slideNext = useCallback(() => {
    if (inMotion.current || isHoveredRef.current || !trackRef.current) return;
    inMotion.current = true;
    indexRef.current += 1;
    trackRef.current.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    trackRef.current.style.transform = `translateX(-${indexRef.current * stepRef.current}px)`;
  }, []);

  /* Auto-advance every 2 s */
  useEffect(() => {
    timerRef.current = setInterval(slideNext, 2000);
    return () => clearInterval(timerRef.current);
  }, [slideNext]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  /* Render 3 copies for seamless forward + backward looping */
  const allCards = [...CARDS_DATA, ...CARDS_DATA, ...CARDS_DATA];

  return (
    <section
      className="slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ overflow: 'hidden', padding: '10px 0', position: 'relative' }}>
        <div
          ref={trackRef}
          onTransitionEnd={onTransitionEnd}
          style={{ display: 'flex', gap: '20px', width: 'max-content' }}
        >
          {allCards.map((card, idx) => (
            <div
              key={idx}
              ref={idx === 0 ? firstCardRef : null}
              className="card"
              style={{ cursor: 'pointer', flexShrink: 0 }}
              onClick={() => handleCardClick(translate(card.titleKey, language))}
            >
              <div
                className="card-img"
                style={{ backgroundImage: `url('${card.image}')` }}
              >
                <h3 className="heading-entrance heading-entrance-card">{translate(card.titleKey, language)}</h3>
              </div>
              <div className="icon-box">{card.icon}</div>
              <ul className="card-links">
                {card.links.map((link, linkIdx) => (
                  <li key={linkIdx}>{link}</li>
                ))}
              </ul>
              <div className="card-footer">{translate('exploreMore', language)}</div>
            </div>
          ))}
        </div>
      </div>

      {isHovered && (
        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#999', marginTop: '6px' }}>
          ⏸ Paused — move mouse away to resume
        </p>
      )}
    </section>
  );
};
