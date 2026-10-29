import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROFILES } from '../data/mockData';

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

  // Current page: if user is not authenticated when entering app, default to 'login'
  const [currentPage, setCurrentPage] = useState(() => {
    const token = localStorage.getItem('bandhan_token');
    const user = localStorage.getItem('bandhan_user');
    return (token && user) ? 'home' : 'login'; // 'login' | 'register' | 'home' | 'browse' | 'connections' | 'profile-builder'
  });

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Auth Modal State (optional popup version)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Search and filter state
  const [searchFilters, setSearchFilters] = useState({
    gender: 'female',
    minAge: 24,
    maxAge: 32,
    religion: 'All Religions',
    caste: 'All Communities',
    city: 'All Locations',
    searchQuery: '',
    verifiedOnly: false,
    minMatchScore: 85
  });

  // Shortlist and Interests tracking
  const [shortlistedIds, setShortlistedIds] = useState(['BM1026']);
  const [sentInterests, setSentInterests] = useState(['BM1024']);
  const [receivedInterests, setReceivedInterests] = useState(['BM1025', 'BM1028']);
  const [acceptedConnections, setAcceptedConnections] = useState(['BM1027']);

  // Active chat recipient ID for the messaging tab
  const [activeChatRecipientId, setActiveChatRecipientId] = useState('BM1027');

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openAuthModal = (mode = 'login') => {
    navigateTo(mode);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = (userData, token) => {
    const formattedUser = {
      ...userData,
      membership: userData.membership || 'Gold Royal Member',
      avatar: userData.avatar || (userData.gender === 'female' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'),
      completionRate: userData.completionRate || 92,
      credits: userData.credits || 15
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
      showToast(exists ? 'Removed from your Shortlist' : 'Profile added to Shortlist', 'info');
      return updated;
    });
  };

  const sendInterest = (id) => {
    if (!currentUser) {
      navigateTo('login');
      showToast('Please sign in to send an interest', 'info');
      return;
    }
    if (sentInterests.includes(id)) {
      showToast('Interest already sent to this profile', 'info');
      return;
    }
    setSentInterests((prev) => [...prev, id]);
    showToast('✨ Express Interest sent successfully! We will notify you when accepted.', 'success');
  };

  const acceptInterest = (id) => {
    setReceivedInterests((prev) => prev.filter((item) => item !== id));
    setAcceptedConnections((prev) => [...prev, id]);
    showToast('Connection accepted! You can now chat securely.', 'success');
  };

  const declineInterest = (id) => {
    setReceivedInterests((prev) => prev.filter((item) => item !== id));
    showToast('Interest declined', 'info');
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

  const selectedProfile = MOCK_PROFILES.find((p) => p.id === selectedProfileId) || null;

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
        allProfiles: MOCK_PROFILES
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
