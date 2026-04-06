import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock, CheckCircle2, XCircle, Inbox } from 'lucide-react';
import { getStudentRequests, saveStudentRequests } from '../utils/resourceStore.js';

export const RequestsLog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const queryStatus = new URLSearchParams(location.search).get('status');
  const initialStatusFilter = ['Pending', 'Approved', 'Rejected'].includes(queryStatus) ? queryStatus : 'All';
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const departmentOptions = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Mathematics'];
  const statusOptions = ['Pending', 'Approved', 'Rejected'];

  const defaultRequests = [
    { id: 1, student: 'Amit Patel', request: 'Advanced Database Systems book', department: 'Computer Science', date: '26 Feb 2026', status: 'Pending' },
    { id: 2, student: 'Sneha Reddy', request: 'Machine Learning lecture videos', department: 'Computer Science', date: '25 Feb 2026', status: 'Pending' },
    { id: 3, student: 'Priya Kapoor', request: 'Data Visualization Tutorials & Datasets', department: 'Computer Science', date: '25 Feb 2026', status: 'Pending' },
    { id: 4, student: 'Vishal Kumar', request: 'Network Security Case Studies', department: 'Computer Science', date: '24 Feb 2026', status: 'Pending' },
    { id: 5, student: 'Sanjay Nair', request: 'Control Systems Simulation Software', department: 'Electronics', date: '24 Feb 2026', status: 'Pending' },
    { id: 6, student: 'Nikhil Rao', request: 'Signal Processing sample papers', department: 'Electronics', date: '23 Feb 2026', status: 'Approved' },
    { id: 7, student: 'Anjali Gupta', request: 'Artificial Intelligence Research Papers', department: 'Computer Science', date: '23 Feb 2026', status: 'Approved' },
    { id: 8, student: 'Maya Singh', request: 'Embedded Systems Design Guide', department: 'Electronics', date: '22 Feb 2026', status: 'Approved' },
    { id: 9, student: 'Harsh Verma', request: 'Cloud Computing Certification Materials', department: 'Computer Science', date: '21 Feb 2026', status: 'Approved' },
    { id: 10, student: 'Meera Thomas', request: 'Structural Design examples & CAD files', department: 'Civil', date: '21 Feb 2026', status: 'Rejected' },
    { id: 11, student: 'Akash Verma', request: 'Thermodynamics quick notes', department: 'Mechanical', date: '20 Feb 2026', status: 'Approved' },
    { id: 12, student: 'Ravi Shankar', request: 'IoT Development Framework Documentation', department: 'Electronics', date: '19 Feb 2026', status: 'Rejected' },
  ];

  const [requests, setRequests] = useState(() => {
    const savedRequests = getStudentRequests();
    const studentMapped = savedRequests.map((r) => ({
      id: r.id,
      student: r.student || 'Student',
      request: r.title + (r.description ? ` — ${r.description}` : ''),
      department: r.category || 'General',
      date: r.submittedDate || 'Recently',
      status: r.status || 'Pending',
      _fromStudent: true,
    }));
    const defaultIds = new Set(defaultRequests.map((r) => r.id));
    const uniqueStudentRequests = studentMapped.filter((r) => !defaultIds.has(r.id));
    return [...uniqueStudentRequests, ...defaultRequests];
  });

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      const matchesSearch = item.request.toLowerCase().includes(search.toLowerCase())
        || item.student.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesDepartment = departmentFilter === 'All' || item.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [requests, search, statusFilter, departmentFilter]);

  const handleStatusChange = (requestId, status) => {
    setRequests((prev) => prev.map((item) => (
      item.id === requestId
        ? { ...item, status }
        : item
    )));
    // Sync status back to student requests in localStorage
    const savedRequests = getStudentRequests();
    const updatedSaved = savedRequests.map((r) =>
      r.id === requestId ? { ...r, status } : r
    );
    saveStudentRequests(updatedSaved);
  };

  const totalRequests = requests.length;
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      <main className="dashboard-main dashboard-main--bottom-nav">

        {/* Premium Banner */}
        <div className="admin-page-banner">
          <button type="button" className="banner-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={18} />
          </button>
          <div className="banner-icon"><MessageSquare size={24} /></div>
          <div className="banner-text">
            <h1>Requests Log</h1>
            <p>Review, approve, or reject resource requests.</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="admin-summary-row">
          <div className="admin-summary-card">
            <span className="summary-label">Total Requests</span>
            <span className="summary-value">{totalRequests}</span>
            <Inbox size={28} className="summary-icon" />
          </div>
          <div className="admin-summary-card">
            <span className="summary-label">Pending</span>
            <span className="summary-value">{pendingCount}</span>
            <Clock size={28} className="summary-icon" />
          </div>
          <div className="admin-summary-card">
            <span className="summary-label">Approved</span>
            <span className="summary-value">{approvedCount}</span>
            <CheckCircle2 size={28} className="summary-icon" />
          </div>
          <div className="admin-summary-card">
            <span className="summary-label">Rejected</span>
            <span className="summary-value">{rejectedCount}</span>
            <XCircle size={28} className="summary-icon" />
          </div>
        </div>

        {/* Premium Table Card */}
        <div className="admin-premium-card">
          <div className="card-header">
            <h2>Resource Requests</h2>
            <p>Filter by department, status, or student name.</p>
          </div>
          <div className="card-filters">
            <input
              type="text"
              className="admin-input"
              placeholder="Search by student or request"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select className="admin-input" value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
              <option value="All">All Departments</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select className="admin-input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="card-body">
            {filteredRequests.length === 0 ? (
              <div className="admin-empty-state">
                <div className="empty-icon"><MessageSquare size={24} /></div>
                <p>No requests match your filters.</p>
              </div>
            ) : (
              <table className="admin-premium-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Request</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((item) => (
                    <tr key={item.id}>
                      <td className="cell-name">{item.student}</td>
                      <td style={{ maxWidth: '280px', color: '#475569' }}>{item.request}</td>
                      <td>{item.department}</td>
                      <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.date}</td>
                      <td>
                        <span className={`premium-badge ${item.status === 'Pending' ? 'premium-badge--pending' : item.status === 'Approved' ? 'premium-badge--approved' : 'premium-badge--rejected'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="premium-action-btn premium-action-btn--approve"
                            onClick={() => handleStatusChange(item.id, 'Approved')}
                            disabled={item.status === 'Approved'}
                          >
                            Approve
                          </button>
                          <button
                            className="premium-action-btn premium-action-btn--reject"
                            onClick={() => handleStatusChange(item.id, 'Rejected')}
                            disabled={item.status === 'Rejected'}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};
