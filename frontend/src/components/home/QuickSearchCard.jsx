import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Users,
  MapPin,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { RELIGIONS_LIST, COMMUNITIES_LIST, CITIES_LIST } from '../../data/mockData';

export const QuickSearchCard = () => {
  const { navigateTo, searchFilters } = useApp();

  const [gender, setGender] = useState('female');
  const [ageRange, setAgeRange] = useState('24-30');
  const [religion, setReligion] = useState('All Religions');
  const [caste, setCaste] = useState('All Communities');
  const [city, setCity] = useState('All Locations');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const [minAgeStr, maxAgeStr] = ageRange.split('-');
    navigateTo('browse', {
      gender,
      minAge: parseInt(minAgeStr, 10) || 21,
      maxAge: parseInt(maxAgeStr, 10) || 35,
      religion,
      caste,
      city
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 sm:-mt-14 relative z-20 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-100 p-6 sm:p-8 transition-all hover:shadow-rose-950/10">
        
        {/* Card Header & Fast Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
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
              onClick={() => setGender('female')}
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
              onClick={() => setGender('male')}
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
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            >
              <option value="21-25">21 to 25 Years</option>
              <option value="24-30">24 to 30 Years</option>
              <option value="28-34">28 to 34 Years</option>
              <option value="32-40">32 to 40 Years</option>
              <option value="38-50">38+ Years</option>
            </select>
          </div>

          {/* Religion Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <span>Religion</span>
            </label>
            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
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
              <span>Community / Caste</span>
            </label>
            <select
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
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
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            >
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Action (Full Width on Mobile, spanning all columns below) */}
          <div className="sm:col-span-2 lg:col-span-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span><strong>1,840+ Active Verified Profiles</strong> waiting for you</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
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

