const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

// Attempt PostgreSQL connection with short timeout so it never hangs
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/matrimoney_db',
  connectionTimeoutMillis: 1500,
  idleTimeoutMillis: 5000,
});

let isPgAvailable = false;
let hasCheckedPg = false;

// Local JSON DB fallback path
const dataDir = path.join(__dirname, 'data');
const localDbPath = path.join(dataDir, 'local_db.json');

// Ensure local fallback store exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(localDbPath)) {
  const initialData = {
    users: [
      {
        id: 'usr_demo_101',
        name: 'Devendra Rathore',
        email: 'devendra@example.com',
        phone: '+91 98765 43210',
        password_hash: '$2a$10$wK1Ww4LzXh5V.nZ1UeWpMe6iFf30mHq83w2Zp4w2yq7y8iJ4iG2mi', // 'Password123'
        role: 'USER',
        created_at: new Date().toISOString()
      }
    ],
    profiles: [],
    interests: []
  };
  fs.writeFileSync(localDbPath, JSON.stringify(initialData, null, 2));
}

const getLocalDb = () => {
  try {
    const raw = fs.readFileSync(localDbPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { users: [], profiles: [], interests: [] };
  }
};

const saveLocalDb = (data) => {
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2));
};

async function testPgConnection() {
  if (hasCheckedPg) return isPgAvailable;
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    isPgAvailable = true;
    console.log('[Database] Connected to PostgreSQL successfully.');
  } catch (err) {
    isPgAvailable = false;
    console.log('[Database] PostgreSQL not detected locally. Using resilient local store fallback.');
  }
  hasCheckedPg = true;
  return isPgAvailable;
}

// Initial probe
testPgConnection();

module.exports = {
  // Query method supporting both Postgres and local fallback
  query: async (text, params = []) => {
    const pgOnline = await testPgConnection();

    if (pgOnline) {
      try {
        return await pool.query(text, params);
      } catch (err) {
        console.warn('[Postgres Query Warning]', err.message, '- Falling back to local store');
      }
    }

    // Local JSON store emulation for key queries
    const db = getLocalDb();
    const normalizedText = text.trim().toLowerCase();

    // 1. INSERT INTO users
    if (normalizedText.startsWith('insert into users')) {
      const email = params[0];
      const phone = params[1];
      const password_hash = params[2];
      const name = params[3] || email.split('@')[0];

      // Check unique
      const existing = db.users.find((u) => u.email === email || u.phone === phone);
      if (existing) {
        throw new Error('A user with this email or phone number already exists.');
      }

      const newUser = {
        id: 'usr_' + crypto.randomUUID().slice(0, 8),
        name,
        email,
        phone,
        password_hash,
        role: 'USER',
        created_at: new Date().toISOString()
      };

      db.users.push(newUser);
      saveLocalDb(db);

      return { rows: [newUser], rowCount: 1 };
    }

    // 2. SELECT * FROM users WHERE email = $1 or id = $1
    if (normalizedText.includes('from users where email =') || normalizedText.includes('from users where id =')) {
      const target = params[0];
      const match = db.users.filter((u) => u.email === target || u.id === target);
      return { rows: match, rowCount: match.length };
    }

    // 3. SELECT * FROM users
    if (normalizedText.includes('from users')) {
      return { rows: db.users, rowCount: db.users.length };
    }

    // Default return
    return { rows: [], rowCount: 0 };
  },

  pool,
  getLocalDb,
  saveLocalDb
};
