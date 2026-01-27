import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import DynamicContent from '../models/DynamicContent.js';

// Load env vars
dotenv.config();

const announcements = [
  {
    key: 'ranking_star',
    title: 'Top Ranking',
    content: 'Ranked Among Top 10 Nursing Colleges in India',
    section: 'announcement',
    isActive: true,
    order: 1
  },
  {
    key: 'entrance_exam_date',
    title: 'Entrance Exam Date',
    content: 'Entrance Exam Date: July 15, 2026 | Register Today',
    section: 'announcement',
    isActive: true,
    order: 2
  },
  {
    key: 'admissions_open',
    title: 'Admissions Open',
    content: 'Admissions Open for Academic Year 2026-27 | Apply Now!',
    section: 'announcement',
    isActive: true,
    order: 3
  },
  {
    key: 'placement_record',
    title: 'Placement Record',
    content: '100% Placement Record for 2025 Batch',
    section: 'announcement',
    isActive: true,
    order: 4
  }
];

const seedAnnouncements = async () => {
  try {
    await connectDB();

    console.log('🌱 Seeding announcements...');

    // Clear existing announcements
    await DynamicContent.deleteMany({ section: 'announcement' });
    console.log('✓ Cleared existing announcements');

    // Insert new announcements
    const created = await DynamicContent.insertMany(announcements);
    console.log(`✓ Created ${created.length} announcements`);

    console.log('\n📢 Announcements seeded successfully!');
    console.log('\nCreated announcements:');
    created.forEach(item => {
      console.log(`  - ${item.title} (${item.key})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding announcements:', error);
    process.exit(1);
  }
};

seedAnnouncements();
