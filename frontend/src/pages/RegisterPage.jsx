import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { registerUser } from '../services/api';
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
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Users,
  Compass,
  BookOpen,
  Home,
  Check,
  Calendar,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export const RegisterPage = () => {
  const { navigateTo, handleAuthSuccess, showToast } = useApp();

  // Multi-step Wizard Index (1, 2, 3, 4)
  const [currentStep, setCurrentStep] = useState(1);

  // --- STEP 1: Basic & Contact Details ---
  const [name, setName] = useState('');
  const [gender, setGender] = useState('brother'); // 'brother' | 'sister'
  const [dobOrAge, setDobOrAge] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Never married');
  const [country, setCountry] = useState('India');
  const [currentLocation, setCurrentLocation] = useState('');
  const [nativePlace, setNativePlace] = useState('');
  const [profileCreatedBy, setProfileCreatedBy] = useState('Self');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- STEP 2: Personal & Religious Details (Salafi Matchmaking) ---
  const [manhaj, setManhaj] = useState('Upon Quran & Sunnah according to the understanding of the Salaf us-Salih');
  const [prayerPractice, setPrayerPractice] = useState('5 times daily in the Masjid (Brothers) / on time');
  const [religiousEducation, setReligiousEducation] = useState('Self-taught & attends authentic Halaqas');
  const [hijabOrBeardPreference, setHijabOrBeardPreference] = useState('');
  const [educationQualification, setEducationQualification] = useState("Bachelor's Degree");
  const [occupation, setOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [height, setHeight] = useState("5'7\" (170 cm)");
  const [languagesKnown, setLanguagesKnown] = useState('');
  const [bio, setBio] = useState('');

  // --- STEP 3: Family Details ---
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [siblingsCount, setSiblingsCount] = useState('');
  const [familyLocation, setFamilyLocation] = useState('');
  const [familyBackground, setFamilyBackground] = useState('Practicing Sunnah / Salafi environment');
  const [guardianContact, setGuardianContact] = useState('');

  // --- STEP 4: Partner Preferences ---
  const [preferredAgeRange, setPreferredAgeRange] = useState('21 - 28');
  const [preferredLocation, setPreferredLocation] = useState('Open / Anywhere');
  const [preferredMaritalStatus, setPreferredMaritalStatus] = useState('Never married');
  const [preferredEducation, setPreferredEducation] = useState("Graduate / Islamic Knowledge valued");
  const [religiousCompatibility, setReligiousCompatibility] = useState('Strictly adhering to Sunnah, regular in Salah');
  const [preferredHeight, setPreferredHeight] = useState('');
  const [willingnessToRelocate, setWillingnessToRelocate] = useState('Willing to relocate');
  const [otherExpectations, setOtherExpectations] = useState('');

  // Status & Error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Step 1 Validation
  const validateStep1 = () => {
    if (!name.trim()) return 'Please enter your full name.';
    if (!dobOrAge.trim()) return 'Please enter your age or date of birth.';
    if (!phone.trim()) return 'Please enter your mobile phone number.';
    if (!currentLocation.trim()) return 'Please enter your current location / city.';
    if (!password) return 'Please enter a password.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Password and Confirm Password do not match.';
    return null;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!educationQualification.trim()) return 'Please provide your education qualification.';
    if (!occupation.trim()) return 'Please enter your occupation.';
    return null;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (currentStep === 1) {
      const err = validateStep1();
      if (err) {
        setErrorMessage(err);
        return;
      }
      // Set default hijab/beard based on gender if empty
      if (!hijabOrBeardPreference) {
        setHijabOrBeardPreference(gender === 'sister' ? 'Proper Shar’i Hijab & Abaya' : 'Full Sunnah Beard');
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      const err = validateStep2();
      if (err) {
        setErrorMessage(err);
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Final Submit
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await registerUser({
        name,
        email,
        phone,
        password,
        gender,
        profile: {
          profileCreatedBy,
          dobOrAge,
          maritalStatus,
          country,
          currentLocation,
          nativePlace,
          manhaj,
          prayerPractice,
          religiousEducation,
          hijabOrBeardPreference,
          educationQualification,
          occupation,
          monthlyIncome,
          height,
          languagesKnown,
          bio,
          fatherOccupation,
          motherOccupation,
          siblingsCount,
          familyLocation,
          familyBackground,
          guardianContact,
          preferredAgeRange,
          preferredLocation,
          preferredMaritalStatus,
          preferredEducation,
          religiousCompatibility,
          preferredHeight,
          willingnessToRelocate,
          otherExpectations
        }
      });

      handleAuthSuccess(response.user, response.token);
      showToast(`Alhamdulillah! Welcome ${name}. Your profile is active.`, 'success');
      navigateTo('home');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  const stepsList = [
    { number: 1, title: 'Basic & Contact' },
    { number: 2, title: 'Religious & Personal' },
    { number: 3, title: 'Family Background' },
    { number: 4, title: 'Partner Preferences' },
  ];

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50/40 via-[#FAFAFA] to-[#FAFAFA]">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
        
        {/* Top Regal Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-950 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl font-bold tracking-tight">Bandhan Nikah</h1>
                  <span className="text-[10px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-300/30 px-2 py-0.5 rounded uppercase tracking-wider">
                    Salafi Matchmaking
                  </span>
                </div>
                <p className="text-xs text-rose-200 mt-0.5">
                  Upon the Quran & Sunnah with the understanding of the Salaf us-Salih
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="self-start sm:self-auto text-xs font-bold text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Already Registered? Sign In →
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-8 grid grid-cols-4 gap-2 pt-4 border-t border-white/15">
            {stepsList.map((step) => {
              const isPassed = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1.5 ${
                      isPassed
                        ? 'bg-amber-400 text-gray-950 shadow-sm'
                        : isCurrent
                        ? 'bg-white text-rose-800 ring-4 ring-amber-400/30 font-extrabold'
                        : 'bg-white/15 text-rose-200 border border-white/20'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-medium truncate max-w-full ${
                      isCurrent ? 'text-amber-300 font-bold' : isPassed ? 'text-white' : 'text-rose-300/80'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-10">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <h5 className="font-bold">Required Information Missing</h5>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* ================= STEP 1: Basic & Contact Details ================= */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Step 1: Basic & Contact Details
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Primary identification and contact information for your profile
                </p>
              </div>

              {/* Gender & Profile Created By */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">I am registering for a</label>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-gray-100 border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setGender('brother')}
                      className={`py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gender === 'brother' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600'
                      }`}
                    >
                      Brother (Groom)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('sister')}
                      className={`py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gender === 'sister' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600'
                      }`}
                    >
                      Sister (Bride)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Profile Created By</label>
                  <select
                    value={profileCreatedBy}
                    onChange={(e) => setProfileCreatedBy(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Self">Self</option>
                    <option value="Parent">Parent (Father / Mother)</option>
                    <option value="Guardian">Guardian (Wali)</option>
                    <option value="Sibling">Sibling (Brother / Sister)</option>
                  </select>
                </div>
              </div>

              {/* Full Name & DOB / Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-rose-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abdullah bin Muhammad"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>Date of Birth or Age *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dobOrAge}
                    onChange={(e) => setDobOrAge(e.target.value)}
                    placeholder="e.g. 26 Years or 15/08/1999"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Marital Status & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Marital Status *</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Never married">Never married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. India / Saudi Arabia / UAE / UK"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Current Location & Native Place */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Current City & State *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="e.g. Bangalore, Karnataka"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Native Place / District</label>
                  <input
                    type="text"
                    value={nativePlace}
                    onChange={(e) => setNativePlace(e.target.value)}
                    placeholder="e.g. Malappuram / Hyderabad / Calicut"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Mobile Number & Email Address (optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-500" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                  <p className="text-[11px] text-gray-400">Used for verification and login</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-500" />
                    <span>Email Address <span className="text-gray-400 font-normal">(Optional)</span></span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com (optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-500" />
                    <span>Password (min 6 characters) *</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Confirm Password *</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" /> Explore as Guest
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                >
                  <span>Continue to Step 2: Religious & Personal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: Personal & Religious Details ================= */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-amber-200">
                  <Sparkles className="w-3 h-3" /> Salafi Compatibility
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Step 2: Personal and Religious Details
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Understanding adherence to the Quran, authentic Sunnah, and personal lifestyle
                </p>
              </div>

              {/* Manhaj / Religious Approach */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                  <span>Religious Approach / Manhaj *</span>
                </label>
                <select
                  value={manhaj}
                  onChange={(e) => setManhaj(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                >
                  <option value="Upon Quran & Sunnah according to the understanding of the Salaf us-Salih">
                    Upon the Quran & Sunnah according to the understanding of the Salaf us-Salih
                  </option>
                  <option value="Ahl al-Hadith / Athari Aqeedah">
                    Ahl al-Hadith / Athari Aqeedah
                  </option>
                  <option value="Adhering to authentic Sunnah and strictly avoiding innovations (Bid'ah)">
                    Adhering to authentic Sunnah and strictly avoiding innovations (Bid'ah)
                  </option>
                  <option value="Practicing Muslim striving upon the Sunnah">
                    Practicing Muslim striving upon the Sunnah
                  </option>
                </select>
              </div>

              {/* Prayer Practice & Religious Knowledge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Prayer Practice *</label>
                  <select
                    value={prayerPractice}
                    onChange={(e) => setPrayerPractice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="5 times daily in the Masjid (Brothers) / on time">
                      5 times daily in the Masjid (for brothers) / on time
                    </option>
                    <option value="5 times daily on time at home">
                      5 times daily on time at home
                    </option>
                    <option value="Regular in Fardh, striving for Sunnah & Tahajjud">
                      Regular in Fardh, striving for Sunnah & Tahajjud
                    </option>
                    <option value="Practicing, continuously striving to be more consistent">
                      Practicing, continuously striving to be more consistent
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Religious Education / Knowledge <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <select
                    value={religiousEducation}
                    onChange={(e) => setReligiousEducation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Self-taught & attends authentic Halaqas">Self-taught & attends authentic Halaqas / Duroos</option>
                    <option value="Student of Knowledge (Talib al-Ilm)">Student of Knowledge (Talib al-Ilm)</option>
                    <option value="Islamic University Graduate / Madrasah">Islamic University Graduate / Madrasah</option>
                    <option value="Studies classical books & Tafseer">Studies classical books & Tafseer</option>
                    <option value="Basic authentic Islamic fundamentals">Basic authentic Islamic fundamentals</option>
                  </select>
                </div>
              </div>

              {/* Hijab / Face-covering (for sisters) or Sunnah Beard (for brothers) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  {gender === 'sister'
                    ? "Hijab / Face-covering Preference (Where relevant)"
                    : "Sunnah Beard & Appearance"}
                </label>
                <select
                  value={hijabOrBeardPreference}
                  onChange={(e) => setHijabOrBeardPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                >
                  {gender === 'sister' ? (
                    <>
                      <option value="Observes complete Shar'i Niqab & Abaya">Observes complete Shar'i Niqab & Abaya</option>
                      <option value="Proper Shar'i Hijab & Abaya (without Niqab)">Proper Shar'i Hijab & Abaya (without Niqab)</option>
                      <option value="Currently wearing Hijab, aspires / willing to wear Niqab">Currently wearing Hijab, aspires / willing to wear Niqab</option>
                      <option value="Modest Islamic clothing">Modest Islamic clothing</option>
                    </>
                  ) : (
                    <>
                      <option value="Full Sunnah Beard & Halal dressing">Full Sunnah Beard & Halal dressing</option>
                      <option value="Sunnah Beard & Thobe / Kurta">Sunnah Beard & Thobe / Kurta</option>
                      <option value="Short Beard / Trimming">Short Beard / Trimming</option>
                      <option value="Clean Shaven, aspiring to grow Sunnah Beard">Clean Shaven, aspiring to grow Sunnah Beard</option>
                    </>
                  )}
                </select>
              </div>

              {/* Education Qualification & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-500" />
                    <span>Education Qualification *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={educationQualification}
                    onChange={(e) => setEducationQualification(e.target.value)}
                    placeholder="e.g. B.Tech Computer Science / MBBS / B.Com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-rose-500" />
                    <span>Occupation / Profession *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Senior Software Engineer / Doctor / Business"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Monthly Income Range (Optional) & Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Monthly Income Range <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <select
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="">Prefer not to disclose</option>
                    <option value="Below ₹30,000 / $400">Below ₹30,000 / $400</option>
                    <option value="₹30,000 - ₹60,000 / $400 - $800">₹30,000 - ₹60,000 / $400 - $800</option>
                    <option value="₹60,000 - ₹1,20,000 / $800 - $1,500">₹60,000 - ₹1,20,000 / $800 - $1,500</option>
                    <option value="₹1,20,000 - ₹2,50,000 / $1,500 - $3,000">₹1,20,000 - ₹2,50,000 / $1,500 - $3,000</option>
                    <option value="₹2,50,000+ / $3,000+">₹2,50,000+ / $3,000+</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Height</label>
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 5'7&quot; (170 cm)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Languages Known */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Languages Known</label>
                <input
                  type="text"
                  value={languagesKnown}
                  onChange={(e) => setLanguagesKnown(e.target.value)}
                  placeholder="e.g. English, Arabic, Malayalam, Urdu, Hindi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                />
              </div>

              {/* Short Personal Introduction */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Short Personal Introduction (Bio)</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Briefly describe your nature, personality, daily routine, and what you prioritize in your Deen and Dunya..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                >
                  <span>Continue to Step 3: Family Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 3: Family Details ================= */}
          {currentStep === 3 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Step 3: Family Details
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Information regarding your family background, parents, and Guardian contact
                </p>
              </div>

              {/* Father & Mother Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Father's Occupation <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    type="text"
                    value={fatherOccupation}
                    onChange={(e) => setFatherOccupation(e.target.value)}
                    placeholder="e.g. Businessman / Retired Govt Officer / Teacher"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Mother's Occupation <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    type="text"
                    value={motherOccupation}
                    onChange={(e) => setMotherOccupation(e.target.value)}
                    placeholder="e.g. Homemaker / School Teacher / Doctor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Number of Siblings & Family Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-rose-500" />
                    <span>Number of Siblings</span>
                  </label>
                  <input
                    type="text"
                    value={siblingsCount}
                    onChange={(e) => setSiblingsCount(e.target.value)}
                    placeholder="e.g. 1 Brother (Married), 1 Sister"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-rose-500" />
                    <span>Family Location / Residence</span>
                  </label>
                  <input
                    type="text"
                    value={familyLocation}
                    onChange={(e) => setFamilyLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Family Background */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Family Background & Environment</label>
                <select
                  value={familyBackground}
                  onChange={(e) => setFamilyBackground(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                >
                  <option value="Practicing Sunnah / Salafi environment">Practicing Sunnah / Salafi environment</option>
                  <option value="Traditional religious Muslim family">Traditional religious Muslim family</option>
                  <option value="Moderate practicing family">Moderate practicing family</option>
                  <option value="Revert / Only practicing member in family">Revert to Islam / Only practicing member</option>
                </select>
              </div>

              {/* Guardian Contact Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                  <span>Guardian (Wali)'s Contact Details <span className="text-gray-400 font-normal">(Optional / Recommended for Sisters)</span></span>
                </label>
                <input
                  type="text"
                  value={guardianContact}
                  onChange={(e) => setGuardianContact(e.target.value)}
                  placeholder="e.g. Father's Name & Number: +91 98765 00000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                />
                <p className="text-[11px] text-gray-500">
                  Bandhan promotes Islamic propriety by allowing serious suitors to communicate via the Wali.
                </p>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                >
                  <span>Continue to Step 4: Partner Preferences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 4: Partner Preferences ================= */}
          {currentStep === 4 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Step 4: Partner Preferences
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Specify what you seek in an ideal life companion
                </p>
              </div>

              {/* Preferred Age Range & Preferred Marital Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Preferred Age Range</label>
                  <input
                    type="text"
                    value={preferredAgeRange}
                    onChange={(e) => setPreferredAgeRange(e.target.value)}
                    placeholder="e.g. 21 - 27 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Preferred Marital Status</label>
                  <select
                    value={preferredMaritalStatus}
                    onChange={(e) => setPreferredMaritalStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Never married">Never married only</option>
                    <option value="Any">Any (Never married / Divorced / Widowed)</option>
                    <option value="Divorced / Widowed">Divorced or Widowed acceptable</option>
                  </select>
                </div>
              </div>

              {/* Preferred Location & Education Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Preferred Location or Country</span>
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="e.g. India (South), Saudi Arabia / GCC, Any"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-500" />
                    <span>Education Preference</span>
                  </label>
                  <input
                    type="text"
                    value={preferredEducation}
                    onChange={(e) => setPreferredEducation(e.target.value)}
                    placeholder="e.g. Graduate or Islamic Studies preferred"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Religious Compatibility Preferences */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                  <span>Religious Compatibility Preferences</span>
                </label>
                <select
                  value={religiousCompatibility}
                  onChange={(e) => setReligiousCompatibility(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                >
                  <option value="Strictly adhering to Sunnah, regular in Salah">
                    Strictly adhering to Sunnah, regular in 5 daily Salah
                  </option>
                  <option value="Upon Salafi Manhaj, wears proper Hijab/Niqab or keeps Sunnah Beard">
                    Upon Salafi Manhaj, wears proper Hijab/Niqab or keeps Sunnah Beard
                  </option>
                  <option value="Passionate about Islamic learning and mutual growth in Deen">
                    Passionate about Islamic learning and mutual growth in Deen
                  </option>
                  <option value="General practicing Muslim">
                    General practicing Muslim
                  </option>
                </select>
              </div>

              {/* Willingness to Relocate & Preferred Height Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Willingness to Relocate</label>
                  <select
                    value={willingnessToRelocate}
                    onChange={(e) => setWillingnessToRelocate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Willing to relocate anywhere">Willing to relocate anywhere</option>
                    <option value="Within country only">Within country only</option>
                    <option value="Open to GCC / Abroad">Open to GCC / Abroad</option>
                    <option value="Prefer partner to relocate to my location">Prefer partner to relocate to my location</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Preferred Height Range <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    type="text"
                    value={preferredHeight}
                    onChange={(e) => setPreferredHeight(e.target.value)}
                    placeholder="e.g. 5'3&quot; to 5'9&quot;"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Other Expectations */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Other Expectations <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea
                  rows={3}
                  value={otherExpectations}
                  onChange={(e) => setOtherExpectations(e.target.value)}
                  placeholder="Any particular qualities you value, e.g., good character (Akhlaq), family-oriented, simplicity, respectful communication..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:border-rose-500"
                />
              </div>

              {/* Trust & Islamic Propriety Notice */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">Sacred Trust & Privacy Notice:</span> By registering, you affirm that all details provided are truthful and for genuine marriage seeking within Islamic propriety.
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-102 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration (Alhamdulillah)</span>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
