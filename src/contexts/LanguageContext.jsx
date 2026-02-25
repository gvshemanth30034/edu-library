import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Load language from localStorage, default to 'English'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
