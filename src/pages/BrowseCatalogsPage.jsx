import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List, Info, BookOpen } from 'lucide-react';

/**
 * BROWSE CATALOGS PAGE
 * - Grid layout of education catalogs
 * - Frontend-only search filtering
 * - Category filtering
 * - Click card to open details modal
 * - Fully responsive design
 */

// Sample catalog data (frontend only)
const CATALOG_DATA = [
  {
    id: 1,
    title: 'NCERT Class 10 Guide',
    category: 'School',
    coverage: '15 subjects',
    icon: '📚',
    description: 'Complete NCERT textbooks and solutions for Class 10',
    resources: '2,450+',
  },
  {
    id: 2,
    title: 'Engineering Handbooks',
    category: 'Engineering',
    coverage: 'All majors',
    icon: '⚙️',
    description: 'Technical reference materials for all engineering disciplines',
    resources: '1,890+',
  },
  {
    id: 3,
    title: 'Research Journals',
    category: 'Research',
    coverage: 'Multi-disciplinary',
    icon: '🔬',
    description: 'Peer-reviewed research papers and academic journals',
    resources: '3,120+',
  },
  {
    id: 4,
    title: 'Literature Classics',
    category: 'Literature',
    coverage: 'World classics',
    icon: '📖',
    description: 'Collection of classic novels and literary works',
    resources: '4,230+',
  },
  {
    id: 5,
    title: 'History Archives',
    category: 'Humanities',
    coverage: 'Global history',
    icon: '🏛️',
    description: 'Historical documents, archives, and cultural studies',
    resources: '2,890+',
  },
  {
    id: 6,
    title: 'Law Database',
    category: 'Law',
    coverage: 'Indian legal system',
    icon: '⚖️',
    description: 'Acts, bills, legal judgments, and case laws',
    resources: '856+',
  },
  {
    id: 7,
    title: 'Art & Culture',
    category: 'Arts',
    coverage: '20+ disciplines',
    icon: '🎨',
    description: 'Art history, design principles, and cultural studies',
    resources: '1,560+',
  },
  {
    id: 8,
    title: 'Language Courses',
    category: 'Languages',
    coverage: '50+ languages',
    icon: '🌍',
    description: 'Language learning materials and linguistics resources',
    resources: '2,100+',
  },
  // ===== NEW CATALOG ITEMS (Added 10 more) =====
  {
    id: 9,
    title: 'Medical Sciences Library',
    category: 'Medical Sciences',
    coverage: 'All branches of medicine',
    icon: '⚕️',
    description: 'Medical textbooks, anatomy guides, and clinical research materials',
    resources: '3,450+',
  },
  {
    id: 10,
    title: 'Computer Science Fundamentals',
    category: 'Computer Science',
    coverage: 'Programming & AI',
    icon: '💻',
    description: 'Programming languages, algorithms, data structures, and machine learning resources',
    resources: '2,890+',
  },
  {
    id: 11,
    title: 'Business Management',
    category: 'Business Management',
    coverage: 'Corporate & SME',
    icon: '📊',
    description: 'MBA materials, case studies, and business strategy guides',
    resources: '1,670+',
  },
  {
    id: 12,
    title: 'Economics & Finance',
    category: 'Economics',
    coverage: 'Macro & Micro economics',
    icon: '💰',
    description: 'Economic theories, financial analysis, and investment guides',
    resources: '1,890+',
  },
  {
    id: 13,
    title: 'Environmental Studies',
    category: 'Environmental Studies',
    coverage: 'Sustainability topics',
    icon: '🌿',
    description: 'Climate change, biodiversity, and sustainable development resources',
    resources: '1,230+',
  },
  {
    id: 14,
    title: 'Mathematics Repository',
    category: 'Mathematics',
    coverage: 'All levels (school to advanced)',
    icon: '📐',
    description: 'Algebra, calculus, geometry, and statistics comprehensive materials',
    resources: '2,560+',
  },
  {
    id: 15,
    title: 'Physics Essentials',
    category: 'Physics',
    coverage: 'Classical to modern physics',
    icon: '⚛️',
    description: 'Mechanics, thermodynamics, quantum physics, and relativity resources',
    resources: '1,945+',
  },
  {
    id: 16,
    title: 'Chemistry Database',
    category: 'Chemistry',
    coverage: 'Organic, inorganic & physical',
    icon: '🧪',
    description: 'Chemical reactions, periodic table references, and Laboratory guides',
    resources: '1,780+',
  },
  {
    id: 17,
    title: 'Social Sciences Hub',
    category: 'Social Sciences',
    coverage: 'Sociology & Anthropology',
    icon: '👥',
    description: 'Cultural studies, social structures, and behavioral science materials',
    resources: '1,420+',
  },
  {
    id: 18,
    title: 'Biology & Life Sciences',
    category: 'Biology',
    coverage: 'Botany, zoology & genetics',
    icon: '🔬',
    description: 'Cellular biology, genetics, ecology, and evolutionary biology resources',
    resources: '2,340+',
  },
];

export const BrowseCatalogsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCatalog, setSelectedCatalog] = useState(null); // For modal

  // Get unique categories
  const categories = ['All', ...new Set(CATALOG_DATA.map((c) => c.category))];

  // Frontend filtering logic
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
    <div className="uiExtension-browseCatalogsPage min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="uiExtension-browseHeader bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Catalogs</h1>
          <p className="text-blue-100 text-lg">Explore our comprehensive collection of educational resources</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="text-sm text-teal-600 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>
        {/* Search & Filter Section */}
        <div className="uiExtension-filterSection mb-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search catalogs, resources, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="uiExtension-searchInput w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="uiExtension-categoryFilter flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`uiExtension-categoryBtn px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Toggle & Results Info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredCatalogs.length}</span> catalog
              {filteredCatalogs.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`uiExtension-viewToggleBtn p-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`uiExtension-viewToggleBtn p-2 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Catalogs Grid/List */}
        {filteredCatalogs.length > 0 ? (
          <div
            className={`uiExtension-catalogsContainer ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }`}
          >
            {filteredCatalogs.map((catalog) => (
              <CatalogCard
                key={catalog.id}
                catalog={catalog}
                onClick={() => setSelectedCatalog(catalog)}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="uiExtension-emptyState text-center py-16">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No catalogs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedCatalog && (
        <CatalogDetailsModal
          catalog={selectedCatalog}
          onClose={() => setSelectedCatalog(null)}
        />
      )}
    </div>
  );
};

/**
 * Individual Catalog Card Component
 */
const CatalogCard = ({ catalog, onClick, viewMode }) => {
  return (
    <div
      onClick={onClick}
      className={`uiExtension-catalogCard cursor-pointer transition-all duration-300 hover:shadow-lg ${
        viewMode === 'grid'
          ? 'bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-2'
          : 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-gray-200 flex items-start gap-6'
      }`}
    >
      {viewMode === 'grid' ? (
        <>
          {/* Grid View Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-32 flex items-center justify-center text-5xl">
            {catalog.icon}
          </div>
          <div className="p-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {catalog.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{catalog.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{catalog.coverage}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">{catalog.resources}</span>
              <span className="text-xs text-gray-500">Resources</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* List View Card */}
          <div className="text-5xl flex-shrink-0">{catalog.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{catalog.title}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                {catalog.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{catalog.description}</p>
            <p className="text-sm text-gray-500">
              {catalog.coverage} • {catalog.resources} resources
            </p>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Catalog Details Modal Component
 */
const CatalogDetailsModal = ({ catalog, onClose }) => {
  return (
    <div className="uiExtension-modalOverlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="uiExtension-modalContent bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{catalog.icon}</div>
            <div>
              <h2 className="text-3xl font-bold">{catalog.title}</h2>
              <p className="text-blue-100 mt-1">{catalog.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Catalog</h3>
            <p className="text-gray-700 leading-relaxed">{catalog.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">{catalog.resources}</p>
              <p className="text-sm text-gray-600 mt-1">Resources</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-indigo-600">{catalog.coverage}</p>
              <p className="text-sm text-gray-600 mt-1">Coverage</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 mt-1">Available</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-8">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              This is a demo page. Content is simulated for demonstration purposes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Explore Catalog
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
