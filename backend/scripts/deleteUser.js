/**
 * Script to delete a user by email
 * Usage: node scripts/deleteUser.js <email>
 * Example: node scripts/deleteUser.js mohamedbilalks44@gmail.com
 */

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const deleteUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-voting');
    console.log('Connected to MongoDB\n');

    const email = process.argv[2];

    if (!email) {
      console.error('Usage: node scripts/deleteUser.js <email>');
      console.error('Example: node scripts/deleteUser.js mohamedbilalks44@gmail.com');
      process.exit(1);
    }

    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User with email "${email}" not found in database.`);
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.email}) - Role: ${user.role}`);
    console.log('Deleting user...\n');

    // Delete user
    await User.findByIdAndDelete(user._id);
    
    console.log(`✅ User "${email}" deleted successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error deleting user:', error.message);
    process.exit(1);
  }
};

deleteUser();


