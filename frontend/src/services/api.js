// Centralized API client for Matrimony backend

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Register a new user
 * @param {Object} data - { name, email, phone, password, gender }
 */
export async function registerUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJson = await response.json();
  if (!response.ok) {
    throw new Error(resJson.error || 'Failed to create account.');
  }

  return resJson;
}

/**
 * Login user with email & password
 * @param {Object} data - { email, password }
 */
export async function loginUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJson = await response.json();
  if (!response.ok) {
    throw new Error(resJson.error || 'Invalid email or password.');
  }

  return resJson;
}

/**
 * Fetch authenticated user profile using token
 * @param {string} token
 */
export async function getCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resJson = await response.json();
  if (!response.ok) {
    throw new Error(resJson.error || 'Session expired.');
  }

  return resJson;
}

