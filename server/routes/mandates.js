import express from 'express';
import {
  getMandates,
  getMandate,
  createMandate,
  updateMandate,
  deleteMandate,
  getAcademicYears,
  createAcademicYear,
  deleteAcademicYear
} from '../controllers/mandateController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getMandates)
  .post(protect, authorize('admin', 'superadmin'), upload.single('pdf'), createMandate);

router.route('/years')
  .get(getAcademicYears)
  .post(protect, authorize('admin', 'superadmin'), createAcademicYear);

router.route('/years/:year')
  .delete(protect, authorize('admin', 'superadmin'), deleteAcademicYear);

router.route('/:id')
  .get(getMandate)
  .put(protect, authorize('admin', 'superadmin'), upload.single('pdf'), updateMandate)
  .delete(protect, authorize('admin', 'superadmin'), deleteMandate);

export default router;
