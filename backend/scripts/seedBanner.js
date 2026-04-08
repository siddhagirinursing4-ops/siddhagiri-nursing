import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import DynamicContent from '../models/DynamicContent.js';

// Load env vars
dotenv.config();

const defaultBanner = {
  key: 'main_banner',
  title: 'Main Banner',
  content: 'B.Sc Nursing Admission Open - Apply Now!',
  section: 'banner',
  isActive: true,
  order: 1,
  // Note: Image will be uploaded via admin panel
  // This creates the banner entry without an image
};

const seedBanner = async () => {
  try {
    await connectDB();

    console.log('🎨 Seeding default banner...');

    // Check if banner already exists
    const existing = await DynamicContent.findOne({ key: 'main_banner' });
    
    if (existing) {
      console.log('✓ Banner already exists');
      console.log(`  Title: ${existing.title}`);
      console.log(`  Has Image: ${existing.image?.url ? 'Yes' : 'No'}`);
      console.log(`  Active: ${existing.isActive ? 'Yes' : 'No'}`);
      
      if (!existing.image?.url) {
        console.log('\n⚠️  Note: Banner has no image uploaded yet');
        console.log('   Upload an image via Admin Panel → Dynamic Content → Edit Banner');
      }
    } else {
      // Create new banner entry
      const banner = await DynamicContent.create(defaultBanner);
      console.log('✓ Created default banner entry');
      console.log(`  Key: ${banner.key}`);
      console.log(`  Title: ${banner.title}`);
      
      console.log('\n⚠️  Next Step: Upload banner image');
      console.log('   1. Login to Admin Panel');
      console.log('   2. Go to Dynamic Content');
      console.log('   3. Filter by "Banner"');
      console.log('   4. Click Edit on "Main Banner"');
      console.log('   5. Upload your banner image');
    }

    console.log('\n✅ Banner setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding banner:', error);
    process.exit(1);
  }
};

seedBanner();
