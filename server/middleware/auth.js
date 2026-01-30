import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import crypto from 'crypto';

// Store active sessions in memory (use Redis in production)
const activeSessions = new Map();

// Protect routes with enhanced security
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token is blacklisted (after logout)
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    if (global.blacklistedTokens?.has(tokenHash)) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked'
      });
    }

    const user = await User.findById(decoded.id).select('+loginAttempts +lockUntil');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists or is inactive'
      });
    }

    // Check if account is locked
    if (user.isLocked()) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to suspicious activity'
      });
    }

    // Check if password was changed after token was issued
    if (user.passwordChangedAt) {
      const changedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (decoded.iat < changedTimestamp) {
        return res.status(401).json({
          success: false,
          message: 'Password recently changed. Please login again.'
        });
      }
    }

    // Validate session
    const sessionKey = `${user._id}_${decoded.iat}`;
    if (!activeSessions.has(sessionKey)) {
      activeSessions.set(sessionKey, {
        userId: user._id,
        createdAt: decoded.iat,
        lastActivity: Date.now()
      });
    } else {
      // Update last activity
      const session = activeSessions.get(sessionKey);
      session.lastActivity = Date.now();
    }

    req.user = user;
    req.sessionKey = sessionKey;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // Log unauthorized access attempt
      console.warn('[SECURITY] Unauthorized access attempt:', {
        userId: req.user.id,
        role: req.user.role,
        requiredRoles: roles,
        path: req.path,
        ip: req.ip
      });

      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Verify refresh token
export const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token required'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};

// Cleanup expired sessions (call periodically)
export const cleanupSessions = () => {
  const now = Date.now();
  const maxInactivity = 30 * 60 * 1000; // 30 minutes

  for (const [key, session] of activeSessions.entries()) {
    if (now - session.lastActivity > maxInactivity) {
      activeSessions.delete(key);
    }
  }
};

// Initialize blacklist for revoked tokens
if (!global.blacklistedTokens) {
  global.blacklistedTokens = new Set();
}

// Cleanup blacklist periodically (tokens expire anyway)
setInterval(() => {
  if (global.blacklistedTokens.size > 10000) {
    global.blacklistedTokens.clear();
  }
}, 60 * 60 * 1000); // Every hour

// Cleanup sessions every 10 minutes
setInterval(cleanupSessions, 10 * 60 * 1000);

export { activeSessions };
