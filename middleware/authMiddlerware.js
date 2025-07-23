const jwt = require('jsonwebtoken');
const { Unauthenticated } = require('../errors');

// Middleware to verify JWT and extract user
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Unauthenticated('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch (err) {
    throw new Unauthenticated('Invalid or expired token');
  }
};

// Middleware to restrict access to admins only
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new Unauthenticated('Admin access only');
  }
  next();
};

module.exports = { authMiddleware, adminOnly };
