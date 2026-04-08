import express from 'express';
import {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGallery
} from '../controllers/galleryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getGalleryItems)
  .post(protect, authorize('admin', 'superadmin'), upload.single('file'), createGalleryItem);

router.put('/reorder', protect, authorize('admin', 'superadmin'), reorderGallery);

router.route('/:id')
  .get(getGalleryItem)
  .put(protect, authorize('admin', 'superadmin'), upload.single('file'), updateGalleryItem)
  .delete(protect, authorize('admin', 'superadmin'), deleteGalleryItem);

export default router;
