import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { UserCheck, Sparkles, MessageCircleHeart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const stepIcons = {
  UserCheck,
  Sparkles,
  MessageCircleHeart
};

export const HowItWorksSection = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3 border border-rose-200">
            Effortless & Respectful Journey
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            How Bandhan Unites Destined Souls
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            A harmonious blend of timeless cultural values and modern privacy safeguards designed to help you meet the right life partner with confidence.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line behind steps on desktop */}
          <div className="hidden md:block absolute top-1/2 left-24 right-24 h-0.5 bg-gradient-to-r from-rose-200 via-amber-200 to-rose-200 -translate-y-12 -z-0" />

          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = stepIcons[step.iconName] || UserCheck;
            return (
              <div
                key={step.step}
                className="relative z-10 bg-white rounded-3xl p-8 border border-gray-100 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Step Pill */}
                <span className="w-10 h-10 rounded-full bg-amber-500 text-white font-mono font-bold text-sm flex items-center justify-center mb-6 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  {step.step}
                </span>

                {/* Main Icon */}
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('profile-builder')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/25 transition-all hover:scale-102 cursor-pointer"
          >
            <span>Begin Your Journey Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

