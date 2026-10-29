import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Users,
  MapPin,
  Sparkles,
  BookOpen,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { RELIGIONS_LIST, COMMUNITIES_LIST, CITIES_LIST } from '../../data/mockData';

export const QuickSearchCard = () => {
  const {
    searchFilters,
    setSearchFilters,
    registeredProfiles,
    isLoadingProfiles
  } = useApp();

  const [gender, setGender] = useState(searchFilters.gender || 'female');
  const [ageRange, setAgeRange] = useState(`${searchFilters.minAge || 18}-${searchFilters.maxAge || 40}`);
  const [religion, setReligion] = useState(searchFilters.religion || 'All Religions');
  const [caste, setCaste] = useState(searchFilters.caste || 'All Communities');
  const [city, setCity] = useState(searchFilters.city || 'All Locations');

  // Keep local state in sync if global searchFilters updates
  useEffect(() => {
    if (searchFilters.gender) setGender(searchFilters.gender);
    if (searchFilters.minAge && searchFilters.maxAge) {
      setAgeRange(`${searchFilters.minAge}-${searchFilters.maxAge}`);
    }
    if (searchFilters.religion) setReligion(searchFilters.religion);
    if (searchFilters.caste) setCaste(searchFilters.caste);
    if (searchFilters.city) setCity(searchFilters.city);
  }, [searchFilters]);

  // Apply filters directly to context
  const applyFilterUpdates = (updates) => {
    setSearchFilters((prev) => ({
      ...prev,
      ...updates
    }));
  };

  const handleGenderToggle = (newGender) => {
    setGender(newGender);
    applyFilterUpdates({ gender: newGender });
  };

  const handleAgeChange = (val) => {
    setAgeRange(val);
    const [minStr, maxStr] = val.split('-');
    applyFilterUpdates({
      minAge: parseInt(minStr, 10) || 18,
      maxAge: parseInt(maxStr, 10) || 50
    });
  };

  const handleReligionChange = (val) => {
    setReligion(val);
    applyFilterUpdates({ religion: val });
  };

  const handleCasteChange = (val) => {
    setCaste(val);
    applyFilterUpdates({ caste: val });
  };

  const handleCityChange = (val) => {
    setCity(val);
    applyFilterUpdates({ city: val });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const [minStr, maxStr] = ageRange.split('-');
    applyFilterUpdates({
      gender,
      minAge: parseInt(minStr, 10) || 18,
      maxAge: parseInt(maxStr, 10) || 50,
      religion,
      caste,
      city
    });

    const el = document.getElementById('registered-profiles-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pt-6 pb-2 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 transition-all hover:shadow-rose-950/10">
        
        {/* Card Header & Fast Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                Find Your Ideal Soulmate
              </h3>
              <p className="text-xs text-gray-500">
                Filter through hand-verified, culturally harmonious profiles
              </p>
            </div>
          </div>

          {/* Bride / Groom Pill Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-gray-100 border border-gray-200 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleGenderToggle('female')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                gender === 'female'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Seeking Bride
            </button>
            <button
              type="button"
              onClick={() => handleGenderToggle('male')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                gender === 'male'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Seeking Groom
            </button>
          </div>
        </div>

        {/* Filter Inputs Grid */}
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Age Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <span>Age Preference</span>
            </label>
            <select
              value={ageRange}
              onChange={(e) => handleAgeChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors cursor-pointer"
            >
              <option value="18-50">All Ages (18 - 50)</option>
              <option value="18-24">18 to 24 Years</option>
              <option value="21-25">21 to 25 Years</option>
              <option value="21-30">21 to 30 Years</option>
              <option value="24-30">24 to 30 Years</option>
              <option value="26-35">26 to 35 Years</option>
              <option value="30-45">30 to 45 Years</option>
            </select>
          </div>

          {/* Religion Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <span>Religion</span>
            </label>
            <select
              value={religion}
              onChange={(e) => handleReligionChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors cursor-pointer"
            >
              {RELIGIONS_LIST.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          {/* Community Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <span>Community / Manhaj</span>
            </label>
            <select
              value={caste}
              onChange={(e) => handleCasteChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors cursor-pointer"
            >
              {COMMUNITIES_LIST.map((comm) => (
                <option key={comm} value={comm}>
                  {comm}
                </option>
              ))}
            </select>
          </div>

          {/* Location Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Location</span>
            </label>
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors cursor-pointer"
            >
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Action & Live Status */}
          <div className="sm:col-span-2 lg:col-span-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {isLoadingProfiles ? (
                <Loader2 className="w-3.5 h-3.5 text-rose-600 animate-spin" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              )}
              <span>
                <strong>{registeredProfiles.length} Active Verified {registeredProfiles.length === 1 ? 'Profile' : 'Profiles'}</strong> {gender === 'female' ? 'waiting for you' : 'seeking match'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <Search className="w-4 h-4" />
              <span>Search Verified Matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
