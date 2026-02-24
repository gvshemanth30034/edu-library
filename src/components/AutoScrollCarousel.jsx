import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ===================================
   AUTO-SCROLLING CAROUSEL COMPONENT (V3)
   - CSS lives inside the component (no head injection)
   - Seamless marquee loop
   - Pause on hover
   =================================== */

export const AutoScrollCarousel = () => {
  const scrollWrapperRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Card data for the carousel
  const carouselCards = [
    {
      id: 1,
      title: 'SCHOOL TEXTBOOKS',
      icon: '📚',
      links: ['NCERT Books', 'State Boards', 'Question Banks'],
      bgImage: 'from-teal-500 via-teal-600 to-teal-700',
      slug: 'school-education',
    },
    {
      id: 2,
      title: 'ENGINEERING',
      icon: '⚙️',
      links: ['BTech Resources', 'Project Guides', 'Assignments'],
      bgImage: 'from-purple-500 via-purple-600 to-purple-700',
      slug: 'engineering',
    },
    {
      id: 3,
      title: 'RESEARCH PAPERS',
      icon: '🔬',
      links: ['IEEE Papers', 'Journals', 'Theses'],
      bgImage: 'from-green-500 via-green-600 to-green-700',
      slug: 'higher-education',
    },
    {
      id: 4,
      title: 'LITERATURE',
      icon: '📖',
      links: ['Novels', 'Poetry', 'Classic Works'],
      bgImage: 'from-pink-500 via-pink-600 to-pink-700',
      slug: 'english-literature',
    },
    {
      id: 5,
      title: 'HUMANITIES',
      icon: '🎓',
      links: ['History', 'Philosophy', 'Culture'],
      bgImage: 'from-amber-500 via-amber-600 to-amber-700',
      slug: 'history',
    },
    {
      id: 6,
      title: 'LAW & LEGAL',
      icon: '⚖️',
      links: ['Acts & Bills', 'Cases', 'Legal Books'],
      bgImage: 'from-red-500 via-red-600 to-red-700',
      slug: 'law',
    },
    {
      id: 7,
      title: 'CAREER DEVELOPMENT',
      icon: '💼',
      links: ['Resume Writing', 'Interview Prep', 'Networking'],
      bgImage: 'from-sky-500 via-sky-600 to-sky-700',
      slug: 'career-development',
    },
    {
      id: 8,
      title: 'CULTURAL ARCHIVES',
      icon: '🏛️',
      links: ['Art History', 'Festivals', 'Heritage'],
      bgImage: 'from-rose-500 via-rose-600 to-rose-700',
      slug: 'cultural-archives',
    },
    {
      id: 9,
      title: 'NEWSPAPER ARCHIVES',
      icon: '📰',
      links: ['National News', 'Hindi Press', 'Regional'],
      bgImage: 'from-slate-500 via-slate-600 to-slate-700',
      slug: 'newspaper-archives',
    },
    {
      id: 10,
      title: 'JUDICIAL RESOURCES',
      icon: '🏛',
      links: ['SC Judgments', 'HC Orders', 'Laws & Acts'],
      bgImage: 'from-stone-500 via-stone-600 to-stone-700',
      slug: 'judicial-resources',
    },
    {
      id: 11,
      title: 'PATENTS & STANDARDS',
      icon: '📜',
      links: ['CPC Classification', 'Jurisdictions', 'Issuing Authority'],
      bgImage: 'from-indigo-500 via-indigo-600 to-indigo-700',
      slug: 'patents-standards',
    },
    {
      id: 12,
      title: 'COMPUTER SCIENCE',
      icon: '💻',
      links: ['Algorithms', 'AI & ML', 'Data Structures'],
      bgImage: 'from-cyan-500 via-cyan-600 to-cyan-700',
      slug: 'computer-science',
    },
    {
      id: 13,
      title: 'MEDICAL SCIENCES',
      icon: '🩺',
      links: ['Anatomy', 'Pharmacology', 'Pathology'],
      bgImage: 'from-emerald-500 via-emerald-600 to-emerald-700',
      slug: 'medical-sciences',
    },
    {
      id: 14,
      title: 'BUSINESS ADMIN',
      icon: '📊',
      links: ['Management', 'Marketing', 'Strategy'],
      bgImage: 'from-orange-500 via-orange-600 to-orange-700',
      slug: 'business-administration',
    },
    {
      id: 15,
      title: 'PSYCHOLOGY',
      icon: '🧠',
      links: ['Cognitive Science', 'Clinical', 'Developmental'],
      bgImage: 'from-violet-500 via-violet-600 to-violet-700',
      slug: 'psychology',
    },
    {
      id: 16,
      title: 'MATHEMATICS',
      icon: '📐',
      links: ['Calculus', 'Linear Algebra', 'Statistics'],
      bgImage: 'from-lime-500 via-lime-600 to-lime-700',
      slug: 'mathematics',
    },
  ];

  // Duplicate for seamless loop
  const duplicatedCards = [...carouselCards, ...carouselCards];

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Manual scroll (optional). For this to work, wrapper must be scrollable.
  // We'll make it scrollable on md+ only, but keep overflow hidden visually.
  const handleScrollLeft = () => {
    if (!scrollWrapperRef.current) return;
    scrollWrapperRef.current.scrollBy({ left: -380, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!scrollWrapperRef.current) return;
    scrollWrapperRef.current.scrollBy({ left: 380, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50 overflow-hidden">
      {/* Component-scoped CSS (no head injection, no “maybe effect ran”) */}
      <style>{`
        @keyframes autoScrollMarqueeV3 {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }

        .autoScrollV3-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: autoScrollMarqueeV3 14s linear infinite;
        }

        .autoScrollV3-paused {
          animation-play-state: paused !important;
        }

        /* Prevent any accidental wrapping */
        .autoScrollV3-track > * {
          flex: 0 0 auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .autoScrollV3-track {
            animation: none;
            transform: none;
          }
        }

        @media (max-width: 768px) {
          .autoScrollV3-arrowBtn {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DEBUG BADGE: if you don't see this, you're not rendering this file */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-black text-white text-xs">
          CAROUSEL V3
          <span className="opacity-70">(remove later)</span>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="heading-entrance heading-premium text-3xl md:text-4xl font-bold text-teal-900 mb-3">
            Featured Collections
          </h2>
          <p className="heading-entrance heading-entrance-delay-1 text-gray-600">
            Explore our curated collections across various disciplines
          </p>
        </div>

        {/* Outer wrapper for arrows */}
        <div className="relative">
          {/* Scroll wrapper */}
          <div
            ref={scrollWrapperRef}
            className="overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Track */}
            <div className={`autoScrollV3-track ${isPaused ? 'autoScrollV3-paused' : ''}`}>
              {duplicatedCards.map((card, index) => (
                <CarouselCard key={`${card.id}-${index}`} card={card} />
              ))}
            </div>
          </div>

          {/* Manual arrows (still optional) */}
          <button
            onClick={handleScrollLeft}
            className="autoScrollV3-arrowBtn absolute top-1/2 -left-10 transform -translate-y-1/2 z-40 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 group"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-teal-900 group-hover:text-teal-600 transition-colors" />
          </button>

          <button
            onClick={handleScrollRight}
            className="autoScrollV3-arrowBtn absolute top-1/2 -right-10 transform -translate-y-1/2 z-40 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 group"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-teal-900 group-hover:text-teal-600 transition-colors" />
          </button>
        </div>

        {/* Pause Indicator */}
        {isPaused && (
          <div className="text-center mt-6 text-sm text-gray-500">
            ⏸ Scrolling paused • Move mouse to resume
          </div>
        )}
      </div>
    </section>
  );
};

/* ===================================
   INDIVIDUAL CAROUSEL CARD COMPONENT
   =================================== */

const CarouselCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-80 h-96 mr-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer relative"
      onClick={() => card.slug && navigate(`/category/${card.slug}`)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.bgImage} opacity-90`} />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-4xl border border-white border-opacity-30 group-hover:bg-opacity-30 transition-all duration-300">
            {card.icon}
          </div>

          <h3 className="heading-entrance heading-entrance-card text-2xl font-semibold uppercase tracking-wider leading-tight">
            {card.title}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {card.links.map((link, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm text-white opacity-90 hover:opacity-100 transition-opacity"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white opacity-60" />
                {link}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold pt-2 opacity-100 group-hover:opacity-100 cursor-pointer hover:gap-3 transition-all duration-300">
            <span>Explore More Contents</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};