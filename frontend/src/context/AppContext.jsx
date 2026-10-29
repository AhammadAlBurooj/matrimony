import React, { createContext, useContext, useState } from 'react';
import { MOCK_PROFILES } from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'browse' | 'connections' | 'profile-builder'
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Search and filter state (can be initialized from Quick Search on Home)
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

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from your Shortlist' : 'Profile added to Shortlist', 'info');
      return updated;
    });
  };

  const sendInterest = (id) => {
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

  // Mock logged-in user
  const currentUser = {
    name: 'Devendra Rathore',
    id: 'BM9901',
    membership: 'Gold Royal Member',
    // avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    completionRate: 88,
    credits: 14
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

