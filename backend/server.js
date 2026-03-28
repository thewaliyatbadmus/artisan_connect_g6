require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ArtisanConnect API is running' });
});

// Routes with error handling
try {
  console.log('Loading routes...');
  const authRoutes = require('./routes/auth');
  console.log('✓ Auth routes loaded');
  app.use('/api/auth', authRoutes);

  const artisanRoutes = require('./routes/artisan');
  console.log('✓ Artisan routes loaded');
  app.use('/api/artisan', artisanRoutes);

  const bookingRoutes = require('./routes/booking');
  console.log('✓ Booking routes loaded');
  app.use('/api/booking', bookingRoutes);

  const reviewRoutes = require('./routes/reviews');
  console.log('✓ Reviews routes loaded');
  app.use('/api/reviews', reviewRoutes);

  console.log('✓ All routes loaded successfully');
} catch (err) {
  console.error(' Error loading routes:', err.message);
  process.exit(1);
}


// Health check
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({ status: 'Database connected' });
  } catch (err) {
    res.status(500).json({ status: 'Database error', error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n Backend server running on http://localhost:${PORT}`);
  console.log(` API Base: http://localhost:${PORT}/api`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
