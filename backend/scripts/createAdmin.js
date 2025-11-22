/**
 * Script to create an admin user
 * Usage: node scripts/createAdmin.js <email> <password> <name>
 * Example: node scripts/createAdmin.js admin@example.com password123 "Admin User"
 */

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-voting');
    console.log('Connected to MongoDB');

    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'Admin User';

    if (!email || !password) {
      console.error('Usage: node scripts/createAdmin.js <email> <password> [name]');
      process.exit(1);
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update to admin
      existingUser.role = 'admin';
      existingUser.password = password; // Will be hashed by pre-save hook
      await existingUser.save();
      console.log(`User ${email} updated to admin role`);
    } else {
      // Create new admin user
      const admin = await User.create({
        name,
        email,
        password,
        role: 'admin'
      });
      console.log(`Admin user created: ${admin.email}`);
    }

    console.log('Admin user setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();


