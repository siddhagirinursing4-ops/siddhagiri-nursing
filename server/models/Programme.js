import mongoose from 'mongoose';

const programmeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description']
  },
  fullDescription: {
    type: String
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  seats: {
    type: Number,
    default: 0
  },
  eligibility: {
    type: String,
    required: [true, 'Please add eligibility criteria']
  },
  // Detailed eligibility criteria
  eligibilityDetails: {
    academicRequirements: String,
    ageLimit: String,
    otherRequirements: String
  },
  // Admission process
  admissionProcess: {
    applicationPeriod: String,
    selectionCriteria: String,
    documents: [String],
    steps: [String]
  },
  // Course structure
  courseStructure: {
    overview: String,
    subjects: [String],
    clinicalTraining: String,
    practicals: String
  },
  // Career prospects
  careerProspects: {
    overview: String,
    opportunities: [String],
    averageSalary: String
  },
  // Fees structure
  fees: {
    tuitionFee: String,
    otherFees: String,
    scholarships: String
  },
  image: {
    url: String,
    publicId: String
  },
  video: {
    url: String,
    publicId: String
  },
  features: [String],
  highlights: [String],
  icon: {
    type: String,
    default: 'graduation-cap'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create slug from title
programmeSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

export default mongoose.model('Programme', programmeSchema);
