import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  refreshToken: String,
  twoFactorSecret: String,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  securityQuestions: [{
    question: String,
    answerHash: String
  }],
  lastPasswordChange: Date,
  passwordHistory: [{
    passwordHash: String,
    changedAt: Date
  }],
  failedLoginIPs: [{
    ip: String,
    attempts: Number,
    lastAttempt: Date
  }]
}, {
  timestamps: true
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  // Check password history (prevent reusing last 5 passwords)
  if (this.passwordHistory && this.passwordHistory.length > 0) {
    for (const oldPassword of this.passwordHistory.slice(-5)) {
      const isReused = await bcrypt.compare(this.password, oldPassword.passwordHash);
      if (isReused) {
        throw new Error('Cannot reuse recent passwords');
      }
    }
  }
  
  // Store old password in history before hashing new one
  if (this.isModified('password') && !this.isNew) {
    const oldPasswordHash = this.password;
    if (!this.passwordHistory) {
      this.passwordHistory = [];
    }
    this.passwordHistory.push({
      passwordHash: oldPasswordHash,
      changedAt: new Date()
    });
    // Keep only last 5 passwords
    if (this.passwordHistory.length > 5) {
      this.passwordHistory = this.passwordHistory.slice(-5);
    }
  }
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  
  if (this.isModified('password') && !this.isNew) {
    this.lastPasswordChange = Date.now();
  }
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Generate refresh token
userSchema.methods.getRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};

// Check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Increment login attempts with IP tracking
userSchema.methods.incLoginAttempts = function(ip) {
  // Track failed attempts by IP
  if (!this.failedLoginIPs) {
    this.failedLoginIPs = [];
  }
  
  const ipRecord = this.failedLoginIPs.find(record => record.ip === ip);
  if (ipRecord) {
    ipRecord.attempts += 1;
    ipRecord.lastAttempt = Date.now();
  } else {
    this.failedLoginIPs.push({
      ip,
      attempts: 1,
      lastAttempt: Date.now()
    });
  }
  
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1, failedLoginIPs: this.failedLoginIPs },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates = { 
    $inc: { loginAttempts: 1 },
    $set: { failedLoginIPs: this.failedLoginIPs }
  };
  const maxAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 hours
  
  // Lock the account if we've reached max attempts
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked()) {
    updates.$set.lockUntil = Date.now() + lockTime;
  }
  
  return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0, failedLoginIPs: [] },
    $unset: { lockUntil: 1 }
  });
};

export default mongoose.model('User', userSchema);
