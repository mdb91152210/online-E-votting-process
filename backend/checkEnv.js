/**
 * Script to validate .env file
 * Run: node checkEnv.js
 */

require('dotenv').config();

const requiredVars = {
  'MONGODB_URI': 'MongoDB connection string',
  'JWT_SECRET': 'JWT secret key for token signing'
};

const optionalVars = {
  'PORT': 'Server port (default: 5000)',
  'JWT_EXPIRE': 'JWT expiration time (default: 7d)',
  'CLIENT_URL': 'Frontend URL for CORS (default: http://localhost:3000)',
  'NODE_ENV': 'Environment mode (default: development)'
};

console.log('\n🔍 Checking .env file...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('📋 Required Variables:');
for (const [varName, description] of Object.entries(requiredVars)) {
  const value = process.env[varName];
  if (!value) {
    console.log(`  ❌ ${varName} - MISSING (${description})`);
    hasErrors = true;
  } else {
    if (varName === 'JWT_SECRET' && value.length < 32) {
      console.log(`  ⚠️  ${varName} - WARNING: Should be at least 32 characters long (current: ${value.length})`);
      hasWarnings = true;
    } else {
      // Mask sensitive values
      const masked = varName.includes('SECRET') || varName.includes('PASSWORD') 
        ? '*'.repeat(Math.min(value.length, 20)) 
        : value.length > 50 
        ? value.substring(0, 50) + '...' 
        : value;
      console.log(`  ✅ ${varName} - OK (${description})`);
      console.log(`     Value: ${masked}`);
    }
  }
}

// Check optional variables
console.log('\n📋 Optional Variables:');
for (const [varName, description] of Object.entries(optionalVars)) {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName} - Set (${description})`);
    if (varName === 'CLIENT_URL') {
      console.log(`     Value: ${value}`);
    }
  } else {
    console.log(`  ⚪ ${varName} - Using default (${description})`);
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ ERRORS FOUND: Please fix the missing required variables above.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  WARNINGS: Please review the warnings above.');
  process.exit(0);
} else {
  console.log('✅ All checks passed! Your .env file looks good.');
  process.exit(0);
}


