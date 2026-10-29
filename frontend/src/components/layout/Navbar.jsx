import React, { useState } from 'react';
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
  LogOut
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentPage,
    navigateTo,
    receivedInterests,
    shortlistedIds,
    currentUser,
    logout,
    openAuthModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const pendingInterestsCount = receivedInterests.length;
  const shortlistCount = shortlistedIds.length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    {
      id: 'browse',
      label: 'Browse Matches',
      icon: Search,
      badge: 'New'
    },
    {
      id: 'connections',
      label: 'Connections & Chats',
      icon: MessageCircle,
      badgeCount: pendingInterestsCount
    },
    {
      id: 'profile-builder',
      label: 'My Profile',
      icon: User,
      subtext: currentUser ? `${currentUser.completionRate || 85}% Done` : null
    }
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all duration-200">
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
                  Bandhan
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase tracking-widest">
                  Royal
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-500 -mt-0.5 tracking-wider uppercase">
                Vedic & Modern Matchmaking
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
          <div className="hidden lg:flex items-center gap-3">
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

            {/* If Authenticated: User Capsule */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
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
                      {currentUser.membership || 'Gold Member'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Profile Popup Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 py-2.5 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-rose-600 h-1.5 rounded-full"
                          style={{ width: `${currentUser.completionRate || 85}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1 inline-block">
                        Profile {currentUser.completionRate || 85}% complete
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavClick('profile-builder')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      Edit Profile & Preferences
                    </button>
                    <button
                      onClick={() => handleNavClick('connections')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      Chats & Received Requests
                    </button>
                    
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
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('connections')}
              className="p-2 rounded-lg text-gray-600 relative cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              {pendingInterestsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {pendingInterestsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-rose-600' : 'text-gray-400'}`} />
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

            {/* Mobile Auth Actions */}
            <div className="pt-3 border-t border-gray-100 px-2 space-y-2">
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign Out ({currentUser.name})</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs text-center shadow-xs"
                  >
                    Register Free
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
