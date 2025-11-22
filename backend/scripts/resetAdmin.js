/**
 * Script to delete old admin and create new one
 * Usage: node scripts/resetAdmin.js <old_email> <new_email> <new_password> <new_name>
 * Example: node scripts/resetAdmin.js old@example.com newadmin@example.com newpassword123 "New Admin"
 */

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const resetAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-voting');
    console.log('Connected to MongoDB\n');

    const oldEmail = process.argv[2];
    const newEmail = process.argv[3];
    const newPassword = process.argv[4];
    const newName = process.argv[5] || 'Admin User';

    if (!oldEmail || !newEmail || !newPassword) {
      console.error('Usage: node scripts/resetAdmin.js <old_email> <new_email> <new_password> [new_name]');
      console.error('Example: node scripts/resetAdmin.js old@example.com newadmin@example.com newpassword123 "New Admin"');
      process.exit(1);
    }

    // Step 1: Delete old admin
    console.log('1️⃣ Deleting old admin...');
    const oldUser = await User.findOne({ email: oldEmail });
    
    if (oldUser) {
      await User.findByIdAndDelete(oldUser._id);
      console.log(`   ✅ Deleted: ${oldUser.name} (${oldEmail})\n`);
    } else {
      console.log(`   ⚠️  Old admin "${oldEmail}" not found. Skipping deletion.\n`);
    }

    // Step 2: Check if new email already exists
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      console.log('2️⃣ Updating existing user to admin...');
      existingUser.role = 'admin';
      existingUser.password = newPassword; // Will be hashed by pre-save hook
      existingUser.name = newName;
      await existingUser.save();
      console.log(`   ✅ Updated user "${newName}" (${newEmail}) to admin role\n`);
    } else {
      console.log('2️⃣ Creating new admin user...');
      const newAdmin = await User.create({
        name: newName,
        email: newEmail,
        password: newPassword,
        role: 'admin'
      });
      console.log(`   ✅ Created admin: ${newAdmin.name} (${newAdmin.email})\n`);
    }

    console.log('✅ Admin reset complete!');
    console.log('\n📋 New Admin Credentials:');
    console.log(`   Email: ${newEmail}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`   Name: ${newName}`);
    console.log('\n💡 You can now login with these credentials.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();


