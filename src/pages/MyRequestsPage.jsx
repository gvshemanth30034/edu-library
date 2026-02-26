import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, FileText, Clock, CheckCircle2, XCircle, Send, Inbox } from 'lucide-react';
import { MY_REQUESTS_DATA } from '../data/studentResourcesData';
import { getStudentRequests } from '../utils/resourceStore.js';

export const MyRequestsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

  const statusConfig = {
    All:      { icon: FileText,     color: 'teal' },
    Pending:  { icon: Clock,        color: 'amber' },
    Approved: { icon: CheckCircle2, color: 'emerald' },
    Rejected: { icon: XCircle,      color: 'red' },
  };

  // Merge persisted student requests with default data
  const allRequests = useMemo(() => {
    const saved = getStudentRequests();
    const defaultIds = new Set(MY_REQUESTS_DATA.map((r) => r.id));
    const uniqueSaved = saved.filter((r) => !defaultIds.has(r.id));
    return [...uniqueSaved, ...MY_REQUESTS_DATA];
  }, []);

  const filteredRequests = useMemo(() => {
    return allRequests.filter((request) => {
      const matchesSearch =
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || request.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus, allRequests]);

  // Counts per status
  const counts = useMemo(() => ({
    All: allRequests.length,
    Pending: allRequests.filter((r) => r.status === 'Pending').length,
    Approved: allRequests.filter((r) => r.status === 'Approved').length,
    Rejected: allRequests.filter((r) => r.status === 'Rejected').length,
  }), [allRequests]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header — teal gradient matching dashboard */}
      <div
        className="relative overflow-hidden border-b border-teal-700/20"
        style={{ background: 'linear-gradient(135deg, #004d4d 0%, #008080 42%, #1a9080 68%, #1e6e8c 100%)' }}
      >
        {/* Decorative orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-16 h-40 w-40 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="heading-entrance mb-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <ArrowLeft size={15} />
            Dashboard
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <p className="heading-entrance mb-2 text-xs font-semibold uppercase tracking-widest text-teal-200">
                Request Tracker
              </p>
              <h1 className="heading-entrance heading-premium text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-3">
                My Requests
              </h1>
              <p className="heading-entrance heading-entrance-delay-1 text-base sm:text-lg text-teal-100 leading-relaxed max-w-lg">
                Track the status of resources you've requested — from pending to approved.
              </p>
            </div>
            {/* Floating icon cluster */}
            <div className="heading-entrance hidden md:flex flex-shrink-0 items-center justify-center" style={{ animationDelay: '200ms' }}>
              <div className="relative flex h-36 w-36 items-center justify-center">
                <div aria-hidden="true" className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 72%)' }} />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <Clock className="h-5 w-5 text-teal-100" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <CheckCircle2 className="h-5 w-5 text-teal-100" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute -right-3 -top-3 h-2.5 w-2.5 rounded-full bg-white/30" />
                  <div aria-hidden="true" className="absolute -left-2 bottom-1 h-2 w-2 rounded-full bg-teal-200/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {statuses.map((status, idx) => {
            const cfg = statusConfig[status];
            const Icon = cfg.icon;
            const isActive = selectedStatus === status;
            const colorMap = {
              teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    activeBorder: 'border-teal-500', text: 'text-teal-700',    icon: 'text-teal-600',    ring: 'ring-teal-200' },
              amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   activeBorder: 'border-amber-500', text: 'text-amber-700',   icon: 'text-amber-500',   ring: 'ring-amber-200' },
              emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', activeBorder: 'border-emerald-500', text: 'text-emerald-700', icon: 'text-emerald-600', ring: 'ring-emerald-200' },
              red:     { bg: 'bg-red-50',     border: 'border-red-200',     activeBorder: 'border-red-400', text: 'text-red-700',     icon: 'text-red-500',     ring: 'ring-red-200' },
            };
            const c = colorMap[cfg.color];
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`heading-entrance group relative flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${c.ring} ${
                  isActive ? `${c.activeBorder} ring-1 ${c.ring}` : 'border-gray-200'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                  <Icon size={20} className={c.icon} />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{status}</p>
                  <p className={`text-xl font-bold ${isActive ? c.text : 'text-slate-800'}`}>{counts[status]}</p>
                </div>
                {isActive && (
                  <span className={`absolute top-0 left-0 h-full w-1 rounded-l-xl ${c.bg.replace('50', '500').replace('bg-', 'bg-')}`}
                    style={{ background: cfg.color === 'teal' ? '#0d9488' : cfg.color === 'amber' ? '#f59e0b' : cfg.color === 'emerald' ? '#10b981' : '#ef4444' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Count Bar */}
        <div className="heading-entrance flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6" style={{ animationDelay: '240ms' }}>
          <div className="relative group flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:bg-white shadow-sm hover:border-gray-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-800">{filteredRequests.length}</span> request{filteredRequests.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => navigate('/request-resource')}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <Send size={15} />
              New Request
            </button>
          </div>
        </div>

        {/* Request Cards */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map((request, idx) => (
              <RequestItem key={request.id} request={request} index={idx} />
            ))}
          </div>
        ) : (
          <div className="heading-entrance flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-5">
              <Inbox size={28} className="text-slate-400" />
            </div>
            <p className="text-slate-700 text-lg font-semibold mb-1">No requests found</p>
            <p className="text-slate-400 text-sm mb-6 max-w-sm text-center">Try adjusting your search or filter, or submit a new request.</p>
            <button
              onClick={() => navigate('/request-resource')}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-teal-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <Send size={15} />
              Submit a Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RequestItem = ({ request, index }) => {
  const statusConfig = {
    Approved: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      icon: <CheckCircle2 size={13} className="text-emerald-600" />,
      hoverBorder: 'hover:border-emerald-300',
    },
    Pending: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: <Clock size={13} className="text-amber-600" />,
      hoverBorder: 'hover:border-amber-300',
    },
    Rejected: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      dot: 'bg-red-500',
      icon: <XCircle size={13} className="text-red-500" />,
      hoverBorder: 'hover:border-red-300',
    },
  };

  const cfg = statusConfig[request.status] || statusConfig.Pending;

  return (
    <div
      className={`heading-entrance group relative bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all duration-300 ${cfg.hoverBorder} hover:shadow-lg hover:-translate-y-0.5 cursor-default overflow-hidden`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${cfg.dot}`} />

      <div className="flex flex-col sm:flex-row sm:items-start gap-4 pl-3">
        {/* Status icon */}
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${cfg.bg} border ${cfg.border} transition-transform duration-200 group-hover:scale-110`}>
          {request.status === 'Approved' && <CheckCircle2 size={20} className="text-emerald-600" />}
          {request.status === 'Pending' && <Clock size={20} className="text-amber-600" />}
          {request.status === 'Rejected' && <XCircle size={20} className="text-red-500" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h3 className="text-base sm:text-lg font-semibold tracking-[-0.01em] text-slate-900 group-hover:text-teal-700 transition-colors truncate">
              {request.title}
            </h3>
            <span className={`self-start sm:self-auto inline-flex items-center gap-1 text-[0.6rem] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
              {cfg.icon}
              {request.status}
            </span>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
            {request.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider shadow-sm">
              <FileText size={11} className="text-slate-400" />
              {request.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Clock size={11} />
              Submitted: {request.submittedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
