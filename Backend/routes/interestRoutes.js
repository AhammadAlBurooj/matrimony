const express = require('express');
const router = express.Router();
const db = require('../db');

// Send Interest
router.post('/send', async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO interests (sender_id, receiver_id) VALUES ($1, $2) RETURNING *',
      [senderId, receiverId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;