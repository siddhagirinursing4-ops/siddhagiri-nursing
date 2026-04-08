import User from '../models/User.js';
import Programme from '../models/Programme.js';
import Mandate from '../models/Mandate.js';
import Gallery from '../models/Gallery.js';
import Application from '../models/Application.js';
import DynamicContent from '../models/DynamicContent.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalProgrammes,
      totalMandates,
      totalGalleryItems,
      totalDynamicContent,
      totalApplications,
      pendingApplications,
      approvedApplications
    ] = await Promise.all([
      User.countDocuments(),
      Programme.countDocuments(),
      Mandate.countDocuments(),
      Gallery.countDocuments(),
      DynamicContent.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'approved' })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProgrammes,
        totalMandates,
        totalGalleryItems,
        totalDynamicContent,
        totalApplications,
        pendingApplications,
        approvedApplications
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { password, ...updateData } = req.body;

    // Find user first
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check admin limit when changing role to admin
    if (updateData.role === 'admin' && user.role !== 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount >= 1) {
        return res.status(400).json({
          success: false,
          message: 'Maximum number of admin accounts reached. Only 1 admin allowed (in addition to superadmin).'
        });
      }
    }

    // Update basic fields
    Object.keys(updateData).forEach(key => {
      user[key] = updateData[key];
    });

    // Update password if provided
    if (password && password.trim() !== '') {
      user.password = password;
      user.passwordChangedAt = Date.now();
    }

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(req.params.id).select('-password');

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
