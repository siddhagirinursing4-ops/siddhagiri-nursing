import Programme from '../models/Programme.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all programmes
// @route   GET /api/programmes
// @access  Public
export const getProgrammes = async (req, res, next) => {
  try {
    const programmes = await Programme.find({ isActive: true }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: programmes.length,
      data: programmes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single programme
// @route   GET /api/programmes/:id
// @access  Public
export const getProgramme = async (req, res, next) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: 'Programme not found'
      });
    }

    res.status(200).json({
      success: true,
      data: programme
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get programme by slug
// @route   GET /api/programmes/slug/:slug
// @access  Public
export const getProgrammeBySlug = async (req, res, next) => {
  try {
    const programme = await Programme.findOne({ slug: req.params.slug, isActive: true });

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: 'Programme not found'
      });
    }

    res.status(200).json({
      success: true,
      data: programme
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create programme
// @route   POST /api/programmes
// @access  Private/Admin
export const createProgramme = async (req, res, next) => {
  try {
    const programmeData = { ...req.body, createdBy: req.user.id };

    // Upload image if provided
    if (req.files?.image) {
      const imageResult = await uploadToCloudinary(req.files.image[0], 'programmes');
      programmeData.image = {
        url: imageResult.secure_url,
        publicId: imageResult.public_id
      };
    }

    // Upload video if provided
    if (req.files?.video) {
      const videoResult = await uploadToCloudinary(req.files.video[0], 'programmes');
      programmeData.video = {
        url: videoResult.secure_url,
        publicId: videoResult.public_id
      };
    }

    const programme = await Programme.create(programmeData);

    res.status(201).json({
      success: true,
      data: programme
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update programme
// @route   PUT /api/programmes/:id
// @access  Private/Admin
export const updateProgramme = async (req, res, next) => {
  try {
    let programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: 'Programme not found'
      });
    }

    const updateData = { ...req.body };

    // Upload new image if provided
    if (req.files?.image) {
      if (programme.image?.publicId) {
        await deleteFromCloudinary(programme.image.publicId);
      }
      const imageResult = await uploadToCloudinary(req.files.image[0], 'programmes');
      updateData.image = {
        url: imageResult.secure_url,
        publicId: imageResult.public_id
      };
    }

    // Upload new video if provided
    if (req.files?.video) {
      if (programme.video?.publicId) {
        await deleteFromCloudinary(programme.video.publicId, 'video');
      }
      const videoResult = await uploadToCloudinary(req.files.video[0], 'programmes');
      updateData.video = {
        url: videoResult.secure_url,
        publicId: videoResult.public_id
      };
    }

    programme = await Programme.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: programme
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete programme
// @route   DELETE /api/programmes/:id
// @access  Private/Admin
export const deleteProgramme = async (req, res, next) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: 'Programme not found'
      });
    }

    // Delete associated files from Cloudinary
    if (programme.image?.publicId) {
      await deleteFromCloudinary(programme.image.publicId);
    }
    if (programme.video?.publicId) {
      await deleteFromCloudinary(programme.video.publicId, 'video');
    }

    await programme.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Programme deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
