import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Download, Mail } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const ResourcesAnalytics = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const location = useLocation();
  const activeSection = section || 'overview';
  
  // Get real data from AdminDashboard if available
  const { resources = getDefaultResources(), resourceRequests = getDefaultRequests(), recentDownloads = getDefaultDownloads() } = location.state || {};
  
  // Default/dummy data functions
  function getDefaultResources() {
    return [
      { id: 1, title: 'Data Structures Notes', department: 'Computer Science', type: 'PDF', addedAt: '2026-02-20' },
      { id: 2, title: 'Operating Systems Guide', department: 'Computer Science', type: 'PDF', addedAt: '2026-02-19' },
      { id: 3, title: 'Computer Networks PDF', department: 'Electronics', type: 'PDF', addedAt: '2026-02-18' },
      { id: 4, title: 'React Basics Tutorial', department: 'Computer Science', type: 'Video', addedAt: '2026-02-25' },
      { id: 5, title: 'DBMS Full Course', department: 'Computer Science', type: 'Video', addedAt: '2026-02-22' },
      { id: 6, title: 'Physics Lab Manual', department: 'Mathematics', type: 'Document', addedAt: '2026-02-15' },
      { id: 7, title: 'Project Documentation Template', department: 'Civil', type: 'Document', addedAt: '2026-02-10' },
      { id: 8, title: 'Circuit Theory Notes', department: 'Electronics', type: 'PDF', addedAt: '2026-02-21' },
      { id: 9, title: 'Advanced Calculus', department: 'Mathematics', type: 'Document', addedAt: '2026-02-24' },
      { id: 10, title: 'Web Development Masterclass', department: 'Computer Science', type: 'Video', addedAt: '2026-02-23' },
    ];
  }
  
  function getDefaultRequests() {
    return [
      { id: 1, student: 'Amit Patel', request: 'Advanced Database Systems book', status: 'Pending' },
      { id: 2, student: 'Sneha Reddy', request: 'Machine Learning lecture videos', status: 'Pending' },
      { id: 3, student: 'Nikhil Rao', request: 'Signal Processing sample papers', status: 'Approved' },
      { id: 4, student: 'Priya Sharma', request: 'Data Structures Tutorial', status: 'Approved' },
      { id: 5, student: 'Rahul Kumar', request: 'Java Programming Guide', status: 'Approved' },
      { id: 6, student: 'Ananya Singh', request: 'Calculus Textbook', status: 'Rejected' },
    ];
  }
  
  function getDefaultDownloads() {
    return [
      { id: 1, student: 'Priya Sharma', resource: 'Circuit Theory Notes' },
      { id: 2, student: 'Rahul Kumar', resource: 'Java Programming Guide' },
      { id: 3, student: 'Ananya Singh', resource: 'Calculus Textbook' },
      { id: 4, student: 'Amit Patel', resource: 'Data Structures Notes' },
      { id: 5, student: 'Sneha Reddy', resource: 'DBMS Full Course' },
      { id: 6, student: 'Nikhil Rao', resource: 'React Basics Tutorial' },
    ];
  }
  
  // Debug: Log received data
  React.useEffect(() => {
    console.log('ResourcesAnalytics received data:', {
      resourcesCount: resources.length,
      requestsCount: resourceRequests.length,
      downloadsCount: recentDownloads.length,
      resources: resources.map(r => ({ id: r.id, type: r.type })),
      requests: resourceRequests.map(r => ({ id: r.id, status: r.status })),
    });
  }, [resources, resourceRequests, recentDownloads]);
  
  const sectionHeading = {
    overview: 'Complete Analytics Dashboard',
    resources: 'Resources Analytics',
    users: 'User Analytics',
    requests: 'Requests Analytics',
    uploads: 'Uploads Analytics',
  };
  const sectionSubheading = {
    overview: 'View all analytics across resources, users, requests, and uploads.',
    resources: 'Interactive insights for resource distribution and engagement.',
    users: 'Demographic trends for active student users.',
    requests: 'Request status trends and approval flow insights.',
    uploads: 'Recent upload volume and activity trends.',
  };
  const [selectedType, setSelectedType] = useState('PDF');
  const [activeResourceSlice, setActiveResourceSlice] = useState(0);
  const [activeGenderSlice, setActiveGenderSlice] = useState(0);

  const resourceColors = ['#0f766e', '#2563eb', '#f97316'];

  // Calculate resource stats from real data
  const resourceStats = useMemo(() => {
    if (resources && resources.length > 0) {
      const stats = {};
      resources.forEach((resource) => {
        stats[resource.type] = (stats[resource.type] || 0) + 1;
      });
      return [
        { name: 'PDF', count: stats.PDF || 0 },
        { name: 'Document', count: stats.Document || 0 },
        { name: 'Video', count: stats.Video || 0 },
      ];
    }
    // Fallback to dummy data
    return [
      { name: 'PDF', count: 648 },
      { name: 'Document', count: 428 },
      { name: 'Video', count: 234 },
    ];
  }, [resources]);

  // Generate dummy resources for display
  const dummyResources = useMemo(() => {
    if (resources && resources.length > 0) {
      const byType = { PDF: [], Document: [], Video: [] };
      resources.forEach((resource) => {
        if (byType[resource.type]) {
          byType[resource.type].push({ id: resource.id, title: resource.title });
        }
      });
      // Pad with empty if needed
      return {
        PDF: byType.PDF.slice(0, 8),
        Document: byType.Document.slice(0, 8),
        Video: byType.Video.slice(0, 8),
      };
    }
    return {
      PDF: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `PDF Resource ${i + 1}`,
      })),
      Document: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Document Resource ${i + 1}`,
      })),
      Video: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Video Resource ${i + 1}`,
      })),
    };
  }, [resources]);

  // Calculate stats from real data (moved before its dependents)
  const totalUsers = useMemo(() => {
    if (recentDownloads.length > 0 || resourceRequests.length > 0) {
      const uniqueUsers = new Set([
        ...recentDownloads.map((item) => item.student),
        ...resourceRequests.map((item) => item.student),
      ]);
      return uniqueUsers.size;
    }
    // Fallback default value for demo
    return 100;
  }, [resourceRequests, recentDownloads]);

  // User demographics stats - generate based on actual user count
  const userGenderStats = useMemo(() => {
    if (totalUsers > 0) {
      // Generate realistic gender distribution for actual users
      const femaleCount = Math.ceil(totalUsers * 0.6); // 60% female
      const maleCount = Math.floor(totalUsers * 0.35); // 35% male
      const otherCount = totalUsers - femaleCount - maleCount; // remainder as other
      
      return [
        { name: 'Female', value: Math.max(0, femaleCount) },
        { name: 'Male', value: Math.max(0, maleCount) },
        { name: 'Other', value: Math.max(0, otherCount) },
      ];
    }
    // Fallback for when totalUsers is 0
    return [
      { name: 'Female', value: 54 },
      { name: 'Male', value: 41 },
      { name: 'Other', value: 5 },
    ];
  }, [totalUsers]);

  const userAgeStats = useMemo(() => {
    // Generate realistic age distribution based on actual users
    if (totalUsers > 0) {
      const base = Math.ceil(totalUsers / 4);
      return [
        { group: '18-20', count: Math.max(1, base) },
        { group: '21-23', count: Math.max(1, base + Math.ceil(totalUsers / 6)) },
        { group: '24-26', count: Math.max(1, base) },
        { group: '27-30', count: Math.max(1, base - Math.floor(totalUsers / 8)) },
      ];
    }
    // Fallback to dummy data
    return [
      { group: '18-20', count: 140 },
      { group: '21-23', count: 210 },
      { group: '24-26', count: 120 },
      { group: '27-30', count: 60 },
    ];
  }, [totalUsers]);

  // Calculate request stats from real data
  const requestStatusStats = useMemo(() => {
    if (resourceRequests && resourceRequests.length > 0) {
      const stats = {
        Pending: resourceRequests.filter((r) => r.status === 'Pending').length,
        Approved: resourceRequests.filter((r) => r.status === 'Approved').length,
        Rejected: resourceRequests.filter((r) => r.status === 'Rejected').length,
      };
      return [
        { status: 'Pending', count: stats.Pending },
        { status: 'Approved', count: stats.Approved },
        { status: 'Rejected', count: stats.Rejected },
      ];
    }
    // Fallback to dummy data
    return [
      { status: 'Pending', count: 12 },
      { status: 'Approved', count: 48 },
      { status: 'Rejected', count: 6 },
    ];
  }, [resourceRequests]);

  // Calculate upload stats - based on resources added in last 7 days
  const recentUploadsStats = useMemo(() => {
    if (resources && resources.length > 0) {
      // Count resources by when they were added
      const now = new Date('2026-02-25'); // Current date in the app
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const recentCount = resources.filter((r) => {
        const addedDate = new Date(r.addedAt);
        return addedDate > weekAgo;
      }).length;
      
      // Simple distribution: put most on peak days
      if (recentCount === 0) {
        return [
          { day: 'Mon', uploads: 0 },
          { day: 'Tue', uploads: 0 },
          { day: 'Wed', uploads: 0 },
          { day: 'Thu', uploads: 0 },
          { day: 'Fri', uploads: 0 },
          { day: 'Sat', uploads: 0 },
          { day: 'Sun', uploads: 0 },
        ];
      } else if (recentCount === 1) {
        return [
          { day: 'Mon', uploads: 0 },
          { day: 'Tue', uploads: 0 },
          { day: 'Wed', uploads: 0 },
          { day: 'Thu', uploads: 0 },
          { day: 'Fri', uploads: 1 },
          { day: 'Sat', uploads: 0 },
          { day: 'Sun', uploads: 0 },
        ];
      } else if (recentCount === 2) {
        return [
          { day: 'Mon', uploads: 0 },
          { day: 'Tue', uploads: 0 },
          { day: 'Wed', uploads: 0 },
          { day: 'Thu', uploads: 1 },
          { day: 'Fri', uploads: 1 },
          { day: 'Sat', uploads: 0 },
          { day: 'Sun', uploads: 0 },
        ];
      } else {
        // Distribute proportionally for larger numbers
        const perDay = Math.ceil(recentCount / 7);
        const remainder = recentCount % 7;
        
        return [
          { day: 'Mon', uploads: perDay + (remainder > 0 ? 1 : 0) },
          { day: 'Tue', uploads: perDay + (remainder > 1 ? 1 : 0) },
          { day: 'Wed', uploads: perDay + (remainder > 2 ? 1 : 0) },
          { day: 'Thu', uploads: perDay + (remainder > 3 ? 1 : 0) },
          { day: 'Fri', uploads: perDay + (remainder > 4 ? 1 : 0) },
          { day: 'Sat', uploads: perDay + (remainder > 5 ? 1 : 0) },
          { day: 'Sun', uploads: perDay },
        ];
      }
    }
    
    // Fallback to dummy data
    return [
      { day: 'Mon', uploads: 6 },
      { day: 'Tue', uploads: 9 },
      { day: 'Wed', uploads: 5 },
      { day: 'Thu', uploads: 8 },
      { day: 'Fri', uploads: 12 },
      { day: 'Sat', uploads: 7 },
      { day: 'Sun', uploads: 4 },
    ];
  }, [resources]);

  const totalResources = useMemo(
    () => resourceStats.reduce((sum, item) => sum + item.count, 0),
    [resourceStats]
  );

  const totalRequests = useMemo(
    () => requestStatusStats.reduce((sum, item) => sum + item.count, 0),
    [requestStatusStats]
  );

  const totalUploads = useMemo(
    () => recentUploadsStats.reduce((sum, item) => sum + item.uploads, 0),
    [recentUploadsStats]
  );

  const pendingRequests = useMemo(
    () => requestStatusStats.find((item) => item.status === 'Pending')?.count || 0,
    [requestStatusStats]
  );

  const approvedRequests = useMemo(
    () => requestStatusStats.find((item) => item.status === 'Approved')?.count || 0,
    [requestStatusStats]
  );

  // Debug: Log all calculated stats
  React.useEffect(() => {
    console.log('Calculated Analytics Stats:', {
      totalResources,
      totalUsers,
      totalRequests,
      totalUploads,
      pendingRequests,
      resourceStats,
      requestStatusStats,
      recentUploadsStats,
    });
  }, [totalResources, totalUsers, totalRequests, totalUploads, pendingRequests, resourceStats, requestStatusStats, recentUploadsStats]);

  const renderActiveSlice = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent,
    } = props;
    return (
      <g>
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#0f172a" className="text-sm font-semibold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#64748b" className="text-xs">
          {`${Math.round(percent * 100)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 16}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.2}
        />
      </g>
    );
  };

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      <main className="dashboard-main dashboard-main--bottom-nav">
        <section className="dashboard-welcome admin-welcome">
          <button
            type="button"
            className="mb-3 inline-flex items-center justify-center rounded-lg border border-teal-200 bg-teal-50 p-2 text-teal-700 transition-colors hover:bg-teal-100"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="heading-entrance heading-premium">{sectionHeading[activeSection] || 'Analytics'}</h1>
          <p className="heading-entrance heading-entrance-delay-1">
            {sectionSubheading[activeSection] || 'Interactive analytics overview.'}
          </p>
        </section>

        {/* Overview - All Analytics Dashboard */}
        {activeSection === 'overview' && (
          <>
            {/* Analytics Summary Cards */}
            <section className="admin-stats-grid">
              <div className="admin-stat-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/resources-analytics/resources')}>
                <div className="stat-icon flex items-center justify-center rounded-xl bg-teal-50 text-teal-600 p-3 h-14 w-14"><BookOpen size={32} /></div>
                <div className="stat-content">
                  <h3 className="heading-entrance heading-entrance-card heading-premium">Total Resources</h3>
                  <p className="stat-number">{totalResources}</p>
                  <span className="stat-meta">PDF, Documents &amp; Videos</span>
                </div>
              </div>
              <div className="admin-stat-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/resources-analytics/users')}>
                <div className="stat-icon flex items-center justify-center rounded-xl bg-green-50 text-green-600 p-3 h-14 w-14"><Users size={32} /></div>
                <div className="stat-content">
                  <h3 className="heading-entrance heading-entrance-card heading-premium">Active Students</h3>
                  <p className="stat-number">{totalUsers}</p>
                  <span className="stat-meta">Active in last 48 hours</span>
                </div>
              </div>
              <div className="admin-stat-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/resources-analytics/uploads')}>
                <div className="stat-icon flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 p-3 h-14 w-14"><Download size={32} /></div>
                <div className="stat-content">
                  <h3 className="heading-entrance heading-entrance-card heading-premium">Recent Uploads</h3>
                  <p className="stat-number">{totalUploads}</p>
                  <span className="stat-meta">Last 7 days</span>
                </div>
              </div>
              <div className="admin-stat-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/resources-analytics/requests')}>
                <div className="stat-icon flex items-center justify-center rounded-xl bg-orange-50 text-orange-600 p-3 h-14 w-14"><Mail size={32} /></div>
                <div className="stat-content">
                  <h3 className="heading-entrance heading-entrance-card heading-premium">Pending Requests</h3>
                  <p className="stat-number">{pendingRequests}</p>
                  <span className="stat-meta">Requires attention</span>
                </div>
              </div>
            </section>

            {/* Resources Mini Analytics */}
            <section className="dashboard-section">
              <h2 className="section-title heading-entrance heading-premium">Resource Distribution</h2>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourceStats}
                          dataKey="count"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={100}
                          activeIndex={activeResourceSlice}
                          activeShape={renderActiveSlice}
                          onMouseEnter={(_, index) => setActiveResourceSlice(index)}
                        >
                          {resourceStats.map((entry, index) => (
                            <Cell key={entry.name} fill={resourceColors[index % resourceColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} items`, 'Resources']} />
                        <Legend verticalAlign="bottom" height={24} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {resourceStats.map((stat, index) => (
                      <div key={stat.name} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div style={{ backgroundColor: resourceColors[index % resourceColors.length] }} className="h-3 w-3 rounded-full"></div>
                            <span className="text-sm font-medium text-slate-700">{stat.name}</span>
                          </div>
                          <span className="text-xl font-semibold text-slate-900">{stat.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Users Mini Analytics */}
            <section className="dashboard-section">
              <h2 className="section-title heading-entrance heading-premium">User Demographics</h2>
              <div className="insight-grid">
                <div className="insight-panel">
                  <h3 className="heading-entrance heading-entrance-card heading-premium">Gender Distribution</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userGenderStats}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          outerRadius={80}
                          activeIndex={activeGenderSlice}
                          activeShape={renderActiveSlice}
                          onMouseEnter={(_, index) => setActiveGenderSlice(index)}
                        >
                          {userGenderStats.map((entry, index) => (
                            <Cell key={entry.name} fill={resourceColors[index % resourceColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} users`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="insight-panel">
                  <h3 className="heading-entrance heading-entrance-card heading-premium">Age Distribution</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userAgeStats} barSize={24}>
                        <XAxis dataKey="group" style={{ fontSize: '12px' }} />
                        <YAxis allowDecimals={false} style={{ fontSize: '12px' }} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>

            {/* Requests Dashboard */}
            <section className="dashboard-section">
              <h2 className="section-title heading-entrance heading-premium">Request Status Overview</h2>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={requestStatusStats} barSize={32}>
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                          {requestStatusStats.map((entry, index) => (
                            <Cell key={entry.status} fill={resourceColors[index % resourceColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {requestStatusStats.map((stat, index) => (
                      <div key={stat.status} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{stat.status}</span>
                          <span className="text-xl font-semibold text-slate-900">{stat.count}</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(stat.count / totalRequests) * 100}%`,
                              backgroundColor: resourceColors[index % resourceColors.length],
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Uploads Mini Analytics */}
            <section className="dashboard-section">
              <h2 className="section-title heading-entrance heading-premium">Upload Activity</h2>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={recentUploadsStats} barSize={24}>
                        <XAxis dataKey="day" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="uploads" radius={[10, 10, 0, 0]} fill="#0f766e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Weekly Total</p>
                      <p className="text-2xl font-semibold text-slate-900">{totalUploads}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Average Per Day</p>
                      <p className="text-2xl font-semibold text-slate-900">{Math.round(totalUploads / 7)}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Peak Day</p>
                      <p className="text-2xl font-semibold text-slate-900">{Math.max(...recentUploadsStats.map((d) => d.uploads))}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'resources' && (
          <section className="dashboard-section">
            <h2 className="section-title heading-entrance heading-premium">Resource Breakdown</h2>
            
            {/* Stats for Resources */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              {resourceStats.map((stat, index) => (
                <div key={stat.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{stat.name} Resources</p>
                      <p className="text-2xl font-semibold text-slate-900">{stat.count}</p>
                    </div>
                    <div
                      style={{ backgroundColor: resourceColors[index % resourceColors.length] }}
                      className="h-10 w-10 rounded-lg opacity-20"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resourceStats}
                        dataKey="count"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        activeIndex={activeResourceSlice}
                        activeShape={renderActiveSlice}
                        onMouseEnter={(_, index) => setActiveResourceSlice(index)}
                        onClick={(data) => setSelectedType(data?.name || selectedType)}
                      >
                        {resourceStats.map((entry, index) => (
                          <Cell key={entry.name} fill={resourceColors[index % resourceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} items`, 'Resources']} />
                      <Legend verticalAlign="bottom" height={24} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Total Resources</p>
                      <p className="text-2xl font-semibold text-slate-900">{totalResources}</p>
                    </div>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">Live demo</span>
                  </div>
                  <div className="mt-5 space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900">{selectedType} Resources</h3>
                    {dummyResources[selectedType]?.map((item) => (
                      <div key={item.id} className="rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-slate-700">
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'users' && (
          <section className="dashboard-section">
            <h2 className="section-title heading-entrance heading-premium">User Demographics</h2>
            
            {/* Stats for Users */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total Users</p>
                <p className="text-2xl font-semibold text-slate-900">{totalUsers}</p>
                <span className="text-xs text-slate-500 mt-1">Registered students</span>
              </div>
              {userGenderStats.map((stat, index) => (
                <div key={stat.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <span className="text-xs text-slate-500 mt-1">{((stat.value / totalUsers) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <div className="insight-grid">
              <div className="insight-panel">
                <h3 className="heading-entrance heading-entrance-card heading-premium">Gender Split</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userGenderStats}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={95}
                        activeIndex={activeGenderSlice}
                        activeShape={renderActiveSlice}
                        onMouseEnter={(_, index) => setActiveGenderSlice(index)}
                      >
                        {userGenderStats.map((entry, index) => (
                          <Cell key={entry.name} fill={resourceColors[index % resourceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="insight-panel">
                <h3 className="heading-entrance heading-entrance-card heading-premium">Age Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userAgeStats} barSize={32}>
                      <XAxis dataKey="group" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {userAgeStats.map((entry, index) => (
                          <Cell key={entry.group} fill={resourceColors[index % resourceColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'requests' && (
          <section className="dashboard-section">
            <h2 className="section-title heading-entrance heading-premium">Request Status</h2>
            
            {/* Stats for Requests */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total Requests</p>
                <p className="text-2xl font-semibold text-slate-900">{totalRequests}</p>
              </div>
              {requestStatusStats.map((stat, index) => (
                <div key={stat.status} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{stat.status}</p>
                  <p className="text-2xl font-semibold text-slate-900">{stat.count}</p>
                  <span className="text-xs text-slate-500 mt-1">{((stat.count / totalRequests) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={requestStatusStats} barSize={36}>
                    <XAxis dataKey="status" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                      {requestStatusStats.map((entry, index) => (
                        <Cell key={entry.status} fill={resourceColors[index % resourceColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <button
                type="button"
                onClick={() => navigate('/requests-log')}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-100"
              >
                View pending requests
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}

        {activeSection === 'uploads' && (
          <section className="dashboard-section">
            <h2 className="section-title heading-entrance heading-premium">Recent Uploads</h2>
            
            {/* Stats for Uploads */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total Uploads</p>
                <p className="text-2xl font-semibold text-slate-900">{totalUploads}</p>
                <span className="text-xs text-slate-500 mt-1">This week</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Average Per Day</p>
                <p className="text-2xl font-semibold text-slate-900">{(totalUploads / 7).toFixed(1)}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Peak Day</p>
                <p className="text-2xl font-semibold text-slate-900">{Math.max(...recentUploadsStats.map((d) => d.uploads))}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Lowest Day</p>
                <p className="text-2xl font-semibold text-slate-900">{Math.min(...recentUploadsStats.map((d) => d.uploads))}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recentUploadsStats} barSize={28}>
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="uploads" radius={[10, 10, 0, 0]} fill="#0f766e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <button
                type="button"
                onClick={() => navigate('/recent-uploads')}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-100"
              >
                Open upload logs
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
