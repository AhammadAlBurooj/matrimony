import React from 'react';
import { SUCCESS_STORIES } from '../../data/mockData';
import { Heart, Sparkles, Quote, MapPin } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FAFAFA] to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3 border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Real Unions, Eternal Love</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Loved By Over 500,000+ Happy Couples
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Read how couples found mutual respect, emotional understanding, and lasting marital bliss through Bandhan.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <img
                  src={story.image}
                  alt={story.couple}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <h4 className="font-serif text-lg font-bold">{story.couple}</h4>
                  <div className="flex items-center gap-1 text-xs text-rose-200">
                    <MapPin className="w-3 h-3" />
                    <span>{story.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="relative">
                  <Quote className="w-8 h-8 text-rose-200 mb-2 -mt-1" />
                  <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                    "{story.story}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                  <span>{story.weddingDate}</span>
                  <span className="flex items-center gap-1 text-rose-600">
                    <Heart className="w-3.5 h-3.5 fill-rose-600" /> Verified Union
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

