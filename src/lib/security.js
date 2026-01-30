// Security utilities for frontend

// XSS Protection - Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Strong password validation
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  // Check for common patterns
  const commonPatterns = [
    /^123456/,
    /^password/i,
    /^admin/i,
    /^qwerty/i,
    /^abc123/i
  ];
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains common patterns. Please choose a stronger password');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Check password strength
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;
  if (password.length >= 16) strength++;
  
  if (strength <= 2) return { level: 'weak', color: 'red', percentage: 25 };
  if (strength <= 4) return { level: 'medium', color: 'orange', percentage: 50 };
  if (strength <= 5) return { level: 'good', color: 'yellow', percentage: 75 };
  return { level: 'strong', color: 'green', percentage: 100 };
};

// Detect suspicious activity patterns
export const detectSuspiciousActivity = () => {
  const failedAttempts = parseInt(localStorage.getItem('failedLoginAttempts') || '0');
  const lastAttempt = parseInt(localStorage.getItem('lastFailedAttempt') || '0');
  const now = Date.now();
  
  // Reset counter after 15 minutes
  if (now - lastAttempt > 15 * 60 * 1000) {
    localStorage.setItem('failedLoginAttempts', '0');
    return false;
  }
  
  return failedAttempts >= 3;
};

// Track failed login attempts
export const trackFailedLogin = () => {
  const attempts = parseInt(localStorage.getItem('failedLoginAttempts') || '0') + 1;
  localStorage.setItem('failedLoginAttempts', attempts.toString());
  localStorage.setItem('lastFailedAttempt', Date.now().toString());
  return attempts;
};

// Reset failed login attempts
export const resetFailedLogins = () => {
  localStorage.removeItem('failedLoginAttempts');
  localStorage.removeItem('lastFailedAttempt');
};

// Session timeout detection
let sessionTimeout;
let warningTimeout;

export const initSessionTimeout = (onTimeout, onWarning, timeoutMinutes = 30) => {
  const clearTimeouts = () => {
    if (sessionTimeout) clearTimeout(sessionTimeout);
    if (warningTimeout) clearTimeout(warningTimeout);
  };

  const resetTimer = () => {
    clearTimeouts();
    
    // Warn 5 minutes before timeout
    warningTimeout = setTimeout(() => {
      if (onWarning) onWarning();
    }, (timeoutMinutes - 5) * 60 * 1000);
    
    // Timeout after specified minutes
    sessionTimeout = setTimeout(() => {
      if (onTimeout) onTimeout();
    }, timeoutMinutes * 60 * 1000);
  };

  // Reset timer on user activity
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  events.forEach(event => {
    document.addEventListener(event, resetTimer, true);
  });

  resetTimer();

  return () => {
    clearTimeouts();
    events.forEach(event => {
      document.removeEventListener(event, resetTimer, true);
    });
  };
};

// Secure token storage
export const secureStorage = {
  setItem: (key, value) => {
    try {
      // Add timestamp for expiry checking
      const item = {
        value,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Error storing item:', error);
    }
  },
  
  getItem: (key, maxAge = 24 * 60 * 60 * 1000) => {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;
      
      const item = JSON.parse(itemStr);
      const now = Date.now();
      
      // Check if item has expired
      if (now - item.timestamp > maxAge) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Error retrieving item:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

// Prevent clickjacking
export const preventClickjacking = () => {
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }
};

// Content Security Policy violation reporter
export const setupCSPReporting = () => {
  document.addEventListener('securitypolicyviolation', (e) => {
    console.error('CSP Violation:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy
    });
    
    // In production, send this to your logging service
  });
};

// Detect DevTools (basic detection)
export const detectDevTools = (callback) => {
  const threshold = 160;
  let devtoolsOpen = false;

  const check = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
      devtoolsOpen = true;
      if (callback) callback(true);
    } else if (!(widthThreshold || heightThreshold) && devtoolsOpen) {
      devtoolsOpen = false;
      if (callback) callback(false);
    }
  };

  setInterval(check, 1000);
};

// Clipboard protection for sensitive data
export const protectClipboard = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });

  element.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
  });
};

// Disable right-click on sensitive areas
export const disableRightClick = (elementId) => {
  const element = elementId ? document.getElementById(elementId) : document;
  if (!element) return;

  element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};

// Generate secure random string
export const generateSecureRandom = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Validate JWT token format (basic check)
export const isValidJWT = (token) => {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  return parts.length === 3;
};

// Check if token is expired (without verifying signature)
export const isTokenExpired = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    
    return Date.now() >= exp;
  } catch (error) {
    return true;
  }
};
