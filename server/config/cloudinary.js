import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `school/${folder}`,
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

// Copy file from one folder to another in Cloudinary
export const copyCloudinaryFile = async (sourcePublicId, targetFolder) => {
  try {
    // Extract filename from source publicId (last part after the last slash)
    const pathParts = sourcePublicId.split('/');
    const filename = pathParts[pathParts.length - 1];
    
    // Generate new publicId with target folder path
    const newPublicId = `school/${targetFolder}/${filename}`;
    
    // Get the source file URL
    const sourceUrl = cloudinary.url(sourcePublicId, { resource_type: 'raw' });
    
    // Use Cloudinary upload API with source URL to copy file
    const result = await cloudinary.uploader.upload(sourceUrl, {
      public_id: newPublicId,
      resource_type: 'raw',
      type: 'upload'
    });
    
    // Return new file details
    return {
      url: result.secure_url,
      publicId: result.public_id,
      filename: filename,
      size: result.bytes
    };
  } catch (error) {
    console.error('Error copying file in Cloudinary:', error);
    throw error;
  }
};

export default cloudinary;
