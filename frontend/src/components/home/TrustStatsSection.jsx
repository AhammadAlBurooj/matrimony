import React from 'react';
import { TRUST_STATS } from '../../data/mockData';
import { ShieldCheck, HeartHandshake, Lock, Award } from 'lucide-react';

const iconMap = {
  ShieldCheck,
  HeartHandshake,
  Lock,
  Award
};

export const TrustStatsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-200">
            Backed By Genuine Values
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Built on Uncompromising Trust & Privacy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Finding your life companion should never feel transactional or insecure. We’ve reimagined matchmaking with rigorous verification and dignified privacy standards.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || ShieldCheck;
            return (
              <div
                key={stat.id}
                className="group relative p-8 rounded-3xl bg-[#FAFAFA] border border-gray-100 hover:border-rose-200 hover:bg-white hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-rose-600 group-hover:scale-110 group-hover:bg-rose-50 transition-all duration-300 mb-6">
                  <IconComponent className="w-7 h-7" />
                </div>
                
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {stat.value}
                </div>
                
                <h3 className="text-base font-bold text-gray-800 mt-2">
                  {stat.label}
                </h3>
                
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {stat.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200/60 flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                  <span>Audited & Verified</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

