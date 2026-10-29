const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'bandhan_super_secret_jwt_key_2026';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// 1. REGISTER USER (Supports Salafi Matchmaking 4-Step Profile)
router.post('/register', async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    gender,
    profile
  } = req.body;

  // Validation
  if (!phone || !password) {
    return res.status(400).json({ error: 'Mobile number and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    const cleanPhone = phone.trim();
    const phoneDigits = cleanPhone.replace(/\D/g, '');
    const cleanEmail = email && email.trim() ? email.trim().toLowerCase() : `user_${phoneDigits}@salafimatch.local`;
    const displayName = name && name.trim() ? name.trim() : (cleanEmail.split('@')[0]);

    // Check if user already exists by phone or email
    const checkQuery = await db.query('SELECT * FROM users WHERE phone = $1 OR email = $2', [cleanPhone, cleanEmail]);
    if (checkQuery.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this mobile number or email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const fullProfile = {
      gender: gender || 'brother',
      profileCreatedBy: profile?.profileCreatedBy || 'Self',
      dobOrAge: profile?.dobOrAge || '',
      maritalStatus: profile?.maritalStatus || 'Never married',
      country: profile?.country || 'India',
      currentLocation: profile?.currentLocation || '',
      nativePlace: profile?.nativePlace || '',
      
      // Step 2: Religious & Personal
      manhaj: profile?.manhaj || 'Upon the Quran & Sunnah according to the understanding of the Salaf',
      prayerPractice: profile?.prayerPractice || '5 times daily in the Masjid / on time',
      religiousEducation: profile?.religiousEducation || '',
      hijabOrBeardPreference: profile?.hijabOrBeardPreference || '',
      educationQualification: profile?.educationQualification || '',
      occupation: profile?.occupation || '',
      monthlyIncome: profile?.monthlyIncome || '',
      height: profile?.height || '',
      languagesKnown: profile?.languagesKnown || '',
      bio: profile?.bio || '',

      // Step 3: Family
      fatherOccupation: profile?.fatherOccupation || '',
      motherOccupation: profile?.motherOccupation || '',
      siblingsCount: profile?.siblingsCount || '',
      familyLocation: profile?.familyLocation || '',
      familyBackground: profile?.familyBackground || '',
      guardianContact: profile?.guardianContact || '',

      // Step 4: Partner Preferences
      preferredAgeRange: profile?.preferredAgeRange || '20 - 30',
      preferredLocation: profile?.preferredLocation || 'Any / Open',
      preferredMaritalStatus: profile?.preferredMaritalStatus || 'Any',
      preferredEducation: profile?.preferredEducation || '',
      religiousCompatibility: profile?.religiousCompatibility || 'Strictly practicing upon the Sunnah',
      preferredHeight: profile?.preferredHeight || '',
      willingnessToRelocate: profile?.willingnessToRelocate || 'Open to relocate',
      otherExpectations: profile?.otherExpectations || ''
    };

    const result = await db.query(
      'INSERT INTO users (email, phone, password_hash, name, profile) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, phone, name',
      [cleanEmail, cleanPhone, hashedPassword, displayName, fullProfile]
    );

    const newUser = result.rows[0];

    // Generate JWT Token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Alhamdulillah, your registration is successful!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name || displayName,
        email: cleanEmail.includes('@salafimatch.local') ? '' : cleanEmail,
        phone: newUser.phone,
        role: 'USER',
        gender: gender || 'brother',
        profile: fullProfile
      }
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: err.message || 'Internal server error during registration.' });
  }
});

// 2. LOGIN USER (Accepts either Email or Mobile Number)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter your registered mobile number/email and password.' });
  }

  try {
    const inputIdentifier = email.trim().toLowerCase();
    const result = await db.query('SELECT * FROM users WHERE email = $1', [inputIdentifier]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'No account found with this email or mobile number.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password. Please try again.' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name || user.email.split('@')[0],
        email: user.email && user.email.includes('@salafimatch.local') ? '' : user.email,
        phone: user.phone,
        role: user.role || 'USER',
        profile: user.profile || {}
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: err.message || 'Internal server error during login.' });
  }
});

// 3. GET CURRENT USER (Verify token & get profile)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      user: {
        id: user.id,
        name: user.name || user.email.split('@')[0],
        email: user.email && user.email.includes('@salafimatch.local') ? '' : user.email,
        phone: user.phone,
        role: user.role || 'USER',
        profile: user.profile || {}
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
