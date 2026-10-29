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
  ArrowRight,
  Send
} from 'lucide-react';

export const FeaturedProfilesSection = () => {
  const {
    allProfiles,
    navigateTo,
    openProfileDetail,
    shortlistedIds,
    toggleShortlist,
    sentInterests,
    sendInterest
  } = useApp();

  const featuredList = allProfiles.slice(0, 4);

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3 border border-rose-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked For You</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Featured Verified Matches
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Profiles with high astrological, educational, and lifestyle alignment.
            </p>
          </div>

          <button
            onClick={() => navigateTo('browse')}
            className="flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors group cursor-pointer"
          >
            <span>View All Matches ({allProfiles.length * 300}+)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((profile) => {
            const isShortlisted = shortlistedIds.includes(profile.id);
            const isInterestSent = sentInterests.includes(profile.id);

            return (
              <div
                key={profile.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-rose-200 shadow-sm hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col"
              >
                {/* Photo & Overlays */}
                <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-rose-700 shadow-sm backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-rose-600" />
                      {profile.matchScore}% Match
                    </span>
                    {profile.isPremium && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                        <Crown className="w-3 h-3" />
                        Gold
                      </span>
                    )}
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
                        : 'bg-white/80 hover:bg-white text-gray-700 hover:text-rose-600'
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
                    <p className="text-xs text-gray-200 mt-0.5">
                      {profile.age} yrs • {profile.height}
                    </p>
                  </div>
                </div>

                {/* Profile Meta Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate font-medium text-gray-800">
                        {profile.profession}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">
                        {profile.education.split('-')[0]}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">
                        {profile.city}, {profile.state}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{profile.religion} • {profile.caste}</span>
                      <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {profile.horoscope.gunaMilanScore.split(' ')[0]} Gunas
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openProfileDetail(profile.id)}
                      className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors text-center cursor-pointer"
                    >
                      View Bio
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
                        <>
                          <span>Sent ✓</span>
                        </>
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

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('browse')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-sm shadow-xs transition-all hover:shadow-md cursor-pointer"
          >
            <span>Explore All Recommended Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

