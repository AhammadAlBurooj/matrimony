import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { loginUser } from '../services/api';
import {
  Heart,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const LoginPage = () => {
  const { navigateTo, handleAuthSuccess, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      handleAuthSuccess(response.user, response.token);
      navigateTo('home');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('ayaan@example.com');
    setPassword('SecretPassword123');
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await loginUser({
        email: 'ayaan@example.com',
        password: 'SecretPassword123'
      });
      handleAuthSuccess(response.user, response.token);
      navigateTo('home');
    } catch (err) {
      setErrorMessage(err.message || 'Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50/50 via-[#FAFAFA] to-[#FAFAFA]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* Left Side: Regal Branding & Trust Column (5 cols) */}
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
              Welcome to Dignified & Sacred Matchmaking
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              Sign in to access your curated matches, pending interest requests, and horoscope compatibility scores.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="relative z-10 my-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=200"
                alt="Couple"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/50"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Vikram & Tanvi</h4>
                <p className="text-[10px] text-amber-200">Married in Udaipur • Verified Union</p>
              </div>
            </div>
            <p className="text-xs text-rose-100 italic leading-relaxed">
              "We found our soulmates through genuine compatibility and shared values. Bandhan made every step dignified."
            </p>
          </div>

          {/* Trust Points */}
          <div className="relative z-10 space-y-2 text-xs text-rose-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>100% Aadhaar & ID Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Strict Privacy Shield & Contact Control</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            
            {/* Top Bar Switcher */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Sign In to Your Account
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your registered email and password to continue
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('register')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
              >
                Register Free →
              </button>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <h5 className="font-bold">Authentication Failed</h5>
                  <p className="mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ayaan@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-rose-500" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to your email', 'info')}
                    className="text-xs font-medium text-rose-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <label htmlFor="remember-me" className="ml-2 text-xs text-gray-600 cursor-pointer">
                  Keep me signed in for 7 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Bandhan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Demo Login Option */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>⚡ 1-Click Demo Login (Ayaan Khan)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Guest Link */}
          <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              New here?{' '}
              <button
                onClick={() => navigateTo('register')}
                className="font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Create a Free Account
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

