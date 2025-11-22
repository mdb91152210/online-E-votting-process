# 🔍 Quick Diagnosis Guide

If login is failing, follow these steps to identify the problem:

## Step 1: Check Backend is Running

Open your terminal where backend is running. You should see:
```
MongoDB Connected
Server running on port 5000
```

**If you see errors:**
- "MongoDB connection error" → MongoDB is not running
- "JWT_SECRET is not defined" → Missing .env file

## Step 2: Check .env File

1. Go to `backend/` folder
2. Make sure `.env` file exists
3. It should contain:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/e-voting
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

## Step 3: Run Diagnostic Script

```bash
cd backend
node testConnection.js
```

This will check:
- ✅ Environment variables
- ✅ MongoDB connection
- ✅ Database and users
- ✅ User model

## Step 4: Check Browser Console

1. Open browser (F12)
2. Go to Console tab
3. Try to login
4. Look for error messages

Common errors:
- `Network Error` → Backend not running
- `CORS error` → CLIENT_URL mismatch
- `401 Unauthorized` → Wrong credentials or user doesn't exist

## Step 5: Check Network Tab

1. Open browser (F12)
2. Go to Network tab
3. Try to login
4. Find the `/api/auth/login` request
5. Check:
   - Status: Should be 200 (green) or 401/400 (red)
   - Response: Click on it to see error message

## Step 6: Verify User Exists

**Option A: Register First**
- Go to http://localhost:3000/register
- Create a new account
- Then try logging in

**Option B: Create Admin User**
```bash
cd backend
node scripts/createAdmin.js admin@example.com yourpassword "Admin Name"
```

Then login with:
- Email: `admin@example.com`
- Password: `yourpassword`

## Common Issues & Solutions

### Issue: "Invalid credentials"
**Cause:** User doesn't exist OR wrong password

**Solution:**
1. Register a new user first
2. Or create admin user with the script
3. Make sure you're using the correct password

### Issue: "Network Error" or "Failed to fetch"
**Cause:** Backend not running or wrong URL

**Solution:**
1. Check backend is running: `npm run server`
2. Test backend: http://localhost:5000/api/health
3. Check `CLIENT_URL` in `.env` matches frontend URL

### Issue: "JWT_SECRET is not defined"
**Cause:** Missing .env file or JWT_SECRET variable

**Solution:**
1. Create `backend/.env` file
2. Add `JWT_SECRET=your_long_random_string_here`
3. Restart backend server

### Issue: "MongoDB connection error"
**Cause:** MongoDB not running

**Solution:**
1. Start MongoDB service
2. Or use MongoDB Atlas and update `MONGODB_URI`

## Still Not Working?

1. **Share the exact error message** from:
   - Browser console
   - Backend terminal
   - Network tab response

2. **Run the diagnostic:**
   ```bash
   cd backend
   node testConnection.js
   ```
   Share the output

3. **Check all services:**
   - Backend running? (http://localhost:5000/api/health)
   - Frontend running? (http://localhost:3000)
   - MongoDB running?


