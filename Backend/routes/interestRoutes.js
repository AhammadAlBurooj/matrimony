const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../db');

// Send Match Invitation / Express Interest
router.post('/send', async (req, res) => {
  const { senderId, receiverId, senderName, receiverName } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'senderId and receiverId are required.' });
  }

  try {
    const localDb = db.getLocalDb();
    if (!localDb.interests) localDb.interests = [];
    if (!localDb.notifications) localDb.notifications = [];

    // Check if interest already exists
    const existing = localDb.interests.find(
      (i) => i.senderId === senderId && i.receiverId === receiverId
    );

    if (existing) {
      return res.status(400).json({ error: 'Interest / invitation has already been sent to this member.' });
    }

    // Resolve names if missing
    const sender = localDb.users.find((u) => u.id === senderId);
    const receiver = localDb.users.find((u) => u.id === receiverId);

    const sName = senderName || sender?.name || 'A Member';
    const rName = receiverName || receiver?.name || 'A Member';

    const newInterest = {
      id: 'int_' + crypto.randomUUID().slice(0, 8),
      senderId,
      senderName: sName,
      receiverId,
      receiverName: rName,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    localDb.interests.push(newInterest);

    // Notification for Receiver (Invitation Received)
    localDb.notifications.unshift({
      id: 'notif_' + crypto.randomUUID().slice(0, 8),
      userId: receiverId,
      type: 'interest_received',
      title: 'New Match Invitation!',
      message: `${sName} sent you an invitation / expressed interest in your profile.`,
      relatedProfileId: senderId,
      timestamp: new Date().toISOString(),
      read: false
    });

    // Notification for Sender (Invitation Sent Confirmation)
    localDb.notifications.unshift({
      id: 'notif_' + crypto.randomUUID().slice(0, 8),
      userId: senderId,
      type: 'interest_sent',
      title: 'Invitation Delivered',
      message: `Your invitation was successfully sent to ${rName}.`,
      relatedProfileId: receiverId,
      timestamp: new Date().toISOString(),
      read: false
    });

    db.saveLocalDb(localDb);

    res.status(201).json({
      message: 'Invitation sent successfully!',
      interest: newInterest
    });
  } catch (err) {
    console.error('Error in interest /send:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get Sent Invitations
router.get('/sent/:userId', (req, res) => {
  const { userId } = req.params;
  try {
    const localDb = db.getLocalDb();
    const sent = (localDb.interests || []).filter((i) => i.senderId === userId);
    res.json(sent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Received Invitations
router.get('/received/:userId', (req, res) => {
  const { userId } = req.params;
  try {
    const localDb = db.getLocalDb();
    const received = (localDb.interests || []).filter((i) => i.receiverId === userId);
    res.json(received);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept Invitation
router.post('/accept', (req, res) => {
  const { interestId, userId } = req.body;
  try {
    const localDb = db.getLocalDb();
    const interest = (localDb.interests || []).find(
      (i) => i.id === interestId || (i.receiverId === userId && i.senderId === req.body.senderId)
    );

    if (!interest) {
      return res.status(404).json({ error: 'Invitation not found.' });
    }

    interest.status = 'accepted';

    // Notify original sender
    if (!localDb.notifications) localDb.notifications = [];
    localDb.notifications.unshift({
      id: 'notif_' + crypto.randomUUID().slice(0, 8),
      userId: interest.senderId,
      type: 'interest_accepted',
      title: 'Invitation Accepted! 🎉',
      message: `${interest.receiverName} accepted your invitation! You can now view full contact details and start conversation.`,
      relatedProfileId: interest.receiverId,
      timestamp: new Date().toISOString(),
      read: false
    });

    db.saveLocalDb(localDb);

    res.json({ message: 'Invitation accepted!', interest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Decline Invitation
router.post('/decline', (req, res) => {
  const { interestId } = req.body;
  try {
    const localDb = db.getLocalDb();
    const interest = (localDb.interests || []).find((i) => i.id === interestId);

    if (interest) {
      interest.status = 'declined';
      db.saveLocalDb(localDb);
    }

    res.json({ message: 'Invitation declined.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Notifications for User
router.get('/notifications/:userId', (req, res) => {
  const { userId } = req.params;
  try {
    const localDb = db.getLocalDb();
    const notifs = (localDb.notifications || []).filter((n) => n.userId === userId);
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark Notifications as Read
router.post('/notifications/read', (req, res) => {
  const { userId, notifId } = req.body;
  try {
    const localDb = db.getLocalDb();
    if (localDb.notifications) {
      localDb.notifications.forEach((n) => {
        if (notifId) {
          if (n.id === notifId) n.read = true;
        } else if (userId && n.userId === userId) {
          n.read = true;
        }
      });
      db.saveLocalDb(localDb);
    }
    res.json({ message: 'Notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;