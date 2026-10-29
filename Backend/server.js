const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const interestRoutes = require('./routes/interestRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/interests', interestRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Matroney API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});