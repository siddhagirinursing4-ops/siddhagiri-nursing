import express from 'express';
import {
  getProgrammes,
  getProgramme,
  getProgrammeBySlug,
  createProgramme,
  updateProgramme,
  deleteProgramme
} from '../controllers/programmeController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getProgrammes)
  .post(protect, authorize('admin', 'superadmin'), upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), createProgramme);

router.route('/slug/:slug')
  .get(getProgrammeBySlug);

router.route('/:id')
  .get(getProgramme)
  .put(protect, authorize('admin', 'superadmin'), upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), updateProgramme)
  .delete(protect, authorize('admin', 'superadmin'), deleteProgramme);

export default router;
