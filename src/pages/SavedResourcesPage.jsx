import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List, BookOpen } from 'lucide-react';
import { SAVED_RESOURCES_DATA } from '../data/studentResourcesData';

export const SavedResourcesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', ...new Set(SAVED_RESOURCES_DATA.map((item) => item.category))];

  const filteredResources = useMemo(() => {
    return SAVED_RESOURCES_DATA.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Saved Resources</h1>
          <p className="text-blue-100 text-lg">Access your bookmarked learning materials</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="text-sm text-teal-600 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>
        <div className="uiExtension-filterSection mb-12">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search saved resources..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="uiExtension-searchInput w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

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

          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredResources.length}</span> resource
              {filteredResources.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`uiExtension-viewToggleBtn p-2 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`uiExtension-viewToggleBtn p-2 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {filteredResources.length > 0 ? (
          <div
            className={`uiExtension-catalogsContainer ${
              viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'
            }`}
          >
            {filteredResources.map((resource) => (
              <SavedResourceCard key={resource.id} resource={resource} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="uiExtension-emptyState text-center py-16">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No saved resources found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SavedResourceCard = ({ resource, viewMode }) => {
  return (
    <div
      className={`uiExtension-catalogCard transition-all duration-300 hover:shadow-lg ${
        viewMode === 'grid'
          ? 'bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-2'
          : 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-gray-200 flex items-start gap-6'
      }`}
    >
      {viewMode === 'grid' ? (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-32 flex items-center justify-center text-5xl">
            {resource.icon}
          </div>
          <div className="p-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {resource.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{resource.coverage}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">{resource.resources}</span>
              <span className="text-xs text-gray-500">Saved</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-5xl flex-shrink-0">{resource.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                {resource.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
            <p className="text-sm text-gray-500">
              {resource.coverage} • {resource.resources} saved
            </p>
          </div>
        </>
      )}
    </div>
  );
};
