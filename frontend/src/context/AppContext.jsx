import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MOCK_PROFILES } from '../data/mockData';
import {
  getRegisteredProfiles,
  sendInvite,
  getSentInvites,
  getReceivedInvites,
  acceptInvite,
  declineInvite,
  getNotifications,
  markNotificationsAsRead,
  updateUserProfile
} from '../services/api';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Authentication State loaded from localStorage
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('bandhan_token') || null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('bandhan_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Current page
  const [currentPage, setCurrentPage] = useState(() => {
    const token = localStorage.getItem('bandhan_token');
    const user = localStorage.getItem('bandhan_user');
    return (token && user) ? 'home' : 'login';
  });

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  // Registered profiles from database
  const [registeredProfiles, setRegisteredProfiles] = useState([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

  // Search and filter state
  const [searchFilters, setSearchFilters] = useState({
    gender: 'female', // 'female' | 'male' | 'all'
    minAge: 18,
    maxAge: 45,
    religion: 'All Religions',
    caste: 'All Communities',
    city: 'All Locations',
    searchQuery: '',
    verifiedOnly: false,
    minMatchScore: 85
  });

  // Shortlist and Interests tracking
  const [shortlistedIds, setShortlistedIds] = useState(() => {
    const saved = localStorage.getItem('salafi_shortlisted');
    return saved ? JSON.parse(saved) : ['usr_sister_01'];
  });

  const [sentInterests, setSentInterests] = useState(() => {
    const saved = localStorage.getItem('salafi_sent_interests');
    return saved ? JSON.parse(saved) : ['usr_sister_01'];
  });

  const [receivedInterests, setReceivedInterests] = useState(['usr_sister_02']);
  const [acceptedConnections, setAcceptedConnections] = useState(['usr_sister_03']);

  // Detailed sent invites records
  const [sentInvitesList, setSentInvitesList] = useState([]);

  // In-app Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_init_1',
      title: 'Welcome to Salafi Matchmaking',
      message: 'Explore verified registered profiles upon the Sunnah.',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'system'
    },
    {
      id: 'notif_init_2',
      title: 'New Invitation Received',
      message: 'Fatima Zahra (23 yrs, Kochi) expressed interest in your profile.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'interest_received',
      relatedProfileId: 'usr_sister_02'
    }
  ]);

  // Active chat recipient ID for the messaging tab
  const [activeChatRecipientId, setActiveChatRecipientId] = useState('usr_sister_03');

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Function to fetch registered profiles based on filters
  const loadRegisteredProfiles = useCallback(async (filters = searchFilters) => {
    setIsLoadingProfiles(true);
    try {
      const data = await getRegisteredProfiles(filters);
      setRegisteredProfiles(data);
    } catch (err) {
      console.warn('Could not fetch registered profiles from backend:', err.message);
    } finally {
      setIsLoadingProfiles(false);
    }
  }, [searchFilters]);

  // Load profiles on mount & whenever searchFilters changes
  useEffect(() => {
    loadRegisteredProfiles(searchFilters);
  }, [searchFilters.gender, searchFilters.minAge, searchFilters.maxAge, searchFilters.religion, searchFilters.caste, searchFilters.city, searchFilters.searchQuery]);

  // Load notifications from backend if user is logged in
  const refreshNotifications = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const remoteNotifs = await getNotifications(currentUser.id);
      if (remoteNotifs && remoteNotifs.length > 0) {
        setNotifications((prev) => {
          // Merge remote with local unique
          const map = new Map();
          remoteNotifs.forEach((n) => map.set(n.id, n));
          prev.forEach((n) => {
            if (!map.has(n.id)) map.set(n.id, n);
          });
          return Array.from(map.values());
        });
      }
    } catch (e) {
      console.warn('Error loading notifications:', e.message);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser?.id) {
      refreshNotifications();
    }
  }, [currentUser?.id, refreshNotifications]);

  const openAuthModal = (mode = 'login') => {
    navigateTo(mode);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = (userData, token) => {
    const formattedUser = {
      ...userData,
      membership: userData.membership || 'Royal Gold Member',
      avatar: userData.avatar || (userData.gender === 'female' || userData.gender === 'sister'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'),
      completionRate: userData.completionRate || 95,
      credits: userData.credits || 20
    };

    setCurrentUser(formattedUser);
    setAuthToken(token);
    localStorage.setItem('bandhan_user', JSON.stringify(formattedUser));
    localStorage.setItem('bandhan_token', token);
    setIsAuthModalOpen(false);
    showToast(`Welcome, ${formattedUser.name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('bandhan_user');
    localStorage.removeItem('bandhan_token');
    showToast('You have been securely signed out.', 'info');
    navigateTo('login');
  };

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('salafi_shortlisted', JSON.stringify(updated));
      showToast(exists ? 'Removed from your Shortlist' : '⭐ Profile added to Shortlist', 'info');
      return updated;
    });
  };

  // Send Invite / Express Interest
  const sendInterest = async (targetProfileId, targetName = '') => {
    if (!currentUser) {
      navigateTo('login');
      showToast('Please sign in to invite or express interest', 'info');
      return;
    }

    if (sentInterests.includes(targetProfileId)) {
      showToast('You have already sent an invitation to this member', 'info');
      return;
    }

    // Resolve target profile name
    const target = registeredProfiles.find((p) => p.id === targetProfileId) ||
                   MOCK_PROFILES.find((p) => p.id === targetProfileId);
    const resolvedName = targetName || target?.name || 'Registered Member';

    // Optimistically update UI
    setSentInterests((prev) => {
      const updated = [...prev, targetProfileId];
      localStorage.setItem('salafi_sent_interests', JSON.stringify(updated));
      return updated;
    });

    // Add immediate in-app notification
    const newNotif = {
      id: 'notif_sent_' + Date.now(),
      title: 'Invitation Sent Successfully',
      message: `You sent a match invitation to ${resolvedName}. Notification has been dispatched.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'interest_sent',
      relatedProfileId: targetProfileId
    };

    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`✨ Invitation sent to ${resolvedName}! Notification recorded.`, 'success');

    // Send to backend API
    try {
      await sendInvite({
        senderId: currentUser.id,
        senderName: currentUser.name,
        receiverId: targetProfileId,
        receiverName: resolvedName
      });
      refreshNotifications();
    } catch (err) {
      console.warn('Backend invite sync:', err.message);
    }
  };

  // Accept incoming interest
  const acceptInterest = async (id, name = 'Member') => {
    setReceivedInterests((prev) => prev.filter((item) => item !== id));
    setAcceptedConnections((prev) => [...prev, id]);

    const newNotif = {
      id: 'notif_acc_' + Date.now(),
      title: 'Invitation Accepted!',
      message: `You accepted ${name}'s invitation. You can now chat securely.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'interest_accepted',
      relatedProfileId: id
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Connection accepted with ${name}! You can now message them.`, 'success');

    try {
      await acceptInvite(null, currentUser?.id);
    } catch (e) {
      console.warn('Accept error:', e.message);
    }
  };

  // Decline incoming interest
  const declineInterest = (id) => {
    setReceivedInterests((prev) => prev.filter((item) => item !== id));
    showToast('Invitation declined', 'info');
  };

  // Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (currentUser?.id) {
      markNotificationsAsRead(currentUser.id).catch(() => {});
    }
  };

  // Update Profile Function (Calls Backend & updates Local User)
  const updateCurrentUserProfile = async (profileData) => {
    if (!currentUser?.id) {
      showToast('Please sign in to save your profile.', 'error');
      return false;
    }

    try {
      const res = await updateUserProfile(currentUser.id, profileData);
      
      const updatedUser = {
        ...currentUser,
        ...(res.user || {}),
        name: profileData.name || currentUser.name,
        phone: profileData.phone || currentUser.phone,
        email: profileData.email || currentUser.email,
        gender: profileData.gender || currentUser.gender,
        profile: {
          ...(currentUser.profile || {}),
          ...(profileData.profile || profileData)
        }
      };

      setCurrentUser(updatedUser);
      localStorage.setItem('bandhan_user', JSON.stringify(updatedUser));
      
      // Reload registered profiles so the updated user appears fresh in browse/home
      loadRegisteredProfiles();

      // Log notification
      const updateNotif = {
        id: 'notif_prof_' + Date.now(),
        title: 'Profile Updated Successfully',
        message: 'Your matrimonial biodata and partner preferences have been saved and synced.',
        timestamp: new Date().toISOString(),
        read: false,
        type: 'profile_update'
      };
      setNotifications((prev) => [updateNotif, ...prev]);

      showToast('✅ Profile updated and saved successfully!', 'success');
      return true;
    } catch (err) {
      showToast(`Error saving profile: ${err.message}`, 'error');
      return false;
    }
  };

  const openProfileDetail = (id) => {
    setSelectedProfileId(id);
    setIsDetailModalOpen(true);
  };

  const closeProfileDetail = () => {
    setIsDetailModalOpen(false);
  };

  const navigateTo = (page, filterUpdates = null) => {
    if (filterUpdates) {
      setSearchFilters((prev) => ({ ...prev, ...filterUpdates }));
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProfile = registeredProfiles.find((p) => p.id === selectedProfileId) ||
                          MOCK_PROFILES.find((p) => p.id === selectedProfileId) || null;

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        searchFilters,
        setSearchFilters,
        shortlistedIds,
        toggleShortlist,
        sentInterests,
        sendInterest,
        receivedInterests,
        acceptInterest,
        declineInterest,
        acceptedConnections,
        activeChatRecipientId,
        setActiveChatRecipientId,
        openProfileDetail,
        closeProfileDetail,
        selectedProfile,
        isDetailModalOpen,
        toastMessage,
        showToast,
        currentUser,
        authToken,
        isAuthenticated: Boolean(currentUser && authToken),
        handleAuthSuccess,
        logout,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        allProfiles: registeredProfiles,
        registeredProfiles,
        isLoadingProfiles,
        loadRegisteredProfiles,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsRead,
        refreshNotifications,
        updateCurrentUserProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
