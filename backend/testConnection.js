/**
 * Test script to diagnose connection and configuration issues
 * Run: node testConnection.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testConnection() {
  console.log('\n🔍 Diagnosing Connection Issues...\n');
  
  // Test 1: Check environment variables
  console.log('1️⃣ Checking Environment Variables:');
  const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
  let envOk = true;
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      console.log(`   ❌ ${varName} - MISSING`);
      envOk = false;
    } else {
      if (varName === 'JWT_SECRET') {
        if (value.length < 32) {
          console.log(`   ⚠️  ${varName} - Too short (${value.length} chars, need 32+)`);
        } else {
          console.log(`   ✅ ${varName} - OK (${value.length} chars)`);
        }
      } else {
        console.log(`   ✅ ${varName} - OK`);
      }
    }
  }
  
  if (!envOk) {
    console.log('\n❌ Environment variables missing. Please check your .env file.');
    process.exit(1);
  }
  
  // Test 2: Test MongoDB connection
  console.log('\n2️⃣ Testing MongoDB Connection:');
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-voting');
    console.log('   ✅ MongoDB Connected Successfully');
  } catch (error) {
    console.log('   ❌ MongoDB Connection Failed');
    console.log(`   Error: ${error.message}`);
    console.log('\n💡 Solutions:');
    console.log('   - Make sure MongoDB is running');
    console.log('   - Check MONGODB_URI in .env file');
    console.log('   - For MongoDB Atlas, verify connection string');
    process.exit(1);
  }
  
  // Test 3: Check if users exist
  console.log('\n3️⃣ Checking Database:');
  try {
    const userCount = await User.countDocuments();
    console.log(`   ✅ Database accessible`);
    console.log(`   📊 Total users in database: ${userCount}`);
    
    if (userCount === 0) {
      console.log('   ⚠️  No users found. You need to register or create an admin user.');
    } else {
      const users = await User.find().select('name email role');
      console.log('\n   Users in database:');
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    }
  } catch (error) {
    console.log('   ❌ Database query failed');
    console.log(`   Error: ${error.message}`);
  }
  
  // Test 4: Test user creation
  console.log('\n4️⃣ Testing User Model:');
  try {
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123'
    });
    
    // Don't save, just validate
    await testUser.validate();
    console.log('   ✅ User model validation OK');
  } catch (error) {
    console.log('   ❌ User model validation failed');
    console.log(`   Error: ${error.message}`);
  }
  
  // Cleanup
  await mongoose.connection.close();
  console.log('\n✅ All tests completed!\n');
}

testConnection().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

