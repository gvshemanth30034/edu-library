import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { getSortedAnnouncements, simulateAdminAddAnnouncement } from '../utils/announcementsStore.js';

export const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const [announcementDraft, setAnnouncementDraft] = useState('');
  const [announcementPublishing, setAnnouncementPublishing] = useState(false);
  const [audience, setAudience] = useState('All Students');
  const [priority, setPriority] = useState('Normal');
  const [announcements, setAnnouncements] = useState(() => getSortedAnnouncements(20));

  const audienceOptions = ['All Students', 'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Mathematics'];
  const priorityOptions = ['Normal', 'High'];

  useEffect(() => {
    window.simulateAdminAddAnnouncement = simulateAdminAddAnnouncement;
    return () => {
      delete window.simulateAdminAddAnnouncement;
    };
  }, []);

  const handlePublish = () => {
    if (!announcementDraft.trim()) {
      return;
    }
    setAnnouncementPublishing(true);
    setTimeout(() => {
      const normalizedPriority = priority === 'High' ? 'urgent' : 'normal';
      const nextAnnouncement = {
        id: Date.now(),
        title: `${audience} Announcement`,
        message: announcementDraft.trim(),
        priority: normalizedPriority,
        createdAt: new Date().toISOString(),
      };

      const currentRaw = localStorage.getItem('announcements');
      const current = currentRaw ? JSON.parse(currentRaw) : [];
      const updated = [nextAnnouncement, ...(Array.isArray(current) ? current : [])];
      localStorage.setItem('announcements', JSON.stringify(updated));

      setAnnouncements(getSortedAnnouncements(20));
      setAnnouncementDraft('');
      setAnnouncementPublishing(false);
    }, 600);
  };

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      <main className="dashboard-main dashboard-main--bottom-nav">

        {/* Premium Banner */}
        <div className="admin-page-banner">
          <button type="button" className="banner-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={18} />
          </button>
          <div className="banner-icon"><Megaphone size={24} /></div>
          <div className="banner-text">
            <h1>Announcements</h1>
            <p>Send updates to students with clear targeting and priority.</p>
          </div>
        </div>

        {/* Create Announcement Form */}
        <div className="admin-premium-form-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-dark)' }}>Create Announcement</h2>
          <form className="admin-form admin-form--announcement">
            <textarea
              placeholder="Write announcement for students..."
              rows="4"
              value={announcementDraft}
              onChange={(event) => setAnnouncementDraft(event.target.value)}
            ></textarea>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <select value={audience} onChange={(event) => setAudience(event.target.value)}>
                  {audienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="admin-premium-submit-btn"
                  onClick={handlePublish}
                  disabled={announcementPublishing || !announcementDraft.trim()}
                >
                  {announcementPublishing ? 'Publishing...' : 'Publish Announcement'}
                </button>
                <button
                  type="button"
                  className="admin-premium-clear-btn"
                  onClick={() => setAnnouncementDraft('')}
                  disabled={announcementPublishing}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Announcement Feed */}
        <div className="admin-premium-card">
          <div className="card-header">
            <h2>Announcement Feed</h2>
            <p>{announcements.length} announcement{announcements.length !== 1 ? 's' : ''} published</p>
          </div>
          <div className="card-body">
            {announcements.length === 0 ? (
              <div className="admin-empty-state">
                <div className="empty-icon"><Megaphone size={24} /></div>
                <p>No announcements published yet.</p>
              </div>
            ) : (
              announcements.map((item) => (
                <div key={item.id} className="admin-announcement-item">
                  <span className={`ann-priority-dot ann-priority-dot--${item.priority === 'urgent' ? 'high' : 'normal'}`}></span>
                  <div className="ann-content">
                    <p className="ann-message">{item.message}</p>
                    <div className="ann-meta">
                      <span className="ann-meta-tag ann-meta-tag--audience">{item.audience || 'All Students'}</span>
                      <span className={`ann-meta-tag ann-meta-tag--priority-${item.priority === 'urgent' ? 'high' : 'normal'}`}>{item.priority === 'urgent' ? 'High' : 'Normal'} priority</span>
                    </div>
                  </div>
                  <span className="ann-date">{new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
};
