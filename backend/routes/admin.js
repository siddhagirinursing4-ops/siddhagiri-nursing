import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getDashboardStats
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';
import { 
  adminRateLimiter, 
  securityLogger, 
  preventParameterPollution,
  detectSuspiciousActivity 
} from '../middleware/security.js';

const router = express.Router();

// Apply security middleware to all admin routes
router.use(protect);
router.use(adminRateLimiter);
router.use(securityLogger);
router.use(preventParameterPollution);
router.use(detectSuspiciousActivity);

// Dashboard stats - accessible by both admin and superadmin
router.get('/stats', authorize('admin', 'superadmin'), getDashboardStats);

// User management routes - superadmin only
router.get('/users', authorize('superadmin'), getUsers);
router.route('/users/:id')
  .get(authorize('superadmin'), getUser)
  .put(authorize('superadmin'), updateUser)
  .delete(authorize('superadmin'), deleteUser);
router.put('/users/:id/toggle-status', authorize('superadmin'), toggleUserStatus);

export default router;
