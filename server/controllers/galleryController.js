import Gallery from '../models/Gallery.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

export const getGalleryItems = async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    
    const items = await Gallery.find(filter)
      .sort('order -createdAt')
      .populate('uploadedBy', 'name email');

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

export const getGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id).populate('uploadedBy', 'name email');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const createGalleryItem = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const type = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    const result = await uploadToCloudinary(req.file, 'gallery');

    const item = await Gallery.create({
      ...req.body,
      type,
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: req.file.originalname
      },
      uploadedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    let item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    const updateData = { ...req.body };

    if (req.file) {
      const resourceType = item.type === 'video' ? 'video' : 'image';
      await deleteFromCloudinary(item.file.publicId, resourceType);
      
      const type = req.file.mimetype.startsWith('video') ? 'video' : 'image';
      const result = await uploadToCloudinary(req.file, 'gallery');
      
      updateData.type = type;
      updateData.file = {
        url: result.secure_url,
        publicId: result.public_id,
        filename: req.file.originalname
      };
    }

    item = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    const resourceType = item.type === 'video' ? 'video' : 'image';
    await deleteFromCloudinary(item.file.publicId, resourceType);
    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const reorderGallery = async (req, res, next) => {
  try {
    const { items } = req.body; // Array of { id, order }

    const updatePromises = items.map(item =>
      Gallery.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Gallery reordered successfully'
    });
  } catch (error) {
    next(error);
  }
};
