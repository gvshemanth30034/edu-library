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
