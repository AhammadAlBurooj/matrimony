import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Bookmark,
  User,
  BookOpen,
  Home,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  Lock
} from 'lucide-react';

export const ProfileDetailModal = () => {
  const {
    isDetailModalOpen,
    closeProfileDetail,
    selectedProfile,
    shortlistedIds,
    toggleShortlist,
    sentInterests,
    sendInterest,
    currentUser
  } = useApp();

  if (!isDetailModalOpen || !selectedProfile) return null;

  const isShortlisted = shortlistedIds.includes(selectedProfile.id);
  const isInterestSent = sentInterests.includes(selectedProfile.id);

  const photos = selectedProfile.photos && selectedProfile.photos.length > 0
    ? selectedProfile.photos
    : [
        selectedProfile.gender === 'female'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
      ];

  const family = selectedProfile.family || {};
  const preferences = selectedProfile.preferences || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-rose-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Registered Member
            </span>
            <span className="text-xs font-semibold text-gray-500">ID: {selectedProfile.id}</span>
          </div>

          <button
            onClick={closeProfileDetail}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Top Profile Intro */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-full sm:w-48 h-60 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-sm">
              <img
                src={photos[0]}
                alt={selectedProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                {selectedProfile.matchScore || 92}% Match
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    {selectedProfile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {selectedProfile.displayGender || (selectedProfile.gender === 'female' ? 'Sister (Bride)' : 'Brother (Groom)')}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mt-1">
                  {selectedProfile.age} yrs • {selectedProfile.height || "5'7\""} • {selectedProfile.maritalStatus || 'Never married'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-medium text-gray-800">{selectedProfile.occupation || selectedProfile.profession || 'Professional'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{selectedProfile.education || 'Graduate'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{selectedProfile.city || 'Kerala, India'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{selectedProfile.religion || 'Islam'} • {selectedProfile.caste || selectedProfile.manhaj ? 'Salafi' : 'Muslim'}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">About & Bio</h4>
                <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed bg-rose-50/40 p-3.5 rounded-xl border border-rose-100/60">
                  {selectedProfile.bio || 'Practicing upon the Sunnah, looking for a pious and compatible partner.'}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            
            {/* Religious Practice & Deen Details */}
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-600" />
                <span>Religious Practice & Manhaj</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-500">Manhaj / Creed:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{selectedProfile.manhaj || 'Upon Quran & Sunnah according to the Salaf'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Prayer (Salah):</span>
                  <p className="font-medium text-gray-800 mt-0.5">{selectedProfile.prayerPractice || '5 times daily on time'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Islamic Dressing / Sunnah:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{selectedProfile.hijabOrBeardPreference || (selectedProfile.gender === 'female' ? 'Observes Shar’i Hijab & Abaya' : 'Sunnah Beard')}</p>
                </div>
                {selectedProfile.religiousEducation && (
                  <div>
                    <span className="text-gray-500">Religious Learning:</span>
                    <p className="font-medium text-gray-800 mt-0.5">{selectedProfile.religiousEducation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Family Background */}
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Home className="w-4 h-4 text-rose-600" />
                <span>Family Background</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-500">Father's Occupation:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{family.fatherOccupation || family.father || 'Respected Family'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Mother's Occupation:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{family.motherOccupation || family.mother || 'Homemaker'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Siblings:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{family.siblingsCount || family.siblings || 'Information available on request'}</p>
                </div>
                {family.nativePlace && (
                  <div>
                    <span className="text-gray-500">Native Place:</span>
                    <p className="font-medium text-gray-800 mt-0.5">{family.nativePlace}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Partner Expectations */}
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-3 md:col-span-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Partner Preferences & Expectations</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Preferred Age:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{preferences.preferredAgeRange || '21 - 30 Years'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Preferred Location:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{preferences.preferredLocation || 'Open / Anywhere'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Relocation:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{preferences.willingnessToRelocate || 'Open to relocate'}</p>
                </div>
                <div className="sm:col-span-3">
                  <span className="text-gray-500">Religious Alignment:</span>
                  <p className="font-medium text-gray-800 mt-0.5">{preferences.religiousCompatibility || 'Strictly practicing upon the Sunnah and good Akhlaq.'}</p>
                </div>
              </div>
            </div>

            {/* Guardian & Contact (Secured) */}
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/60 md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Guardian Contact Privacy Protected</h4>
                  <p className="text-xs text-gray-600">
                    {family.guardianContact ? `Guardian: ${family.guardianContact}` : 'Express interest to request direct guardian contact under Islamic guidelines.'}
                  </p>
                </div>
              </div>

              {currentUser && selectedProfile.phone && (
                <div className="text-xs font-bold text-amber-900 bg-white px-3 py-1.5 rounded-xl border border-amber-200">
                  📞 {selectedProfile.phone}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            onClick={() => toggleShortlist(selectedProfile.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              isShortlisted
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-rose-600' : ''}`} />
            <span>{isShortlisted ? 'Shortlisted' : 'Shortlist Profile'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={closeProfileDetail}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => sendInterest(selectedProfile.id)}
              disabled={isInterestSent}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isInterestSent
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-md shadow-rose-600/30'
              }`}
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isInterestSent ? 'Interest Sent ✓' : 'Express Interest'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

