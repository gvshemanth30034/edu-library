/**
 * Shared Resource Store
 * Persists admin-managed resources to localStorage so they are
 * visible across both admin and student dashboards.
 */

const STORAGE_KEY = 'eduLibrary-adminResources';

/**
 * Get all admin-managed resources from localStorage.
 * @returns {Array} Array of resource objects
 */
export const getAdminResources = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Save the full admin resources array to localStorage.
 * @param {Array} resources - Array of resource objects to persist
 */
export const saveAdminResources = (resources) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch (error) {
    console.error('Failed to save resources:', error);
  }
};

/* ── Student Resource Requests ── */

const REQUESTS_KEY = 'eduLibrary-studentRequests';

/**
 * Get all student resource requests from localStorage.
 * @returns {Array} Array of request objects
 */
export const getStudentRequests = () => {
  try {
    const data = localStorage.getItem(REQUESTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Save the full student requests array to localStorage.
 * @param {Array} requests - Array of request objects to persist
 */
export const saveStudentRequests = (requests) => {
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error('Failed to save requests:', error);
  }
};

/**
 * Add a single student request and persist.
 * @param {Object} request - { title, description, category }
 * @returns {Object} The created request object
 */
export const addStudentRequest = (request) => {
  const user = JSON.parse(localStorage.getItem('uiExtension-user') || '{}');
  const now = new Date();
  const newRequest = {
    id: Date.now(),
    title: request.title,
    description: request.description,
    category: request.category,
    student: user.name || user.email || 'Student',
    submittedDate: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Pending',
  };
  const existing = getStudentRequests();
  const updated = [newRequest, ...existing];
  saveStudentRequests(updated);
  return newRequest;
};
