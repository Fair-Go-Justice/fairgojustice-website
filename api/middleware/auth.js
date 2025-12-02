/**
 * Auth Middleware - JWT token verification
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ||
  (process.env.NODE_ENV === 'development' ? 'dev-only-secret-CHANGE-IN-PROD' : null);

// Validate JWT_SECRET is set in production
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set');
}

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Server error during authentication' });
  }
};

module.exports = auth;
