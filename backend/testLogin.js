/**
 * Test login functionality
 * Run: node testLogin.js <email> <password>
 * Example: node testLogin.js mohamedbilalks44@gmail.com yourpassword
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testLogin() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('\n❌ Usage: node testLogin.js <email> <password>');
    console.log('Example: node testLogin.js mohamedbilalks44@gmail.com yourpassword\n');
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-voting');
    console.log('✅ MongoDB Connected\n');

    // Find user
    console.log(`🔍 Looking for user: ${email}`);
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found in database');
      process.exit(1);
    }

    console.log(`✅ User found: ${user.name} (Role: ${user.role})\n`);

    // Test password
    console.log('🔐 Testing password...');
    const isMatch = await user.comparePassword(password);
    
    if (isMatch) {
      console.log('✅ Password is CORRECT!');
      console.log('\n📋 User Details:');
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Has Voted: ${user.hasVoted}`);
      console.log('\n✅ Login should work! If it doesn\'t, check:');
      console.log('   1. Backend server is running (npm run server)');
      console.log('   2. Frontend can reach backend (check CORS)');
      console.log('   3. Browser console for errors');
    } else {
      console.log('❌ Password is INCORRECT!');
      console.log('\n💡 Solutions:');
      console.log('   - Make sure you\'re using the correct password');
      console.log('   - If you forgot, create a new admin user:');
      console.log('     node scripts/createAdmin.js newemail@example.com newpassword "New Admin"');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();


