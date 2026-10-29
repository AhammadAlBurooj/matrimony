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

/**
 * Fetch registered user profiles from backend with optional filters
 * @param {Object} filters - { gender, minAge, maxAge, religion, caste, city, searchQuery }
 */
export async function getRegisteredProfiles(filters = {}) {
  const params = new URLSearchParams();

  if (filters.gender) params.append('gender', filters.gender);
  if (filters.minAge) params.append('minAge', filters.minAge);
  if (filters.maxAge) params.append('maxAge', filters.maxAge);
  if (filters.religion && filters.religion !== 'All Religions') params.append('religion', filters.religion);
  if (filters.caste && filters.caste !== 'All Communities') params.append('caste', filters.caste);
  if (filters.city && filters.city !== 'All Locations') params.append('city', filters.city);
  if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);

  const url = `${API_BASE_URL}/profiles?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch registered profiles');
  }

  return await response.json();
}

/**
 * Fetch single profile by ID
 * @param {string} id
 */
export async function getProfileById(id) {
  const response = await fetch(`${API_BASE_URL}/profiles/${id}`);
  if (!response.ok) {
    throw new Error('Profile not found');
  }
  return await response.json();
}


