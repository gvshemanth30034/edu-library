import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List, Info, BookOpen, Book, Settings, Microscope, Library, Landmark, Scale, Palette, Globe, Activity, Laptop, Briefcase, LineChart, Leaf, Calculator, Atom, FlaskConical, Users, Dna, ArrowLeft, GraduationCap, Layers } from 'lucide-react';

/**
 * BROWSE CATALOGS PAGE
 * - Grid layout of education catalogs
 * - Frontend-only search filtering
 * - Category filtering
 * - Click card to open details modal
 * - Fully responsive design
 */

const CATALOG_DATA = [
  {
    id: 1,
    title: 'NCERT Class 10 Guide',
    category: 'School',
    coverage: '15 subjects',
    icon: <Book className="w-10 h-10 text-slate-600" />,
    description: 'Complete NCERT textbooks and solutions for Class 10',
    resources: '2,450+',
  },
  {
    id: 2,
    title: 'Engineering Handbooks',
    category: 'Engineering',
    coverage: 'All majors',
    icon: <Settings className="w-10 h-10 text-slate-600" />,
    description: 'Technical reference materials for all engineering disciplines',
    resources: '1,890+',
  },
  {
    id: 3,
    title: 'Research Journals',
    category: 'Research',
    coverage: 'Multi-disciplinary',
    icon: <Microscope className="w-10 h-10 text-slate-600" />,
    description: 'Peer-reviewed research papers and academic journals',
    resources: '3,120+',
  },
  {
    id: 4,
    title: 'Literature Classics',
    category: 'Literature',
    coverage: 'World classics',
    icon: <Library className="w-10 h-10 text-slate-600" />,
    description: 'Collection of classic novels and literary works',
    resources: '4,230+',
  },
  {
    id: 5,
    title: 'History Archives',
    category: 'Humanities',
    coverage: 'Global history',
    icon: <Landmark className="w-10 h-10 text-slate-600" />,
    description: 'Historical documents, archives, and cultural studies',
    resources: '2,890+',
  },
  {
    id: 6,
    title: 'Law Database',
    category: 'Law',
    coverage: 'Indian legal system',
    icon: <Scale className="w-10 h-10 text-slate-600" />,
    description: 'Acts, bills, legal judgments, and case laws',
    resources: '856+',
  },
  {
    id: 7,
    title: 'Art & Culture',
    category: 'Arts',
    coverage: '20+ disciplines',
    icon: <Palette className="w-10 h-10 text-slate-600" />,
    description: 'Art history, design principles, and cultural studies',
    resources: '1,560+',
  },
  {
    id: 8,
    title: 'Language Courses',
    category: 'Languages',
    coverage: '50+ languages',
    icon: <Globe className="w-10 h-10 text-slate-600" />,
    description: 'Language learning materials and linguistics resources',
    resources: '2,100+',
  },
  {
    id: 9,
    title: 'Medical Sciences Library',
    category: 'Medical Sciences',
    coverage: 'All branches of medicine',
    icon: <Activity className="w-10 h-10 text-slate-600" />,
    description: 'Medical textbooks, anatomy guides, and clinical research materials',
    resources: '3,450+',
  },
  {
    id: 10,
    title: 'Computer Science Fundamentals',
    category: 'Computer Science',
    coverage: 'Programming & AI',
    icon: <Laptop className="w-10 h-10 text-slate-600" />,
    description: 'Programming languages, algorithms, data structures, and machine learning resources',
    resources: '2,890+',
  },
  {
    id: 11,
    title: 'Business Management',
    category: 'Business Management',
    coverage: 'Corporate & SME',
    icon: <Briefcase className="w-10 h-10 text-slate-600" />,
    description: 'MBA materials, case studies, and business strategy guides',
    resources: '1,670+',
  },
  {
    id: 12,
    title: 'Economics & Finance',
    category: 'Economics',
    coverage: 'Macro & Micro economics',
    icon: <LineChart className="w-10 h-10 text-slate-600" />,
    description: 'Economic theories, financial analysis, and investment guides',
    resources: '1,890+',
  },
  {
    id: 13,
    title: 'Environmental Studies',
    category: 'Environmental Studies',
    coverage: 'Sustainability topics',
    icon: <Leaf className="w-10 h-10 text-slate-600" />,
    description: 'Climate change, biodiversity, and sustainable development resources',
    resources: '1,230+',
  },
  {
    id: 14,
    title: 'Mathematics Repository',
    category: 'Mathematics',
    coverage: 'All levels (school to advanced)',
    icon: <Calculator className="w-10 h-10 text-slate-600" />,
    description: 'Algebra, calculus, geometry, and statistics comprehensive materials',
    resources: '2,560+',
  },
  {
    id: 15,
    title: 'Physics Essentials',
    category: 'Physics',
    coverage: 'Classical physics',
    icon: <Atom className="w-10 h-10 text-slate-600" />,
    description: 'Mechanics, thermodynamics, quantum physics, and relativity resources',
    resources: '1,945+',
  },
  {
    id: 16,
    title: 'Chemistry Database',
    category: 'Chemistry',
    coverage: 'Organic, inorganic',
    icon: <FlaskConical className="w-10 h-10 text-slate-600" />,
    description: 'Chemical reactions, periodic table references, and Laboratory guides',
    resources: '1,780+',
  },
  {
    id: 17,
    title: 'Social Sciences Hub',
    category: 'Social Sciences',
    coverage: 'Sociology & Anthropology',
    icon: <Users className="w-10 h-10 text-slate-600" />,
    description: 'Cultural studies, social structures, and behavioral science materials',
    resources: '1,420+',
  },
  {
    id: 18,
    title: 'Biology & Life Sciences',
    category: 'Biology',
    coverage: 'Botany & genetics',
    icon: <Dna className="w-10 h-10 text-slate-600" />,
    description: 'Cellular biology, genetics, ecology, and evolutionary biology resources',
    resources: '2,340+',
  },
];

export const BrowseCatalogsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCatalog, setSelectedCatalog] = useState(null);

  const categories = ['All', ...new Set(CATALOG_DATA.map((c) => c.category))];

  const filteredCatalogs = useMemo(() => {
    return CATALOG_DATA.filter((catalog) => {
      const matchesSearch =
        catalog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        catalog.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || catalog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Teal gradient hero */}
      <div
        className="relative overflow-hidden border-b border-teal-700/20"
        style={{ background: 'linear-gradient(135deg, #004d4d 0%, #008080 42%, #1a9080 68%, #1e6e8c 100%)' }}
      >
        {/* Decorative orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-16 h-40 w-40 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="heading-entrance mb-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <ArrowLeft size={15} />
            Dashboard
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <p className="heading-entrance mb-2 text-xs font-semibold uppercase tracking-widest text-teal-200">
                Knowledge Repository
              </p>
              <h1 className="heading-entrance heading-premium text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-3">
                Academic Catalogs
              </h1>
              <p className="heading-entrance heading-entrance-delay-1 text-base sm:text-lg text-teal-100 leading-relaxed max-w-lg">
                Explore our comprehensive collection of peer-reviewed research, reference materials, and educational resources.
              </p>
            </div>
            {/* Floating icon cluster */}
            <div className="heading-entrance hidden md:flex flex-shrink-0 items-center justify-center" style={{ animationDelay: '200ms' }}>
              <div className="relative flex h-36 w-36 items-center justify-center">
                <div aria-hidden="true" className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 72%)' }} />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <BookOpen className="h-5 w-5 text-teal-100" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <Layers className="h-5 w-5 text-teal-100" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute -right-3 -top-3 h-2.5 w-2.5 rounded-full bg-white/30" />
                  <div aria-hidden="true" className="absolute -left-2 bottom-1 h-2 w-2 rounded-full bg-teal-200/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-20">
        <div className="heading-entrance flex flex-wrap gap-3 sm:gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <BookOpen className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{CATALOG_DATA.length}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Catalogs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <Layers className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{categories.length - 1}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search & Filter Section */}
        <div className="mb-10">
          <div className="mb-6 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search catalogs, publications, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow shadow-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                    ? 'bg-teal-700 text-white shadow-sm ring-1 ring-teal-700'
                    : 'bg-white text-slate-600 border border-gray-200 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-slate-600 text-sm">
              Showing <span className="font-semibold text-slate-900">{filteredCatalogs.length}</span> catalog{filteredCatalogs.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-400 border border-transparent hover:bg-slate-100 hover:text-slate-600'
                  }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-400 border border-transparent hover:bg-slate-100 hover:text-slate-600'
                  }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {filteredCatalogs.length > 0 ? (
          <div
            className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4 max-w-5xl'
              }`}
          >
            {filteredCatalogs.map((catalog, idx) => (
              <CatalogCard
                key={catalog.id}
                catalog={catalog}
                onClick={() => setSelectedCatalog(catalog)}
                viewMode={viewMode}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-teal-50 mb-5">
              <BookOpen size={28} className="text-teal-400" />
            </div>
            <h3 className="heading-entrance heading-entrance-card text-xl font-semibold tracking-[-0.01em] text-slate-800 mb-2">No catalogs found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search query or category filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedCatalog && (
        <CatalogDetailsModal
          catalog={selectedCatalog}
          onClose={() => setSelectedCatalog(null)}
        />
      )}
    </div>
  );
};

const CatalogCard = ({ catalog, onClick, viewMode, index = 0 }) => {
  return (
    <div
      onClick={onClick}
      className={`heading-entrance cursor-pointer transition-all duration-300 border border-gray-200 bg-white group hover:border-teal-300 hover:shadow-lg ${viewMode === 'grid'
          ? 'rounded-2xl overflow-hidden flex flex-col h-full transform hover:-translate-y-1'
          : 'p-6 rounded-2xl flex items-start gap-6 hover:translate-x-1'
        }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {viewMode === 'grid' ? (
        <>
          <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-gray-100 h-24 flex flex-col items-center justify-center transition-colors group-hover:from-teal-100/60 group-hover:to-teal-50/40">
            <div className="transform transition-transform group-hover:scale-110 duration-200">
              {React.cloneElement(catalog.icon, { className: "w-10 h-10 text-teal-700" })}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-lg border border-teal-200 text-teal-700 bg-teal-50 mb-3 shadow-sm">
              {catalog.category}
            </span>
            <h3 className="text-[1.075rem] font-semibold tracking-[-0.01em] text-slate-900 mb-2.5 leading-snug group-hover:text-teal-700 transition-colors">{catalog.title}</h3>
            <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">{catalog.description}</p>
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[0.8rem] font-semibold text-slate-400 tracking-wide uppercase">{catalog.coverage}</span>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-800">{catalog.resources}</span>
                <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-slate-400">Items</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-50 to-slate-50 border border-teal-100 flex items-center justify-center flex-shrink-0 transition-colors group-hover:from-teal-100/60 group-hover:to-teal-50/40">
            <div className="transform transition-transform group-hover:scale-110 duration-200">
              {React.cloneElement(catalog.icon, { className: "w-8 h-8 text-teal-700" })}
            </div>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-slate-900 group-hover:text-teal-700 transition-colors">{catalog.title}</h3>
                <span className="text-[0.7rem] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-lg border border-teal-200 text-teal-700 bg-teal-50">
                  {catalog.category}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-2">{catalog.description}</p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>{catalog.coverage}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-slate-600">{catalog.resources} items</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CatalogDetailsModal = ({ catalog, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto outline-none transition-all">
        <div className="text-white p-8 flex items-start justify-between relative overflow-hidden rounded-t-2xl"
          style={{ background: 'linear-gradient(135deg, #004d4d 0%, #008080 50%, #1a9080 100%)' }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-end -mr-10">
            <div className="transform scale-[4]">
              {catalog.icon}
            </div>
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              {React.cloneElement(catalog.icon, { className: "w-8 h-8 text-white" })}
            </div>
            <div>
              <h2 className="heading-entrance heading-premium text-2xl font-bold tracking-tight mb-1">{catalog.title}</h2>
              <span className="text-teal-200 text-sm font-medium tracking-wide uppercase">{catalog.category}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 text-teal-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors focus:outline-none backdrop-blur-sm"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="heading-entrance heading-entrance-card text-sm font-semibold tracking-wider text-slate-800 uppercase mb-2">Overview</h3>
            <p className="text-slate-600 leading-relaxed text-base">{catalog.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-slate-800">{catalog.resources}</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Resources</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
              <p className="text-lg font-bold text-slate-800 align-middle leading-8 inline-block truncate w-full">{catalog.coverage}</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Coverage</p>
            </div>
            <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-teal-600">Active</p>
              <p className="text-xs font-semibold text-teal-400 mt-1 uppercase tracking-wider">Status</p>
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex gap-3 mb-8 items-start">
            <Info size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-teal-800 leading-relaxed">
              Access to specific materials within this catalog may depend on your current academic enrollment status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              style={{ background: 'linear-gradient(135deg, #008080, #006666)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #006666, #004d4d)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #008080, #006666)'}
            >
              Access Catalog
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
