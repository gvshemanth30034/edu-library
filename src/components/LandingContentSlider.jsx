import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorySlug } from '../data/categoryContentData';

const CARDS_DATA = [
  {
    id: 1,
    title: 'Career Development',
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    links: ['Examinations', 'Resource Types', 'Languages'],
  },
  {
    id: 2,
    title: 'Cultural Archives',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
    links: ['Content Providers', 'Resource Types', 'Languages'],
  },
  {
    id: 3,
    title: 'Newspaper Archives',
    icon: '📰',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
    links: ['Content Providers', 'Countries', 'Languages'],
  },
  {
    id: 4,
    title: 'Judicial Resources',
    icon: '⚖️',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    links: ['Content Providers', 'Case Types', 'Laws/Acts'],
  },
  {
    id: 5,
    title: 'Patents & Standards',
    icon: '📝',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    links: ['CPC Classification', 'Jurisdictions', 'Issuing Authority'],
  },
  {
    id: 6,
    title: 'School Education',
    icon: '🎒',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    links: ['Educational Boards', 'Educational Levels', 'Subjects'],
  },
  {
    id: 7,
    title: 'Higher Education',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
    links: ['Universities', 'Colleges', 'Research'],
  },
  {
    id: 8,
    title: 'Engineering',
    icon: '🛠️',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
    links: ['Mechanical', 'Software', 'Electrical'],
  },
];

export const LandingContentSlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const scrollStepRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (title) => {
    const slug = getCategorySlug(title);
    navigate(`/category/${slug}`);
  };

  const updateScrollStep = () => {
    if (!sliderRef.current) return;
    const firstCard = sliderRef.current.querySelector('.card');
    if (!firstCard) return;
    const styles = window.getComputedStyle(sliderRef.current);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');
    scrollStepRef.current = firstCard.getBoundingClientRect().width + gap;
  };

  // Auto-scroll functionality
  useEffect(() => {
    updateScrollStep();

    const handleResize = () => updateScrollStep();
    window.addEventListener('resize', handleResize);

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);

      autoScrollIntervalRef.current = setInterval(() => {
        if (!sliderRef.current || isHovered) return;

        const step = scrollStepRef.current || 300;
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const nextScroll = sliderRef.current.scrollLeft + step;

        if (nextScroll >= maxScrollLeft - 2) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'auto' });
          return;
        }

        sliderRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }, 2500);
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  const handleNextClick = () => {
    if (sliderRef.current) {
      const step = scrollStepRef.current || 300;
      const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const nextScroll = sliderRef.current.scrollLeft + step;

      if (nextScroll >= maxScrollLeft - 2) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'auto' });
        return;
      }

      sliderRef.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      const step = scrollStepRef.current || 300;
      if (sliderRef.current.scrollLeft <= 2) {
        sliderRef.current.scrollTo({ left: sliderRef.current.scrollWidth, behavior: 'auto' });
        return;
      }

      sliderRef.current.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="slider-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="arrow arrow-left" id="prevBtn" onClick={handlePrevClick}>❮</button>
      
      <div className="content-grid" ref={sliderRef}>
        {CARDS_DATA.map((card) => (
          <div key={card.id} className="card cursor-pointer transition-transform hover:scale-105" onClick={() => handleCardClick(card.title)}>
            <div 
              className="card-img" 
              style={{ backgroundImage: `url('${card.image}')` }}
            >
              <h3>{card.title}</h3>
            </div>
            <div className="icon-box">{card.icon}</div>
            <ul className="card-links">
              {card.links.map((link, idx) => (
                <li key={idx}>{link}</li>
              ))}
            </ul>
            <div className="card-footer">Explore More Contents</div>
          </div>
        ))}
      </div>
      
      <button className="arrow arrow-right" id="nextBtn" onClick={handleNextClick}>❯</button>
    </section>
  );
};
