import React, { useState } from 'react';
import { Send, ArrowLeft, CheckCircle, BookOpen, FileText, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addStudentRequest } from '../utils/resourceStore.js';

const REQUEST_CATEGORIES = [
  'Computer Science',
  'Electronics',
  'Mechanical Engg.',
  'Civil Engineering',
  'Mathematics',
  'Physics',
];

export const RequestResourcePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(REQUEST_CATEGORIES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addStudentRequest({ title: title.trim(), description: description.trim(), category });
    setTitle('');
    setDescription('');
    setCategory(REQUEST_CATEGORIES[0]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const charCount = description.length;
  const isFormValid = title.trim().length > 0 && description.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header — matches dashboard teal gradient */}
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
                Resource Request
              </p>
              <h1 className="heading-entrance heading-premium text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-3">
                Suggest a Resource
              </h1>
              <p className="heading-entrance heading-entrance-delay-1 text-base sm:text-lg text-teal-100 leading-relaxed max-w-lg">
                Help us grow the library — request books, videos, or documents you'd like added.
              </p>
            </div>
            {/* Floating icon cluster */}
            <div className="heading-entrance hidden md:flex flex-shrink-0 items-center justify-center" style={{ animationDelay: '200ms' }}>
              <div className="relative flex h-36 w-36 items-center justify-center">
                <div aria-hidden="true" className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 72%)' }} />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                    <Send className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <BookOpen className="h-5 w-5 text-teal-100" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-md backdrop-blur-sm">
                      <FileText className="h-5 w-5 text-teal-100" />
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Card */}
          <div className="lg:col-span-2">
            {/* Success Banner */}
            {submitted && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 shadow-sm animate-fade-in">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle size={22} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Request submitted successfully!</p>
                  <p className="text-xs text-emerald-600 mt-0.5">The admin will review it shortly. Track it in "My Requests".</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
              {/* Card header accent */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #008080, #1e6e8c, #008080)' }} />
              <div className="p-6 sm:p-8">
                <h2 className="heading-entrance heading-premium text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Send size={18} className="text-teal-600" />
                  New Request
                </h2>
                <p className="heading-entrance heading-entrance-delay-1 text-sm text-slate-500 mb-7">Fill in the details below to submit your request.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="heading-entrance" style={{ animationDelay: '120ms' }}>
                    <label htmlFor="resource-title" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
                      <FileText size={14} className="text-teal-600" />
                      Resource Title
                    </label>
                    <input
                      id="resource-title"
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Advanced Machine Learning Textbook"
                      required
                      className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:shadow-sm ${
                        focusedField === 'title'
                          ? 'border-teal-400 ring-2 ring-teal-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Description */}
                  <div className="heading-entrance" style={{ animationDelay: '200ms' }}>
                    <label htmlFor="resource-description" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
                      <Lightbulb size={14} className="text-teal-600" />
                      Description
                    </label>
                    <textarea
                      id="resource-description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Describe what you need and why it'd be helpful for your studies..."
                      required
                      rows={5}
                      className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 transition-all duration-200 resize-y focus:outline-none focus:bg-white focus:shadow-sm ${
                        focusedField === 'description'
                          ? 'border-teal-400 ring-2 ring-teal-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    <p className={`mt-1.5 text-xs transition-colors ${charCount > 0 ? 'text-slate-500' : 'text-slate-400'}`}>
                      {charCount > 0 ? `${charCount} characters` : 'Min. a few words recommended'}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="heading-entrance" style={{ animationDelay: '280ms' }}>
                    <label htmlFor="resource-category" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
                      <BookOpen size={14} className="text-teal-600" />
                      Category
                    </label>
                    <select
                      id="resource-category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      onFocus={() => setFocusedField('category')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 transition-all duration-200 focus:outline-none focus:bg-white focus:shadow-sm appearance-none cursor-pointer ${
                        focusedField === 'category'
                          ? 'border-teal-400 ring-2 ring-teal-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        backgroundSize: '16px',
                      }}
                    >
                      {REQUEST_CATEGORIES.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="heading-entrance pt-2" style={{ animationDelay: '360ms' }}>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                        isFormValid
                          ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md active:bg-teal-800 hover:-translate-y-0.5'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send size={17} className={`transition-transform duration-200 ${isFormValid ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''}`} />
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar — Tips & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tips Card */}
            <div className="heading-entrance bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition-shadow hover:shadow-md" style={{ animationDelay: '200ms' }}>
              <h3 className="heading-entrance heading-entrance-card heading-premium text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500" />
                Tips for a Great Request
              </h3>
              <ul className="space-y-3">
                {[
                  { text: 'Be specific — include the full title, edition, or author if known.', color: 'bg-teal-50 text-teal-600 border-teal-100' },
                  { text: 'Explain why — helps admin prioritize your request faster.', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                  { text: 'Pick the right category so it reaches the correct department.', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                  { text: 'Track progress any time from "My Requests" in your dashboard.', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 group/tip">
                    <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${tip.color}`}>
                      {idx + 1}
                    </span>
                    <span className="text-sm text-slate-600 leading-relaxed group-hover/tip:text-slate-800 transition-colors">
                      {tip.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="heading-entrance bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl border border-teal-100 p-6 transition-shadow hover:shadow-md" style={{ animationDelay: '340ms' }}>
              <h3 className="heading-entrance heading-entrance-card heading-premium text-base font-bold text-slate-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: '1', label: 'Submit', desc: 'Fill out the form with resource details' },
                  { step: '2', label: 'Review', desc: 'Admin reviews and processes your request' },
                  { step: '3', label: 'Available', desc: 'Resource added to the library for everyone' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white text-xs font-bold shadow-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
