/**
 * Fair Go Justice API - Main Server
 * Express.js server with MongoDB integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth');
const petitionRoutes = require('./routes/petition');
const storiesRoutes = require('./routes/stories');
const contactRoutes = require('./routes/contact');
const quizRoutes = require('./routes/quiz');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 8080;

// ==========================================================================
// Middleware
// ==========================================================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://fairgojustice.com.au'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==========================================================================
// Database Connection
// ==========================================================================

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fairgojustice';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Continue without database for demo purposes
  }
};

// ==========================================================================
// Routes
// ==========================================================================

// Health check
app.get('/', (req, res) => {
  res.json({
    name: 'Fair Go Justice API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/petition', petitionRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/analytics', analyticsRoutes);

// ==========================================================================
// Error Handling
// ==========================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// ==========================================================================
// Start Server
// ==========================================================================

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║     Fair Go Justice API Server                              ║
║     Running on port ${PORT}                                    ║
║     Environment: ${process.env.NODE_ENV || 'development'}                         ║
╚════════════════════════════════════════════════════════════╝
    `);
  });
};

startServer();

module.exports = app;
