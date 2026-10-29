import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { registerUser } from '../services/api';
import {
  RELIGIONS_LIST,
  COMMUNITIES_LIST,
  CITIES_LIST
} from '../data/mockData';
import {
  Heart,
  Lock,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Users,
  Compass
} from 'lucide-react';

export const RegisterPage = () => {
  const { navigateTo, handleAuthSuccess, showToast } = useApp();

  // Form Fields
  const [profileFor, setProfileFor] = useState('Self');
  const [gender, setGender] = useState('female');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [religion, setReligion] = useState('Hindu');
  const [caste, setCaste] = useState('Brahmin');
  const [city, setCity] = useState('Bangalore');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms & Privacy Shield to register.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await registerUser({
        name,
        email,
        phone,
        password,
        gender
      });

      handleAuthSuccess(response.user, response.token);
      showToast(`Welcome to Bandhan, ${name}! Your profile is ready.`, 'success');
      navigateTo('home');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50/50 via-[#FAFAFA] to-[#FAFAFA]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* Left Side: Regal Branding & Trust Steps (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-900 via-rose-800 to-amber-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight">Bandhan</span>
                <span className="ml-2 text-[10px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-300/30 px-1.5 py-0.5 rounded uppercase">
                  Royal
                </span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold leading-snug">
              Begin Your Sacred Journey Towards Matrimony
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              Join thousands of educated, cultured individuals and families finding genuine life partners with complete peace of mind.
            </p>
          </div>

          {/* 3 Steps Timeline */}
          <div className="relative z-10 my-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-gray-950 text-xs font-bold flex items-center justify-center shrink-0 shadow-md">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">100% Free Registration</h4>
                <p className="text-[11px] text-rose-200 mt-0.5">Tell us about yourself and family background</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center shrink-0 border border-white/20">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Vedic & Lifestyle Compatibility</h4>
                <p className="text-[11px] text-rose-200 mt-0.5">Get 36-point Guna Milan and mutual preference matching</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center shrink-0 border border-white/20">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Connect Safely & Confidentially</h4>
                <p className="text-[11px] text-rose-200 mt-0.5">Express interest and message verified candidates securely</p>
              </div>
            </div>
          </div>

          {/* Trust Points */}
          <div className="relative z-10 pt-4 border-t border-white/10 space-y-2 text-xs text-rose-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Fake Profiles • Manual Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Your Phone & Photos are 100% Protected</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            
            {/* Top Bar Switcher */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Create Your Free Profile
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your details to start receiving matches immediately
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
              >
                Sign In →
              </button>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <h5 className="font-bold">Registration Alert</h5>
                  <p className="mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Profile Created For & Seeking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Profile Created For</label>
                  <select
                    value={profileFor}
                    onChange={(e) => setProfileFor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Self">Myself</option>
                    <option value="Son">My Son</option>
                    <option value="Daughter">My Daughter</option>
                    <option value="Brother">My Brother</option>
                    <option value="Sister">My Sister</option>
                    <option value="Friend">Relative / Friend</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Looking For</label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gender === 'female' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600'
                      }`}
                    >
                      Bride
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gender === 'male' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600'
                      }`}
                    >
                      Groom
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-500" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-500" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-500" />
                    <span>Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Religion & Community */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Religion</label>
                  <select
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    {RELIGIONS_LIST.filter(r => r !== 'All Religions').map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Community / Caste</label>
                  <select
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    {COMMUNITIES_LIST.filter(c => c !== 'All Communities').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>City / Current Location</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                >
                  {CITIES_LIST.filter(c => c !== 'All Locations').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-rose-500" />
                  <span>Create Password (minimum 6 characters)</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <label htmlFor="agree-terms" className="text-xs text-gray-600 leading-snug cursor-pointer">
                  I agree to the <span className="text-rose-600 font-semibold underline">Terms of Use</span> and confirm that I am creating this profile for genuine matrimonial purposes.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Your Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Free Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Guest Link */}
          <div className="pt-8 mt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              Already have an account?{' '}
              <button
                onClick={() => navigateTo('login')}
                className="font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Sign In here
              </button>
            </p>

            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-rose-500" />
              <span>Explore as Guest →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
