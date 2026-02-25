import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Download, Mail, Megaphone, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { Documents, PDFs, Videos } from '../data/resourcesCatalog.js';

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
  const [resourceForm, setResourceForm] = useState({ title: '', department: '', type: '' });
  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceFilter, setResourceFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editingDraft, setEditingDraft] = useState({ title: '', department: '', type: '' });
  const [assigningResourceId, setAssigningResourceId] = useState(null);
  const [assignDraft, setAssignDraft] = useState('');
  const [selectedResourceIds, setSelectedResourceIds] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [activityLog, setActivityLog] = useState([]);

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

  const departmentOptions = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Mathematics'];
  const typeOptions = ['PDF', 'Video', 'Document'];

  const [resources, setResources] = useState([
    { id: 1, title: 'Data Structures Notes', department: 'Computer Science', type: 'PDF', accessCount: 245, addedAt: '2026-02-10', assigned: true },
    { id: 2, title: 'Operating Systems Guide', department: 'Computer Science', type: 'PDF', accessCount: 189, addedAt: '2026-02-16', assigned: true },
    { id: 3, title: 'Computer Networks PDF', department: 'Electronics', type: 'PDF', accessCount: 167, addedAt: '2026-02-08', assigned: false },
    { id: 4, title: 'React Basics Tutorial', department: 'Computer Science', type: 'Video', accessCount: 208, addedAt: '2026-02-19', assigned: true },
    { id: 5, title: 'DBMS Full Course', department: 'Computer Science', type: 'Video', accessCount: 221, addedAt: '2026-02-22', assigned: true },
    { id: 6, title: 'Physics Lab Manual', department: 'Mathematics', type: 'Document', accessCount: 152, addedAt: '2026-02-04', assigned: false },
    { id: 7, title: 'Project Documentation Template', department: 'Civil', type: 'Document', accessCount: 98, addedAt: '2026-02-01', assigned: true },
  ]);

  const [recentDownloads, setRecentDownloads] = useState([
    { id: 1, student: 'Priya Sharma', resource: 'Circuit Theory Notes', time: '15 min ago' },
    { id: 2, student: 'Rahul Kumar', resource: 'Java Programming Guide', time: '45 min ago' },
    { id: 3, student: 'Ananya Singh', resource: 'Calculus Textbook', time: '2 hours ago' },
  ]);

  const [resourceRequests, setResourceRequests] = useState([
    { id: 1, student: 'Amit Patel', request: 'Advanced Database Systems book', date: '24 Feb 2026', status: 'Pending' },
    { id: 2, student: 'Sneha Reddy', request: 'Machine Learning lecture videos', date: '23 Feb 2026', status: 'Pending' },
    { id: 3, student: 'Nikhil Rao', request: 'Signal Processing sample papers', date: '21 Feb 2026', status: 'Approved' },
  ]);


  useEffect(() => {
    setActivityLog([
      { id: 1, type: 'upload', detail: 'Uploaded "React Basics Tutorial" to Computer Science', time: 'Today, 10:15 AM' },
      { id: 2, type: 'request', detail: 'Approved request for Signal Processing sample papers', time: 'Yesterday, 4:20 PM' },
      { id: 3, type: 'announcement', detail: 'Published new mid-term resource announcement', time: 'Yesterday, 11:05 AM' },
    ]);
  }, []);

  const totalResourcesCount = resources.length;
  const pendingRequestsCount = resourceRequests.filter((req) => req.status === 'Pending').length;
  const recentUploadsCount = resources.filter((resource) => {
    const added = new Date(resource.addedAt);
    const now = new Date();
    const diffDays = (now - added) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;
  const activeStudentsCount = new Set([
    ...recentDownloads.map((item) => item.student),
    ...resourceRequests.map((item) => item.student),
  ]).size;

  const mostAccessed = [...resources]
    .sort((a, b) => b.accessCount - a.accessCount)
    .slice(0, 3);

  const trendingSubjects = resources.reduce((acc, resource) => {
    acc[resource.title] = (acc[resource.title] || 0) + resource.accessCount;
    return acc;
  }, {});
  const trendingSubjectsList = Object.entries(trendingSubjects)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([title]) => title);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(resourceSearch.toLowerCase());
    const matchesType = resourceFilter === 'All' || resource.type === resourceFilter;
    const matchesDepartment = departmentFilter === 'All' || resource.department === departmentFilter;
    return matchesSearch && matchesType && matchesDepartment;
  });

  const addActivity = (type, detail) => {
    const now = new Date();
    const time = now.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    setActivityLog((prev) => [
      { id: Date.now(), type, detail, time },
      ...prev,
    ].slice(0, 6));
  };

  const handleResourceCardClick = (section = 'overview') => {
    console.log('AdminDashboard passing data to analytics:', {
      resourcesCount: resources.length,
      requestsCount: resourceRequests.length,
      downloadsCount: recentDownloads.length,
      totalResourcesCount,
      pendingRequestsCount,
      recentUploadsCount,
      activeStudentsCount,
    });
    navigate(`/resources-analytics/${section}`, { 
      state: { 
        resources,
        resourceRequests,
        recentDownloads,
        activityLog 
      } 
    });
  };

  const handleResourceFormChange = (field, value) => {
    setResourceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddResource = (event) => {
    event.preventDefault();
    if (!resourceForm.title || !resourceForm.department || !resourceForm.type) {
      return;
    }
    const newResource = {
      id: Date.now(),
      title: resourceForm.title,
      department: resourceForm.department,
      type: resourceForm.type,
      accessCount: Math.floor(Math.random() * 180) + 40,
      addedAt: new Date().toISOString().slice(0, 10),
      assigned: true,
    };
    setResources((prev) => [newResource, ...prev]);
    setResourceForm({ title: '', department: '', type: '' });
    addActivity('upload', `Added "${newResource.title}" to ${newResource.department}`);
  };

  const handleEditResource = (resource) => {
    setEditingResourceId(resource.id);
    setEditingDraft({ title: resource.title, department: resource.department, type: resource.type });
  };

  const handleSaveResource = (resourceId) => {
    setResources((prev) => prev.map((resource) => (
      resource.id === resourceId
        ? { ...resource, ...editingDraft }
        : resource
    )));
    setEditingResourceId(null);
    addActivity('edit', `Updated resource details for "${editingDraft.title}"`);
  };

  const handleDeleteResource = (resourceId) => {
    const resource = resources.find((item) => item.id === resourceId);
    setResources((prev) => prev.filter((item) => item.id !== resourceId));
    setSelectedResourceIds((prev) => prev.filter((id) => id !== resourceId));
    if (resource) {
      addActivity('delete', `Deleted resource "${resource.title}"`);
    }
  };

  const handleAssignResource = (resourceId) => {
    if (!assignDraft) {
      return;
    }
    setResources((prev) => prev.map((resource) => (
      resource.id === resourceId
        ? { ...resource, department: assignDraft, assigned: true }
        : resource
    )));
    setAssigningResourceId(null);
    addActivity('assign', `Assigned resource to ${assignDraft} department`);
    setAssignDraft('');
  };

  const toggleSelection = (resourceId) => {
    setSelectedResourceIds((prev) => (
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    ));
  };

  const handleRequestStatus = (requestId, status) => {
    setResourceRequests((prev) => prev.map((request) => (
      request.id === requestId
        ? { ...request, status }
        : request
    )));
    addActivity('request', `${status} request from ${resourceRequests.find((req) => req.id === requestId)?.student || 'student'}`);
  };


  const handleQuickAction = (action) => {
    if (action === 'bulk') {
      setBulkActionLoading(true);
      setTimeout(() => {
        const bulkResources = [
          { id: Date.now() + 1, title: 'Thermodynamics Quick Pack', department: 'Mechanical', type: 'PDF', accessCount: 120, addedAt: new Date().toISOString().slice(0, 10), assigned: true },
          { id: Date.now() + 2, title: 'Circuit Theory Videos', department: 'Electronics', type: 'Video', accessCount: 140, addedAt: new Date().toISOString().slice(0, 10), assigned: true },
          { id: Date.now() + 3, title: 'Math Revision Sheets', department: 'Mathematics', type: 'Document', accessCount: 110, addedAt: new Date().toISOString().slice(0, 10), assigned: true },
        ];
        setResources((prev) => [...bulkResources, ...prev]);
        setBulkActionLoading(false);
        addActivity('upload', 'Bulk uploaded 3 new resources');
      }, 800);
    }
    if (action === 'assign' && selectedResourceIds.length === 0) {
      addActivity('assign', 'Select resources to assign departments');
    }
  };


  if (!isLoggedIn || userRole !== 'admin') {
    return null;
  }

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      {/* Main Content */}
      <main className="dashboard-main dashboard-main--bottom-nav">
        {/* Welcome Section */}
        <section className="admin-hero" id="overview">
          <div className="admin-hero__content">
            <p className="admin-hero__kicker">Welcome back</p>
            <h1 className="admin-hero__title">Admin Control Center</h1>
            <p className="admin-hero__subtitle">
              Manage learning resources, review requests, and monitor activity in one place.
            </p>
            <div className="admin-hero__actions">
              <button type="button" className="admin-hero__primary" onClick={() => handleResourceCardClick('overview')}>
                View Analytics
              </button>
              <button type="button" className="admin-hero__secondary" onClick={() => navigate('/admin-announcements')}>
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
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('resources')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-teal-50 text-teal-600 p-3 h-14 w-14"><BookOpen size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Total Resources</h3>
              <p className="stat-number">{totalResourcesCount}</p>
              <span className="stat-meta">{recentUploadsCount} added this week</span>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('users')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-green-50 text-green-600 p-3 h-14 w-14"><Users size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Active Students</h3>
              <p className="stat-number">{activeStudentsCount}</p>
              <span className="stat-meta">Active in last 48 hours</span>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('uploads')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 p-3 h-14 w-14"><Download size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Recent Uploads</h3>
              <p className="stat-number">{recentUploadsCount}</p>
              <span className="stat-meta">Last 7 days</span>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('requests')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-orange-50 text-orange-600 p-3 h-14 w-14"><Mail size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Pending Requests</h3>
              <p className="stat-number">{pendingRequestsCount}</p>
              <span className="stat-meta">Requires attention</span>
            </div>
          </div>
        </section>

        {/* Resource Management Section */}
        <section className="dashboard-section" id="resources">
          <h2 className="section-title heading-entrance heading-premium">Resource Management</h2>
          <div className="admin-action-grid">
            <div className="admin-action-card">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Add New Resource</h3>
              <form className="admin-form" onSubmit={handleAddResource}>
                <input
                  type="text"
                  placeholder="Resource Title"
                  className="admin-input"
                  value={resourceForm.title}
                  onChange={(event) => handleResourceFormChange('title', event.target.value)}
                />
                <select
                  className="admin-input"
                  value={resourceForm.department}
                  onChange={(event) => handleResourceFormChange('department', event.target.value)}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  className="admin-input"
                  value={resourceForm.type}
                  onChange={(event) => handleResourceFormChange('type', event.target.value)}
                >
                  <option value="">Resource Type</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="admin-submit-btn"
                  disabled={!resourceForm.title || !resourceForm.department || !resourceForm.type}
                >
                  Add Resource
                </button>
              </form>
            </div>
            <div className="admin-action-card">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => handleQuickAction('edit')}>Edit Existing Resources</button>
                <button className="action-btn" onClick={() => handleQuickAction('delete')}>Delete Resources</button>
                <button className="action-btn" onClick={() => handleQuickAction('assign')}>Assign to Departments</button>
                <button className="action-btn" onClick={() => handleQuickAction('bulk')} disabled={bulkActionLoading}>
                  {bulkActionLoading ? 'Uploading...' : 'Bulk Upload'}
                </button>
              </div>
            </div>
          </div>

          <div className="admin-action-card mt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="heading-entrance heading-entrance-card heading-premium">Resource List</h3>
                <p className="text-sm text-slate-500">Manage, edit, and assign resources in one view.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Search resources"
                  className="admin-input"
                  value={resourceSearch}
                  onChange={(event) => setResourceSearch(event.target.value)}
                />
                <select className="admin-input" value={resourceFilter} onChange={(event) => setResourceFilter(event.target.value)}>
                  <option value="All">All Types</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select className="admin-input" value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                  <option value="All">All Departments</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredResources.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-6 text-center text-slate-500">
                No resources match your filters yet. Add a resource to get started.
              </div>
            ) : (
              <div className="resource-table-wrapper mt-6">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedResourceIds.length === filteredResources.length}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedResourceIds(filteredResources.map((resource) => resource.id));
                            } else {
                              setSelectedResourceIds([]);
                            }
                          }}
                        />
                      </th>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Type</th>
                      <th>Engagement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => (
                      <tr key={resource.id} className={selectedResourceIds.includes(resource.id) ? 'bg-teal-50/40' : ''}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedResourceIds.includes(resource.id)}
                            onChange={() => toggleSelection(resource.id)}
                          />
                        </td>
                        <td className="resource-title">
                          {editingResourceId === resource.id ? (
                            <input
                              type="text"
                              className="admin-input"
                              value={editingDraft.title}
                              onChange={(event) => setEditingDraft((prev) => ({ ...prev, title: event.target.value }))}
                            />
                          ) : (
                            resource.title
                          )}
                        </td>
                        <td>
                          {editingResourceId === resource.id ? (
                            <select
                              className="admin-input"
                              value={editingDraft.department}
                              onChange={(event) => setEditingDraft((prev) => ({ ...prev, department: event.target.value }))}
                            >
                              {departmentOptions.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                              ))}
                            </select>
                          ) : (
                            <span>{resource.department}</span>
                          )}
                        </td>
                        <td>
                          {editingResourceId === resource.id ? (
                            <select
                              className="admin-input"
                              value={editingDraft.type}
                              onChange={(event) => setEditingDraft((prev) => ({ ...prev, type: event.target.value }))}
                            >
                              {typeOptions.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="resource-badge">{resource.type}</span>
                          )}
                        </td>
                        <td>
                          <span className="insight-badge">{resource.accessCount} views</span>
                        </td>
                        <td>
                          {editingResourceId === resource.id ? (
                            <div className="flex items-center gap-2">
                              <button className="action-link" onClick={() => handleSaveResource(resource.id)}>Save</button>
                              <button className="action-link action-link--reject" onClick={() => setEditingResourceId(null)}>Cancel</button>
                            </div>
                          ) : assigningResourceId === resource.id ? (
                            <div className="flex items-center gap-2">
                              <select className="admin-input" value={assignDraft} onChange={(event) => setAssignDraft(event.target.value)}>
                                <option value="">Select Department</option>
                                {departmentOptions.map((dept) => (
                                  <option key={dept} value={dept}>{dept}</option>
                                ))}
                              </select>
                              <button className="action-link" onClick={() => handleAssignResource(resource.id)}>Assign</button>
                              <button className="action-link action-link--reject" onClick={() => setAssigningResourceId(null)}>Cancel</button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <button className="action-link" onClick={() => handleEditResource(resource)}>Edit</button>
                              <button className="action-link" onClick={() => { setAssigningResourceId(resource.id); setAssignDraft(resource.department); }}>Assign</button>
                              <button className="action-link action-link--reject" onClick={() => handleDeleteResource(resource.id)}>Delete</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Student Activity Insights */}
        <section className="dashboard-section" id="students">
          <h2 className="section-title heading-entrance heading-premium">Student Activity Insights</h2>
          <div className="insight-grid">
            <div className="insight-panel">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Most Accessed Resources</h3>
              <div className="insight-list">
                {mostAccessed.map((item) => (
                  <div key={item.id} className="insight-item">
                    <div>
                      <p className="insight-title">{item.title}</p>
                      <p className="insight-meta">{item.department} · {item.type}</p>
                    </div>
                    <span className="insight-badge">{item.accessCount} views</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="insight-panel">
              <h3 className="heading-entrance heading-entrance-card heading-premium">Recent Downloads</h3>
              <div className="insight-list">
                {recentDownloads.map((item) => (
                  <div key={item.id} className="insight-item">
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
              {trendingSubjectsList.length === 0 ? (
                <span className="subject-tag">No trends yet</span>
              ) : (
                trendingSubjectsList.map((subject) => (
                  <span key={subject} className="subject-tag">{subject}</span>
                ))
              )}
            </div>
          </div>

          <div className="admin-action-card mt-6">
            <h3 className="heading-entrance heading-entrance-card heading-premium">Recent Activity Log</h3>
            {activityLog.length === 0 ? (
              <p className="text-sm text-slate-500 mt-3">No recent admin activity yet.</p>
            ) : (
              <div className="insight-list mt-4">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="insight-item">
                    <div>
                      <p className="insight-title">{activity.detail}</p>
                      <p className="insight-meta">{activity.type.toUpperCase()}</p>
                    </div>
                    <span className="insight-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Resource Requests Panel */}
        <section className="dashboard-section" id="requests">
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
                {resourceRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-slate-500 py-6">No requests pending right now.</td>
                  </tr>
                ) : resourceRequests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.student}</td>
                    <td className="request-text">{req.request}</td>
                    <td>{req.date}</td>
                    <td>
                      <span className={`status-badge ${req.status === 'Pending' ? 'status-pending' : req.status === 'Approved' ? 'status-approved' : 'status-rejected'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-link"
                        onClick={() => handleRequestStatus(req.id, 'Approved')}
                        disabled={req.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button
                        className="action-link action-link--reject"
                        onClick={() => handleRequestStatus(req.id, 'Rejected')}
                        disabled={req.status === 'Rejected'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        <button
          type="button"
          className={`nav-link ${activeNav === 'students' ? 'active' : ''}`}
          onClick={() => { setActiveNav('students'); navigate('/users-log'); }}
          aria-label="Student Activity"
        >
          <span className="nav-icon"><Users size={20} /></span>
          <span className="nav-title">Students</span>
        </button>
        <a href="#requests" className={`nav-link ${activeNav === 'requests' ? 'active' : ''}`} onClick={() => setActiveNav('requests')} aria-label="Requests">
          <span className="nav-icon"><Mail size={20} /></span>
          <span className="nav-title">Requests</span>
        </a>
        <button
          type="button"
          className={`nav-link ${activeNav === 'announcements' ? 'active' : ''}`}
          onClick={() => { setActiveNav('announcements'); navigate('/admin-announcements'); }}
          aria-label="Announcements"
        >
          <span className="nav-icon"><Megaphone size={20} /></span>
          <span className="nav-title">Announcements</span>
        </button>
        <button
          type="button"
          className={`nav-link ${activeNav === 'settings' ? 'active' : ''}`}
          onClick={() => { setActiveNav('settings'); navigate('/admin-settings'); }}
          aria-label="Settings"
        >
          <span className="nav-icon"><Settings size={20} /></span>
          <span className="nav-title">Settings</span>
        </button>
        <button onClick={handleLogout} className="nav-link nav-logout" aria-label="Logout">
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-title">Logout</span>
        </button>
      </nav>
    </div>
  );
};
