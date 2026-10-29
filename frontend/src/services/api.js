// Centralized API client for Matrimony backend

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:5001/api';

export { API_BASE_URL };

/**
 * Register a new user
 * @param {Object} data - { name, email, phone, password, gender, profile }
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

/**
 * Update user profile
 * @param {string} id - User ID
 * @param {Object} data - Profile update payload
 */
export async function updateUserProfile(id, data) {
  const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJson = await response.json();
  if (!response.ok) {
    throw new Error(resJson.error || 'Failed to update profile.');
  }
  return resJson;
}

/**
 * Send an Invite / Express Interest
 * @param {Object} payload - { senderId, receiverId, senderName, receiverName }
 */
export async function sendInvite(payload) {
  const response = await fetch(`${API_BASE_URL}/interests/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resJson = await response.json();
  if (!response.ok) {
    throw new Error(resJson.error || 'Failed to send invite.');
  }
  return resJson;
}

/**
 * Get Sent Invitations
 * @param {string} userId
 */
export async function getSentInvites(userId) {
  const response = await fetch(`${API_BASE_URL}/interests/sent/${userId}`);
  if (!response.ok) return [];
  return await response.json();
}

/**
 * Get Received Invitations
 * @param {string} userId
 */
export async function getReceivedInvites(userId) {
  const response = await fetch(`${API_BASE_URL}/interests/received/${userId}`);
  if (!response.ok) return [];
  return await response.json();
}

/**
 * Accept Invitation
 */
export async function acceptInvite(interestId, userId) {
  const response = await fetch(`${API_BASE_URL}/interests/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interestId, userId }),
  });
  return await response.json();
}

/**
 * Decline Invitation
 */
export async function declineInvite(interestId) {
  const response = await fetch(`${API_BASE_URL}/interests/decline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interestId }),
  });
  return await response.json();
}

/**
 * Get User Notifications
 */
export async function getNotifications(userId) {
  const response = await fetch(`${API_BASE_URL}/interests/notifications/${userId}`);
  if (!response.ok) return [];
  return await response.json();
}

/**
 * Mark notifications as read
 */
export async function markNotificationsAsRead(userId, notifId = null) {
  const response = await fetch(`${API_BASE_URL}/interests/notifications/read`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, notifId }),
  });
  return await response.json();
}
