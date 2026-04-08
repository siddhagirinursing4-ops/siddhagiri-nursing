import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  category: {
    type: String,
    enum: ['Campus', 'Training', 'Events', 'Academic'],
    default: 'Campus'
  },
  file: {
    url: {
      type: String,
      required: [true, 'Please upload a file']
    },
    publicId: String,
    filename: String
  },
  order: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Gallery', gallerySchema);
