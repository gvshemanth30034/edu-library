const ensureApiSuffix = (baseUrl) => {
  const trimmed = String(baseUrl || '').replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const API_BASE_URL = ensureApiSuffix(import.meta.env.VITE_API_URL || 'http://localhost:8080/api');

const readErrorMessage = async (response) => {
  try {
    const payload = await response.json();
    return payload?.message || payload?.error || 'Authentication failed';
  } catch {
    return 'Authentication failed';
  }
};

export const loginWithBackend = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return await response.json();
};

export const registerWithBackend = async ({ name, email, password, role }) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return await response.json();
};

export const forgotPasswordWithBackend = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return await response.json();
};

export const resetPasswordWithBackend = async ({ email, resetToken, newPassword }) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, resetToken, newPassword }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return await response.json();
};
