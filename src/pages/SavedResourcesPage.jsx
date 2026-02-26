import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List, BookOpen, ArrowLeft, Bookmark, Heart, FolderOpen } from 'lucide-react';
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
                Your Library
              </p>
              <h1 className="heading-entrance heading-premium text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-3">
                Saved Resources
              </h1>
              <p className="heading-entrance heading-entrance-delay-1 text-base sm:text-lg text-teal-100 leading-relaxed max-w-lg">
                Access your bookmarked learning materials anytime, anywhere.
              </p>
            </div>
            {/* Floating icon cluster */}
            <div className="heading-entrance hidden md:flex flex-shrink-0 items-center justify-center" style={{ animationDelay: '200ms' }}>
              <div className="relative flex h-36 w-36 items-center justify-center">
                <div aria-hidden="true" className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 72%)' }} />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                    <Bookmark className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <Heart className="h-5 w-5 text-teal-100" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <FolderOpen className="h-5 w-5 text-teal-100" />
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
              <Bookmark className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{SAVED_RESOURCES_DATA.length}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Saved</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <FolderOpen className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{categories.length - 1}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="mb-6 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search saved resources..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
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
              Showing <span className="font-semibold text-slate-900">{filteredResources.length}</span> resource
              {filteredResources.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-teal-50 text-teal-700' : 'text-slate-400 border border-transparent hover:bg-slate-100 hover:text-slate-600'
                  }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-teal-50 text-teal-700' : 'text-slate-400 border border-transparent hover:bg-slate-100 hover:text-slate-600'
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
            className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4 max-w-5xl'
              }`}
          >
            {filteredResources.map((resource, idx) => (
              <SavedResourceCard key={resource.id} resource={resource} viewMode={viewMode} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-teal-50 mb-5">
              <BookOpen size={28} className="text-teal-400" />
            </div>
            <h3 className="heading-entrance heading-entrance-card text-xl font-semibold tracking-[-0.01em] text-slate-800 mb-2">No saved resources found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SavedResourceCard = ({ resource, viewMode, index = 0 }) => {
  return (
    <div
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
              {React.cloneElement(resource.icon, { className: "w-10 h-10 text-teal-700" })}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-lg border border-teal-200 text-teal-700 bg-teal-50 mb-3 shadow-sm">
              {resource.category}
            </span>
            <h3 className="text-[1.075rem] font-semibold tracking-[-0.01em] text-slate-900 mb-2.5 leading-snug group-hover:text-teal-700 transition-colors">{resource.title}</h3>
            <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">{resource.coverage}</p>
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">{resource.resources}</span>
              <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-slate-400">Saved</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-50 to-slate-50 border border-teal-100 flex items-center justify-center flex-shrink-0 transition-colors group-hover:from-teal-100/60 group-hover:to-teal-50/40">
            <div className="transform transition-transform group-hover:scale-110 duration-200">
              {React.cloneElement(resource.icon, { className: "w-8 h-8 text-teal-700" })}
            </div>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-slate-900 group-hover:text-teal-700 transition-colors">{resource.title}</h3>
                <span className="text-[0.7rem] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-lg border border-teal-200 text-teal-700 bg-teal-50">
                  {resource.category}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-2">{resource.description}</p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>{resource.coverage}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-slate-600">{resource.resources} saved</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
