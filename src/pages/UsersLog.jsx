import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const UsersLog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const roleOptions = ['Student', 'Admin'];
  const departmentOptions = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Mathematics'];
  const statusOptions = ['Active', 'Pending', 'Deactivated'];

  const [users, setUsers] = useState([
    { id: 1, name: 'Priya Sharma', email: 'priya@edu.edu', role: 'Student', department: 'Computer Science', status: 'Active', date: '24 Feb 2026' },
    { id: 2, name: 'Rahul Kumar', email: 'rahul@edu.edu', role: 'Student', department: 'Electronics', status: 'Pending', date: '24 Feb 2026' },
    { id: 3, name: 'Ananya Singh', email: 'ananya@edu.edu', role: 'Student', department: 'Mathematics', status: 'Active', date: '23 Feb 2026' },
    { id: 4, name: 'Nikhil Rao', email: 'nikhil@edu.edu', role: 'Student', department: 'Mechanical', status: 'Active', date: '22 Feb 2026' },
    { id: 5, name: 'Admin Team', email: 'admin@edu.edu', role: 'Admin', department: 'Computer Science', status: 'Active', date: '20 Feb 2026' },
    { id: 6, name: 'Meera Thomas', email: 'meera@edu.edu', role: 'Student', department: 'Civil', status: 'Deactivated', date: '19 Feb 2026' },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
        || user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesDepartment = departmentFilter === 'All' || user.department === departmentFilter;
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [users, search, roleFilter, departmentFilter, statusFilter]);

  const handleStatusChange = (userId, status) => {
    setUsers((prev) => prev.map((user) => (
      user.id === userId
        ? { ...user, status }
        : user
    )));
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
          <h1 className="heading-entrance heading-premium">User Signups Log</h1>
          <p className="heading-entrance heading-entrance-delay-1">Review new registrations and manage account status.</p>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium">Registered Users</h2>
          <div className="admin-action-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="heading-entrance heading-entrance-card heading-premium">Filters</h3>
                <p className="text-sm text-slate-500">Search by student name, email, or department.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select className="admin-input" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                  <option value="All">All Roles</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
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

            {filteredUsers.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-6 text-center text-slate-500">
                No users match your filters.
              </div>
            ) : (
              <div className="resource-table-wrapper mt-6">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Signup Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="resource-title">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.department}</td>
                        <td>
                          <span className={`status-badge ${user.status === 'Active' ? 'status-approved' : user.status === 'Pending' ? 'status-pending' : 'status-rejected'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="text-muted">{user.date}</td>
                        <td>
                          {user.status === 'Active' ? (
                            <button className="action-link action-link--reject" onClick={() => handleStatusChange(user.id, 'Deactivated')}>Deactivate</button>
                          ) : (
                            <span className="text-slate-400">—</span>
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
      </main>
    </div>
  );
};
