import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, Sparkles, ArrowLeft } from 'lucide-react';

export const BrowsePage = () => {
  const { searchFilters, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Browse Matches
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Displaying matches for {searchFilters.gender === 'female' ? 'Brides' : 'Grooms'} • {searchFilters.religion} • {searchFilters.city}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
            Phase 2 Ready
          </span>
        </div>
      </div>

      <div className="mt-8 p-12 text-center rounded-3xl bg-white border border-dashed border-rose-200">
        <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="font-serif text-xl font-bold text-gray-800">
          Browse & Search Results View
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
          Phase 1 is now active! Phase 2 will implement the advanced multi-faceted filter sidebar, live match score indicators, and grid view.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700 transition-all cursor-pointer"
        >
          Return to Landing Page
        </button>
      </div>
    </div>
  );
};

