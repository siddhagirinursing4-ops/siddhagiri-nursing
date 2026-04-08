import express from 'express';
import {
  getAdmissionsContent,
  updateHeroSection,
  updateFeeStructure,
  updateEligibility,
  updateDocuments,
  updateAdmissionSteps,
  updateImportantDates
} from '../controllers/admissionsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route - Get admissions content
router.get('/', getAdmissionsContent);

// Protected routes - Admin only
router.put('/hero', protect, authorize('admin', 'superadmin'), updateHeroSection);
router.put('/fee-structure', protect, authorize('admin', 'superadmin'), updateFeeStructure);
router.put('/eligibility', protect, authorize('admin', 'superadmin'), updateEligibility);
router.put('/documents', protect, authorize('admin', 'superadmin'), updateDocuments);
router.put('/admission-steps', protect, authorize('admin', 'superadmin'), updateAdmissionSteps);
router.put('/important-dates', protect, authorize('admin', 'superadmin'), updateImportantDates);

export default router;
