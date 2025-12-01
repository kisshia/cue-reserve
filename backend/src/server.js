require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// Load models & associations
require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:8080', // frontend dev server
  credentials: true
}));
app.use(express.json());

// API routes
const userRoutes = require('./routes/userRoutes');
const tableRoutes = require('./routes/tableRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);

// Health check route
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', database: 'connected' })
);

// Serve frontend in production or after build
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// SPA routing for frontend
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful - server.js:46');

    await sequelize.sync({ alter: true });
    console.log('📦 Models synced with MySQL - server.js:49');

  } catch (error) {
    console.error('❌ Database error - server.js:52', error.message);
  }

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port} - server.js:57`);
  });
}

start();

module.exports = app;
