// Run this script to generate secure JWT secrets
// Usage: node generate-secrets.js

import crypto from 'crypto';

console.log('\n🔐 Generating Secure JWT Secrets...\n');
console.log('Copy these values to your Render environment variables:\n');
console.log('─'.repeat(70));

const jwtSecret = crypto.randomBytes(32).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(32).toString('hex');

console.log('\nJWT_SECRET=');
console.log(jwtSecret);

console.log('\nJWT_REFRESH_SECRET=');
console.log(jwtRefreshSecret);

console.log('\n' + '─'.repeat(70));
console.log('\n✅ Secrets generated successfully!');
console.log('⚠️  Keep these secrets safe and never commit them to Git!\n');
