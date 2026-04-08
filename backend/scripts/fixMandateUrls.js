/**
 * Fix mandate PDF URLs that were uploaded with wrong resource_type (image instead of raw).
 * Converts: res.cloudinary.com/.../image/upload/... 
 * To:       res.cloudinary.com/.../raw/upload/...
 * 
 * Run: node backend/scripts/fixMandateUrls.js (from repo root)
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from '../config/db.js';
import Mandate from '../models/Mandate.js';
import AcademicYear from '../models/AcademicYear.js'; // must be imported to register schema

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

async function fixMandateUrls() {
  await connectDB();
  console.log('✅ Connected to MongoDB\n');

  // Find all mandates with Cloudinary URLs using /image/upload/
  const mandates = await Mandate.find({
    'pdfFile.url': { $regex: '/image/upload/' }
  });

  console.log(`Found ${mandates.length} mandate(s) with broken image URLs\n`);

  for (const mandate of mandates) {
    const oldUrl = mandate.pdfFile.url;
    const fixedUrl = oldUrl.replace('/image/upload/', '/raw/upload/');

    mandate.pdfFile.url = fixedUrl;
    await mandate.save({ validateBeforeSave: false });

    console.log(`✅ Fixed: ${mandate.title}`);
    console.log(`   Old: ${oldUrl}`);
    console.log(`   New: ${fixedUrl}\n`);
  }

  if (mandates.length === 0) {
    console.log('No broken URLs found.');
  } else {
    console.log(`🎉 Fixed ${mandates.length} mandate URL(s)`);
  }

  process.exit(0);
}

fixMandateUrls().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
