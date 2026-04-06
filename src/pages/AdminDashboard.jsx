import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Download, Mail, Megaphone, Settings, LogOut, LayoutDashboard, Upload, MessageSquare, BarChart3, ArrowRight, ChevronLeft, ChevronRight, Grid3X3, List, FileText, Eye, Edit2, Trash2, Search, UserPlus, TrendingUp, Clock, CheckCircle2, XCircle, Activity } from 'lucide-react';
import { Documents, PDFs, Videos } from '../data/resourcesCatalog.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translate } from '../translations/index.js';
import { getAdminResources, saveAdminResources, getStudentRequests, saveStudentRequests } from '../utils/resourceStore.js';

/**
 * ADMIN DASHBOARD
 * Clean resource management dashboard matching landing page theme
 * Focus on managing student learning resources effectively
 */

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
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
  const [activityLog, setActivityLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const RESOURCES_PER_PAGE = 8;

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

  const [resources, setResources] = useState(() => {
    const saved = getAdminResources();
    return saved.length > 0 ? saved : [
    { id: 1, title: 'Data Structures Notes', department: 'Computer Science', type: 'PDF', accessCount: 245, addedAt: '2026-02-10', assigned: true },
    { id: 2, title: 'Operating Systems Guide', department: 'Computer Science', type: 'PDF', accessCount: 189, addedAt: '2026-02-16', assigned: true },
    { id: 3, title: 'Computer Networks PDF', department: 'Electronics', type: 'PDF', accessCount: 167, addedAt: '2026-02-08', assigned: false },
    { id: 4, title: 'React Basics Tutorial', department: 'Computer Science', type: 'Video', accessCount: 208, addedAt: '2026-02-19', assigned: true },
    { id: 5, title: 'DBMS Full Course', department: 'Computer Science', type: 'Video', accessCount: 221, addedAt: '2026-02-22', assigned: true },
    { id: 6, title: 'Physics Lab Manual', department: 'Mathematics', type: 'Document', accessCount: 152, addedAt: '2026-02-04', assigned: false },
    { id: 7, title: 'Project Documentation Template', department: 'Civil', type: 'Document', accessCount: 98, addedAt: '2026-02-01', assigned: true },
    { id: 8, title: 'Web Development Best Practices', department: 'Computer Science', type: 'PDF', accessCount: 276, addedAt: '2026-02-18', assigned: true },
    { id: 9, title: 'Advanced Python Programming', department: 'Computer Science', type: 'Video', accessCount: 198, addedAt: '2026-02-17', assigned: true },
    { id: 10, title: 'Digital Logic Design', department: 'Electronics', type: 'PDF', accessCount: 143, addedAt: '2026-02-12', assigned: true },
    { id: 11, title: 'Signal Processing Fundamentals', department: 'Electronics', type: 'Video', accessCount: 165, addedAt: '2026-02-15', assigned: true },
    { id: 12, title: 'Calculus Complete Guide', department: 'Mathematics', type: 'Document', accessCount: 189, addedAt: '2026-02-11', assigned: true },
    { id: 13, title: 'Linear Algebra Textbook', department: 'Mathematics', type: 'PDF', accessCount: 201, addedAt: '2026-02-14', assigned: true },
    { id: 14, title: 'Thermodynamics Quick Pack', department: 'Mechanical', type: 'PDF', accessCount: 134, addedAt: '2026-02-17', assigned: true },
    { id: 15, title: 'Circuit Theory Videos', department: 'Electronics', type: 'Video', accessCount: 156, addedAt: '2026-02-13', assigned: true },
    { id: 16, title: 'Math Revision Sheets', department: 'Mathematics', type: 'Document', accessCount: 127, addedAt: '2026-02-09', assigned: true },
    { id: 17, title: 'Structural Analysis Notes', department: 'Civil', type: 'PDF', accessCount: 112, addedAt: '2026-02-06', assigned: true },
    { id: 18, title: 'Machine Learning Basics', department: 'Computer Science', type: 'Video', accessCount: 234, addedAt: '2026-02-21', assigned: true },
    { id: 19, title: 'Cloud Computing Architecture', department: 'Computer Science', type: 'PDF', accessCount: 167, addedAt: '2026-02-17', assigned: false },
    { id: 20, title: 'Environmental Impact Assessment', department: 'Civil', type: 'Document', accessCount: 98, addedAt: '2026-02-05', assigned: true },
    { id: 21, title: 'Artificial Intelligence Primer', department: 'Computer Science', type: 'PDF', accessCount: 312, addedAt: '2026-02-23', assigned: true },
    { id: 22, title: 'Embedded Systems Programming', department: 'Electronics', type: 'Video', accessCount: 178, addedAt: '2026-02-20', assigned: true },
    { id: 23, title: 'Discrete Mathematics Handbook', department: 'Mathematics', type: 'PDF', accessCount: 156, addedAt: '2026-02-19', assigned: true },
    { id: 24, title: 'Fluid Mechanics Lab Manual', department: 'Mechanical', type: 'Document', accessCount: 142, addedAt: '2026-02-18', assigned: true },
    { id: 25, title: 'Network Security Fundamentals', department: 'Computer Science', type: 'PDF', accessCount: 195, addedAt: '2026-02-24', assigned: true },
    { id: 26, title: 'Control Systems Engineering', department: 'Electronics', type: 'PDF', accessCount: 163, addedAt: '2026-02-14', assigned: true },
    { id: 27, title: 'Concrete Technology Notes', department: 'Civil', type: 'PDF', accessCount: 89, addedAt: '2026-02-07', assigned: true },
    { id: 28, title: 'Deep Learning with PyTorch', department: 'Computer Science', type: 'Video', accessCount: 287, addedAt: '2026-02-25', assigned: true },
    { id: 29, title: 'Probability & Statistics', department: 'Mathematics', type: 'PDF', accessCount: 174, addedAt: '2026-02-16', assigned: true },
    { id: 30, title: 'AutoCAD Design Guide', department: 'Mechanical', type: 'Document', accessCount: 118, addedAt: '2026-02-13', assigned: true },
    { id: 31, title: 'Compiler Design Notes', department: 'Computer Science', type: 'PDF', accessCount: 145, addedAt: '2026-02-22', assigned: true },
    { id: 32, title: 'Power Electronics Lab', department: 'Electronics', type: 'Document', accessCount: 131, addedAt: '2026-02-15', assigned: true },
    { id: 33, title: 'Surveying & Geomatics', department: 'Civil', type: 'PDF', accessCount: 76, addedAt: '2026-02-03', assigned: false },
    { id: 34, title: 'DevOps & CI/CD Pipeline', department: 'Computer Science', type: 'Video', accessCount: 253, addedAt: '2026-02-26', assigned: true },
    { id: 35, title: 'Vibration Analysis Pack', department: 'Mechanical', type: 'PDF', accessCount: 107, addedAt: '2026-02-11', assigned: true },
  ];
  });

  // Sync resources to localStorage whenever they change
  useEffect(() => {
    saveAdminResources(resources);
  }, [resources]);

  const [recentDownloads, setRecentDownloads] = useState([
    { id: 1, student: 'Priya Sharma', resource: 'Circuit Theory Notes', time: '5 min ago' },
    { id: 2, student: 'Rahul Kumar', resource: 'Java Programming Guide', time: '12 min ago' },
    { id: 3, student: 'Ananya Singh', resource: 'Calculus Textbook', time: '28 min ago' },
    { id: 4, student: 'Vikram Patel', resource: 'Data Structures Notes', time: '45 min ago' },
    { id: 5, student: 'Neha Reddy', resource: 'Web Development Best Practices', time: '1 hour ago' },
    { id: 6, student: 'Arjun Verma', resource: 'Machine Learning Basics', time: '2 hours ago' },
    { id: 7, student: 'Isha Gupta', resource: 'Operating Systems Guide', time: '3 hours ago' },
    { id: 8, student: 'Rohan Desai', resource: 'Linear Algebra Textbook', time: '4 hours ago' },
    { id: 9, student: 'Divya Nair', resource: 'Digital Logic Design', time: '5 hours ago' },
    { id: 10, student: 'Karan Singh', resource: 'Thermodynamics Quick Pack', time: '6 hours ago' },
    { id: 11, student: 'Pooja Chandra', resource: 'Advanced Python Programming', time: '7 hours ago' },
    { id: 12, student: 'Sameer Khan', resource: 'Structural Analysis Notes', time: '8 hours ago' },
    { id: 13, student: 'Tanvi Mehta', resource: 'Artificial Intelligence Primer', time: 'Yesterday, 9:30 AM' },
    { id: 14, student: 'Aditya Joshi', resource: 'Deep Learning with PyTorch', time: 'Yesterday, 11:45 AM' },
    { id: 15, student: 'Shruti Iyer', resource: 'Compiler Design Notes', time: 'Yesterday, 2:20 PM' },
    { id: 16, student: 'Manish Tiwari', resource: 'Network Security Fundamentals', time: 'Yesterday, 4:50 PM' },
    { id: 17, student: 'Kavita Rao', resource: 'Discrete Mathematics Handbook', time: '2 days ago' },
    { id: 18, student: 'Deepak Sinha', resource: 'Control Systems Engineering', time: '2 days ago' },
  ]);

  const defaultRequests = [
    { id: 1, student: 'Amit Patel', request: 'Advanced Database Systems book', date: '24 Feb 2026', status: 'Pending' },
    { id: 2, student: 'Sneha Reddy', request: 'Machine Learning lecture videos', date: '23 Feb 2026', status: 'Pending' },
    { id: 3, student: 'Nikhil Rao', request: 'Signal Processing sample papers', date: '21 Feb 2026', status: 'Approved' },
    { id: 4, student: 'Vishal Kumar', request: 'Network Security Case Studies', date: '24 Feb 2026', status: 'Pending' },
    { id: 5, student: 'Anjali Gupta', request: 'Artificial Intelligence Research Papers', date: '22 Feb 2026', status: 'Approved' },
    { id: 6, student: 'Sanjay Nair', request: 'Control Systems Simulation Software', date: '23 Feb 2026', status: 'Pending' },
    { id: 7, student: 'Maya Singh', request: 'Embedded Systems Design Guide', date: '20 Feb 2026', status: 'Approved' },
    { id: 8, student: 'Harsh Verma', request: 'Cloud Computing Certification Materials', date: '19 Feb 2026', status: 'Approved' },
    { id: 9, student: 'Priya Kapoor', request: 'Data Visualization Tutorials', date: '24 Feb 2026', status: 'Pending' },
    { id: 10, student: 'Ravi Shankar', request: 'IoT Development Framework Documentation', date: '22 Feb 2026', status: 'Rejected' },
  ];

  const buildResourceRequests = () => {
    const savedRequests = getStudentRequests();
    const studentMapped = savedRequests.map((r) => ({
      id: r.id,
      student: r.student || 'Student',
      request: r.title + (r.description ? ` — ${r.description}` : ''),
      date: r.submittedDate || 'Recently',
      status: r.status || 'Pending',
      _fromStudent: true,
    }));
    const defaultIds = new Set(defaultRequests.map((r) => r.id));
    const uniqueStudentRequests = studentMapped.filter((r) => !defaultIds.has(r.id));
    return [...uniqueStudentRequests, ...defaultRequests];
  };

  // Merge student-submitted requests from localStorage with defaults
  const [resourceRequests, setResourceRequests] = useState(buildResourceRequests);

  useEffect(() => {
    const syncRequests = () => setResourceRequests(buildResourceRequests());

    // Keep admin requests list current when localStorage changes in other tabs
    const handleStorage = (event) => {
      if (event.key === 'eduLibrary-studentRequests') {
        syncRequests();
      }
    };

    // Refresh when admin tab regains focus
    const handleFocus = () => syncRequests();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);


  useEffect(() => {
    setActivityLog([
      { id: 1, type: 'upload', detail: 'Uploaded "Deep Learning with PyTorch" to Computer Science', time: 'Today, 10:15 AM' },
      { id: 2, type: 'upload', detail: 'Added "DevOps & CI/CD Pipeline" video to Computer Science', time: 'Today, 9:40 AM' },
      { id: 3, type: 'request', detail: 'Approved request for AI Research Papers by Anjali Gupta', time: 'Today, 8:55 AM' },
      { id: 4, type: 'announcement', detail: 'Published end-semester resource availability announcement', time: 'Yesterday, 4:20 PM' },
      { id: 5, type: 'request', detail: 'Approved request for Signal Processing sample papers', time: 'Yesterday, 3:10 PM' },
      { id: 6, type: 'upload', detail: 'Added "Network Security Fundamentals" PDF to Computer Science', time: 'Yesterday, 11:05 AM' },
      { id: 7, type: 'request', detail: 'Rejected request for IoT Development Framework Documentation', time: '2 days ago, 4:30 PM' },
      { id: 8, type: 'upload', detail: 'Uploaded "Embedded Systems Programming" video to Electronics', time: '2 days ago, 2:15 PM' },
      { id: 9, type: 'delete', detail: 'Removed deprecated "Old Java Basics Tutorial" resource', time: '3 days ago, 3:45 PM' },
      { id: 10, type: 'announcement', detail: 'Updated library hours for mid-term exam period', time: '3 days ago, 10:20 AM' },
      { id: 11, type: 'upload', detail: 'Added "Probability & Statistics" PDF to Mathematics', time: '4 days ago, 1:30 PM' },
      { id: 12, type: 'request', detail: 'Approved Cloud Computing Certification Materials for Harsh Verma', time: '5 days ago, 9:15 AM' },
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

  // Pagination logic
  const totalPages = Math.ceil(filteredResources.length / RESOURCES_PER_PAGE);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * RESOURCES_PER_PAGE,
    currentPage * RESOURCES_PER_PAGE
  );
  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [resourceSearch, resourceFilter, departmentFilter]);

  // Resource type counts for summary
  const pdfCount = resources.filter(r => r.type === 'PDF').length;
  const videoCount = resources.filter(r => r.type === 'Video').length;
  const docCount = resources.filter(r => r.type === 'Document').length;

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
    // Also sync status back to student requests in localStorage
    const savedRequests = getStudentRequests();
    const updatedSaved = savedRequests.map((r) =>
      r.id === requestId ? { ...r, status } : r
    );
    saveStudentRequests(updatedSaved);
    addActivity('request', `${status} request from ${resourceRequests.find((req) => req.id === requestId)?.student || 'student'}`);  };




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
            <p className="admin-hero__kicker">{translate('welcomeBack', language)}</p>
            <h1 className="admin-hero__title">{translate('adminControlCenter', language)}</h1>
            <p className="admin-hero__subtitle">
              {translate('manageResourcesSubtitle', language)}
            </p>
            <div className="admin-hero__actions">
              <button type="button" className="admin-hero__primary" onClick={() => handleResourceCardClick('overview')}>
                View Analytics
              </button>
              <button type="button" className="admin-hero__secondary" onClick={() => navigate('/admin-announcements')}>
                {translate('postAnnouncement', language)}
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
              <h3 className="heading-entrance heading-entrance-card heading-premium">{translate('totalResources', language)}</h3>
              <p className="stat-number">{totalResourcesCount}</p>
              <span className="stat-meta">{recentUploadsCount} {translate('addedThisWeek', language)}</span>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('users')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-green-50 text-green-600 p-3 h-14 w-14"><Users size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">{translate('activeStudents', language)}</h3>
              <p className="stat-number">{activeStudentsCount}</p>
              <span className="stat-meta">{translate('activeInLast48Hours', language)}</span>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('uploads')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 p-3 h-14 w-14"><Download size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">{translate('recentUploads', language)}</h3>
              <p className="stat-number">{recentUploadsCount}</p>
              <span className="stat-meta">{translate('last7Days', language)}</span>
            </div>
          </div>
          <div className="admin-stat-card" onClick={() => handleResourceCardClick('requests')}>
            <div className="stat-icon flex items-center justify-center rounded-xl bg-orange-50 text-orange-600 p-3 h-14 w-14"><Mail size={36} /></div>
            <div className="stat-content">
              <h3 className="heading-entrance heading-entrance-card heading-premium">{translate('pendingRequests', language)}</h3>
              <p className="stat-number">{pendingRequestsCount}</p>
              <span className="stat-meta">{translate('requiresAttention', language)}</span>
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
            <div className="admin-action-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 className="heading-entrance heading-entrance-card heading-premium">Quick Navigation</h3>
              <button className="action-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/users-log')}>
                <Users size={16} style={{ color: 'var(--primary-teal)' }} />
                <span style={{ flex: 1, textAlign: 'left' }}>User Signups Log</span>
                <ArrowRight size={14} style={{ color: '#94a3b8' }} />
              </button>
              <button className="action-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/recent-uploads')}>
                <Upload size={16} style={{ color: 'var(--primary-teal)' }} />
                <span style={{ flex: 1, textAlign: 'left' }}>Recent Uploads</span>
                <ArrowRight size={14} style={{ color: '#94a3b8' }} />
              </button>
              <button className="action-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/requests-log')}>
                <MessageSquare size={16} style={{ color: 'var(--primary-teal)' }} />
                <span style={{ flex: 1, textAlign: 'left' }}>Requests Log</span>
                <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>{pendingRequestsCount} pending</span>
                <ArrowRight size={14} style={{ color: '#94a3b8' }} />
              </button>
              <button className="action-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/admin-announcements')}>
                <Megaphone size={16} style={{ color: 'var(--primary-teal)' }} />
                <span style={{ flex: 1, textAlign: 'left' }}>Announcements</span>
                <ArrowRight size={14} style={{ color: '#94a3b8' }} />
              </button>
              <button className="action-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/resources-analytics')}>
                <BarChart3 size={16} style={{ color: 'var(--primary-teal)' }} />
                <span style={{ flex: 1, textAlign: 'left' }}>Analytics Dashboard</span>
                <ArrowRight size={14} style={{ color: '#94a3b8' }} />
              </button>
            </div>
          </div>

          {/* Resource List - Premium Redesign */}
          <div className="rl-premium-container mt-6">
            {/* Header with view toggle */}
            <div className="rl-premium-header">
              <div className="rl-premium-header__info">
                <h3 className="rl-premium-header__title"><BookOpen size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />Resource Library</h3>
                <p className="rl-premium-header__subtitle">
                  {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
                  {resourceSearch || resourceFilter !== 'All' || departmentFilter !== 'All' ? ' (filtered)' : ''}
                </p>
              </div>
              <div className="rl-premium-header__actions">
                <button
                  className={`rl-view-btn ${viewMode === 'table' ? 'rl-view-btn--active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Table view"
                >
                  <List size={16} />
                </button>
                <button
                  className={`rl-view-btn ${viewMode === 'grid' ? 'rl-view-btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
              </div>
            </div>

            {/* Mini summary stats */}
            <div className="rl-summary-row">
              <div className="rl-summary-pill">
                <BookOpen size={14} />
                <span>{resources.length} Total</span>
              </div>
              <div className="rl-summary-pill rl-summary-pill--pdf">
                <FileText size={14} />
                <span>{pdfCount} PDFs</span>
              </div>
              <div className="rl-summary-pill rl-summary-pill--video">
                <Eye size={14} />
                <span>{videoCount} Videos</span>
              </div>
              <div className="rl-summary-pill rl-summary-pill--doc">
                <FileText size={14} />
                <span>{docCount} Docs</span>
              </div>
            </div>

            {/* Filters bar */}
            <div className="rl-filters-bar">
              <div className="rl-search-box">
                <Search size={16} className="rl-search-box__icon" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="rl-search-box__input"
                  value={resourceSearch}
                  onChange={(event) => setResourceSearch(event.target.value)}
                />
              </div>
              <select className="rl-filter-select" value={resourceFilter} onChange={(event) => setResourceFilter(event.target.value)}>
                <option value="All">All Types</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select className="rl-filter-select" value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                <option value="All">All Departments</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {filteredResources.length === 0 ? (
              <div className="rl-empty-state">
                <BookOpen size={40} strokeWidth={1.2} />
                <p>No resources match your filters.</p>
                <span>Try adjusting your search or filter criteria.</span>
              </div>
            ) : viewMode === 'table' ? (
              /* TABLE VIEW */
              <div className="rl-table-wrap">
                <table className="rl-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>
                        <input
                          type="checkbox"
                          checked={selectedResourceIds.length === filteredResources.length && filteredResources.length > 0}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedResourceIds(filteredResources.map((r) => r.id));
                            } else {
                              setSelectedResourceIds([]);
                            }
                          }}
                        />
                      </th>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Type</th>
                      <th>Views</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedResources.map((resource, idx) => (
                      <tr
                        key={resource.id}
                        className={`rl-table-row ${selectedResourceIds.includes(resource.id) ? 'rl-table-row--selected' : ''}`}
                        style={{ animationDelay: `${idx * 0.04}s` }}
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedResourceIds.includes(resource.id)}
                            onChange={() => toggleSelection(resource.id)}
                          />
                        </td>
                        <td className="rl-cell-title">
                          {editingResourceId === resource.id ? (
                            <input type="text" className="rl-inline-input" value={editingDraft.title}
                              onChange={(e) => setEditingDraft((prev) => ({ ...prev, title: e.target.value }))} />
                          ) : (
                            <span className="rl-resource-name">{resource.title}</span>
                          )}
                        </td>
                        <td>
                          {editingResourceId === resource.id ? (
                            <select className="rl-inline-input" value={editingDraft.department}
                              onChange={(e) => setEditingDraft((prev) => ({ ...prev, department: e.target.value }))}>
                              {departmentOptions.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                          ) : (
                            <span className="rl-dept-tag">{resource.department}</span>
                          )}
                        </td>
                        <td>
                          {editingResourceId === resource.id ? (
                            <select className="rl-inline-input" value={editingDraft.type}
                              onChange={(e) => setEditingDraft((prev) => ({ ...prev, type: e.target.value }))}>
                              {typeOptions.map((type) => <option key={type} value={type}>{type}</option>)}
                            </select>
                          ) : (
                            <span className={`rl-type-badge rl-type-badge--${resource.type.toLowerCase()}`}>{resource.type}</span>
                          )}
                        </td>
                        <td>
                          <span className="rl-views-badge">{resource.accessCount}</span>
                        </td>
                        <td>
                          {editingResourceId === resource.id ? (
                            <div className="rl-action-group">
                              <button className="rl-action-btn rl-action-btn--save" onClick={() => handleSaveResource(resource.id)}>Save</button>
                              <button className="rl-action-btn rl-action-btn--cancel" onClick={() => setEditingResourceId(null)}>Cancel</button>
                            </div>
                          ) : assigningResourceId === resource.id ? (
                            <div className="rl-action-group">
                              <select className="rl-inline-input" value={assignDraft} onChange={(e) => setAssignDraft(e.target.value)}>
                                <option value="">Select Dept</option>
                                {departmentOptions.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                              </select>
                              <button className="rl-action-btn rl-action-btn--save" onClick={() => handleAssignResource(resource.id)}>Assign</button>
                              <button className="rl-action-btn rl-action-btn--cancel" onClick={() => setAssigningResourceId(null)}>Cancel</button>
                            </div>
                          ) : (
                            <div className="rl-action-group">
                              <button className="rl-icon-btn rl-icon-btn--edit" title="Edit" onClick={() => handleEditResource(resource)}>
                                <Edit2 size={14} />
                              </button>
                              <button className="rl-icon-btn rl-icon-btn--assign" title="Assign" onClick={() => { setAssigningResourceId(resource.id); setAssignDraft(resource.department); }}>
                                <UserPlus size={14} />
                              </button>
                              <button className="rl-icon-btn rl-icon-btn--delete" title="Delete" onClick={() => handleDeleteResource(resource.id)}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* GRID / CARD VIEW */
              <div className="rl-card-grid">
                {paginatedResources.map((resource, idx) => (
                  <div
                    key={resource.id}
                    className={`rl-resource-card ${selectedResourceIds.includes(resource.id) ? 'rl-resource-card--selected' : ''}`}
                    style={{ animationDelay: `${idx * 0.06}s` }}
                  >
                    <div className="rl-resource-card__header">
                      <span className={`rl-type-badge rl-type-badge--${resource.type.toLowerCase()}`}>{resource.type}</span>
                      <input
                        type="checkbox"
                        checked={selectedResourceIds.includes(resource.id)}
                        onChange={() => toggleSelection(resource.id)}
                      />
                    </div>
                    <h4 className="rl-resource-card__title">{resource.title}</h4>
                    <p className="rl-resource-card__dept">{resource.department}</p>
                    <div className="rl-resource-card__stats">
                      <span className="rl-views-badge"><Eye size={13} /> {resource.accessCount} views</span>
                    </div>
                    <div className="rl-resource-card__actions">
                      <button className="rl-icon-btn rl-icon-btn--edit" title="Edit" onClick={() => handleEditResource(resource)}>
                        <Edit2 size={14} />
                      </button>
                      <button className="rl-icon-btn rl-icon-btn--assign" title="Assign" onClick={() => { setAssigningResourceId(resource.id); setAssignDraft(resource.department); }}>
                        <UserPlus size={14} />
                      </button>
                      <button className="rl-icon-btn rl-icon-btn--delete" title="Delete" onClick={() => handleDeleteResource(resource.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="rl-pagination">
                <button
                  className="rl-pagination__btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <div className="rl-pagination__pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`rl-pagination__page ${currentPage === page ? 'rl-pagination__page--active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="rl-pagination__btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Student Activity Insights - Premium */}
        <section className="dashboard-section" id="students">
          <div className="adm-section-banner">
            <div className="adm-section-banner__text">
              <h2 className="adm-section-banner__title">Student Activity Insights</h2>
              <p className="adm-section-banner__sub">Track student engagement, downloads, and trending content.</p>
            </div>
            <div className="adm-section-banner__icon"><TrendingUp size={28} /></div>
          </div>

          <div className="adm-insight-grid">
            {/* Most Accessed */}
            <div className="adm-insight-card">
              <div className="adm-insight-card__header">
                <Eye size={18} className="adm-insight-card__icon adm-insight-card__icon--teal" />
                <h3 className="adm-insight-card__title">Most Accessed Resources</h3>
              </div>
              <div className="adm-insight-card__list">
                {mostAccessed.map((item, idx) => (
                  <div key={item.id} className="adm-insight-row" style={{ animationDelay: `${idx * 0.07}s` }}>
                    <div className="adm-insight-row__rank">{idx + 1}</div>
                    <div className="adm-insight-row__info">
                      <p className="adm-insight-row__name">{item.title}</p>
                      <p className="adm-insight-row__meta">{item.department} · {item.type}</p>
                    </div>
                    <span className="adm-insight-row__badge adm-insight-row__badge--views">{item.accessCount} views</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Downloads */}
            <div className="adm-insight-card">
              <div className="adm-insight-card__header">
                <Download size={18} className="adm-insight-card__icon adm-insight-card__icon--blue" />
                <h3 className="adm-insight-card__title">Recent Downloads</h3>
              </div>
              <div className="adm-insight-card__list adm-insight-card__list--scroll">
                {recentDownloads.slice(0, 8).map((item, idx) => (
                  <div key={item.id} className="adm-insight-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="adm-insight-row__avatar">{item.student.charAt(0)}</div>
                    <div className="adm-insight-row__info">
                      <p className="adm-insight-row__name">{item.student}</p>
                      <p className="adm-insight-row__meta">{item.resource}</p>
                    </div>
                    <span className="adm-insight-row__time"><Clock size={12} /> {item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Subjects */}
          <div className="adm-trending-card">
            <div className="adm-trending-card__header">
              <TrendingUp size={18} className="adm-insight-card__icon adm-insight-card__icon--purple" />
              <h3 className="adm-insight-card__title">Trending Subjects This Week</h3>
            </div>
            <div className="adm-trending-tags">
              {trendingSubjectsList.length === 0 ? (
                <span className="adm-trending-tag">No trends yet</span>
              ) : (
                trendingSubjectsList.map((subject, idx) => (
                  <span key={subject} className="adm-trending-tag" style={{ animationDelay: `${idx * 0.08}s` }}>
                    <TrendingUp size={13} /> {subject}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="adm-activity-card">
            <div className="adm-activity-card__header">
              <Activity size={18} className="adm-insight-card__icon adm-insight-card__icon--amber" />
              <h3 className="adm-insight-card__title">Recent Activity Log</h3>
            </div>
            {activityLog.length === 0 ? (
              <p className="adm-activity-card__empty">No recent admin activity yet.</p>
            ) : (
              <div className="adm-activity-feed">
                {activityLog.map((activity, idx) => (
                  <div key={activity.id} className="adm-activity-item" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className={`adm-activity-item__dot adm-activity-item__dot--${activity.type}`} />
                    <div className="adm-activity-item__content">
                      <p className="adm-activity-item__text">{activity.detail}</p>
                      <span className="adm-activity-item__type">{activity.type.toUpperCase()}</span>
                    </div>
                    <span className="adm-activity-item__time"><Clock size={12} /> {activity.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Resource Requests Panel - Premium */}
        <section className="dashboard-section" id="requests">
          <div className="adm-section-banner adm-section-banner--warm">
            <div className="adm-section-banner__text">
              <h2 className="adm-section-banner__title">Resource Requests from Students</h2>
              <p className="adm-section-banner__sub">{resourceRequests.filter(r => r.status === 'Pending').length} pending · {resourceRequests.filter(r => r.status === 'Approved').length} approved · {resourceRequests.filter(r => r.status === 'Rejected').length} rejected</p>
            </div>
            <div className="adm-section-banner__icon"><MessageSquare size={28} /></div>
          </div>

          <div className="adm-requests-container">
            <div className="adm-requests-table-wrap">
              <table className="adm-requests-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Request</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resourceRequests.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="adm-requests-table__empty">No requests pending right now.</td>
                    </tr>
                  ) : resourceRequests.map((req, idx) => (
                    <tr key={req.id} className="adm-requests-row" style={{ animationDelay: `${idx * 0.04}s` }}>
                      <td>
                        <div className="adm-requests-student">
                          <div className="adm-requests-student__avatar">{req.student.charAt(0)}</div>
                          <span className="adm-requests-student__name">{req.student}</span>
                        </div>
                      </td>
                      <td className="adm-requests-text">{req.request}</td>
                      <td className="adm-requests-date">{req.date}</td>
                      <td>
                        <span className={`adm-status-chip adm-status-chip--${req.status.toLowerCase()}`}>
                          {req.status === 'Pending' && <Clock size={12} />}
                          {req.status === 'Approved' && <CheckCircle2 size={12} />}
                          {req.status === 'Rejected' && <XCircle size={12} />}
                          {req.status}
                        </span>
                      </td>
                      <td>
                        <div className="adm-requests-actions">
                          <button
                            className="adm-req-btn adm-req-btn--approve"
                            onClick={() => handleRequestStatus(req.id, 'Approved')}
                            disabled={req.status === 'Approved'}
                          >
                            <CheckCircle2 size={13} /> Approve
                          </button>
                          <button
                            className="adm-req-btn adm-req-btn--reject"
                            onClick={() => handleRequestStatus(req.id, 'Rejected')}
                            disabled={req.status === 'Rejected'}
                          >
                            <XCircle size={13} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      {/* Bottom Navigation Menu */}
      <nav className="bottom-nav-menu bottom-nav-menu--admin" role="navigation" aria-label="Admin navigation">
        <a href="#overview" className={`nav-link ${activeNav === 'overview' ? 'active' : ''}`} onClick={() => setActiveNav('overview')} aria-label="Overview">
          <span className="nav-icon"><LayoutDashboard size={20} /></span>
          <span className="nav-title">{translate('overview', language)}</span>
        </a>
        <a href="#resources" className={`nav-link ${activeNav === 'resources' ? 'active' : ''}`} onClick={() => setActiveNav('resources')} aria-label="Resource Management">
          <span className="nav-icon"><BookOpen size={20} /></span>
          <span className="nav-title">{translate('resources', language)}</span>
        </a>
        <button
          type="button"
          className={`nav-link ${activeNav === 'students' ? 'active' : ''}`}
          onClick={() => { setActiveNav('students'); navigate('/users-log'); }}
          aria-label="Student Activity"
        >
          <span className="nav-icon"><Users size={20} /></span>
          <span className="nav-title">{translate('students', language)}</span>
        </button>
        <a href="#requests" className={`nav-link ${activeNav === 'requests' ? 'active' : ''}`} onClick={() => setActiveNav('requests')} aria-label="Requests">
          <span className="nav-icon"><Mail size={20} /></span>
          <span className="nav-title">{translate('requests', language)}</span>
        </a>
        <button
          type="button"
          className={`nav-link ${activeNav === 'announcements' ? 'active' : ''}`}
          onClick={() => { setActiveNav('announcements'); navigate('/admin-announcements'); }}
          aria-label="Announcements"
        >
          <span className="nav-icon"><Megaphone size={20} /></span>
          <span className="nav-title">{translate('announcements', language)}</span>
        </button>
        <button
          type="button"
          className={`nav-link ${activeNav === 'settings' ? 'active' : ''}`}
          onClick={() => { setActiveNav('settings'); navigate('/admin-settings'); }}
          aria-label="Settings"
        >
          <span className="nav-icon"><Settings size={20} /></span>
          <span className="nav-title">{translate('settings', language)}</span>
        </button>
        <button onClick={handleLogout} className="nav-link nav-logout" aria-label="Logout">
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-title">{translate('logout', language)}</span>
        </button>
      </nav>
    </div>
  );
};
