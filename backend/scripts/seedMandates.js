/**
 * Seed script to migrate static cPanel PDF mandates into MongoDB.
 * 
 * HOW IT WORKS:
 * - PDFs are already uploaded to cPanel at: https://snik.in/{year}-Mandates/filename.pdf
 * - This script creates AcademicYear + Mandate records in MongoDB pointing to those URLs
 * - Run once: node backend/scripts/seedMandates.js (from repo root)
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Mandate from '../models/Mandate.js';
import AcademicYear from '../models/AcademicYear.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const BASE_URL = 'https://snik.in';

// Map each academic year to its PDF files in cPanel
// Key = academicYear string, value = array of { title, annexureNumber, filename }
const MANDATES_DATA = {
  '2022-2023': {
    folderName: '2022-2023-Mandates',
    documents: [
      { title: 'List 1', annexureNumber: null, filename: 'list1.pdf' },
      { title: 'LIC Proforma', annexureNumber: null, filename: 'lic_proforma.pdf' },
      { title: 'Annexure I', annexureNumber: '1', filename: 'annexure1.pdf' },
      { title: 'Annexure II', annexureNumber: '2', filename: 'annexure2.pdf' },
      { title: 'Annexure III', annexureNumber: '3', filename: 'annexure3.pdf' },
      { title: 'Annexure IV', annexureNumber: '4', filename: 'annexure4.pdf' },
      { title: 'Annexure V', annexureNumber: '5', filename: 'annexure5.pdf' },
      { title: 'Annexure VI', annexureNumber: '6', filename: 'annexure6.pdf' },
      { title: 'Annexure VII', annexureNumber: '7', filename: 'annexure7.pdf' },
      { title: 'Annexure VIII', annexureNumber: '8', filename: 'annexure8.pdf' },
      { title: 'Annexure IX', annexureNumber: '9', filename: 'annexure9.pdf' },
      { title: 'Annexure X', annexureNumber: '10', filename: 'annexure10.pdf' },
      { title: 'Annexure XI', annexureNumber: '11', filename: 'annexure11.pdf' },
      { title: 'Annexure XII', annexureNumber: '12', filename: 'annexure12.pdf' },
    ]
  },
  '2023-2024': {
    folderName: '2023-2024-Mandates',
    documents: [
      { title: 'Annexure I - Seat Matrix', annexureNumber: '1', filename: 'Annexure-I_Seat_Matrix.pdf' },
      { title: 'Annexure II - Infrastructure', annexureNumber: '2', filename: 'Annexure-II_Infrastructure.pdf' },
      { title: 'Annexure III - Trust Deed', annexureNumber: '3', filename: 'Annex-_III_Trust_deed.pdf' },
      { title: 'Annexure IV - Library', annexureNumber: '4', filename: 'Annexure-IV_Library.pdf' },
      { title: 'Annexure VI', annexureNumber: '6', filename: 'Annex_VI.pdf' },
      { title: 'Annexure VII - Subject Wise LP', annexureNumber: '7', filename: 'Annex_-_VII_Subjct_wise_LP.pdf' },
      { title: 'Annexure VIII - Part Time External Teachers', annexureNumber: '8', filename: 'Annexure_-VIII_Part_Time,_External_Teachers.pdf' },
      { title: 'Annexure IX - Non Teaching Staff', annexureNumber: '9', filename: 'Annexure-IX_Non_Teaching_Staff.pdf' },
      { title: 'Annexure XI - MUHS Mandate', annexureNumber: '11', filename: 'Annexure-XI_MUHS_Mandate.pdf' },
      { title: 'Annexure XII - AISHE Certificate', annexureNumber: '12', filename: 'Annexure-XII_AISHE_Cert.pdf' },
      { title: 'Annexure XIII - Exam Related Information', annexureNumber: '13', filename: 'Annexure-XIII_Exam_Related_Information.pdf' },
      { title: 'Annexure XIV - Declaration', annexureNumber: '14', filename: 'Annexure-IVX_Decleration.pdf' },
      { title: 'LIC Format', annexureNumber: null, filename: 'Nursing_LIC_Format_(1).pdf' },
    ]
  },
  '2024-2025': {
    folderName: '2024-2025-Mandates',
    documents: [
      { title: 'Annexure I - Seat Matrix', annexureNumber: '1', filename: 'ANNEXURE_-_I.pdf' },
      { title: 'Annexure II - Infrastructure', annexureNumber: '2', filename: 'ANNEXURE_-_II.pdf' },
      { title: 'Annexure III - Trust Deed', annexureNumber: '3', filename: 'ANNEXURE_-_III.pdf' },
      { title: 'Annexure IV - Library', annexureNumber: '4', filename: 'ANNEXURE_-_IV.pdf' },
      { title: 'Annexure V - Clinical Material', annexureNumber: '5', filename: 'ANNEXURE_-_V.pdf' },
      { title: 'Annexure VI - Teaching Staff', annexureNumber: '6', filename: 'ANNEXURE_-_VI.pdf' },
      { title: 'Annexure VII - Subject Wise Staff', annexureNumber: '7', filename: 'ANNEXURE_-_VII.pdf' },
      { title: 'Annexure VIII - Part Time Teachers', annexureNumber: '8', filename: 'ANNEXURE_-_VIII.pdf' },
      { title: 'Annexure IX - Non Teaching Staff', annexureNumber: '9', filename: 'ANNEXURE_-_IX.pdf' },
      { title: 'Annexure X', annexureNumber: '10', filename: 'ANNEXURE_-_X.pdf' },
      { title: 'Annexure XI - MUHS Mandate', annexureNumber: '11', filename: 'ANNEXURE_-_XI.pdf' },
      { title: 'Annexure XII - Aishe Certificate', annexureNumber: '12', filename: 'ANNEXURE_-_XII.pdf' },
      { title: 'Annexure XIII - Exam Details', annexureNumber: '13', filename: 'ANNEXURE_-_XIII.pdf' },
      { title: 'Annexure XIV', annexureNumber: '14', filename: 'ANNEXURE_-_XIV.pdf' },
      { title: 'LIC Format', annexureNumber: null, filename: 'LIC-FORMAT.pdf' },
    ]
  },
  '2025-2026': {
    folderName: '2025-2026-Mandates',
    documents: [
      { title: 'Annexure I - Seat Matrix', annexureNumber: '1', filename: 'ANNEXURE_-_I_Seat-Matrix.pdf' },
      { title: 'Annexure II - Infrastructure', annexureNumber: '2', filename: 'ANNEXURE_-_II_Infrastructure.pdf' },
      { title: 'Annexure III - Trust Deed', annexureNumber: '3', filename: 'ANNEXURE_-_III_Trust_Deed.pdf' },
      { title: 'Annexure IV - Library', annexureNumber: '4', filename: 'ANNEXURE_-_IV_Library.pdf' },
      { title: 'Annexure V - Clinical Material In Hospital', annexureNumber: '5', filename: 'ANNEXURE_-_V_Clinical_Material_In_Hospital.pdf' },
      { title: 'Annexure VI - Teaching Staff and Exits and Deficit', annexureNumber: '6', filename: 'ANNEXURE_-_VI_Teaching_Staff_and_Exits_and_Deficit.pdf' },
      { title: 'Annexure VII - Subjects Wise Approved and Not Approved Teaching Staff', annexureNumber: '7', filename: 'ANNEXURE_-_VII_Subjects_wise_Approved_and_Not_Approved_Teaching_Staff.pdf' },
      { title: 'Annexure VIII - Part Time External Teachers', annexureNumber: '8', filename: 'ANNEXURE_-_VIII_Part_Time_External_Teachers.pdf' },
      { title: 'Annexure IX - Non Teaching Staff', annexureNumber: '9', filename: 'ANNEXURE_-_IX_Non_-_Teaching_Staff.pdf' },
      { title: 'Annexure XI - MUHS Mandate', annexureNumber: '11', filename: 'ANNEXURE_-_XI_MUHS_Mandate.pdf' },
      { title: 'Annexure XII - Aishe Certificate', annexureNumber: '12', filename: 'ANNEXURE_-_XII_Aishe_Certificate.pdf' },
      { title: 'Annexure XIII - Exam Related Details', annexureNumber: '13', filename: 'ANNEXURE_-_XIII_Exam_Related_Details.pdf' },
      { title: 'Annexure XIV', annexureNumber: '14', filename: 'ANNEXURE_-_XIV.pdf' },
      { title: 'Annexure XV', annexureNumber: '15', filename: 'ANNEXURE_-_XV.pdf' },
    ]
  }
};

async function seedMandates() {
  await connectDB();
  console.log('✅ Connected to MongoDB\n');

  for (const [year, data] of Object.entries(MANDATES_DATA)) {
    console.log(`\n📁 Processing ${year}...`);

    // Create or find academic year
    let academicYear = await AcademicYear.findOne({ academicYear: year });
    if (!academicYear) {
      academicYear = await AcademicYear.create({ academicYear: year });
      console.log(`  ✅ Created AcademicYear: ${year}`);
    } else {
      console.log(`  ℹ️  AcademicYear already exists: ${year}`);
    }

    for (const doc of data.documents) {
      const pdfUrl = `${BASE_URL}/${data.folderName}/${doc.filename}`;

      // Skip if already exists
      const existing = await Mandate.findOne({ academicYear: year, title: doc.title });
      if (existing) {
        console.log(`  ⏭️  Skipping (exists): ${doc.title}`);
        continue;
      }

      await Mandate.create({
        title: doc.title,
        academicYear: year,
        annexureNumber: doc.annexureNumber,
        pdfFile: {
          url: pdfUrl,
          publicId: null,
          filename: doc.filename,
          size: 0
        }
      });

      console.log(`  ✅ Added: ${doc.title} → ${pdfUrl}`);
    }
  }

  console.log('\n🎉 Seed complete!');
  process.exit(0);
}

seedMandates().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
