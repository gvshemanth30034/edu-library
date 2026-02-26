import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getStudentRequests, saveStudentRequests } from '../utils/resourceStore.js';

export const RequestsLog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const departmentOptions = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Mathematics'];
  const statusOptions = ['Pending', 'Approved', 'Rejected'];

  const defaultRequests = [
    { id: 1, student: 'Amit Patel', request: 'Advanced Database Systems book', department: 'Computer Science', date: '24 Feb 2026', status: 'Pending' },
    { id: 2, student: 'Sneha Reddy', request: 'Machine Learning lecture videos', department: 'Computer Science', date: '23 Feb 2026', status: 'Pending' },
    { id: 3, student: 'Nikhil Rao', request: 'Signal Processing sample papers', department: 'Electronics', date: '21 Feb 2026', status: 'Approved' },
    { id: 4, student: 'Meera Thomas', request: 'Structural Design examples', department: 'Civil', date: '21 Feb 2026', status: 'Rejected' },
    { id: 5, student: 'Akash Verma', request: 'Thermodynamics quick notes', department: 'Mechanical', date: '20 Feb 2026', status: 'Approved' },
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
          <h1 className="heading-entrance heading-premium">Requests Log</h1>
          <p className="heading-entrance heading-entrance-delay-1">Review, approve, or reject resource requests.</p>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Pending Requests</h2>
          <div className="admin-action-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="heading-entrance heading-entrance-card heading-premium">Filters</h3>
                <p className="text-sm text-slate-500">Filter by department, status, or student.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
            </div>

            {filteredRequests.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-6 text-center text-slate-500">
                No requests match your filters.
              </div>
            ) : (
              <div className="request-table-wrapper mt-6">
                <table className="request-table">
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
                        <td>{item.student}</td>
                        <td className="request-text">{item.request}</td>
                        <td>{item.department}</td>
                        <td>{item.date}</td>
                        <td>
                          <span className={`status-badge ${item.status === 'Pending' ? 'status-pending' : item.status === 'Approved' ? 'status-approved' : 'status-rejected'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="action-link"
                            onClick={() => handleStatusChange(item.id, 'Approved')}
                            disabled={item.status === 'Approved'}
                          >
                            Approve
                          </button>
                          <button
                            className="action-link action-link--reject"
                            onClick={() => handleStatusChange(item.id, 'Rejected')}
                            disabled={item.status === 'Rejected'}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
