import mongoose from 'mongoose';

const academicYearSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true,
    unique: true,  // This already creates an index
    match: /^\d{4}-\d{4}$/  // Format: YYYY-YYYY
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Removed duplicate index - unique: true already creates one

// Method to get previous year
academicYearSchema.statics.getPreviousYear = async function(currentYear) {
  const years = await this.find().sort({ academicYear: -1 });
  const currentIndex = years.findIndex(y => y.academicYear === currentYear);
  return currentIndex > 0 ? years[currentIndex - 1] : null;
};

export default mongoose.model('AcademicYear', academicYearSchema);
