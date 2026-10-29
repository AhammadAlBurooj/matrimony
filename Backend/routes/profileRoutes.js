const express = require('express');
const router = express.Router();
const db = require('../db');

// Get Profiles with Filter
router.get('/', async (req, res) => {
  const { gender, religion, city } = req.query;
  let queryText = 'SELECT * FROM profiles WHERE 1=1';
  let params = [];

  if (gender) {
    params.push(gender);
    queryText += ` AND gender = $${params.length}`;
  }
  if (religion) {
    params.push(religion);
    queryText += ` AND religion = $${params.length}`;
  }
  if (city) {
    params.push(city);
    queryText += ` AND city = $${params.length}`;
  }

  try {
    const result = await db.query(queryText, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;