import express from 'express';
import multer from 'multer';
import DynamicContent from '../models/DynamicContent.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Protected routes - Admin only (MUST come before public /:key route)
router.get('/admin/all', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const { section } = req.query;
    
    const query = {};
    if (section && section !== 'all') query.section = section;

    const content = await DynamicContent.find(query).sort({ section: 1, order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
});

// Create new content
router.post('/', protect, authorize('admin', 'superadmin'), upload.single('image'), async (req, res) => {
  try {
    const { key, title, content, section, isActive, order } = req.body;

    // Check if key already exists
    const existingContent = await DynamicContent.findOne({ key });
    if (existingContent) {
      return res.status(400).json({
        success: false,
        message: 'Content with this key already exists'
      });
    }

    const contentData = {
      key,
      title,
      content,
      section,
      isActive: isActive === 'true' || isActive === true,
      order: parseInt(order) || 0
    };

    // Handle image upload for banner section
    if (section === 'banner' && req.file) {
      try {
        const result = await uploadToCloudinary(req.file, 'banners');
        contentData.image = {
          url: result.secure_url,
          publicId: result.public_id,
          filename: req.file.originalname
        };
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: 'Failed to upload image to Cloudinary',
          error: uploadError.message
        });
      }
    }

    const newContent = await DynamicContent.create(contentData);

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: newContent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create content',
      error: error.message
    });
  }
});

// Update content
router.put('/:id', protect, authorize('admin', 'superadmin'), upload.single('image'), async (req, res) => {
  try {
    const { title, content, section, isActive, order } = req.body;

    const existingContent = await DynamicContent.findById(req.params.id);
    if (!existingContent) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const updateData = {
      title,
      content,
      section,
      isActive: isActive === 'true' || isActive === true,
      order: parseInt(order) || 0
    };

    // Handle image upload for banner section
    if (section === 'banner' && req.file) {
      try {
        // Delete old image if exists
        if (existingContent.image?.publicId) {
          await deleteFromCloudinary(existingContent.image.publicId);
        }

        // Upload new image
        const result = await uploadToCloudinary(req.file, 'banners');
        updateData.image = {
          url: result.secure_url,
          publicId: result.public_id,
          filename: req.file.originalname
        };
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: 'Failed to upload image to Cloudinary',
          error: uploadError.message
        });
      }
    }

    const updatedContent = await DynamicContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: updatedContent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update content',
      error: error.message
    });
  }
});

// Delete content
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const content = await DynamicContent.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Delete image from Cloudinary if exists
    if (content.image?.publicId) {
      try {
        await deleteFromCloudinary(content.image.publicId);
      } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error);
        // Continue with deletion even if Cloudinary delete fails
      }
    }

    await content.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete content',
      error: error.message
    });
  }
});

// Public routes - Get all active content
router.get('/', async (req, res) => {
  try {
    const { section, key } = req.query;
    
    const query = { isActive: true };
    if (section) query.section = section;
    if (key) query.key = key;

    const content = await DynamicContent.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
});

// Get single content by key (MUST be last to avoid catching other routes)
router.get('/:key', async (req, res) => {
  try {
    const content = await DynamicContent.findOne({ key: req.params.key, isActive: true });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
});

export default router;
