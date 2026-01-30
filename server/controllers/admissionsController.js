import AdmissionsContent from '../models/AdmissionsContent.js';

// Get admissions content
export const getAdmissionsContent = async (req, res) => {
  try {
    let content = await AdmissionsContent.findOne();
    
    // If no content exists, create default content
    if (!content) {
      content = await AdmissionsContent.create({
        hero: {
          title: "Begin Your Nursing Journey",
          subtitle: "Join Siddhagiri Nursing Institute and embark on a rewarding career in healthcare. Admissions through Maharashtra CET Counseling.",
          cetLink: "https://cetcell.mahacet.org"
        },
        feeStructure: [
          {
            code: "BSCN09180",
            name: "Siddhagiri Nursing Institute, Kolhapur",
            annualFee: "67,500/-",
            course: "B.Sc. Nursing",
            duration: "4 Years",
            seats: "40",
            location: "Kaneri, Kolhapur, Maharashtra"
          },
          {
            code: "BSCN09180",
            name: "Siddhagiri Nursing Institute, Kolhapur",
            annualFee: "67,500/-",
            course: "B.Sc. Nursing",
            duration: "4 Years",
            seats: "40",
            location: "Kaneri, Kolhapur, Maharashtra"
          },
          {
            code: "BSCN09180",
            name: "Siddhagiri Nursing Institute, Kolhapur",
            annualFee: "67,500/-",
            course: "B.Sc. Nursing",
            duration: "4 Years",
            seats: "40",
            location: "Kaneri, Kolhapur, Maharashtra"
          },
          {
            code: "BSCN09180",
            name: "Siddhagiri Nursing Institute, Kolhapur",
            annualFee: "67,500/-",
            course: "B.Sc. Nursing",
            duration: "4 Years",
            seats: "40",
            location: "Kaneri, Kolhapur, Maharashtra"
          }
        ],
        eligibility: [
          "Age: 17 to 35 years as on 31st December of admitting year",
          "10+2 with Physics, Chemistry, Biology & English",
          "Minimum 45% aggregate marks (40% for reserved categories)",
          "Valid NEET Score",
          "Medically fit candidate"
        ],
        documents: [
          "NEET Score Card",
          "10th Marksheet & Certificate",
          "12th Marksheet & Certificate",
          "Transfer Certificate",
          "Migration Certificate",
          "Caste Certificate (if applicable)",
          "Caste Validity (if applicable)",
          "Non-Creamy Layer (if applicable)",
          "Domicile Certificate",
          "Aadhar Card",
          "Passport Size Photos (8)",
          "Gap Certificate (if applicable)"
        ],
        admissionSteps: [
          { step: 1, title: "Appear for NEET Exam", description: "Student should appear for NEET exam for the current academic year as per schedule." },
          { step: 2, title: "Register at Maharashtra CET", description: "After NEET and 12th Science result, register at Maharashtra CET website for counseling." },
          { step: 3, title: "Document Verification", description: "Complete document verification process by Maharashtra CET as per schedule." },
          { step: 4, title: "Preference Form Filling", description: "Fill preference form with your desired colleges and courses in order of priority." },
          { step: 5, title: "Attend Counseling Rounds", description: "Participate in counseling rounds conducted by Maharashtra CET for seat allotment." },
          { step: 6, title: "Confirm Admission", description: "Report to allotted college, complete fee payment and confirm your admission." }
        ],
        importantDates: [
          { event: "NEET Exam", date: "As per NTA Schedule" },
          { event: "CET Registration Opens", date: "After NEET Results" },
          { event: "Document Verification", date: "As per CET Schedule" },
          { event: "Counseling Rounds", date: "June - August" },
          { event: "Classes Commence", date: "As per MUHS Calendar" }
        ],
        comparisonColleges: [
          { code: "BSCN0049", name: "MES College of Nursing, Ratnagiri", course: "B.Sc. Nursing", fee: "1,20,500/-" },
          { code: "BSCN0014", name: "SSPM College of Nursing, Barshi, Solapur", course: "B.Sc. Nursing", fee: "34,500/-" },
          { code: "BSCN0036", name: "MIT Nursing College, Aurangabad", course: "B.Sc. Nursing", fee: "88,000/-" },
          { code: "BSCN0030", name: "Sitabai Nargundkar College of Nursing, Nagpur", course: "B.Sc. Nursing", fee: "89,000/-" },
          { code: "PBSCN0040", name: "Vaidyanath Institute Of Nursing, Parli", course: "B.Sc. Nursing", fee: "81,000/-" },
          { code: "BSCN09180", name: "Siddhagiri Nursing Institute, Kolhapur", course: "B.Sc. Nursing", fee: "67,500/-" },
          { code: "BSCN09186", name: "Madanbhau Patil College Of Nursing, Sangli", course: "B.Sc. Nursing", fee: "61,000/-" },
          { code: "BSCN09170", name: "SMBT Institute of Nursing", course: "B.Sc. Nursing", fee: "95,000/-" },
          { code: "BSCN0084", name: "Yashwant College Of Nursing, Kodoli", course: "B.Sc. Nursing", fee: "1,16,000/-" },
          { code: "BSCN09168", name: "Shri Vithhalrao Joshi Charities Trust, Ratnagiri", course: "B.Sc. Nursing", fee: "80,000/-" }
        ]
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admissions content',
      error: error.message
    });
  }
};

// Update hero section
export const updateHeroSection = async (req, res) => {
  try {
    const { title, subtitle, cetLink } = req.body;

    let content = await AdmissionsContent.findOne();
    if (!content) {
      content = new AdmissionsContent();
    }

    content.hero = { title, subtitle, cetLink };
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Hero section updated successfully',
      data: content.hero
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update hero section',
      error: error.message
    });
  }
};

// Update fee structure
export const updateFeeStructure = async (req, res) => {
  try {
    const { feeStructure } = req.body;

    let content = await AdmissionsContent.findOne();
    if (!content) {
      content = new AdmissionsContent();
    }

    content.feeStructure = feeStructure;
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Fee structure updated successfully',
      data: content.feeStructure
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update fee structure',
      error: error.message
    });
  }
};

// Update eligibility
export const updateEligibility = async (req, res) => {
  try {
    const { eligibility } = req.body;

    let content = await AdmissionsContent.findOne();
    if (!content) {
      content = new AdmissionsContent();
    }

    content.eligibility = eligibility;
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Eligibility criteria updated successfully',
      data: content.eligibility
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update eligibility criteria',
      error: error.message
    });
  }
};

// Update documents
export const updateDocuments = async (req, res) => {
  try {
    const { documents } = req.body;

    let content = await AdmissionsContent.findOne();
    if (!content) {
      content = new AdmissionsContent();
    }

    content.documents = documents;
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Documents list updated successfully',
      data: content.documents
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update documents list',
      error: error.message
    });
  }
};

// Update admission steps
export const updateAdmissionSteps = async (req, res) => {
  try {
    const { admissionSteps } = req.body;

    let content = await AdmissionsContent.findOne();
    if (!content) {
      content = new AdmissionsContent();
    }

    content.admissionSteps = admissionSteps;
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Admission steps updated successfully',
      data: content.admissionSteps
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update admission steps',
      error: error.message
    });
  }
};

// Update important dates
export const updateImportantDates = async (req, res) => {
  try {
    const { importantDates } = req.body;

    let content = await AdmissionsContent.findOne();
    if (!content) {
      content = new AdmissionsContent();
    }

    content.importantDates = importantDates;
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Important dates updated successfully',
      data: content.importantDates
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update important dates',
      error: error.message
    });
  }
};
