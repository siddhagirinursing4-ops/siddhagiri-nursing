import mongoose from 'mongoose';

const mandateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  academicYear: {
    type: String,
    required: [true, 'Please add academic year']
    // Remove enum - validate against AcademicYear collection instead
  },
  annexureNumber: {
    type: String
  },
  pdfFile: {
    url: {
      type: String,
      required: [true, 'Please upload a PDF file']
    },
    publicId: String,
    filename: String,
    size: Number
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  migratedFrom: {
    // Track if this was migrated from another year
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Add validation to check year exists
mandateSchema.pre('save', async function(next) {
  const AcademicYear = mongoose.model('AcademicYear');
  const yearExists = await AcademicYear.findOne({ 
    academicYear: this.academicYear 
  });
  
  if (!yearExists) {
    throw new Error(`Academic year ${this.academicYear} does not exist`);
  }
  next();
});

export default mongoose.model('Mandate', mandateSchema);
