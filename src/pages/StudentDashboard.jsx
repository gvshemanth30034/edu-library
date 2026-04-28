import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save, Download, Mail, Megaphone, LogOut, LayoutDashboard, Bell } from 'lucide-react';
import { SAVED_RESOURCES_DATA, DOWNLOADS_DATA } from '../data/studentResourcesData';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';
import { getAdminResources } from '../utils/resourceStore.js';
import { openResourceByType } from '../utils/resourceOpener.js';
import { PDFs, Documents, Videos } from '../data/resourcesCatalog.js';
import { getSortedAnnouncements } from '../utils/announcementsStore.js';
import { fetchStudentDashboard } from '../utils/authApi.js';

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
  const [dashboardData, setDashboardData] = useState(null);
  const [activeNav, setActiveNav] = useState('overview');
  const [announcements, setAnnouncements] = useState([]);
  const [savedCount, setSavedCount] = useState(SAVED_RESOURCES_DATA.length);
  const [downloadsCount, setDownloadsCount] = useState(DOWNLOADS_DATA.length);
  const [apiRecentResources, setApiRecentResources] = useState([]);
  const [apiLearningItems, setApiLearningItems] = useState([]);
  const [apiDepartments, setApiDepartments] = useState([]);
  const { language } = useLanguage();

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

  useEffect(() => {
    const loadAnnouncements = () => {
      setAnnouncements(getSortedAnnouncements(5));
    };

    loadAnnouncements();

    const handleStorage = (event) => {
      if (event.key === 'announcements') {
        loadAnnouncements();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', loadAnnouncements);
    window.addEventListener('announcements-updated', loadAnnouncements);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', loadAnnouncements);
      window.removeEventListener('announcements-updated', loadAnnouncements);
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadDashboardData = async () => {
      const token = localStorage.getItem('uiExtension-authToken');
      if (!token) {
        return;
      }

      const dashboard = await fetchStudentDashboard(token);

      if (!isActive || !dashboard) {
        return;
      }

      if (dashboard?.student?.name) {
        setUserName(dashboard.student.name);
      }

      const nextSavedCount = Number(dashboard?.metrics?.savedResources);
      if (!Number.isNaN(nextSavedCount)) {
        setSavedCount(nextSavedCount);
      }

      const nextDownloadsCount = Number(dashboard?.metrics?.downloads);
      if (!Number.isNaN(nextDownloadsCount)) {
        setDownloadsCount(nextDownloadsCount);
      }

      if (Array.isArray(dashboard?.recentResources) && dashboard.recentResources.length > 0) {
        setApiRecentResources(dashboard.recentResources);
      }

      if (Array.isArray(dashboard?.learningItems) && dashboard.learningItems.length > 0) {
        setApiLearningItems(dashboard.learningItems);
      }

      if (Array.isArray(dashboard?.departments) && dashboard.departments.length > 0) {
        setApiDepartments(dashboard.departments);
      }

      if (Array.isArray(dashboard?.announcements) && dashboard.announcements.length > 0) {
        setAnnouncements(dashboard.announcements);
      }
    };

    if (isLoggedIn && userRole === 'student') {
      loadDashboardData();
    }

    return () => {
      isActive = false;
    };
  }, [isLoggedIn, userRole]);

  // Close announcements dropdown when clicking outside
  /*
  useEffect(() => {
    const handler = (e) => {
      if (announcementsRef.current && !announcementsRef.current.contains(e.target)) {
        setAnnouncementsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  */

  const handleLogout = () => {
    localStorage.removeItem('uiExtension-isLoggedIn');
    localStorage.removeItem('uiExtension-user');
    localStorage.removeItem('uiExtension-userRole');
    localStorage.removeItem('uiExtension-authToken');
    navigate('/');
  };

  if (!isLoggedIn || userRole !== 'student') {
    return null;
  }

  const normalizeTitle = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const containsKeyword = (text, keyword) => {
    const normalizedText = String(text || '').toLowerCase();
    const normalizedKeyword = String(keyword || '').toLowerCase().trim();
    if (!normalizedKeyword) return false;

    if (normalizedKeyword.length <= 3) {
      const pattern = new RegExp(`\\b${escapeRegex(normalizedKeyword)}\\b`, 'i');
      return pattern.test(normalizedText);
    }

    return normalizedText.includes(normalizedKeyword);
  };

  // Subject/topic -> dedicated PDF file mapping
  const SUBJECT_PDF_MAP = {
    'operating systems': '/files/pdfs/operating-systems-guide.pdf',
    os: '/files/pdfs/operating-systems-guide.pdf',
    'database management systems': '/files/pdfs/database-management-systems-guide.pdf',
    dbms: '/files/pdfs/database-management-systems-guide.pdf',
    'computer networks': '/files/pdfs/computer-networks-guide.pdf',
    cn: '/files/pdfs/computer-networks-guide.pdf',
    'artificial intelligence': '/files/pdfs/artificial-intelligence-guide.pdf',
    ai: '/files/pdfs/artificial-intelligence-guide.pdf',
    'software engineering': '/files/pdfs/software-engineering-guide.pdf',
    se: '/files/pdfs/software-engineering-guide.pdf',
  };

  const getMappedSubjectPdfUrl = (resource) => {
    const searchText = `${resource?.title || ''} ${resource?.subject || ''}`.toLowerCase();
    const mapEntries = Object.entries(SUBJECT_PDF_MAP);

    for (const [keyword, mappedUrl] of mapEntries) {
      if (containsKeyword(searchText, keyword)) {
        return mappedUrl;
      }
    }

    return null;
  };

  const resolveResourceUrl = (resource) => {
    if (resource?.url) return resource.url;

    const titleKey = normalizeTitle(resource?.title);
    const typeKey = String(resource?.type || '').toLowerCase();

    // Use explicit subject mapping first for PDF-like resources.
    if (typeKey !== 'video' && typeKey !== 'document') {
      const mappedSubjectPdf = getMappedSubjectPdfUrl(resource);
      if (mappedSubjectPdf) {
        return mappedSubjectPdf;
      }
    }

    if (typeKey === 'video') {
      const matchedVideo = Videos.find((item) => {
        const videoTitle = normalizeTitle(item.title);
        return videoTitle.includes(titleKey) || titleKey.includes(videoTitle);
      });
      if (matchedVideo?.slug) {
        return `/videos/${matchedVideo.slug}`;
      }
      return matchedVideo?.mediaUrl || null;
    }

    if (typeKey === 'document') {
      const matchedDoc = Documents.find((item) => {
        const docTitle = normalizeTitle(item.title);
        return docTitle.includes(titleKey) || titleKey.includes(docTitle);
      });
      return matchedDoc?.url || null;
    }

    const matchedPdf = PDFs.find((item) => {
      const pdfTitle = normalizeTitle(item.title);
      return pdfTitle.includes(titleKey) || titleKey.includes(pdfTitle);
    });
    return matchedPdf?.url || null;
  };

  const getFallbackUrlByType = (type) => {
    const typeKey = String(type || '').toLowerCase();
    if (typeKey === 'video') {
      return Videos[0]?.slug ? `/videos/${Videos[0].slug}` : Videos[0]?.mediaUrl || null;
    }
    if (typeKey === 'document') {
      return Documents[0]?.url || null;
    }
    return PDFs[0]?.url || null;
  };

  const resolveSubjectSlug = (subject) => {
    const normalized = String(subject || '').toLowerCase();

    if (normalized.includes('computer science')) return 'computer-science';
    if (normalized.includes('electronics')) return 'electronics';
    if (normalized.includes('mathematics')) return 'mathematics';
    if (normalized.includes('physics')) return 'physics';
    if (normalized.includes('civil')) return 'civil-engineering';
    if (normalized.includes('mechanical')) return 'engineering';
    if (normalized.includes('engineering')) return 'engineering';

    return null;
  };

  const handleSubjectClick = (subject) => {
    const slug = resolveSubjectSlug(subject);
    if (!slug) {
      window.alert('Subject details are not available');
      return;
    }

    navigate(`/category/${slug}`);
  };

  // Load admin-added resources so they reflect on student side
  const adminResources = getAdminResources();
  const adminMapped = adminResources.map((r) => ({
    id: `admin-${r.id}`,
    title: r.title,
    subject: r.department,
    type: r.type,
    lastAccessed: r.addedAt || 'Recently added',
    url: resolveResourceUrl(r) || getFallbackUrlByType(r.type),
  }));

  // Default resources + admin-added resources
  const defaultResources = [
    { id: 1, title: 'Data Structures and Algorithms', subject: 'Computer Science', type: 'PDF', lastAccessed: '2 hours ago', url: '/files/pdfs/data-structures-algorithms-notes.pdf' },
    { id: 2, title: 'Thermodynamics Fundamentals', subject: 'Mechanical Engg.', type: 'Video', lastAccessed: '5 hours ago', url: 'https://www.youtube.com/watch?v=4LqZdkkBDas' },
    { id: 3, title: 'Digital Signal Processing', subject: 'Electronics', type: 'PDF', lastAccessed: '1 day ago', url: '/files/pdfs/digital-signal-processing-notes.pdf' },
    { id: 4, title: 'Software Engineering Principles', subject: 'Computer Science', type: 'Video', lastAccessed: '2 days ago', url: 'https://www.youtube.com/watch?v=O753uuutqH8' },
    { id: 5, title: 'Machine Learning Foundations', subject: 'Computer Science', type: 'PDF', lastAccessed: '3 hours ago', url: null },
    { id: 6, title: 'Linear Algebra for Engineers', subject: 'Mathematics', type: 'PDF', lastAccessed: '1 day ago', url: null },
    { id: 7, title: 'Computer Networks Masterclass', subject: 'Computer Science', type: 'Video', lastAccessed: '4 hours ago', url: null },
    { id: 8, title: 'Fluid Mechanics Essentials', subject: 'Mechanical Engg.', type: 'Document', lastAccessed: '2 days ago', url: null },
  ].map((resource) => ({
    ...resource,
    url: resolveResourceUrl(resource) || resource.url || getFallbackUrlByType(resource.type),
  }));

  // Merge: admin-added resources on top, then defaults (avoid duplicates by title)
  const defaultTitles = new Set(defaultResources.map((r) => r.title));
  const uniqueAdminResources = adminMapped.filter((r) => !defaultTitles.has(r.title));
  const backendRecentResources = dashboardData?.recentResources?.length
    ? dashboardData.recentResources
    : [];
  const recentResources = backendRecentResources.length > 0
    ? backendRecentResources
    : [...uniqueAdminResources, ...defaultResources];

  const defaultDepartments = [
    { name: 'Computer Science',    count: 156, slug: 'computer-science' },
    { name: 'Electronics & Comm.', count: 98,  slug: 'electronics' },
    { name: 'Mechanical Engg.',    count: 84,  slug: 'mechanical' },
    { name: 'Civil Engineering',   count: 72,  slug: 'civil-engineering' },
    { name: 'Mathematics',         count: 65,  slug: 'mathematics' },
    { name: 'Physics',             count: 53,  slug: 'physics' },
  ];

  const defaultLearningItems = [
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
    {
      title: 'Operating Systems',
      progress: 45,
      lastAccessed: 'Today',
      url: null,
    },
    {
      title: 'Machine Learning',
      progress: 20,
      lastAccessed: '2 days ago',
      url: null,
    },
  ].map((item) => ({
    ...item,
    type: item.url?.includes('youtube') ? 'Video' : 'PDF',
    url: item.url || resolveResourceUrl({ title: item.title, type: item.url?.includes('youtube') ? 'Video' : 'PDF' }) || getFallbackUrlByType(item.url?.includes('youtube') ? 'Video' : 'PDF'),
  }));

  const formatAnnouncementDate = (value) => {
    if (!value) return 'Recently';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Recently';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const defaultAnnouncements = [
    { date: '26 Feb 2026', message: 'End-semester exam schedule released for all departments', priority: 'high' },
    { date: '25 Feb 2026', message: 'New video series on Cloud Computing is now available', priority: 'normal' },
    { date: '24 Feb 2026', message: 'Library will remain closed on 28 Feb for maintenance', priority: 'medium' },
    { date: '23 Feb 2026', message: 'Updated syllabus materials uploaded for Semester 4 CS', priority: 'high' },
    { date: '22 Feb 2026', message: 'Research paper submission portal opens next week', priority: 'high' },
    { date: '20 Feb 2026', message: 'Guest lecture on AI Ethics — Register before 25 Feb', priority: 'normal' },
    { date: '18 Feb 2026', message: 'Mid-term grades published for all departments', priority: 'high' },
  ];

  const learningItems = apiLearningItems.length > 0 ? apiLearningItems : defaultLearningItems;
  const departments = apiDepartments.length > 0 ? apiDepartments : defaultDepartments;
  const announcementsToDisplay = announcements.length > 0
    ? announcements
    : defaultAnnouncements;

  const displayedRecentResources = apiRecentResources.length > 0 ? apiRecentResources : recentResources;
  const displayedLearningItems = apiLearningItems.length > 0 ? apiLearningItems : learningItems;
  const displayedDepartments = apiDepartments.length > 0 ? apiDepartments : departments;

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      {/* Main Content */}
      <main className="dashboard-main dashboard-main--bottom-nav">
        {/* Top Bar */}
        <section className="mb-6">
          <div className="heading-entrance bg-white border border-gray-200 rounded-xl shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wide uppercase">Edu Library</p>
              <h2 className="heading-premium text-lg sm:text-xl font-bold text-slate-900 truncate">{translate('dashboardWelcome', language)}</h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Announcements Bell */}
              <div className="relative">
                <button
                  onClick={() => navigate('/announcements')}
                  className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition-colors"
                  aria-label="Announcements"
                  aria-expanded={false}
                >
                  <Bell size={18} />
                  {/* High-priority badge */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold leading-none shadow">
                    {announcements.filter(a => a.priority === 'urgent').length}
                  </span>
                </button>
                {/* Dropdown removed - bell now navigates to announcements page */}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg border border-teal-200 bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 hover:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={16} />
                {translate('logout', language)}
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
                {translate('welcomeBackText', language)}
              </p>
              <h1 className="heading-entrance heading-premium mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                {translate('hello', language)}, {userName}!{' '}
                <span role="img" aria-label="wave" style={{ display: 'inline-block', animation: 'wave-hand 1.8s ease-in-out 0.8s 1' }}>
                  👋
                </span>
              </h1>
              <p className="heading-entrance heading-entrance-delay-1 mb-8 max-w-md text-base leading-relaxed text-teal-100 sm:text-lg">
                {translate('yourLearningHub', language)}
              </p>
              <div className="heading-entrance flex flex-wrap gap-3" style={{ animationDelay: '320ms' }}>
                {/* Primary CTA */}
                <button
                  onClick={() => navigate('/catalogs')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition-all duration-200 hover:bg-teal-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
                >
                  <BookOpen size={16} />
                  {translate('browseAction', language)}
                </button>
                {/* Secondary CTA */}
                <button
                  onClick={() => navigate('/saved-resources')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-teal-700"
                >
                  <Save size={16} />
                  {translate('savedAction', language)}
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
            title={translate('browseAction', language)}
            subtitle={translate('browseActionDesc', language)}
            icon={<BookOpen className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/catalogs')}
          />
          <DashboardActionCard
            title={translate('savedAction', language)}
            subtitle={`${savedCount} ${translate('itemsSaved', language)}`}
            icon={<Save className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/saved-resources')}
          />
          <DashboardActionCard
            title={translate('downloadsAction', language)}
            subtitle={`${downloadsCount} ${translate('filesDownloaded', language)}`}
            icon={<Download className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/downloads')}
          />
          <DashboardActionCard
            title={translate('requestAction', language)}
            subtitle={translate('requestActionDesc', language)}
            icon={<Mail className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />}
            onClick={() => navigate('/request-resource')}
          />
        </section>

        {/* Recently Accessed Resources - Academic Table */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">{translate('recentlyAccessedResources', language)}</h2>
          <div className="resource-table-wrapper">
            <table className="resource-table">
              <thead>
                <tr>
                  <th>{translate('title', language)}</th>
                  <th>{translate('subject', language)}</th>
                  <th>{translate('type', language)}</th>
                  <th>{translate('lastAccessedText', language)}</th>
                </tr>
              </thead>
              <tbody>
                {displayedRecentResources.map((resource, idx) => (
                  <tr key={idx}>
                    <td className="resource-title">
                      <button
                        type="button"
                        onClick={() => openResourceByType(resource)}
                        className="cursor-pointer hover:underline bg-transparent border-0 p-0 text-left"
                      >
                        {resource.title}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleSubjectClick(resource.subject)}
                        className="text-teal-300 hover:text-teal-200 hover:underline transition-colors bg-transparent border-0 p-0 text-left"
                      >
                        {resource.subject}
                      </button>
                    </td>
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
          <h2 className="section-title heading-entrance heading-premium">{translate('ongoingLearning', language)}</h2>
          <div className="learning-cards">
            {displayedLearningItems.map((item, idx) => (
              <div key={idx} className="learning-card">
                <div className="learning-header">
                  <h4 className="heading-entrance heading-entrance-card font-semibold tracking-[-0.01em]">{item.title}</h4>
                  <span className="progress-badge">{item.progress}% {translate('complete', language)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="learning-meta">{translate('lastAccessedColon', language)} {item.lastAccessed}</p>
                  <button
                    onClick={() => openResourceByType(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 active:bg-teal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                    aria-label={`Continue ${item.title}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    {translate('continueButton', language)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explore by Department Grid */}
        <section className="dashboard-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title heading-entrance heading-premium mb-0">{translate('exploreByDepartment', language)}</h2>
            <button
              onClick={() => navigate('/departments')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-teal-200 bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {translate('exploreMore', language)}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div className="department-grid">
            {displayedDepartments.map((dept, idx) => (
              <div key={idx} className="department-card">
                <h4 className="heading-entrance heading-entrance-card font-semibold tracking-[-0.01em]">{dept.name}</h4>
                <p className="dept-count">{dept.count} {translate('resourcesCount', language)}</p>
                <button
                  className="dept-btn"
                  onClick={() => navigate(`/category/${dept.slug}`)}
                >
                  {translate('explore', language)}
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
          <span className="nav-title">{translate('overview', language)}</span>
        </div>
        <div onClick={() => navigate('/catalogs')} className={`nav-link cursor-pointer ${activeNav === 'browse' ? 'active' : ''}`} aria-label="Browse Resources">
          <span className="nav-icon"><BookOpen size={20} /></span>
          <span className="nav-title">{translate('browseResources', language)}</span>
        </div>
        <div onClick={() => navigate('/saved-resources')} className={`nav-link cursor-pointer ${activeNav === 'saved' ? 'active' : ''}`} aria-label="Saved Items">
          <span className="nav-icon"><Save size={20} /></span>
          <span className="nav-title">{translate('savedItems', language)}</span>
        </div>
        <div onClick={() => navigate('/downloads')} className={`nav-link cursor-pointer ${activeNav === 'downloads' ? 'active' : ''}`} aria-label="Downloads">
          <span className="nav-icon"><Download size={20} /></span>
          <span className="nav-title">{translate('downloads', language)}</span>
        </div>
        <div onClick={() => navigate('/my-requests')} className={`nav-link cursor-pointer ${activeNav === 'requests' ? 'active' : ''}`} aria-label="My Requests">
          <span className="nav-icon"><Mail size={20} /></span>
          <span className="nav-title">{translate('myRequests', language)}</span>
        </div>
        <div onClick={() => navigate('/announcements')} className={`nav-link cursor-pointer ${activeNav === 'announcements' ? 'active' : ''}`} aria-label="Announcements">
          <span className="nav-icon"><Megaphone size={20} /></span>
          <span className="nav-title">{translate('announcements', language)}</span>
        </div>
        <button onClick={handleLogout} className="nav-link nav-logout" aria-label="Logout">
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-title">{translate('logout', language)}</span>
        </button>
      </nav>
    </div>
  );
};
