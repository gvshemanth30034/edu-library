import React, { useState } from 'react';

export const LandingHero = () => {
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log(`Searching: "${searchText}" in ${language}`);
    }
  };

  return (
    <header className="hero">
      <h1 className="heading-entrance heading-premium">One Library <span>All of India</span></h1>
      <p className="heading-entrance heading-entrance-delay-1">A Single Window Towards Paradigm Shift in Indian Education</p>

      <div className="search-container">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>English</option>
          <option>Hindi</option>
        </select>
        <input
          type="text"
          placeholder="Enter your search key..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
    </header>
  );
};
