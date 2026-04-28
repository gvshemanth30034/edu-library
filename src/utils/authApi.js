const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

const getErrorMessage = async (response) => {
  try {
    const payload = await response.json();
    if (typeof payload === 'string') {
      return payload;
    }
    return payload?.message || payload?.error || payload?.detail || 'Request failed';
  } catch {
    return response.statusText || 'Request failed';
  }
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
};

export const loginUser = (email, password) =>
  requestJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const registerUser = (payload) =>
  requestJson('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const fetchStudentDashboard = (token) =>
  requestJson('/api/student/dashboard', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const authStorage = {
  saveSession(authResponse) {
    const user = authResponse?.user || {};
    const normalizedRole = user.role === 'user' ? 'student' : (user.role || 'student');

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: normalizedRole,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem('uiExtension-user', JSON.stringify(sessionUser));
    localStorage.setItem('uiExtension-isLoggedIn', 'true');
    localStorage.setItem('uiExtension-userRole', normalizedRole);
    localStorage.setItem('uiExtension-authToken', authResponse.token || '');

    if (authResponse.expiresAt) {
      localStorage.setItem('uiExtension-authTokenExpiresAt', authResponse.expiresAt);
    }

    return normalizedRole;
  },
};
