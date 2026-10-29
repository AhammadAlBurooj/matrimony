import React from 'react';
import {
  Heart,
  ShieldCheck,
  Lock,
  PhoneCall,
  Sparkles,
  Award,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-rose-950/40 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% Manual Verification</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Govt ID & photo checks for real, genuine profiles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Privacy Protected</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Control who views your contact info and personal photos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Vedic & Lifestyle Match</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                In-depth 36-point Guna Milan & personality alignment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Elite Concierge Support</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Dedicated relationship advisors for personalized assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Salafi
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Bandhan is India’s foremost curated matchmaking service, uniting families and souls through traditional values, contemporary compatibility, and modern trust architecture.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> ISO 27001 Certified Security
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Explore Matches
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo('browse', { caste: 'Brahmin' })}
                  className="hover:text-rose-400 transition-colors"
                >
                  Brahmin Matrimony
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('browse', { caste: 'Khatri / Arora' })}
                  className="hover:text-rose-400 transition-colors"
                >
                  Khatri & Arora Matches
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('browse', { city: 'USA / NRI' })}
                  className="hover:text-rose-400 transition-colors"
                >
                  NRI Elite Matrimony
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('browse', { caste: 'Agarwal / Marwari' })}
                  className="hover:text-rose-400 transition-colors"
                >
                  Agarwal & Marwari Matches
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('browse', { verifiedOnly: true })}
                  className="hover:text-rose-400 transition-colors"
                >
                  100% Aadhaar Verified
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Trust & Guidance
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="hover:text-rose-400 cursor-pointer">Safety Guidelines & Dos/Don'ts</li>
              <li className="hover:text-rose-400 cursor-pointer">Kundli & Astrological Guide</li>
              <li className="hover:text-rose-400 cursor-pointer">Success & Wedding Stories</li>
              <li className="hover:text-rose-400 cursor-pointer">Confidentiality Guarantee</li>
              <li className="hover:text-rose-400 cursor-pointer">Report Inappropriate Profile</li>
              <li className="pt-2 border-t border-gray-800">
                <a
                  href="http://localhost:5000/api/auth/export-excel"
                  download="Salafi_Matrimony_Registrations.xlsx"
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5"
                >
                  📊 Download All Profiles (Excel Sheet)
                </a>
              </li>
            </ul>
          </div>

          {/* VIP Concierge Newsletter */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              VIP Concierge
            </h5>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Receive curated hand-selected profile recommendations directly in your inbox.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-8 py-2 rounded-xl bg-gray-900 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-rose-500"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5" />
              </div>
              <button
                type="button"
                className="w-full py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Request Callback
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Bandhan Matrimony Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer">Security Practices</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

