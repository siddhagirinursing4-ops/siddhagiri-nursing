// Cloudinary CDN URLs for all media assets
// Images and videos are hosted on Cloudinary for better performance
// PDFs remain on the server

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dig8ec5rl';

export const CLOUDINARY_URLS = {
  // Branding
  logo: `${CLOUDINARY_BASE}/image/upload/school/branding/logo.png`,
  banner: `${CLOUDINARY_BASE}/image/upload/school/branding/banner.jpg`,
  
  // Gallery Images
  images: {
    '2': `${CLOUDINARY_BASE}/image/upload/school/gallery/images/2.jpg`,
    '4': `${CLOUDINARY_BASE}/image/upload/school/gallery/images/4.jpg`,
    '5': `${CLOUDINARY_BASE}/image/upload/school/gallery/images/5.jpg`,
    '6': `${CLOUDINARY_BASE}/image/upload/school/gallery/images/6.jpg`,
    '7': `${CLOUDINARY_BASE}/image/upload/school/gallery/images/7.jpg`,
    '8': `${CLOUDINARY_BASE}/image/upload/school/gallery/images/8.jpg`,
  },
  
  // Gallery Videos
  videos: {
    '1': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/1.mp4`,
    '3': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/3.mp4`,
    '14': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/14.mp4`,
    '15': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/15.mp4`,
    '16': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/16.mp4`,
    '17': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/17.mp4`,
    '18': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/18.mp4`,
    '19': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/19.mp4`,
    '20': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/20.mp4`,
    '22': `${CLOUDINARY_BASE}/video/upload/school/gallery/videos/22.mp4`,
  }
};

// Helper function to get image URL
export const getImageUrl = (id) => CLOUDINARY_URLS.images[id] || `/public/${id}.jpeg`;

// Helper function to get video URL
export const getVideoUrl = (id) => CLOUDINARY_URLS.videos[id] || `/public/${id}.mp4`;
