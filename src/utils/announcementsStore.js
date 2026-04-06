const ANNOUNCEMENTS_KEY = 'announcements';

const normalizePriority = (value) => {
  const lowered = String(value || '').toLowerCase();
  return lowered === 'urgent' || lowered === 'high' ? 'urgent' : 'normal';
};

const toTitle = (value) => {
  const message = String(value || '').trim();
  if (!message) return 'Announcement';
  return message.length > 50 ? `${message.slice(0, 50)}...` : message;
};

const normalizeAnnouncement = (item) => {
  const message = String(item?.message || '').trim();

  return {
    id: item?.id || Date.now(),
    title: String(item?.title || '').trim() || toTitle(message),
    message,
    priority: normalizePriority(item?.priority),
    createdAt: item?.createdAt || new Date().toISOString(),
  };
};

export const getAnnouncements = () => {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeAnnouncement).filter((item) => item.message);
  } catch {
    return [];
  }
};

export const saveAnnouncements = (announcements) => {
  try {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  } catch (error) {
    console.error('Failed to save announcements:', error);
  }
};

export const addAnnouncement = ({ title, message, priority = 'normal' }) => {
  const normalizedPriority = normalizePriority(priority);
  const next = {
    id: Date.now(),
    title: String(title || '').trim(),
    message: String(message || '').trim(),
    priority: normalizedPriority,
    createdAt: new Date().toISOString(),
  };

  const current = getAnnouncements();
  const updated = [next, ...current];
  saveAnnouncements(updated);
  return next;
};

export const getSortedAnnouncements = (limit = 5) => {
  const sorted = [...getAnnouncements()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
};

export const simulateAdminAddAnnouncement = () => {
  const sample = {
    title: 'Library Update',
    message: 'New course materials have been published. Please check your dashboard resources.',
    priority: 'normal',
  };

  return addAnnouncement(sample);
};
