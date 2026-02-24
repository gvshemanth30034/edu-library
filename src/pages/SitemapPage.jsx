import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const SitemapPage = () => {
  const navigate = useNavigate();
  const sitemapData = [
    {
      category: 'Main Pages',
      links: [
        { name: 'Landing Page', path: '/' },
        { name: 'Home', path: '/home' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
      ]
    },
    {
      category: 'Resources',
      links: [
        { name: 'Browse Catalogs', path: '/catalogs' },
        { name: 'Saved Resources', path: '/saved-resources' },
        { name: 'Downloads', path: '/downloads' },
        { name: 'Request Resource', path: '/request-resource' },
        { name: 'My Requests', path: '/my-requests' },
      ]
    },
    {
      category: 'Information',
      links: [
        { name: 'About NDLI', path: '/about' },
        { name: 'Announcements', path: '/announcements' },
        { name: 'Departments', path: '/departments' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    {
      category: 'Legal & Policies',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Copyright Guide', path: '/copyright' },
      ]
    },
    {
      category: 'Services',
      links: [
        { name: 'NDLI Club', path: '/ndli-club' },
        { name: 'IDR Hosting Service', path: '/idr-hosting' },
        { name: 'Institutional Digital Library', path: '/institutional-library' },
        { name: 'Digital Preservation', path: '/digital-preservation' },
      ]
    },
    {
      category: 'Other',
      links: [
        { name: 'Sponsor NDLI', path: '/sponsor' },
        { name: 'Institutional Registration', path: '/registration' },
        { name: 'Branding Guidelines', path: '/branding' },
        { name: 'Feedback', path: '/feedback' },
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f6', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateX(-4px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 128, 128, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateX(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <div style={{ background: 'white', padding: '50px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '2rem', color: '#008080', marginBottom: '12px', paddingBottom: '12px', borderBottom: '3px solid #008080' }}>
          Site Map
        </h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>Complete navigation structure of NDLI platform</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '32px' }}>
          {sitemapData.map((section, idx) => (
            <div key={idx} style={{ background: '#f9fafb', padding: '24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#0f4c4c', marginBottom: '16px', fontWeight: '600' }}>
                {section.category}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} style={{ marginBottom: '10px' }}>
                    <Link 
                      to={link.path}
                      style={{ 
                        color: '#008080', 
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'padding-left 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.paddingLeft = '8px'}
                      onMouseLeave={(e) => e.target.style.paddingLeft = '0'}
                    >
                      → {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};
