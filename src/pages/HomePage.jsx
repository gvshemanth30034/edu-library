import React from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { Hero } from '../components/Hero.jsx';
import { ContentSlider } from '../components/ContentSlider.jsx';
import { Footer } from '../components/Footer.jsx';

/**
 * HOME PAGE
 * Landing page with NDL-inspired design, featured content categories, and browsing
 */
export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <ContentSlider />
      <Footer />
    </div>
  );
};
