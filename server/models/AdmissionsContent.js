import mongoose from 'mongoose';

const admissionsContentSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    title: {
      type: String,
      default: "Begin Your Nursing Journey"
    },
    subtitle: {
      type: String,
      default: "Join Siddhagiri Nursing Institute and embark on a rewarding career in healthcare. Admissions through Maharashtra CET Counseling."
    },
    cetLink: {
      type: String,
      default: "https://cetcell.mahacet.org"
    }
  },

  // Fee Structure - Multiple Cards
  feeStructure: [{
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    annualFee: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    seats: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: "Kaneri, Kolhapur, Maharashtra"
    }
  }],

  // Eligibility Criteria
  eligibility: [{
    type: String
  }],

  // Documents Required
  documents: [{
    type: String
  }],

  // Admission Steps
  admissionSteps: [{
    step: Number,
    title: String,
    description: String
  }],

  // Important Dates
  importantDates: [{
    event: String,
    date: String
  }],

  // Comparison Colleges
  comparisonColleges: [{
    code: String,
    name: String,
    course: String,
    fee: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('AdmissionsContent', admissionsContentSchema);
