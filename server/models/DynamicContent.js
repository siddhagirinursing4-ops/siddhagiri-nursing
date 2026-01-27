import mongoose from 'mongoose';

const dynamicContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Content key is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Key cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  section: {
    type: String,
    enum: ['banner', 'announcement', 'other'],
    default: 'banner'
  },
  // Image field for banner section
  image: {
    url: String,
    publicId: String,
    filename: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
dynamicContentSchema.index({ section: 1, isActive: 1, order: 1 });

export default mongoose.model('DynamicContent', dynamicContentSchema);
