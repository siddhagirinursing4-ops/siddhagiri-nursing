import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Programme from '../models/Programme.js';
import User from '../models/User.js';

dotenv.config();

const programmes = [
  {
    title: 'B.Sc. Nursing',
    slug: 'bsc-nursing',
    shortDescription: 'A comprehensive undergraduate program that prepares students for professional nursing practice with strong clinical and theoretical foundations.',
    fullDescription: 'Bachelor of Science in Nursing is a four-year undergraduate program designed to prepare competent nurses who can provide quality healthcare services. The program combines theoretical knowledge with extensive clinical practice.',
    duration: '4 Years',
    seats: 40,
    eligibility: '10+2 with Physics, Chemistry, Biology and English with minimum 45% marks',
    eligibilityDetails: {
      academicRequirements: 'Passed 10+2 examination with Physics, Chemistry, Biology and English as compulsory subjects with minimum 45% aggregate marks (40% for SC/ST candidates)',
      ageLimit: 'Minimum 17 years as on 31st December of admission year',
      otherRequirements: 'Medically fit as per MUHS norms'
    },
    admissionProcess: {
      applicationPeriod: 'May to June every year',
      selectionCriteria: 'Based on NEET score and counseling',
      documents: [
        '10th and 12th mark sheets',
        'NEET scorecard',
        'Transfer certificate',
        'Migration certificate',
        'Aadhar card',
        'Passport size photographs',
        'Caste certificate (if applicable)'
      ],
      steps: [
        'Fill online application form',
        'Appear for NEET examination',
        'Attend counseling with required documents',
        'Document verification',
        'Fee payment and admission confirmation'
      ]
    },
    courseStructure: {
      overview: 'The B.Sc. Nursing program is divided into 8 semesters over 4 years with a perfect blend of theory and practical training.',
      subjects: [
        'Anatomy and Physiology',
        'Nutrition and Biochemistry',
        'Microbiology',
        'Psychology',
        'Sociology',
        'Fundamentals of Nursing',
        'Medical-Surgical Nursing',
        'Child Health Nursing',
        'Mental Health Nursing',
        'Community Health Nursing',
        'Midwifery and Obstetrical Nursing',
        'Nursing Research and Statistics'
      ],
      clinicalTraining: 'Extensive clinical training in affiliated hospitals with hands-on experience in various departments',
      practicals: 'Regular practical sessions in well-equipped nursing labs and clinical postings in hospitals'
    },
    careerProspects: {
      overview: 'B.Sc. Nursing graduates have excellent career opportunities in India and abroad.',
      opportunities: [
        'Staff Nurse in hospitals',
        'Community Health Nurse',
        'Nursing Supervisor',
        'Nursing Tutor',
        'Nursing Administrator',
        'Industrial Nurse',
        'Military Nursing',
        'Opportunities abroad (USA, UK, Canada, Australia, Middle East)'
      ],
      averageSalary: '₹3-6 lakhs per annum for freshers, increasing with experience'
    },
    fees: {
      tuitionFee: 'As per government norms',
      otherFees: 'Hostel, library, and other charges as applicable',
      scholarships: 'Government scholarships available for eligible students'
    },
    features: [
      'MUHS Affiliated',
      'Clinical Training',
      'Hospital Exposure',
      'Research Projects'
    ],
    highlights: [
      'MUHS approved curriculum',
      'Experienced faculty',
      'Modern infrastructure',
      'Clinical training in reputed hospitals',
      'Placement assistance',
      'International opportunities'
    ],
    icon: 'graduation-cap',
    order: 1,
    isActive: true
  },
  {
    title: 'GNM',
    slug: 'gnm',
    shortDescription: 'A diploma program focused on developing skilled nurses with expertise in general nursing care and midwifery practices.',
    fullDescription: 'General Nursing and Midwifery is a 3.5 years diploma program that trains students to become competent nurses capable of providing comprehensive nursing care in various healthcare settings.',
    duration: '3.5 Years',
    seats: 40,
    eligibility: '10+2 with Physics, Chemistry, Biology and English or 10th with 2 years ANM',
    eligibilityDetails: {
      academicRequirements: 'Passed 10+2 examination with Physics, Chemistry, Biology and English OR 10th pass with 2 years ANM course',
      ageLimit: 'Minimum 17 years and maximum 35 years as on 31st December of admission year',
      otherRequirements: 'Medically fit as per MUHS norms'
    },
    admissionProcess: {
      applicationPeriod: 'May to July every year',
      selectionCriteria: 'Based on merit in qualifying examination',
      documents: [
        '10th and 12th mark sheets (or ANM certificate)',
        'Transfer certificate',
        'Migration certificate',
        'Aadhar card',
        'Passport size photographs',
        'Caste certificate (if applicable)'
      ],
      steps: [
        'Fill online application form',
        'Submit required documents',
        'Merit list declaration',
        'Document verification',
        'Fee payment and admission confirmation'
      ]
    },
    courseStructure: {
      overview: 'The GNM program includes 3 years of academic study and 6 months of internship.',
      subjects: [
        'Anatomy and Physiology',
        'Microbiology',
        'Psychology',
        'Fundamentals of Nursing',
        'First Aid',
        'Medical-Surgical Nursing',
        'Child Health Nursing',
        'Mental Health Nursing',
        'Community Health Nursing',
        'Midwifery',
        'Nursing Administration'
      ],
      clinicalTraining: 'Hands-on clinical training in affiliated hospitals across various departments',
      practicals: '6 months mandatory internship in hospitals after completion of 3 years'
    },
    careerProspects: {
      overview: 'GNM graduates are in high demand in healthcare sector.',
      opportunities: [
        'Staff Nurse in hospitals',
        'Community Health Worker',
        'Home Care Nurse',
        'Industrial Nurse',
        'School Health Nurse',
        'Nursing Assistant',
        'Opportunities in government and private hospitals'
      ],
      averageSalary: '₹2-4 lakhs per annum for freshers'
    },
    fees: {
      tuitionFee: 'As per government norms',
      otherFees: 'Hostel, library, and other charges as applicable',
      scholarships: 'Government scholarships available for eligible students'
    },
    features: [
      'Diploma Program',
      'Practical Training',
      'Midwifery Skills',
      'Community Health'
    ],
    highlights: [
      'MUHS approved',
      'Affordable fees',
      'Shorter duration',
      'Good job opportunities',
      'Can pursue B.Sc. Nursing later',
      'Practical skill development'
    ],
    icon: 'heart',
    order: 2,
    isActive: true
  },
  {
    title: 'P.B.B.Sc. Nursing',
    slug: 'pbbsc-nursing',
    shortDescription: 'An advanced degree program for GNM graduates to upgrade their qualification and enhance career opportunities in nursing.',
    fullDescription: 'Post Basic Bachelor of Science in Nursing is a 2-year program designed for GNM graduates who want to upgrade their qualification and advance their nursing career.',
    duration: '2 Years',
    seats: 30,
    eligibility: 'GNM with registration and 1 year work experience',
    eligibilityDetails: {
      academicRequirements: 'Completed GNM (General Nursing and Midwifery) course with registration from State Nursing Council',
      ageLimit: 'No specific age limit',
      otherRequirements: 'Minimum 1 year work experience as registered nurse'
    },
    admissionProcess: {
      applicationPeriod: 'June to July every year',
      selectionCriteria: 'Based on merit and work experience',
      documents: [
        'GNM diploma certificate',
        'State Nursing Council registration certificate',
        'Work experience certificate',
        'Transfer certificate',
        'Aadhar card',
        'Passport size photographs'
      ],
      steps: [
        'Fill online application form',
        'Submit GNM certificate and registration proof',
        'Submit work experience certificate',
        'Document verification',
        'Fee payment and admission confirmation'
      ]
    },
    courseStructure: {
      overview: 'The P.B.B.Sc. Nursing program is designed to enhance knowledge and skills of practicing nurses.',
      subjects: [
        'Advanced Nursing Practice',
        'Nursing Research',
        'Nursing Education',
        'Nursing Administration',
        'Community Health Nursing',
        'Medical-Surgical Nursing (Advanced)',
        'Mental Health Nursing (Advanced)',
        'Child Health Nursing (Advanced)',
        'Midwifery and Obstetrical Nursing (Advanced)'
      ],
      clinicalTraining: 'Advanced clinical training with focus on specialized nursing care',
      practicals: 'Clinical postings in specialized departments and community health settings'
    },
    careerProspects: {
      overview: 'P.B.B.Sc. Nursing opens doors to higher positions and better opportunities.',
      opportunities: [
        'Senior Staff Nurse',
        'Nursing Supervisor',
        'Ward In-charge',
        'Nursing Tutor',
        'Clinical Instructor',
        'Nursing Administrator',
        'Eligible for M.Sc. Nursing',
        'Better opportunities abroad'
      ],
      averageSalary: '₹4-7 lakhs per annum'
    },
    fees: {
      tuitionFee: 'As per government norms',
      otherFees: 'Library and other charges as applicable',
      scholarships: 'Limited scholarships available'
    },
    features: [
      'For GNM Graduates',
      'Career Advancement',
      'Degree Program',
      'Leadership Skills'
    ],
    highlights: [
      'Upgrade from diploma to degree',
      'Better career prospects',
      'Eligible for M.Sc. Nursing',
      'Leadership and management skills',
      'Research exposure',
      'Higher salary packages'
    ],
    icon: 'award',
    order: 3,
    isActive: true
  },
  {
    title: 'M.Sc. Nursing',
    slug: 'msc-nursing',
    shortDescription: 'A postgraduate program designed to develop nursing leaders, educators, and researchers with specialized clinical expertise.',
    fullDescription: 'Master of Science in Nursing is a 2-year postgraduate program that prepares nurses for advanced practice, teaching, research, and leadership roles in nursing. The program offers three specializations: Medical Surgical Nursing (5 seats), Community Health Nursing (5 seats), and Obstetrics & Gynaecology Nursing (5 seats).',
    duration: '2 Years',
    seats: 15,
    eligibility: 'B.Sc. Nursing with registration and 1 year work experience',
    eligibilityDetails: {
      academicRequirements: 'B.Sc. Nursing degree with minimum 55% marks and registration from State Nursing Council',
      ageLimit: 'No specific age limit',
      otherRequirements: 'Minimum 1 year work experience as registered nurse after B.Sc. Nursing'
    },
    admissionProcess: {
      applicationPeriod: 'June to August every year',
      selectionCriteria: 'Based on entrance examination and interview',
      documents: [
        'B.Sc. Nursing degree certificate',
        'All semester mark sheets',
        'State Nursing Council registration',
        'Work experience certificate',
        'Entrance exam scorecard',
        'Transfer certificate',
        'Aadhar card',
        'Passport size photographs'
      ],
      steps: [
        'Fill online application form',
        'Appear for entrance examination',
        'Attend interview (if shortlisted)',
        'Document verification',
        'Fee payment and admission confirmation'
      ]
    },
    courseStructure: {
      overview: 'M.Sc. Nursing offers specializations in various nursing fields with focus on advanced practice and research. Total intake: 15 seats across three specializations.',
      subjects: [
        'Nursing Education',
        'Nursing Administration',
        'Nursing Research and Statistics',
        'Advanced Nursing Practice',
        'Specialization subjects (based on chosen stream)',
        'Clinical Specialization',
        'Dissertation'
      ],
      specializations: [
        {
          name: 'Medical Surgical Nursing',
          intake: 5,
          description: 'Advanced study in medical and surgical nursing care'
        },
        {
          name: 'Community Health Nursing',
          intake: 5,
          description: 'Focus on community health, public health, and preventive care'
        },
        {
          name: 'Obstetrics and Gynaecology (OBGy) Nursing',
          intake: 5,
          description: 'Specialized training in maternal and women\'s health nursing'
        }
      ],
      clinicalTraining: 'Advanced clinical training in specialized areas with research component',
      practicals: 'Specialized clinical postings, teaching practice, and research work'
    },
    careerProspects: {
      overview: 'M.Sc. Nursing graduates are qualified for top positions in nursing profession.',
      opportunities: [
        'Nursing Professor/Lecturer',
        'Clinical Nurse Specialist',
        'Nursing Superintendent',
        'Nursing Administrator',
        'Nurse Researcher',
        'Consultant Nurse',
        'PhD opportunities',
        'International career options'
      ],
      averageSalary: '₹6-12 lakhs per annum'
    },
    fees: {
      tuitionFee: 'As per government norms',
      otherFees: 'Library, research, and other charges as applicable',
      scholarships: 'Limited scholarships and research grants available'
    },
    features: [
      'Post Graduate',
      'Specialization',
      'Research Oriented',
      'Teaching Career'
    ],
    highlights: [
      'Specialization in chosen field',
      'Research and dissertation',
      'Teaching opportunities',
      'Leadership positions',
      'Eligible for PhD',
      'Highest qualification in nursing',
      'Excellent salary packages'
    ],
    icon: 'award',
    order: 4,
    isActive: true
  }
];

const seedProgrammes = async () => {
  try {
    await connectDB();

    // Get super admin
    const superAdmin = await User.findOne({ role: 'superadmin' });
    if (!superAdmin) {
      console.error('Super admin not found. Please create super admin first.');
      process.exit(1);
    }

    console.log('🌱 Seeding programmes...\n');

    // Clear existing programmes
    await Programme.deleteMany({});
    console.log('✅ Cleared existing programmes\n');

    // Add createdBy to each programme
    const programmesWithCreator = programmes.map(prog => ({
      ...prog,
      createdBy: superAdmin._id
    }));

    // Insert programmes
    const created = await Programme.insertMany(programmesWithCreator);
    
    console.log(`✅ Created ${created.length} programmes:\n`);
    created.forEach(prog => {
      console.log(`  - ${prog.title} (${prog.slug})`);
    });

    console.log('\n✨ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding programmes:', error);
    process.exit(1);
  }
};

seedProgrammes();
