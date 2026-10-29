import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Bookmark,
  ShieldCheck,
  Crown,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Users,
  Loader2,
  Search,
  Send,
  Check,
  UserCheck
} from 'lucide-react';

export const RegisteredProfilesSection = () => {
  const {
    registeredProfiles,
    isLoadingProfiles,
    searchFilters,
    setSearchFilters,
    openProfileDetail,
    shortlistedIds,
    toggleShortlist,
    sentInterests,
    sendInterest
  } = useApp();

  const handleGenderSwitch = (gender) => {
    setSearchFilters((prev) => ({
      ...prev,
      gender
    }));
  };

  const handleResetFilters = () => {
    setSearchFilters({
      gender: 'all',
      minAge: 18,
      maxAge: 55,
      religion: 'All Religions',
      caste: 'All Communities',
      city: 'All Locations',
      searchQuery: '',
      verifiedOnly: false,
      minMatchScore: 85
    });
  };

  const currentGender = searchFilters.gender || 'female';

  return (
    <section id="registered-profiles-section" className="py-12 sm:py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold tracking-wider uppercase mb-2 border border-rose-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Registered Members Directory</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {currentGender === 'female' ? 'Registered Brides (Sisters)' :
               currentGender === 'male' ? 'Registered Grooms (Brothers)' :
               'All Verified Registered Members'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Real registered biodatas adhering to Sunnah principles • Direct invites & notifications enabled
            </p>
          </div>

          {/* Gender Switcher & Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 rounded-2xl bg-gray-100/80 border border-gray-200/80 shadow-inner">
              <button
                onClick={() => handleGenderSwitch('female')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentGender === 'female'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👰 Brides (Sisters)
              </button>

              <button
                onClick={() => handleGenderSwitch('male')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentGender === 'male'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🤵 Grooms (Brothers)
              </button>

              <button
                onClick={() => handleGenderSwitch('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentGender === 'all'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👥 All ({registeredProfiles.length})
              </button>
            </div>

            <span className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-white text-gray-800 text-xs font-bold border border-gray-200 shadow-xs items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-600" />
              <span>{registeredProfiles.length} Profiles Available</span>
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingProfiles ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="w-8 h-8 text-rose-600 animate-spin mb-3" />
            <p className="text-sm font-medium">Loading verified registered members...</p>
          </div>
        ) : registeredProfiles.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-rose-200 max-w-2xl mx-auto my-6 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              No Registered Profiles Match Current Filters
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Try widening your age range or switching between Brides and Grooms.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Registered Members</span>
            </button>
          </div>
        ) : (
          /* Profiles Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {registeredProfiles.map((profile) => {
              const isShortlisted = shortlistedIds.includes(profile.id);
              const isInterestSent = sentInterests.includes(profile.id);
              
              const photo = profile.photos && profile.photos.length > 0
                ? profile.photos[0]
                : (profile.gender === 'female'
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800');

              return (
                <div
                  key={profile.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-rose-200 shadow-xs hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Photo & Badges */}
                    <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                      <img
                        src={photo}
                        alt={profile.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = profile.gender === 'female'
                            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
                            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      
                      {/* Dark gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-rose-700 shadow-xs backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-rose-600" />
                          {profile.matchScore || 94}% Match
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600/90 text-white shadow-xs backdrop-blur-xs">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      </div>

                      {/* Shortlist Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleShortlist(profile.id);
                        }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
                          isShortlisted
                            ? 'bg-rose-600 text-white shadow-md'
                            : 'bg-white/85 hover:bg-white text-gray-700 hover:text-rose-600'
                        }`}
                        title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isShortlisted ? 'fill-white' : ''}`}
                        />
                      </button>

                      {/* Bottom Photo Details */}
                      <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-lg font-bold truncate">
                            {profile.name}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-200 mt-0.5 font-medium flex items-center gap-2">
                          <span>{profile.age} yrs</span>
                          <span>•</span>
                          <span>{profile.height || "5'7\""}</span>
                          <span>•</span>
                          <span className="capitalize">{profile.gender === 'female' ? 'Bride' : 'Groom'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Profile Body */}
                    <div className="p-5 space-y-3">
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate font-semibold text-gray-800">
                            {profile.occupation || 'Professional'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">
                            {profile.education || 'Graduate'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate font-medium">
                            {profile.city}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                          <span className="truncate font-medium text-gray-700">
                            {profile.religion || 'Islam'} • {profile.caste || 'Salafi'}
                          </span>
                          <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[10px] shrink-0">
                            {profile.maritalStatus || 'Never married'}
                          </span>
                        </div>

                        {profile.bio && (
                          <p className="text-[11px] text-gray-500 line-clamp-2 italic pt-1 leading-relaxed">
                            "{profile.bio}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: View Bio & Send Invite / Express Interest */}
                  <div className="p-5 pt-0 border-t border-gray-100 grid grid-cols-2 gap-2 mt-auto">
                    <button
                      onClick={() => openProfileDetail(profile.id)}
                      className="w-full py-2.5 px-2 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors text-center cursor-pointer"
                    >
                      View Bio
                    </button>

                    <button
                      onClick={() => sendInterest(profile.id, profile.name)}
                      disabled={isInterestSent}
                      className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isInterestSent
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs cursor-default'
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 active:scale-98'
                      }`}
                      title={isInterestSent ? 'Invitation already dispatched' : 'Send Invite / Express Interest'}
                    >
                      {isInterestSent ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Invited ✓</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-white" />
                          <span>Invite</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
