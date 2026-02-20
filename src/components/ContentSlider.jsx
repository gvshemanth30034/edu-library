import React, { useState, useRef, useEffect } from 'react';

/**
 * NDL CONTENT CARDS SLIDER
 * -  Horizontal scrolling cards with content categories
 * - Auto-scroll with manual navigation
 * - Pause on hover
 */

const CARDS = [
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

export const ContentSlider = () => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || !sliderRef.current) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += 1;
        
        // Loop back to start when reaching end
        if (
          sliderRef.current.scrollLeft >=
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth
        ) {
          sliderRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Update scroll button visibility
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10
    );
  };

  // Manual scroll functions
  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === 'left' ? -350 : 350,
      behavior: 'smooth',
    });
  };

  return (
    <section className="ndl-slider-section py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Explore Content Categories</h2>

        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="ndl-arrow-left absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
            >
              ❮
            </button>
          )}

          {/* Slider Content */}
          <div
            ref={sliderRef}
            className="ndl-slider-content flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={handleScroll}
          >
            {/* Duplicate cards for seamless loop */}
            {[...CARDS, ...CARDS].map((card, idx) => (
              <div
                key={idx}
                className="ndl-card flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Image */}
                <div
                  className="ndl-card-image h-32 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black opacity-35"></div>
                  
                  {/* Category Title */}
                  <h3 className="absolute inset-0 flex items-center justify-center text-white text-center text-sm font-bold px-3 uppercase">
                    {card.title}
                  </h3>
                </div>

                {/* Icon Circle */}
                <div className="flex justify-center -mt-6 relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-2xl border border-gray-200">
                    {card.icon}
                  </div>
                </div>

                {/* Card Links */}
                <ul className="px-4 py-3 space-y-2">
                  {card.links.map((link, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-600 hover:text-blue-900 cursor-pointer transition flex items-center"
                    >
                      <span className="mr-2">▶️</span>
                      {link}
                    </li>
                  ))}
                </ul>

                {/* Card Footer */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
                  <p className="text-xs font-bold text-green-700 cursor-pointer hover:text-green-800 transition">
                    Explore More Contents
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="ndl-arrow-right absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
            >
              ❯
            </button>
          )}
        </div>

        {/* Info Text */}
        <p className="mt-6 text-center text-sm text-gray-600">
          💡 Scroll or use arrows to explore more categories
        </p>
      </div>
    </section>
  );
};
