import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const CallToActionSection = () => {
  const { navigateTo, openAuthModal, currentUser } = useApp();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-900 via-rose-800 to-amber-950 p-8 sm:p-14 text-white shadow-2xl shadow-rose-950/20">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Soulmate Awaits</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Begin Your Sacred Journey Towards a Lifetime of Companionship
            </h2>

            <p className="mt-4 text-sm sm:text-base text-rose-100/90 leading-relaxed max-w-2xl">
              Join thousands of genuine families and verified singles discovering lifelong partners. 100% confidential, secure, and respectful.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => currentUser ? navigateTo('profile-builder') : openAuthModal('register')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                <span>Register Your Free Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('browse')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Search Matches First</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-rose-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Cost Registration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>100% Privacy Control</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Free Astrological Matching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

