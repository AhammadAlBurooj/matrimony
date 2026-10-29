import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Search,
  MessageCircle,
  User,
  Crown,
  Menu,
  X,
  ChevronDown,
  Bookmark,
  LogIn,
  UserPlus,
  LogOut,
  FileSpreadsheet,
  Bell,
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentPage,
    navigateTo,
    receivedInterests,
    shortlistedIds,
    currentUser,
    logout,
    openAuthModal,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsRead
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pendingInterestsCount = receivedInterests.length;
  const shortlistCount = shortlistedIds.length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    {
      id: 'browse',
      label: 'Browse Matches',
      icon: Search,
      badge: 'Active'
    },
    {
      id: 'connections',
      label: 'Invites & Connections',
      icon: MessageCircle,
      badgeCount: pendingInterestsCount
    },
    {
      id: 'profile-builder',
      label: 'My Profile & Edit',
      icon: User,
      subtext: currentUser ? `${currentUser.completionRate || 95}% Complete` : null
    }
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 group-hover:text-rose-600 transition-colors">
                  Salafi
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase tracking-widest">
                  Royal
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-500 -mt-0.5 tracking-wider uppercase">
                Matchmaking
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-semibold shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-rose-600 stroke-[2.5]' : 'text-gray-500'
                    }`}
                  />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-rose-100 text-rose-700">
                      {item.badge}
                    </span>
                  )}

                  {item.badgeCount > 0 && (
                    <span className="flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold rounded-full bg-rose-600 text-white shadow-xs">
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & User Dropdown */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Notification Bell with Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                title="Notifications & Invites"
                className="relative p-2.5 rounded-xl text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-84 sm:w-96 rounded-2xl bg-white shadow-2xl border border-gray-100 py-3 z-50 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-rose-600" />
                      <h4 className="text-sm font-bold text-gray-900">Notifications & Invites</h4>
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-gray-400 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.slice(0, 7).map((n) => (
                        <div
                          key={n.id}
                          className={`p-3.5 hover:bg-gray-50/80 transition-colors flex items-start gap-3 ${
                            !n.read ? 'bg-rose-50/30' : ''
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            n.type === 'interest_sent' ? 'bg-amber-100 text-amber-700' :
                            n.type === 'interest_accepted' ? 'bg-emerald-100 text-emerald-700' :
                            n.type === 'interest_received' ? 'bg-rose-100 text-rose-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {n.type === 'interest_sent' ? <Send className="w-4 h-4" /> :
                             n.type === 'interest_accepted' ? <CheckCircle2 className="w-4 h-4" /> :
                             n.type === 'interest_received' ? <Heart className="w-4 h-4 fill-rose-600" /> :
                             <Sparkles className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-gray-900 truncate">{n.title}</p>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>}
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                            <span className="text-[10px] text-gray-400 mt-1 inline-block">
                              {n.timestamp ? new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-gray-100 bg-gray-50/50 text-center">
                    <button
                      onClick={() => handleNavClick('connections')}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All in Invites & Connections</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shortlist Quick Icon */}
            <button
              onClick={() => handleNavClick('browse')}
              title="Shortlisted Profiles"
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Bookmark className="w-5 h-5" />
              {shortlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </button>

            {/* Excel Sheet Download Button */}
            <a
              href="http://localhost:5001/api/auth/export-excel"
              target="_blank"
              rel="noopener noreferrer"
              download="Salafi_Matrimony_Registrations.xlsx"
              title="Download All Registrations (Excel Sheet)"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 hover:text-emerald-800 transition-all cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Excel</span>
            </a>

            {/* If Authenticated: User Capsule */}
            {currentUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 hover:border-rose-200 hover:bg-rose-50/50 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500/20"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold text-gray-800 leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-amber-600 font-medium leading-tight">
                      {currentUser.membership || 'Royal Member'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Profile Popup Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 py-2.5 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email || currentUser.phone}</p>
                      <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-rose-600 h-1.5 rounded-full"
                          style={{ width: `${currentUser.completionRate || 95}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1 inline-block">
                        Profile {currentUser.completionRate || 95}% complete
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavClick('profile-builder')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50/50 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-rose-600" />
                      Edit My Profile & Preferences
                    </button>
                    <button
                      onClick={() => handleNavClick('connections')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      Invites & Connections ({pendingInterestsCount})
                    </button>

                    <a
                      href="http://localhost:5001/api/auth/export-excel"
                      download="Salafi_Matrimony_Registrations.xlsx"
                      className="w-full text-left px-4 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      Export Data to Excel (.xlsx)
                    </a>
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If NOT Logged In: Sign In / Register Buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-rose-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => openAuthModal('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-md shadow-rose-600/20 transition-all hover:scale-102 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Free</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile notification bell */}
            <button
              onClick={() => handleNavClick('connections')}
              className="relative p-2 text-gray-700 hover:text-rose-600"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-rose-50 text-rose-700 font-bold' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badgeCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('profile-builder')}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs"
            >
              <User className="w-4 h-4" />
              <span>Edit My Profile</span>
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({currentUser.name})</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="py-2.5 text-center text-xs font-bold border border-gray-200 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('register');
                  }}
                  className="py-2.5 text-center text-xs font-bold bg-rose-600 text-white rounded-xl shadow-xs"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
