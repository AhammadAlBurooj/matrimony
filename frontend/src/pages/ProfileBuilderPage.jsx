import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, ArrowLeft } from 'lucide-react';

export const ProfileBuilderPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <button
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
      </button>

      <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-rose-200">
        <UserCheck className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-bold text-gray-800">
          Profile Builder & Preference Settings
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
          Multi-step form for personal, professional, family, and Vedic partner criteria.
        </p>
      </div>
    </div>
  );
};

