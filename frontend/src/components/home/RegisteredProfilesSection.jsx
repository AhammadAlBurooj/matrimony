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
  Loader2
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

  const handleResetFilters = () => {
    setSearchFilters({
      gender: searchFilters.gender || 'female',
      minAge: 18,
      maxAge: 50,
      religion: 'All Religions',
      caste: 'All Communities',
      city: 'All Locations',
      searchQuery: '',
      verifiedOnly: false,
      minMatchScore: 85
    });
  };

  const isSister = searchFilters.gender === 'female';

  return (
    <section id="registered-profiles-section" className="py-12 sm:py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold tracking-wider uppercase mb-2 border border-rose-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Registered Members</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {isSister ? 'Registered Brides (Sisters)' : 'Registered Grooms (Brothers)'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Showing verified registered profiles matching: Age {searchFilters.minAge}-{searchFilters.maxAge} • {searchFilters.religion} • {searchFilters.city}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-white text-gray-800 text-xs font-bold border border-gray-200 shadow-xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-600" />
              <span>{registeredProfiles.length} {registeredProfiles.length === 1 ? 'Profile' : 'Profiles'} Found</span>
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingProfiles ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="w-8 h-8 text-rose-600 animate-spin mb-3" />
            <p className="text-sm font-medium">Filtering verified registered profiles...</p>
          </div>
        ) : registeredProfiles.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-rose-200 max-w-2xl mx-auto my-6 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              No Registered Profiles Match These Exact Filters
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
              We couldn't find registered {isSister ? 'brides' : 'grooms'} for {searchFilters.city} within age {searchFilters.minAge}-{searchFilters.maxAge}. Try widening your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters & Show All {isSister ? 'Brides' : 'Grooms'}</span>
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
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-rose-200 shadow-sm hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col"
                >
                  {/* Photo & Overlays */}
                  <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                    <img
                      src={photo}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-rose-700 shadow-sm backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-rose-600" />
                        {profile.matchScore || 92}% Match
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600/90 text-white shadow-xs backdrop-blur-xs">
                        <ShieldCheck className="w-3 h-3" />
                        Registered Member
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
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif text-lg font-bold truncate">
                          {profile.name}
                        </h3>
                        {profile.verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-200 mt-0.5 font-medium">
                        {profile.age} yrs • {profile.height || "5'7\""}
                      </p>
                    </div>
                  </div>

                  {/* Profile Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
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

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span className="truncate font-medium text-gray-700">
                          {profile.religion || 'Islam'} • {profile.caste || (profile.manhaj ? 'Salafi' : 'Muslim')}
                        </span>
                        <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[10px] shrink-0">
                          {profile.maritalStatus || 'Never married'}
                        </span>
                      </div>

                      {profile.bio && (
                        <p className="text-[11px] text-gray-500 line-clamp-2 italic pt-1">
                          "{profile.bio}"
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openProfileDetail(profile.id)}
                        className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors text-center cursor-pointer"
                      >
                        View Full Bio
                      </button>

                      <button
                        onClick={() => sendInterest(profile.id)}
                        disabled={isInterestSent}
                        className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isInterestSent
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                        }`}
                      >
                        {isInterestSent ? (
                          <span>Sent ✓</span>
                        ) : (
                          <>
                            <Heart className="w-3.5 h-3.5 fill-white" />
                            <span>Interest</span>
                          </>
                        )}
                      </button>
                    </div>
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

