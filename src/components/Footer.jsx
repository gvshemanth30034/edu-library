import React from 'react';

/**
 * FOOTER - NDL DESIGN
 * 4-column layout with links, app buttons, and social media
 */

export const Footer = () => {
  return (
    <footer className="ndl-footer bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📖 About NDLI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📋 Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🤝 Sponsor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🔒 Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Guidelines */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">Guidelines</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  ©️ Copyright Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🏢 Institutional Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🗺️ Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🎨 Branding
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🎯 NDLI Club
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🌐 IDR Hosting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📚 Institutional Digital Library
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  💾 Digital Preservation Centre
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="ndl-footer-col">
            <h4 className="text-lg font-bold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📧 Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  💬 Feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  📱 Mobile App
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  🌐 Web Platform
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
                🍎 App Store
              </button>
              <button className="bg-white text-gray-900 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition text-sm flex items-center gap-2">
                🤖 Play Store
              </button>
              <button className="border border-white text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-gray-900 transition text-sm flex items-center gap-2">
                🌐 Web
              </button>
            </div>

            {/* Social Media */}
            <div className="ndl-social-bar flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition" title="Facebook">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition" title="Twitter/X">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition" title="Instagram">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition" title="LinkedIn">
                in
              </a>
              <a href="#" className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition" title="YouTube">
                ▶️
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-xs mt-6">
            <p>© 2024 National Digital Library of India. All rights reserved.</p>
            <p className="mt-1">Powered by Ministry of Education, Government of India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
