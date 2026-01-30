import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

// Aggressive rate limiting for admin routes
export const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Strict rate limiting for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 login attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later.',
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Account temporarily locked.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// CSRF Protection middleware
export const csrfProtection = (req, res, next) => {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const token = req.headers['x-csrf-token'] || req.body._csrf;
  const sessionToken = req.cookies.csrfToken;

  if (!token || !sessionToken || token !== sessionToken) {
    return res.status(403).json({
      success: false,
      message: 'Invalid CSRF token'
    });
  }

  next();
};

// Generate CSRF token
export const generateCsrfToken = (req, res, next) => {
  if (!req.cookies.csrfToken) {
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  }
  next();
};

// IP Whitelist middleware (optional - for extra security)
export const ipWhitelist = (allowedIPs = []) => {
  return (req, res, next) => {
    if (allowedIPs.length === 0) {
      return next(); // Skip if no whitelist configured
    }

    const clientIP = req.ip || req.connection.remoteAddress;
    
    if (!allowedIPs.includes(clientIP)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied from this IP address'
      });
    }

    next();
  };
};

// Session validation middleware
export const validateSession = async (req, res, next) => {
  if (!req.user) {
    return next();
  }

  // Check if password was changed after token was issued
  if (req.user.passwordChangedAt) {
    const decoded = jwt.decode(req.headers.authorization?.split(' ')[1]);
    const changedTimestamp = parseInt(req.user.passwordChangedAt.getTime() / 1000, 10);
    
    if (decoded.iat < changedTimestamp) {
      return res.status(401).json({
        success: false,
        message: 'Password recently changed. Please login again.'
      });
    }
  }

  next();
};

// Request logging for security audit
export const securityLogger = (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    userId: req.user?.id || 'anonymous'
  };

  // Log sensitive operations
  if (req.path.includes('/admin') || req.path.includes('/auth')) {
    console.log('[SECURITY]', JSON.stringify(logData));
  }

  next();
};

// Prevent parameter pollution for admin routes
export const preventParameterPollution = (req, res, next) => {
  // Check for duplicate parameters
  const params = { ...req.query, ...req.body };
  
  for (const key in params) {
    if (Array.isArray(params[key]) && params[key].length > 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request parameters'
      });
    }
  }

  next();
};

// Content Security Policy headers
export const setSecurityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

// Detect and block suspicious patterns
export const detectSuspiciousActivity = (req, res, next) => {
  const suspiciousPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i, // SQL injection
    /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/i, // XSS
    /\.\.\//i, // Path traversal
    /((\%3C)|<)((\%69)|i|(\%49))((\%6D)|m|(\%4D))((\%67)|g|(\%47))[^\n]+((\%3E)|>)/i // IMG tag
  ];

  const checkString = JSON.stringify(req.body) + JSON.stringify(req.query) + req.path;

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(checkString)) {
      console.error('[SECURITY ALERT] Suspicious activity detected:', {
        ip: req.ip,
        path: req.path,
        pattern: pattern.toString()
      });
      
      return res.status(403).json({
        success: false,
        message: 'Suspicious activity detected'
      });
    }
  }

  next();
};
