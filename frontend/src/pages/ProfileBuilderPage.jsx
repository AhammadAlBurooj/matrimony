import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ArrowLeft,
  Save,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  Heart,
  Camera,
  MapPin,
  Lock,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';

export const ProfileBuilderPage = () => {
  const { navigateTo, currentUser, updateCurrentUserProfile, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'deen' | 'career' | 'family' | 'preferences'
  const [isSaving, setIsSaving] = useState(false);

  // Form State initialized from currentUser
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'brother',
    dobOrAge: '26',
    height: "5'7\" (170 cm)",
    maritalStatus: 'Never married',
    languagesKnown: 'English, Malayalam',
    
    // Religious / Manhaj
    manhaj: 'Upon Quran & Sunnah according to the understanding of the Salaf us-Salih',
    prayerPractice: '5 times daily in the Masjid (Brothers) / on time',
    religiousEducation: 'Self-taught & attends authentic Halaqas',
    hijabOrBeardPreference: 'Full Sunnah Beard',

    // Education & Career
    education: "Bachelor's Degree in Computer Science",
    occupation: 'Software Developer',
    monthlyIncome: '₹60,000 - ₹80,000',
    currentLocation: 'Kilimanoor, Trivandrum',
    nativePlace: 'Trivandrum, Kerala',
    country: 'India',

    // Family
    fatherOccupation: 'Business',
    motherOccupation: 'Homemaker',
    siblingsCount: '1 Brother, 1 Sister',
    familyBackground: 'Practicing Sunnah / Salafi environment',
    guardianContact: '',

    // Preferences
    preferredAgeRange: '21 - 25',
    preferredLocation: 'Kerala / Open',
    preferredEducation: 'Graduate / Values Islamic knowledge',
    religiousCompatibility: 'Strictly adhering to Sunnah, regular in Salah, observant of Shar\'i Hijab',
    willingnessToRelocate: 'Willing to relocate',
    otherExpectations: 'Kind-hearted, pious, and understanding life partner.',

    // Bio & Photo
    bio: 'Practicing brother working in tech. Firm upon the Sunnah and striving to build a pious family upon Islamic values.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
  });

  // Pre-fill form when currentUser is ready
  useEffect(() => {
    if (currentUser) {
      const p = currentUser.profile || {};
      const isSister = (currentUser.gender === 'female' || currentUser.gender === 'sister' || p.gender === 'sister');
      
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        gender: isSister ? 'sister' : 'brother',
        dobOrAge: p.dobOrAge || '26',
        height: p.height || (isSister ? "5'4\" (163 cm)" : "5'7\" (170 cm)"),
        maritalStatus: p.maritalStatus || 'Never married',
        languagesKnown: p.languagesKnown || 'English, Malayalam',
        manhaj: p.manhaj || 'Upon Quran & Sunnah according to the understanding of the Salaf us-Salih',
        prayerPractice: p.prayerPractice || (isSister ? '5 times daily on time' : '5 times daily in the Masjid / on time'),
        religiousEducation: p.religiousEducation || 'Self-taught & attends authentic Halaqas',
        hijabOrBeardPreference: p.hijabOrBeardPreference || (isSister ? 'Shar’i Hijab & Abaya' : 'Full Sunnah Beard'),
        education: p.educationQualification || p.education || "Bachelor's Degree",
        occupation: p.occupation || 'Professional',
        monthlyIncome: p.monthlyIncome || '',
        currentLocation: p.currentLocation || 'Kerala, India',
        nativePlace: p.nativePlace || '',
        country: p.country || 'India',
        fatherOccupation: p.fatherOccupation || '',
        motherOccupation: p.motherOccupation || '',
        siblingsCount: p.siblingsCount || '',
        familyBackground: p.familyBackground || 'Practicing Sunnah / Salafi environment',
        guardianContact: p.guardianContact || currentUser.phone || '',
        preferredAgeRange: p.preferredAgeRange || '21 - 26',
        preferredLocation: p.preferredLocation || 'Kerala / Open',
        preferredEducation: p.preferredEducation || 'Graduate / Values Islamic knowledge',
        religiousCompatibility: p.religiousCompatibility || 'Strictly adhering to Sunnah, regular in Salah',
        willingnessToRelocate: p.willingnessToRelocate || 'Willing to relocate',
        otherExpectations: p.otherExpectations || '',
        bio: p.bio || (currentUser.bio || ''),
        photoUrl: (p.photos && p.photos[0]) || currentUser.avatar || (isSister 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800')
      });
    }
  }, [currentUser]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      profile: {
        dobOrAge: formData.dobOrAge,
        gender: formData.gender,
        height: formData.height,
        maritalStatus: formData.maritalStatus,
        languagesKnown: formData.languagesKnown,
        manhaj: formData.manhaj,
        prayerPractice: formData.prayerPractice,
        religiousEducation: formData.religiousEducation,
        hijabOrBeardPreference: formData.hijabOrBeardPreference,
        educationQualification: formData.education,
        occupation: formData.occupation,
        monthlyIncome: formData.monthlyIncome,
        currentLocation: formData.currentLocation,
        nativePlace: formData.nativePlace,
        country: formData.country,
        fatherOccupation: formData.fatherOccupation,
        motherOccupation: formData.motherOccupation,
        siblingsCount: formData.siblingsCount,
        familyBackground: formData.familyBackground,
        guardianContact: formData.guardianContact,
        preferredAgeRange: formData.preferredAgeRange,
        preferredLocation: formData.preferredLocation,
        preferredEducation: formData.preferredEducation,
        religiousCompatibility: formData.religiousCompatibility,
        willingnessToRelocate: formData.willingnessToRelocate,
        otherExpectations: formData.otherExpectations,
        bio: formData.bio,
        photos: [formData.photoUrl]
      }
    };

    const success = await updateCurrentUserProfile(payload);
    setIsSaving(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal & Bio', icon: User },
    { id: 'deen', label: 'Religious & Manhaj', icon: BookOpen },
    { id: 'career', label: 'Education & Career', icon: Briefcase },
    { id: 'family', label: 'Family & Wali', icon: Users },
    { id: 'preferences', label: 'Partner Preferences', icon: Heart }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[85vh]">
      
      {/* Top Breadcrumb & Save Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Edit My Matrimonial Profile
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Update your personal details, religious adherence, education, and partner criteria. All changes sync with Excel automatically.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-lg shadow-rose-600/25 active:scale-98 transition-all cursor-pointer self-start sm:self-auto"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Overview Card */}
      <div className="my-6 p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <img
            src={formData.photoUrl}
            alt={formData.name || 'User'}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-rose-500/10 shadow-md"
            onError={(e) => {
              e.target.src = formData.gender === 'sister'
                ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
                : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
            }}
          />
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-white shadow-md border border-gray-200 text-rose-600">
            <Camera className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
            <h2 className="font-serif text-xl font-bold text-gray-900">{formData.name || 'Registered Member'}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 inline-block self-center">
              Royal Member
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {formData.gender === 'sister' ? 'Sister (Bride)' : 'Brother (Groom)'} • {formData.dobOrAge} Yrs • {formData.currentLocation}
          </p>
          <p className="text-xs text-gray-700 font-semibold">{formData.occupation}</p>
          
          <div className="pt-2 flex items-center gap-3 justify-center md:justify-start text-xs text-gray-500">
            <span>Profile Completion: <strong>95%</strong></span>
            <div className="w-32 bg-gray-100 rounded-full h-2">
              <div className="bg-rose-600 h-2 rounded-full w-[95%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSave} className="mt-8 space-y-6">
        
        {/* TAB 1: PERSONAL & BIO */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <User className="w-4 h-4 text-rose-600" />
              <span>Personal Details & Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Profile Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="brother">Brother (Groom)</option>
                  <option value="sister">Sister (Bride)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Age / Date of Birth</label>
                <input
                  type="text"
                  value={formData.dobOrAge}
                  onChange={(e) => handleChange('dobOrAge', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. 26"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Height</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. 5'7&quot; (170 cm)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="Never married">Never married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Awaiting Divorce">Awaiting Divorce</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Languages Known</label>
                <input
                  type="text"
                  value={formData.languagesKnown}
                  onChange={(e) => handleChange('languagesKnown', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. English, Malayalam, Tamil"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Contact Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="+91..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Photo URL / Avatar Link</label>
                <input
                  type="text"
                  value={formData.photoUrl}
                  onChange={(e) => handleChange('photoUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="Paste direct image link"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Personal Bio / About Me</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white leading-relaxed"
                placeholder="Write a brief, honest description about your nature, lifestyle, Deen, and aspirations..."
              />
            </div>
          </div>
        )}

        {/* TAB 2: RELIGIOUS & MANHAJ */}
        {activeTab === 'deen' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-600" />
              <span>Religious Practice & Manhaj Adherence</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Manhaj / Creed (Aqeedah)</label>
                <input
                  type="text"
                  value={formData.manhaj}
                  onChange={(e) => handleChange('manhaj', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Upon Quran & Sunnah according to understanding of Salaf us-Salih"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">5 Daily Prayers (Salah)</label>
                <select
                  value={formData.prayerPractice}
                  onChange={(e) => handleChange('prayerPractice', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="5 times daily in the Masjid (Brothers) / on time">5 times daily in the Masjid (Brothers) / on time</option>
                  <option value="5 times daily on time">5 times daily on time</option>
                  <option value="Striving to be regular">Striving to be regular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {formData.gender === 'sister' ? 'Hijab / Niqab Practice' : 'Beard Practice'}
                </label>
                <input
                  type="text"
                  value={formData.hijabOrBeardPreference}
                  onChange={(e) => handleChange('hijabOrBeardPreference', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder={formData.gender === 'sister' ? "Shar'i Hijab & Abaya" : "Full Sunnah Beard"}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Religious Studies & Halaqas</label>
                <input
                  type="text"
                  value={formData.religiousEducation}
                  onChange={(e) => handleChange('religiousEducation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Madrasa graduate, attends authentic Darse-Hadith weekly, studies Arabic"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EDUCATION & CAREER */}
        {activeTab === 'career' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-rose-600" />
              <span>Education, Career & Residence</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Highest Education Qualification</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. B.Tech / MBBS / M.Sc / Graduate"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Current Occupation / Job Title</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Senior Software Engineer / Doctor"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Monthly / Annual Income</label>
                <input
                  type="text"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. ₹60,000 - ₹80,000 / month"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Current City / Location</label>
                <input
                  type="text"
                  value={formData.currentLocation}
                  onChange={(e) => handleChange('currentLocation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Calicut, Kerala / Bengaluru"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Native Place / District</label>
                <input
                  type="text"
                  value={formData.nativePlace}
                  onChange={(e) => handleChange('nativePlace', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Trivandrum"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="India"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAMILY & WALI */}
        {activeTab === 'family' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-600" />
              <span>Family Background & Wali Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Father's Occupation</label>
                <input
                  type="text"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleChange('fatherOccupation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Businessman / Professor / Govt Employee"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Mother's Occupation</label>
                <input
                  type="text"
                  value={formData.motherOccupation}
                  onChange={(e) => handleChange('motherOccupation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Homemaker / Teacher"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Number of Siblings</label>
                <input
                  type="text"
                  value={formData.siblingsCount}
                  onChange={(e) => handleChange('siblingsCount', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. 1 Brother, 2 Sisters"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Guardian / Wali Contact</label>
                <input
                  type="text"
                  value={formData.guardianContact}
                  onChange={(e) => handleChange('guardianContact', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="Guardian phone number"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Family Religious Background</label>
                <input
                  type="text"
                  value={formData.familyBackground}
                  onChange={(e) => handleChange('familyBackground', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Practicing Sunnah / Salafi environment, moderate religious background"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PARTNER PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Partner Expectations & Match Criteria</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Age Range</label>
                <input
                  type="text"
                  value={formData.preferredAgeRange}
                  onChange={(e) => handleChange('preferredAgeRange', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. 21 - 26"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Location / State</label>
                <input
                  type="text"
                  value={formData.preferredLocation}
                  onChange={(e) => handleChange('preferredLocation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Kerala / Open / Middle East"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Religious Compatibility Expectations</label>
                <input
                  type="text"
                  value={formData.religiousCompatibility}
                  onChange={(e) => handleChange('religiousCompatibility', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Strictly practicing upon the Sunnah, regular in 5 daily prayers"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Education</label>
                <input
                  type="text"
                  value={formData.preferredEducation}
                  onChange={(e) => handleChange('preferredEducation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="e.g. Graduate / Professional"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Willingness to Relocate</label>
                <select
                  value={formData.willingnessToRelocate}
                  onChange={(e) => handleChange('willingnessToRelocate', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="Willing to relocate">Willing to relocate</option>
                  <option value="Open to discuss">Open to discuss</option>
                  <option value="Prefer local / Not willing">Prefer local / Not willing</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Other Expectations</label>
                <textarea
                  rows={3}
                  value={formData.otherExpectations}
                  onChange={(e) => handleChange('otherExpectations', e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  placeholder="Any other specific qualities, family values, or character traits you prioritize..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Button Bar */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-gray-500">
            Click <strong>Save & Update Profile</strong> to sync your biodata to the server and Excel sheet.
          </p>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 active:scale-98 transition-all cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Update Profile</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
