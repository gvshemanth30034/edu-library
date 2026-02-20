import React, { useState } from 'react';
import { Search } from 'lucide-react';

/**
 * NDL HERO SECTION
 * - "One Library All of India" headline
 * - Language-aware search bar
 * - Tagline
 */
export const Hero = () => {
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('EN');

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log(`Searching: "${searchText}" in ${language}`);
      // Can be extended to filter catalogs by search term
    }
  };

  return (
    <section className="ndl-hero relative bg-gradient-to-b from-white to-blue-50 py-16 md:py-24 px-4 overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-orange-100 rounded-full opacity-10 -translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-blue-900">
          One Library <span className="text-green-600">All of India</span>
        </h1>

        {/* Tagline */}
        <p className="text-center text-gray-600 italic mb-8 text-lg">
          A Single Window Towards Paradigm Shift in Indian Education
        </p>

        {/* Search Bar with Language */}
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-3 bg-gray-50 border-r border-gray-300 focus:outline-none cursor-pointer font-medium text-sm"
          >
            <option value="EN">English</option>
            <option value="HI">हिंदी</option>
            <option value="TA">தமிழ்</option>
            <option value="TE">తెలుగు</option>
            <option value="KA">ಕನ್ನಡ</option>
            <option value="ML">മലയാളം</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter your search key..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-400"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold transition flex items-center gap-2"
          >
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <StatItem value="50K+" label="Resources" />
          <StatItem value="10M+" label="Users" />
          <StatItem value="100+" label="Categories" />
          <StatItem value="24/7" label="Accessible" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl md:text-3xl font-bold text-blue-900">{value}</p>
    <p className="text-xs md:text-sm text-gray-600 mt-1">{label}</p>
  </div>
);
