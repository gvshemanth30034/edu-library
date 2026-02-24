import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, BookOpen, FlaskConical, Landmark, Scale, Palette, Heart, Library, TrendingUp } from 'lucide-react';

/**
 * DEPARTMENTS PAGE – Central Library Style
 * Grouped by academic field with search & filter
 */

const ALL_DEPARTMENTS = [
  /* ─── STEM ──────────────────────────────────────────────── */
  {
    field: 'STEM',
    color: 'teal',
    icon: <FlaskConical className="h-5 w-5" />,
    departments: [
      { name: 'Computer Science',        slug: 'computer-science',    count: 45, description: 'Algorithms, AI/ML, Networks, Software Engineering' },
      { name: 'Electronics & Comm.',     slug: 'electronics',         count: 38, description: 'VLSI, DSP, Communication Systems, Embedded' },
      { name: 'Mechanical Engineering',  slug: 'mechanical',          count: 32, description: 'Thermodynamics, Fluid Mechanics, Manufacturing' },
      { name: 'Civil Engineering',       slug: 'civil-engineering',   count: 28, description: 'Structural Analysis, Geotechnical, Construction' },
      { name: 'Mathematics',             slug: 'mathematics',         count: 25, description: 'Calculus, Linear Algebra, Discrete Math, Statistics' },
      { name: 'Physics',                 slug: 'physics',             count: 22, description: 'Quantum Mechanics, Optics, Electrodynamics' },
      { name: 'Chemical Engineering',    slug: 'chemical-engineering',count: 20, description: 'Reaction Engineering, Process Design, Mass Transfer' },
      { name: 'Biotechnology',           slug: 'biotechnology',       count: 18, description: 'Molecular Biology, Bioinformatics, Bioprocess Tech' },
      { name: 'Environmental Science',   slug: 'environmental-science',count: 16, description: 'Ecology, Climate Change, Pollution Control' },
    ],
  },
  /* ─── COMMERCE & MANAGEMENT ─────────────────────────────── */
  {
    field: 'Commerce & Management',
    color: 'blue',
    icon: <TrendingUp className="h-5 w-5" />,
    departments: [
      { name: 'Business Administration', slug: 'business-administration', count: 30, description: 'Strategy, Marketing, Operations, Entrepreneurship' },
      { name: 'Economics',               slug: 'economics',               count: 26, description: 'Micro/Macro Economics, Econometrics, Trade' },
      { name: 'Accounting & Finance',    slug: 'accounting-finance',      count: 24, description: 'Financial Accounting, Corporate Finance, Taxation' },
    ],
  },
  /* ─── HUMANITIES & SOCIAL SCIENCES ──────────────────────── */
  {
    field: 'Humanities & Social Sciences',
    color: 'purple',
    icon: <Landmark className="h-5 w-5" />,
    departments: [
      { name: 'Psychology',          slug: 'psychology',         count: 22, description: 'Cognitive, Developmental, Clinical, Research Methods' },
      { name: 'History',             slug: 'history',            count: 20, description: 'Ancient, Medieval & Modern India, World History' },
      { name: 'English Literature',  slug: 'english-literature', count: 18, description: 'Literary Theory, Shakespeare, Communication Skills' },
    ],
  },
  /* ─── LAW & GOVERNANCE ───────────────────────────────────── */
  {
    field: 'Law & Governance',
    color: 'amber',
    icon: <Scale className="h-5 w-5" />,
    departments: [
      { name: 'Law & Legal Studies', slug: 'law', count: 28, description: 'Constitutional, Criminal, Corporate, Cyber & Int\'l Law' },
    ],
  },
  /* ─── ARTS & DESIGN ──────────────────────────────────────── */
  {
    field: 'Arts & Design',
    color: 'rose',
    icon: <Palette className="h-5 w-5" />,
    departments: [
      { name: 'Architecture & Design', slug: 'architecture', count: 19, description: 'Architectural Design, Urban Planning, Sustainable Design' },
    ],
  },
  /* ─── MEDICAL & HEALTH SCIENCES ─────────────────────────── */
  {
    field: 'Medical & Health Sciences',
    color: 'red',
    icon: <Heart className="h-5 w-5" />,
    departments: [
      { name: 'Medical Sciences', slug: 'medical-sciences', count: 34, description: 'Anatomy, Physiology, Pharmacology, Pathology, Public Health' },
    ],
  },
  /* ─── LIBRARY & INFORMATION SCIENCE ──────────────────────── */
  {
    field: 'Library & Information Science',
    color: 'slate',
    icon: <Library className="h-5 w-5" />,
    departments: [
      { name: 'Library & Information Science', slug: 'library-science', count: 14, description: 'Cataloguing, Metadata, Digital Libraries, Information Retrieval' },
    ],
  },
];

const COLOR_MAP = {
  teal:   { badge: 'bg-teal-50 text-teal-700 border-teal-100',   btn: 'bg-teal-600 hover:bg-teal-700',   ring: 'ring-teal-100',   dot: 'bg-teal-500',   heading: 'text-teal-700' },
  blue:   { badge: 'bg-blue-50 text-blue-700 border-blue-100',   btn: 'bg-blue-600 hover:bg-blue-700',   ring: 'ring-blue-100',   dot: 'bg-blue-500',   heading: 'text-blue-700' },
  purple: { badge: 'bg-purple-50 text-purple-700 border-purple-100', btn: 'bg-purple-600 hover:bg-purple-700', ring: 'ring-purple-100', dot: 'bg-purple-500', heading: 'text-purple-700' },
  amber:  { badge: 'bg-amber-50 text-amber-700 border-amber-100', btn: 'bg-amber-600 hover:bg-amber-700', ring: 'ring-amber-100',  dot: 'bg-amber-500',  heading: 'text-amber-700' },
  rose:   { badge: 'bg-rose-50 text-rose-700 border-rose-100',   btn: 'bg-rose-600 hover:bg-rose-700',   ring: 'ring-rose-100',   dot: 'bg-rose-500',   heading: 'text-rose-700' },
  red:    { badge: 'bg-red-50 text-red-700 border-red-100',      btn: 'bg-red-600 hover:bg-red-700',     ring: 'ring-red-100',    dot: 'bg-red-500',    heading: 'text-red-700' },
  slate:  { badge: 'bg-slate-100 text-slate-700 border-slate-200', btn: 'bg-slate-600 hover:bg-slate-700', ring: 'ring-slate-200', dot: 'bg-slate-500', heading: 'text-slate-700' },
};

export const DepartmentsPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeField, setActiveField] = useState('All');

  const allFields = ['All', ...ALL_DEPARTMENTS.map((g) => g.field)];

  const totalResources = ALL_DEPARTMENTS.flatMap((g) => g.departments).reduce((s, d) => s + d.count, 0);
  const totalDepts     = ALL_DEPARTMENTS.flatMap((g) => g.departments).length;

  const filtered = ALL_DEPARTMENTS
    .map((group) => ({
      ...group,
      departments: group.departments.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.description.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => {
      if (activeField !== 'All' && group.field !== activeField) return false;
      return group.departments.length > 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Header ────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden text-white py-14 px-4 sm:px-8"
        style={{ background: 'linear-gradient(135deg, #004d4d 0%, #008080 50%, #1e6e8c 100%)' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="mb-5 inline-flex items-center gap-1.5 text-teal-200 text-sm font-medium hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Dashboard
          </button>
          <h1 className="heading-entrance heading-premium text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Central Library
          </h1>
          <p className="heading-entrance heading-entrance-delay-1 text-teal-100 text-lg mb-8 max-w-xl">
            Explore {totalDepts} departments across {ALL_DEPARTMENTS.length} academic fields — {totalResources}+ curated resources at your fingertips.
          </p>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search departments…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-400 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* ── Field Filter Pills ──────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {allFields.map((f) => (
            <button
              key={f}
              onClick={() => setActiveField(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeField === f
                  ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                  : 'bg-white border-gray-200 text-slate-600 hover:border-teal-300 hover:text-teal-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Department Groups ───────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="heading-entrance heading-premium text-xl font-semibold text-slate-700 mb-1">No departments found</h3>
            <p className="text-slate-500 text-sm">Try a different search term or field filter.</p>
          </div>
        ) : (
          filtered.map((group) => {
            const c = COLOR_MAP[group.color];
            return (
              <section key={group.field}>
                {/* Group Header */}
                <div className={`flex items-center gap-3 mb-5 pb-3 border-b border-gray-200`}>
                  <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg border ${c.badge}`}>
                    {group.icon}
                  </span>
                  <h2 className={`heading-entrance heading-premium text-xl font-bold ${c.heading}`}>{group.field}</h2>
                  <span className="ml-auto text-xs text-slate-400 font-medium">{group.departments.length} dept{group.departments.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Department Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.departments.map((dept) => (
                    <div
                      key={dept.slug}
                      className={`group bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ring-0 hover:ring-4 ${c.ring} cursor-pointer`}
                      onClick={() => navigate(`/category/${dept.slug}`)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="heading-entrance-card font-bold text-slate-900 text-base leading-snug group-hover:text-slate-700 transition-colors">
                          {dept.name}
                        </h3>
                        <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
                          {dept.count} resources
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed flex-1">{dept.description}</p>
                      <button
                        className={`mt-auto self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors ${c.btn}`}
                        onClick={(e) => { e.stopPropagation(); navigate(`/category/${dept.slug}`); }}
                      >
                        Explore
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
};
