const ensureApiSuffix = (baseUrl) => {
  const trimmed = String(baseUrl || '').replace(/\/+$/, '');
  if (!trimmed) return 'http://localhost:8080/api';
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const API_BASE_URL = ensureApiSuffix(import.meta.env.VITE_API_URL || 'http://localhost:8080/api');

export const fetchStudentDashboardData = async () => {
  const endpoint = `${API_BASE_URL}/student/dashboard`;
  const token = localStorage.getItem('uiExtension-authToken');

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn('Student dashboard API unavailable, using local fallback:', error);
    return null;
  }
};
