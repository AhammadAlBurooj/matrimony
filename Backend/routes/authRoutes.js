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

// 1. REGISTER USER
router.post('/register', async (req, res) => {
  const { name, email, phone, password, gender } = req.body;

  // Validation
  if (!email || !password || !phone) {
    return res.status(400).json({ error: 'Email, phone, and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const displayName = name ? name.trim() : cleanEmail.split('@')[0];

    // Check if user already exists
    const checkQuery = await db.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);
    if (checkQuery.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (email, phone, password_hash, name) VALUES ($1, $2, $3, $4) RETURNING id, email, phone, name',
      [cleanEmail, cleanPhone, hashedPassword, displayName]
    );

    const newUser = result.rows[0];

    // Generate JWT Token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Registration successful! Welcome to Bandhan.',
      token,
      user: {
        id: newUser.id,
        name: newUser.name || displayName,
        email: newUser.email,
        phone: newUser.phone,
        role: 'USER',
        gender: gender || 'not_specified'
      }
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: err.message || 'Internal server error during registration.' });
  }
});

// 2. LOGIN USER
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const result = await db.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'No account found with this email address.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password. Please try again.' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name || user.email.split('@')[0],
        email: user.email,
        phone: user.phone,
        role: user.role || 'USER'
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
        email: user.email,
        phone: user.phone,
        role: user.role || 'USER'
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
