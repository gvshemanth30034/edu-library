import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Download, Mail, Megaphone, Settings, LogOut, LayoutDashboard } from 'lucide-react';

/**
 * ADMIN DASHBOARD
 * Clean resource management dashboard matching landing page theme
 * Focus on managing student learning resources effectively
 */

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeNav, setActiveNav] = useState('overview');

  useEffect(() => {
    const loggedIn = localStorage.getItem('uiExtension-isLoggedIn') === 'true';
    const role = localStorage.getItem('uiExtension-userRole');

    if (!loggedIn || role !== 'admin') {
      navigate('/');
      return;
    }

    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uiExtension-user');
    localStorage.removeItem('uiExtension-isLoggedIn');
    localStorage.removeItem('uiExtension-userRole');
    navigate('/');
  };

  if (!isLoggedIn || userRole !== 'admin') {
    return null;
  }

  // Mock data
  const mostAccessed = [
    { title: 'Digital Electronics', department: 'ECE', accessCount: 245 },
    { title: 'Engineering Mathematics', department: 'Mathematics', accessCount: 189 },
    { title: 'Data Structures', department: 'CSE', accessCount: 167 },
  ];

  const recentDownloads = [
    { student: 'Priya Sharma', resource: 'Circuit Theory Notes', time: '15 min ago' },
    { student: 'Rahul Kumar', resource: 'Java Programming Guide', time: '45 min ago' },
    { student: 'Ananya Singh', resource: 'Calculus Textbook', time: '2 hours ago' },
  ];

  const resourceRequests = [
    { student: 'Amit Patel', request: 'Advanced Database Systems book', date: '28 May 2024', status: 'Pending' },
    { student: 'Sneha Reddy', request: 'Machine Learning lecture videos', date: '27 May 2024', status: 'Pending' },
  ];

  const dummyResources = {
    PDFs: [
      { id: 1, title: 'Data Structures Notes' },
      { id: 2, title: 'Operating Systems Guide' },
      { id: 3, title: 'Computer Networks PDF' },
    ],
    Videos: [
      { id: 4, title: 'React Basics Tutorial' },
      { id: 5, title: 'DBMS Full Course' },
    ],
    Documents: [
      { id: 6, title: 'Physics Lab Manual' },
      { id: 7, title: 'Project Documentation Template' },
    ],
  };

  const totalResourcesCount = dummyResources.PDFs.length
    + dummyResources.Videos.length
    + dummyResources.Documents.length;

  const handleResourceCardClick = () => {
    navigate('/resources-analytics');
  };

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      {/* Main Content */}
      <main className="dashboard-main dashboard-main--bottom-nav">
        {/* Welcome Section */}
        <section className="admin-hero">
          <div className="admin-hero__content">
            <p className="admin-hero__kicker">Welcome back</p>
            <h1 className="admin-hero__title">Admin Control Center</h1>
            <p className="admin-hero__subtitle">
              Manage learning resources, review requests, and monitor activity in one place.
            </p>
            <div className="admin-hero__actions">
              <button type="button" className="admin-hero__primary" onClick={handleResourceCardClick}>
                View Analytics
              </button>
              <button type="button" className="admin-hero__secondary" onClick={() => navigate('/announcements')}>
                Post Announcement
              </button>
            </div>
          </div>
          <div className="admin-hero__visual" aria-hidden="true">
            <div className="admin-hero__icon-grid">
              <div className="admin-hero__icon-card"><BookOpen size={26} /></div>
              <div className="admin-hero__icon-card"><Download size={26} /></div>
              <div className="admin-hero__icon-card"><Settings size={26} /></div>
              <div className="admin-hero__icon-card"><LayoutDashboard size={26} /></div>
            </div>
            <span className="admin-hero__orb admin-hero__orb--one" />
            <span className="admin-hero__orb admin-hero__orb--two" />
          </div>
        </section>

        {/* Overview Stats Grid */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card" onClick={handleResourceCardClick}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-teal-50 text-teal-600 p-3 h-14 w-14"><BookOpen size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Total Resources</h3>
              <p className="stat-number">{totalResourcesCount}</p>
              <span className="stat-meta">+36 this month</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-icon flex items-center justify-center rounded-xl bg-green-50 text-green-600 p-3 h-14 w-14"><Users size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Active Students</h3>
              <p className="stat-number">392</p>
              <span className="stat-meta">Across 24 institutions</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-icon flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 p-3 h-14 w-14"><Download size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Recent Uploads</h3>
              <p className="stat-number">58</p>
              <span className="stat-meta">Last 7 days</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-icon flex items-center justify-center rounded-xl bg-orange-50 text-orange-600 p-3 h-14 w-14"><Mail size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Pending Requests</h3>
              <p className="stat-number">12</p>
              <span className="stat-meta">Requires attention</span>
            </div>
          </div>
        </section>

        {/* Resource Management Section */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Resource Management</h2>
          <div className="admin-action-grid">
            <div className="admin-action-card">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Add New Resource</h3>
              <form className="admin-form">
                <input type="text" placeholder="Resource Title" className="admin-input" />
                <select className="admin-input">
                  <option>Select Department</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                </select>
                <select className="admin-input">
                  <option>Resource Type</option>
                  <option>PDF</option>
                  <option>Video</option>
                  <option>Document</option>
                </select>
                <button type="button" className="admin-submit-btn">Add Resource</button>
              </form>
            </div>
            <div className="admin-action-card">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">Edit Existing Resources</button>
                <button className="action-btn">Delete Resources</button>
                <button className="action-btn">Assign to Departments</button>
                <button className="action-btn">Bulk Upload</button>
              </div>
            </div>
          </div>
        </section>

        {/* Student Activity Insights */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Student Activity Insights</h2>
          <div className="insight-grid">
            <div className="insight-panel">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Most Accessed Resources</h3>
              <div className="insight-list">
                {mostAccessed.map((item, idx) => (
                  <div key={idx} className="insight-item">
                    <div>
                      <p className="insight-title">{item.title}</p>
                      <p className="insight-meta">{item.department}</p>
                    </div>
                    <span className="insight-badge">{item.accessCount} views</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="insight-panel">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Recent Downloads</h3>
              <div className="insight-list">
                {recentDownloads.map((item, idx) => (
                  <div key={idx} className="insight-item">
                    <div>
                      <p className="insight-title">{item.student}</p>
                      <p className="insight-meta">{item.resource}</p>
                    </div>
                    <span className="insight-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="trending-subjects">
            <h3 className="heading-entrance heading-entrance-card heading-premium">Trending Subjects This Week</h3>
            <div className="subject-tags">
              <span className="subject-tag">Data Structures</span>
              <span className="subject-tag">Digital Electronics</span>
              <span className="subject-tag">Engineering Mathematics</span>
              <span className="subject-tag">Thermodynamics</span>
              <span className="subject-tag">Circuit Theory</span>
            </div>
          </div>
        </section>

        {/* Resource Requests Panel */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Resource Requests from Students</h2>
          <div className="request-table-wrapper">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Request</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resourceRequests.map((req, idx) => (
                  <tr key={idx}>
                    <td>{req.student}</td>
                    <td className="request-text">{req.request}</td>
                    <td>{req.date}</td>
                    <td><span className="status-badge status-pending">{req.status}</span></td>
                    <td>
                      <button className="action-link">Approve</button>
                      <button className="action-link action-link--reject">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Announcement Management */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Announcement Management</h2>
          <div className="announcement-form-card">
            <form className="admin-form admin-form--announcement">
              <textarea
                placeholder="Write announcement for students..."
                className="admin-textarea"
                rows="3"
              ></textarea>
              <div className="form-actions">
                <button type="button" className="admin-submit-btn">Publish Announcement</button>
                <button type="button" className="admin-cancel-btn">Clear</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Menu */}
      <nav className="bottom-nav-menu bottom-nav-menu--admin" role="navigation" aria-label="Admin navigation">
        <a href="#overview" className={`nav-link ${activeNav === 'overview' ? 'active' : ''}`} onClick={() => setActiveNav('overview')} aria-label="Overview">
          <span className="nav-icon"><LayoutDashboard size={20} /></span>
          <span className="nav-title">Overview</span>
        </a>
        <a href="#resources" className={`nav-link ${activeNav === 'resources' ? 'active' : ''}`} onClick={() => setActiveNav('resources')} aria-label="Resource Management">
          <span className="nav-icon"><BookOpen size={20} /></span>
          <span className="nav-title">Resources</span>
        </a>
        <a href="#students" className={`nav-link ${activeNav === 'students' ? 'active' : ''}`} onClick={() => setActiveNav('students')} aria-label="Student Activity">
          <span className="nav-icon"><Users size={20} /></span>
          <span className="nav-title">Students</span>
        </a>
        <a href="#requests" className={`nav-link ${activeNav === 'requests' ? 'active' : ''}`} onClick={() => setActiveNav('requests')} aria-label="Requests">
          <span className="nav-icon"><Mail size={20} /></span>
          <span className="nav-title">Requests</span>
        </a>
        <a href="#announcements" className={`nav-link ${activeNav === 'announcements' ? 'active' : ''}`} onClick={() => setActiveNav('announcements')} aria-label="Announcements">
          <span className="nav-icon"><Megaphone size={20} /></span>
          <span className="nav-title">Announcements</span>
        </a>
        <a href="#settings" className={`nav-link ${activeNav === 'settings' ? 'active' : ''}`} onClick={() => setActiveNav('settings')} aria-label="Settings">
          <span className="nav-icon"><Settings size={20} /></span>
          <span className="nav-title">Settings</span>
        </a>
        <button onClick={handleLogout} className="nav-link nav-logout" aria-label="Logout">
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-title">Logout</span>
        </button>
      </nav>
    </div>
  );
};
