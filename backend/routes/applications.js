import express from 'express';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationStats
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'superadmin'), getApplications)
  .post(createApplication); // Public endpoint - no auth required

router.route('/stats')
  .get(protect, authorize('admin', 'superadmin'), getApplicationStats);

router.route('/:id')
  .get(protect, authorize('admin', 'superadmin'), getApplication)
  .put(protect, authorize('admin', 'superadmin'), updateApplication)
  .delete(protect, authorize('admin', 'superadmin'), deleteApplication);

export default router;
