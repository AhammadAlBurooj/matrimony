import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { QuickSearchCard } from './QuickSearchCard';

export const HeroSection = () => {
  const { navigateTo, openAuthModal, currentUser } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-rose-50/60 via-amber-50/20 to-[#FAFAFA]">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-rose-200/30 via-amber-100/30 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-rose-200/20 blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-amber-200/20 blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200/80 shadow-xs mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="text-xs font-semibold text-gray-800 tracking-wide">
            India's Most Trusted & Discerning Matrimonial Network
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          <span className="text-xs font-bold text-amber-700">100% Aadhaar Verified</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Where Destined Hearts Meet with{' '}
          <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 bg-clip-text text-transparent italic">
            Dignity, Heritage
          </span>{' '}
          & True Compatibility
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Uniting educated professionals and distinguished families. Experience transparent matchmaking powered by 36-point Vedic astrology, verified credentials, and deep lifestyle harmony.
        </p>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('browse')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Curated Matches</span>
          </button>

          <button
            onClick={() => currentUser ? navigateTo('profile-builder') : openAuthModal('register')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Complete My Free Profile</span>
          </button>
        </div>

        {/* Reassurance Micro-Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-rose-600" />
            <span>Government ID Verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>100% Privacy Control</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-rose-600" />
            <span>Zero Fake or Dormant Accounts</span>
          </div>
        </div>
      </div>

      {/* Floating Quick Search Filter Card Embedded Below Hero Text */}
      <QuickSearchCard />
    </section>
  );
};

