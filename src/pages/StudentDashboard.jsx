import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAVED_RESOURCES_DATA, DOWNLOADS_DATA } from '../data/studentResourcesData';

/**
 * STUDENT DASHBOARD
 * Clean, student-focused design matching landing page theme
 * Structured sections for efficient learning material access
 */
export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('Student');
  const [activeNav, setActiveNav] = useState('overview');

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
    { name: 'Computer Science', count: 45 },
    { name: 'Electronics & Comm.', count: 38 },
    { name: 'Mechanical Engg.', count: 32 },
    { name: 'Civil Engineering', count: 28 },
    { name: 'Mathematics', count: 25 },
    { name: 'Physics', count: 22 },
  ];

  const announcements = [
    { date: '28 May 2024', message: 'New semester study materials uploaded for all departments' },
    { date: '25 May 2024', message: 'Database maintenance scheduled for Saturday 3AM-6AM' },
    { date: '22 May 2024', message: 'Request feature now available for suggesting new resources' },
  ];

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      {/* Main Content */}
      <main className="dashboard-main dashboard-main--bottom-nav">
        {/* Welcome Section */}
        <section className="dashboard-welcome">
          <h1>Welcome  {userName}!</h1>
          <p>Access and manage your learning materials efficiently</p>
        </section>

        {/* Announcements Panel */}
        <section className="dashboard-section">
          <h2 className="section-title">Announcements</h2>
          <div className="announcements-list">
            {announcements.map((announcement, idx) => (
              <div key={idx} className="announcement-item">
                <div className="announcement-date">{announcement.date}</div>
                <div className="announcement-message">{announcement.message}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Smart Quick Access Panel */}
        <section className="quick-access-panel">
          <div className="quick-access-card" onClick={() => navigate('/catalogs')}>
            <div className="quick-icon">📚</div>
            <h3>Browse Catalog</h3>
            <p>Explore all resources</p>
          </div>
          <div className="quick-access-card" onClick={() => navigate('/saved-resources')}>
            <div className="quick-icon">💾</div>
            <h3>Saved Resources</h3>
            <p>{SAVED_RESOURCES_DATA.length} items saved</p>
          </div>
          <div className="quick-access-card" onClick={() => navigate('/downloads')}>
            <div className="quick-icon">📥</div>
            <h3>Downloads</h3>
            <p>{DOWNLOADS_DATA.length} files downloaded</p>
          </div>
          <div className="quick-access-card" onClick={() => navigate('/request-resource')}>
            <div className="quick-icon">✉️</div>
            <h3>Request Resource</h3>
            <p>Suggest new materials</p>
          </div>
        </section>

        {/* Recently Accessed Resources - Academic Table */}
        <section className="dashboard-section">
          <h2 className="section-title">Recently Accessed Resources</h2>
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

        {/* Explore by Department Grid */}
        <section className="dashboard-section">
          <h2 className="section-title">Explore by Department</h2>
          <div className="department-grid">
            {departments.map((dept, idx) => (
              <div key={idx} className="department-card">
                <h4>{dept.name}</h4>
                <p className="dept-count">{dept.count} resources</p>
                <button className="dept-btn">Explore</button>
              </div>
            ))}
          </div>
        </section>

        {/* Ongoing Learning Section */}
        <section className="dashboard-section">
          <h2 className="section-title">Ongoing Learning</h2>
          <div className="learning-cards">
            <div className="learning-card">
              <div className="learning-header">
                <h4>Data Structures</h4>
                <span className="progress-badge">60% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <p className="learning-meta">Last accessed: Today</p>
            </div>
            <div className="learning-card">
              <div className="learning-header">
                <h4>Circuit Theory</h4>
                <span className="progress-badge">35% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '35%' }}></div>
              </div>
              <p className="learning-meta">Last accessed: Yesterday</p>
            </div>
            <div className="learning-card">
              <div className="learning-header">
                <h4>Engineering Mathematics</h4>
                <span className="progress-badge">80% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '80%' }}></div>
              </div>
              <p className="learning-meta">Last accessed: 3 days ago</p>
            </div>
          </div>
        </section>

      </main>

      {/* Bottom Navigation Menu */}
      <nav className="bottom-nav-menu" role="navigation" aria-label="Main navigation">
        <div onClick={() => navigate('/student-dashboard')} className={`nav-link cursor-pointer ${activeNav === 'overview' ? 'active' : ''}`} aria-label="Overview">
          <span className="nav-icon">📊</span>
          <span className="nav-title">Overview</span>
        </div>
        <div onClick={() => navigate('/catalogs')} className={`nav-link cursor-pointer ${activeNav === 'browse' ? 'active' : ''}`} aria-label="Browse Resources">
          <span className="nav-icon">📚</span>
          <span className="nav-title">Browse Resources</span>
        </div>
        <div onClick={() => navigate('/saved-resources')} className={`nav-link cursor-pointer ${activeNav === 'saved' ? 'active' : ''}`} aria-label="Saved Items">
          <span className="nav-icon">💾</span>
          <span className="nav-title">Saved Items</span>
        </div>
        <div onClick={() => navigate('/downloads')} className={`nav-link cursor-pointer ${activeNav === 'downloads' ? 'active' : ''}`} aria-label="Downloads">
          <span className="nav-icon">📥</span>
          <span className="nav-title">Downloads</span>
        </div>
        <div onClick={() => navigate('/my-requests')} className={`nav-link cursor-pointer ${activeNav === 'requests' ? 'active' : ''}`} aria-label="My Requests">
          <span className="nav-icon">✉️</span>
          <span className="nav-title">My Requests</span>
        </div>
        <div onClick={() => navigate('/announcements')} className={`nav-link cursor-pointer ${activeNav === 'announcements' ? 'active' : ''}`} aria-label="Announcements">
          <span className="nav-icon">📢</span>
          <span className="nav-title">Announcements</span>
        </div>
        <button onClick={handleLogout} className="nav-link nav-logout" aria-label="Logout">
          <span className="nav-icon">🚪</span>
          <span className="nav-title">Logout</span>
        </button>
      </nav>
    </div>
  );
};
