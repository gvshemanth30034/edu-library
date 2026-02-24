import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save, Download, Mail, Megaphone, LogOut, LayoutDashboard, Bell, X } from 'lucide-react';
import { SAVED_RESOURCES_DATA, DOWNLOADS_DATA } from '../data/studentResourcesData';

/**
 * STUDENT DASHBOARD
 * Clean, student-focused design matching landing page theme
 * Structured sections for efficient learning material access
 */
/**
 * Shared Dashboard Action Card Component
 * Uses unified catalog design language (slate/blue, subtle shadows, clean typography)
 */
const DashboardActionCard = ({ title, subtitle, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all duration-300 border border-gray-200 bg-white group hover:border-blue-300 hover:shadow-md rounded-xl p-6 flex items-start gap-5 hover:-translate-y-1"
    >
      <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-blue-50/50">
        <div className="transform transition-transform group-hover:scale-110 duration-200">
          {icon}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="heading-entrance heading-entrance-card text-[1.075rem] font-semibold tracking-[-0.01em] text-slate-900 group-hover:text-blue-700 transition-colors mb-1 leading-snug">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('Student');
  const [activeNav, setActiveNav] = useState('overview');
  const [announcementsOpen, setAnnouncementsOpen] = useState(false);
  const announcementsRef = useRef(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('uiExtension-isLoggedIn') === 'true';
    const role = localStorage.getItem('uiExtension-userRole') || 'student';
    const normalizedRole = role === 'user' ? 'student' : role;
    const user = JSON.parse(localStorage.getItem('uiExtension-user') || '{}');

    if (!loggedIn || normalizedRole !== 'student') {
      navigate('/');
      return;
    }

    setIsLoggedIn(loggedIn);
    setUserRole(normalizedRole);
    setUserName(user.name || user.email || 'Student');
  }, [navigate]);

  // Close announcements dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (announcementsRef.current && !announcementsRef.current.contains(e.target)) {
        setAnnouncementsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uiExtension-isLoggedIn');
    localStorage.removeItem('uiExtension-user');
    localStorage.removeItem('uiExtension-userRole');
    navigate('/');
  };

  if (!isLoggedIn || userRole !== 'student') {
    return null;
  }

  // Mock data
  const recentResources = [
    { id: 1, title: 'Data Structures and Algorithms', subject: 'Computer Science', type: 'PDF', lastAccessed: '2 hours ago', url: 'https://www.orimi.com/pdf-test.pdf' },
    { id: 2, title: 'Thermodynamics Fundamentals', subject: 'Mechanical Engg.', type: 'Video', lastAccessed: '5 hours ago', url: 'https://www.youtube.com/watch?v=4LqZdkkBDas' },
    { id: 3, title: 'Digital Signal Processing', subject: 'Electronics', type: 'PDF', lastAccessed: '1 day ago', url: 'https://web.eecs.utk.edu/~hqi/teaching/ece505f15/lecture01_intro.pdf' },
    { id: 4, title: 'Software Engineering Principles', subject: 'Computer Science', type: 'Video', lastAccessed: '2 days ago', url: 'https://www.youtube.com/watch?v=O753uuutqH8' },
  ];

  const departments = [
    { name: 'Computer Science',    count: 45, slug: 'computer-science' },
    { name: 'Electronics & Comm.', count: 38, slug: 'electronics' },
    { name: 'Mechanical Engg.',    count: 32, slug: 'mechanical' },
    { name: 'Civil Engineering',   count: 28, slug: 'civil-engineering' },
    { name: 'Mathematics',         count: 25, slug: 'mathematics' },
    { name: 'Physics',             count: 22, slug: 'physics' },
  ];

  const learningItems = [
    {
      title: 'Data Structures',
      progress: 60,
      lastAccessed: 'Today',
      url: 'https://www.orimi.com/pdf-test.pdf',
    },
    {
      title: 'Circuit Theory',
      progress: 35,
      lastAccessed: 'Yesterday',
      url: 'https://web.eecs.utk.edu/~hqi/teaching/ece505f15/lecture01_intro.pdf',
    },
    {
      title: 'Engineering Mathematics',
      progress: 80,
      lastAccessed: '3 days ago',
      url: 'https://www.youtube.com/watch?v=4LqZdkkBDas',
    },
  ];

  const announcements = [
    { date: '28 May 2024', message: 'New semester study materials uploaded for all departments', priority: 'high' },
    { date: '25 May 2024', message: 'Database maintenance scheduled for Saturday 3AM-6AM', priority: 'medium' },
    { date: '22 May 2024', message: 'Request feature now available for suggesting new resources', priority: 'normal' },
    { date: '18 May 2024', message: 'Library hours extended till 10PM during exam week', priority: 'high' },
    { date: '15 May 2024', message: 'Research paper submission deadline: 30 May 2024', priority: 'high' },
  ];

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      {/* Main Content */}
      <main className="dashboard-main dashboard-main--bottom-nav">
        {/* Top Bar */}
        <section className="mb-6">
          <div className="heading-entrance bg-white border border-gray-200 rounded-xl shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wide uppercase">Edu Library</p>
              <h2 className="heading-premium text-lg sm:text-xl font-bold text-slate-900 truncate">Student Dashboard</h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Announcements Bell */}
              <div ref={announcementsRef} className="relative">
                <button
                  onClick={() => setAnnouncementsOpen((o) => !o)}
                  className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition-colors"
                  aria-label="Announcements"
                  aria-expanded={announcementsOpen}
                >
                  <Bell size={18} />
                  {/* High-priority badge */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold leading-none shadow">
                    {announcements.filter(a => a.priority === 'high').length}
                  </span>
                </button>

                {/* Dropdown */}
                {announcementsOpen && (
                  <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
                      <div className="flex items-center gap-2">
                        <Bell size={15} className="text-orange-600" />
                        <span className="font-semibold text-slate-800 text-sm">Announcements</span>
                        <span className="inline-flex items-center justify-center h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                          {announcements.filter(a => a.priority === 'high').length} urgent
                        </span>
                      </div>
                      <button
                        onClick={() => setAnnouncementsOpen(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Close"
                      >
                        <X size={15} />
                      </button>
                    </div>
                    {/* List */}
                    <ul className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                      {announcements.map((a, idx) => (
                        <li key={idx} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                          <span className={`mt-0.5 flex-shrink-0 h-2.5 w-2.5 rounded-full ${
                            a.priority === 'high' ? 'bg-red-500' : a.priority === 'medium' ? 'bg-orange-400' : 'bg-teal-400'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 leading-snug">{a.message}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* Footer */}
                    <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={() => { setAnnouncementsOpen(false); navigate('/announcements'); }}
                        className="w-full text-center text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                      >
                        View all announcements →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg border border-teal-200 bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 hover:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Hero Welcome Section */}
        <section className="mb-10 relative overflow-hidden rounded-2xl shadow-lg"
          style={{ background: 'linear-gradient(135deg, #004d4d 0%, #008080 42%, #1a9080 68%, #1e6e8c 100%)' }}
        >
          {/* Decorative background shapes */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 right-24 h-40 w-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            {/* Left — Text & CTAs */}
            <div className="flex-1 min-w-0">
              <p className="heading-entrance mb-2 text-xs font-semibold uppercase tracking-widest text-teal-200">
                Welcome back
              </p>
              <h1 className="heading-entrance heading-premium mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Hello, {userName}!{' '}
                <span role="img" aria-label="wave" style={{ display: 'inline-block', animation: 'wave-hand 1.8s ease-in-out 0.8s 1' }}>
                  👋
                </span>
              </h1>
              <p className="heading-entrance heading-entrance-delay-1 mb-8 max-w-md text-base leading-relaxed text-teal-100 sm:text-lg">
                Your learning hub is ready. Explore thousands of academic resources, track your progress, and level up your knowledge.
              </p>
              <div className="heading-entrance flex flex-wrap gap-3" style={{ animationDelay: '320ms' }}>
                {/* Primary CTA */}
                <button
                  onClick={() => navigate('/catalogs')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition-all duration-200 hover:bg-teal-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
                >
                  <BookOpen size={16} />
                  Browse Catalog
                </button>
                {/* Secondary CTA */}
                <button
                  onClick={() => navigate('/saved-resources')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-teal-700"
                >
                  <Save size={16} />
                  View Saved Resources
                </button>
              </div>
            </div>

            {/* Right — Academic icon cluster */}
            <div className="heading-entrance hidden flex-shrink-0 items-center justify-center md:flex" style={{ animationDelay: '200ms' }}>
              <div className="relative flex h-44 w-44 items-center justify-center">
                {/* Soft radial glow behind cluster */}
                <div aria-hidden="true" className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 72%)' }} />
                {/* Icon cluster */}
                <div className="relative flex flex-col items-center gap-3">
                  {/* Top: large primary icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  {/* Bottom row: two smaller icons */}
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <Download className="h-5 w-5 text-teal-100" />
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <Save className="h-5 w-5 text-teal-100" />
                    </div>
                  </div>
                  {/* Floating dot accents */}
                  <div aria-hidden="true" className="absolute -right-4 -top-4 h-3 w-3 rounded-full bg-white/30" />
                  <div aria-hidden="true" className="absolute -left-3 bottom-2 h-2 w-2 rounded-full bg-teal-200/40" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Dashboard Action Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DashboardActionCard
            title="Browse Catalog"
            subtitle="Explore all resources"
            icon={<BookOpen className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/catalogs')}
          />
          <DashboardActionCard
            title="Saved Resources"
            subtitle={`${SAVED_RESOURCES_DATA.length} items saved`}
            icon={<Save className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/saved-resources')}
          />
          <DashboardActionCard
            title="Downloads"
            subtitle={`${DOWNLOADS_DATA.length} files downloaded`}
            icon={<Download className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/downloads')}
          />
          <DashboardActionCard
            title="Request Resource"
            subtitle="Suggest new materials"
            icon={<Mail className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/request-resource')}
          />
        </section>

        {/* Recently Accessed Resources - Academic Table */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Recently Accessed Resources</h2>
          <div className="resource-table-wrapper">
            <table className="resource-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Last Accessed</th>
                </tr>
              </thead>
              <tbody>
                {recentResources.map((resource, idx) => (
                  <tr key={idx}>
                    <td className="resource-title">
                      {resource.url ? (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">
                          {resource.title}
                        </a>
                      ) : (
                        resource.title
                      )}
                    </td>
                    <td>{resource.subject}</td>
                    <td><span className="resource-badge">{resource.type}</span></td>
                    <td className="text-muted">{resource.lastAccessed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ongoing Learning Section */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Ongoing Learning</h2>
          <div className="learning-cards">
            {learningItems.map((item, idx) => (
              <div key={idx} className="learning-card">
                <div className="learning-header">
                  <h4 className="heading-entrance heading-entrance-card font-semibold tracking-[-0.01em]">{item.title}</h4>
                  <span className="progress-badge">{item.progress}% Complete</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="learning-meta">Last accessed: {item.lastAccessed}</p>
                  <button
                    onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 active:bg-teal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                    aria-label={`Continue ${item.title}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explore by Department Grid */}
        <section className="dashboard-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title heading-entrance heading-premium mb-0">Explore by Department</h2>
            <button
              onClick={() => navigate('/departments')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-teal-200 bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Explore More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div className="department-grid">
            {departments.map((dept, idx) => (
              <div key={idx} className="department-card">
                <h4 className="heading-entrance heading-entrance-card font-semibold tracking-[-0.01em]">{dept.name}</h4>
                <p className="dept-count">{dept.count} resources</p>
                <button
                  className="dept-btn"
                  onClick={() => navigate(`/category/${dept.slug}`)}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Bottom Navigation Menu */}
      <nav className="bottom-nav-menu" role="navigation" aria-label="Main navigation">
        <div onClick={() => navigate('/student-dashboard')} className={`nav-link cursor-pointer ${activeNav === 'overview' ? 'active' : ''}`} aria-label="Overview">
          <span className="nav-icon"><LayoutDashboard size={20} /></span>
          <span className="nav-title">Overview</span>
        </div>
        <div onClick={() => navigate('/catalogs')} className={`nav-link cursor-pointer ${activeNav === 'browse' ? 'active' : ''}`} aria-label="Browse Resources">
          <span className="nav-icon"><BookOpen size={20} /></span>
          <span className="nav-title">Browse Resources</span>
        </div>
        <div onClick={() => navigate('/saved-resources')} className={`nav-link cursor-pointer ${activeNav === 'saved' ? 'active' : ''}`} aria-label="Saved Items">
          <span className="nav-icon"><Save size={20} /></span>
          <span className="nav-title">Saved Items</span>
        </div>
        <div onClick={() => navigate('/downloads')} className={`nav-link cursor-pointer ${activeNav === 'downloads' ? 'active' : ''}`} aria-label="Downloads">
          <span className="nav-icon"><Download size={20} /></span>
          <span className="nav-title">Downloads</span>
        </div>
        <div onClick={() => navigate('/my-requests')} className={`nav-link cursor-pointer ${activeNav === 'requests' ? 'active' : ''}`} aria-label="My Requests">
          <span className="nav-icon"><Mail size={20} /></span>
          <span className="nav-title">My Requests</span>
        </div>
        <div onClick={() => navigate('/announcements')} className={`nav-link cursor-pointer ${activeNav === 'announcements' ? 'active' : ''}`} aria-label="Announcements">
          <span className="nav-icon"><Megaphone size={20} /></span>
          <span className="nav-title">Announcements</span>
        </div>
        <button onClick={handleLogout} className="nav-link nav-logout" aria-label="Logout">
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-title">Logout</span>
        </button>
      </nav>
    </div>
  );
};
