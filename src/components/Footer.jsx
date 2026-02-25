import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';

/**
 * FOOTER - NDL DESIGN
 * 4-column layout with links, app buttons, and social media
 */

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="ndl-footer bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">{translate('footerAbout', language)}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📖 {translate('aboutNDLI', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📋 {translate('disclaimer', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🤝 {translate('sponsor', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🔒 {translate('privacyPolicy', language)}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Guidelines */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">{translate('footerGuidelines', language)}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  ©️ {translate('copyrightGuide', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🏢 {translate('institutionalRegistration', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🗺️ {translate('sitemap', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🎨 {translate('branding', language)}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">{translate('ourServices', language)}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🎯 {translate('ndliClub', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🌐 {translate('idrHosting', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📚 {translate('institutionalDigitalLibrary', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  💾 {translate('digitalPreservationCentre', language)}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">{translate('contactUs', language)}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📧 {translate('contact', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  💬 {translate('feedback', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📱 {translate('mobileApp', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🌐 {translate('webPlatform', language)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          {/* App & Social Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* App Download Buttons */}
            <div className="ndl-app-buttons flex gap-4">
              <button className="bg-white text-gray-900 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition text-sm flex items-center gap-2">
                🍎 {translate('appStore', language)}
              </button>
              <button className="bg-white text-gray-900 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition text-sm flex items-center gap-2">
                🤖 {translate('playStore', language)}
              </button>
              <button className="border border-white text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-gray-900 transition text-sm flex items-center gap-2">
                🌐 {translate('web', language)}
              </button>
            </div>

            {/* Social Media */}
            <div className="ndl-social-bar flex gap-4">
              <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition" title="Facebook">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center hover:bg-teal-500 transition" title="Twitter/X">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition" title="Instagram">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-800 transition" title="LinkedIn">
                in
              </a>
              <a href="#" className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition" title="YouTube">
                ▶️
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-xs mt-6">
            <p>© 2024 {translate('nationalDigitalLibrary', language)}. {translate('allRightsReserved', language)}.</p>
            <p className="mt-1">{translate('poweredBy', language)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
