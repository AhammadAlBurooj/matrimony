const express = require('express');
const router = express.Router();
const db = require('../db');
const excelService = require('../services/excelService');

// Get Registered Profiles with Dynamic Filters
router.get('/', async (req, res) => {
  const { gender, religion, caste, city, minAge, maxAge, searchQuery } = req.query;

  try {
    const localDb = db.getLocalDb();
    let users = localDb.users || [];

    // Map each registered user to a rich profile object
    let profiles = users.map((u, idx) => {
      const p = u.profile || {};
      
      // Parse Age
      let ageNum = 24;
      if (p.dobOrAge) {
        const match = String(p.dobOrAge).match(/\d+/);
        if (match) ageNum = parseInt(match[0], 10);
      }

      // Gender normalization
      const rawGender = (p.gender || u.gender || '').toLowerCase();
      const isSister = rawGender === 'sister' || rawGender === 'female' || rawGender === 'bride';
      const cleanGender = isSister ? 'female' : 'male';

      // Default high-quality portraits
      const defaultPhotos = isSister
        ? [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
          ]
        : [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
          ];

      return {
        id: u.id,
        name: u.name || 'Registered Member',
        email: u.email && !u.email.includes('@salafimatch.local') ? u.email : '',
        phone: u.phone || '',
        gender: cleanGender,
        displayGender: isSister ? 'Sister (Bride)' : 'Brother (Groom)',
        age: ageNum,
        dobOrAge: p.dobOrAge || `${ageNum} Years`,
        maritalStatus: p.maritalStatus || 'Never married',
        religion: 'Islam',
        caste: p.manhaj ? 'Salafi' : 'Muslim',
        manhaj: p.manhaj || 'Upon Quran & Sunnah according to the understanding of the Salaf',
        prayerPractice: p.prayerPractice || '5 times daily on time',
        religiousEducation: p.religiousEducation || '',
        hijabOrBeardPreference: p.hijabOrBeardPreference || (isSister ? 'Shar’i Hijab & Abaya' : 'Full Sunnah Beard'),
        education: p.educationQualification || 'Graduate',
        occupation: p.occupation || 'Professional',
        income: p.monthlyIncome || 'Confidential',
        height: p.height || "5'7\" (170 cm)",
        languagesKnown: p.languagesKnown || 'English',
        city: p.currentLocation || 'Kerala, India',
        nativePlace: p.nativePlace || '',
        country: p.country || 'India',
        bio: p.bio || `Practicing ${isSister ? 'sister' : 'brother'} striving upon the Sunnah.`,
        family: {
          fatherOccupation: p.fatherOccupation || '',
          motherOccupation: p.motherOccupation || '',
          siblingsCount: p.siblingsCount || '',
          familyLocation: p.familyLocation || '',
          familyBackground: p.familyBackground || 'Practicing Sunnah / Salafi environment',
          guardianContact: p.guardianContact || ''
        },
        preferences: {
          preferredAgeRange: p.preferredAgeRange || '20 - 28',
          preferredLocation: p.preferredLocation || 'Open / Anywhere',
          preferredMaritalStatus: p.preferredMaritalStatus || 'Never married',
          preferredEducation: p.preferredEducation || '',
          religiousCompatibility: p.religiousCompatibility || 'Strictly practicing upon the Sunnah',
          willingnessToRelocate: p.willingnessToRelocate || 'Open to relocate',
          otherExpectations: p.otherExpectations || ''
        },
        verified: true,
        matchScore: Math.min(99, 88 + (idx * 3) % 11),
        photos: (p.photos && p.photos.length > 0) ? p.photos : defaultPhotos,
        created_at: u.created_at
      };
    });

    // 1. Filter by Gender (Seeking Bride => show female; Seeking Groom => show male; All => show both)
    if (gender && gender.toLowerCase() !== 'all') {
      const g = gender.toLowerCase();
      profiles = profiles.filter((p) => {
        if (g === 'female' || g === 'sister' || g === 'bride') {
          return p.gender === 'female';
        }
        if (g === 'male' || g === 'brother' || g === 'groom') {
          return p.gender === 'male';
        }
        return true;
      });
    }

    // 2. Filter by Age range
    if (minAge) {
      profiles = profiles.filter((p) => p.age >= parseInt(minAge, 10));
    }
    if (maxAge) {
      profiles = profiles.filter((p) => p.age <= parseInt(maxAge, 10));
    }

    // 3. Filter by Religion
    if (religion && religion !== 'All Religions') {
      const r = religion.toLowerCase();
      profiles = profiles.filter((p) => {
        if (!p.religion) return false;
        const pRel = p.religion.toLowerCase();
        if ((r === 'islam' || r === 'muslim') && (pRel === 'islam' || pRel === 'muslim')) return true;
        return pRel.includes(r);
      });
    }

    // 4. Filter by Community / Caste / Manhaj
    if (caste && caste !== 'All Communities') {
      const cst = caste.toLowerCase();
      profiles = profiles.filter((p) => 
        (p.caste && p.caste.toLowerCase().includes(cst)) ||
        (p.manhaj && p.manhaj.toLowerCase().includes(cst))
      );
    }

    // 5. Filter by City / Location
    if (city && city !== 'All Locations') {
      const c = city.toLowerCase();
      profiles = profiles.filter((p) => 
        (p.city && p.city.toLowerCase().includes(c)) ||
        (p.nativePlace && p.nativePlace.toLowerCase().includes(c)) ||
        (p.country && p.country.toLowerCase().includes(c))
      );
    }

    // 6. Filter by Search Query (Name, Occupation, Education, City, Manhaj)
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      profiles = profiles.filter((p) =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.occupation && p.occupation.toLowerCase().includes(q)) ||
        (p.education && p.education.toLowerCase().includes(q)) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        (p.manhaj && p.manhaj.toLowerCase().includes(q))
      );
    }

    res.json(profiles);
  } catch (err) {
    console.error('Error fetching registered profiles:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get Single Registered Profile by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const localDb = db.getLocalDb();
    const users = localDb.users || [];
    const u = users.find((user) => user.id === id);

    if (!u) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const p = u.profile || {};
    let ageNum = 24;
    if (p.dobOrAge) {
      const match = String(p.dobOrAge).match(/\d+/);
      if (match) ageNum = parseInt(match[0], 10);
    }

    const rawGender = (p.gender || u.gender || '').toLowerCase();
    const isSister = rawGender === 'sister' || rawGender === 'female' || rawGender === 'bride';
    const cleanGender = isSister ? 'female' : 'male';

    const defaultPhotos = isSister
      ? [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
        ]
      : [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
        ];

    const profile = {
      id: u.id,
      name: u.name || 'Registered Member',
      email: u.email && !u.email.includes('@salafimatch.local') ? u.email : '',
      phone: u.phone || '',
      gender: cleanGender,
      displayGender: isSister ? 'Sister (Bride)' : 'Brother (Groom)',
      age: ageNum,
      dobOrAge: p.dobOrAge || `${ageNum} Years`,
      maritalStatus: p.maritalStatus || 'Never married',
      religion: 'Islam',
      caste: p.manhaj ? 'Salafi' : 'Muslim',
      manhaj: p.manhaj || 'Upon Quran & Sunnah according to the understanding of the Salaf',
      prayerPractice: p.prayerPractice || '5 times daily on time',
      religiousEducation: p.religiousEducation || '',
      hijabOrBeardPreference: p.hijabOrBeardPreference || (isSister ? 'Shar’i Hijab & Abaya' : 'Full Sunnah Beard'),
      education: p.educationQualification || 'Graduate',
      occupation: p.occupation || 'Professional',
      income: p.monthlyIncome || 'Confidential',
      height: p.height || "5'7\" (170 cm)",
      languagesKnown: p.languagesKnown || 'English',
      city: p.currentLocation || 'Kerala, India',
      nativePlace: p.nativePlace || '',
      country: p.country || 'India',
      bio: p.bio || `Practicing ${isSister ? 'sister' : 'brother'} striving upon the Sunnah.`,
      family: {
        fatherOccupation: p.fatherOccupation || '',
        motherOccupation: p.motherOccupation || '',
        siblingsCount: p.siblingsCount || '',
        familyLocation: p.familyLocation || '',
        familyBackground: p.familyBackground || 'Practicing Sunnah / Salafi environment',
        guardianContact: p.guardianContact || ''
      },
      preferences: {
        preferredAgeRange: p.preferredAgeRange || '20 - 28',
        preferredLocation: p.preferredLocation || 'Open / Anywhere',
        preferredMaritalStatus: p.preferredMaritalStatus || 'Never married',
        preferredEducation: p.preferredEducation || '',
        religiousCompatibility: p.religiousCompatibility || 'Strictly practicing upon the Sunnah',
        willingnessToRelocate: p.willingnessToRelocate || 'Open to relocate',
        otherExpectations: p.otherExpectations || ''
      },
      verified: true,
      matchScore: 92,
      photos: (p.photos && p.photos.length > 0) ? p.photos : defaultPhotos,
      created_at: u.created_at
    };

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Registered Profile (Edit Profile API)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const localDb = db.getLocalDb();
    const userIndex = (localDb.users || []).findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    const existingUser = localDb.users[userIndex];
    const existingProfile = existingUser.profile || {};

    // Merge updates into profile
    const updatedProfile = {
      ...existingProfile,
      ...(updates.profile || {}),
      dobOrAge: updates.dobOrAge || updates.age || updates.profile?.dobOrAge || existingProfile.dobOrAge,
      gender: updates.gender || updates.profile?.gender || existingProfile.gender || existingUser.gender,
      currentLocation: updates.city || updates.currentLocation || updates.profile?.currentLocation || existingProfile.currentLocation,
      occupation: updates.occupation || updates.profile?.occupation || existingProfile.occupation,
      educationQualification: updates.education || updates.educationQualification || updates.profile?.educationQualification || existingProfile.educationQualification,
      monthlyIncome: updates.monthlyIncome || updates.income || updates.profile?.monthlyIncome || existingProfile.monthlyIncome,
      height: updates.height || updates.profile?.height || existingProfile.height,
      maritalStatus: updates.maritalStatus || updates.profile?.maritalStatus || existingProfile.maritalStatus,
      manhaj: updates.manhaj || updates.profile?.manhaj || existingProfile.manhaj,
      prayerPractice: updates.prayerPractice || updates.profile?.prayerPractice || existingProfile.prayerPractice,
      bio: updates.bio !== undefined ? updates.bio : existingProfile.bio,
      nativePlace: updates.nativePlace || updates.profile?.nativePlace || existingProfile.nativePlace,
      country: updates.country || updates.profile?.country || existingProfile.country || 'India',
      languagesKnown: updates.languagesKnown || updates.profile?.languagesKnown || existingProfile.languagesKnown,
      hijabOrBeardPreference: updates.hijabOrBeardPreference || updates.profile?.hijabOrBeardPreference || existingProfile.hijabOrBeardPreference,
      fatherOccupation: updates.fatherOccupation || updates.profile?.fatherOccupation || existingProfile.fatherOccupation,
      motherOccupation: updates.motherOccupation || updates.profile?.motherOccupation || existingProfile.motherOccupation,
      siblingsCount: updates.siblingsCount || updates.profile?.siblingsCount || existingProfile.siblingsCount,
      familyBackground: updates.familyBackground || updates.profile?.familyBackground || existingProfile.familyBackground,
      guardianContact: updates.guardianContact || updates.profile?.guardianContact || existingProfile.guardianContact,
      preferredAgeRange: updates.preferredAgeRange || updates.profile?.preferredAgeRange || existingProfile.preferredAgeRange,
      preferredLocation: updates.preferredLocation || updates.profile?.preferredLocation || existingProfile.preferredLocation,
      preferredEducation: updates.preferredEducation || updates.profile?.preferredEducation || existingProfile.preferredEducation,
      religiousCompatibility: updates.religiousCompatibility || updates.profile?.religiousCompatibility || existingProfile.religiousCompatibility,
      otherExpectations: updates.otherExpectations || updates.profile?.otherExpectations || existingProfile.otherExpectations,
      photos: updates.photos || updates.profile?.photos || existingProfile.photos || []
    };

    const updatedUser = {
      ...existingUser,
      name: updates.name || existingUser.name,
      phone: updates.phone || existingUser.phone,
      email: updates.email || existingUser.email,
      gender: updates.gender || updatedProfile.gender || existingUser.gender,
      profile: updatedProfile,
      updated_at: new Date().toISOString()
    };

    localDb.users[userIndex] = updatedUser;
    db.saveLocalDb(localDb);

    // Keep Excel updated
    try {
      excelService.writeUsersToExcel(localDb.users);
    } catch (e) {
      console.warn('[Excel Sync on Update]:', e.message);
    }

    res.json({
      message: 'Profile updated successfully!',
      user: updatedUser
    });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
