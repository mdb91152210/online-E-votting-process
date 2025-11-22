# 🔧 Troubleshooting Login Issues

## Common Login Failure Causes

### 1. Missing or Incorrect .env File

**Problem:** Backend can't find JWT_SECRET or MongoDB connection string.

**Solution:**
1. Create `backend/.env` file if it doesn't exist
2. Add these required variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/e-voting
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

3. **IMPORTANT:** Replace `JWT_SECRET` with a random string (at least 32 characters)
4. Restart the backend server after creating/updating `.env`

### 2. MongoDB Not Running

**Problem:** Cannot connect to MongoDB database.

**Check:**
```bash
# Check if MongoDB is running
# Windows: Check Services or run:
mongod

# Or check if MongoDB service is running
```

**Solution:**
- Start MongoDB service
- Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`

### 3. Backend Server Not Running

**Problem:** Frontend can't connect to backend API.

**Check:**
- Open http://localhost:5000/api/health
- Should see: `{"status":"OK","message":"Server is running"}`

**Solution:**
```bash
# Make sure backend is running
npm run server
# OR
npm run dev
```

### 4. CORS Issues

**Problem:** Browser blocks requests due to CORS policy.

**Solution:**
- Verify `CLIENT_URL` in `backend/.env` matches your frontend URL exactly
- Should be: `CLIENT_URL=http://localhost:3000`
- Restart backend after changing `.env`

### 5. User Doesn't Exist

**Problem:** Trying to login with non-existent user.

**Solution:**
1. **Register first:**
   - Go to http://localhost:3000/register
   - Create a new account
   - Then login

2. **Or create admin user:**
   ```bash
   cd backend
   node scripts/createAdmin.js admin@example.com yourpassword "Admin Name"
   ```

### 6. Wrong Password

**Problem:** Password doesn't match.

**Solution:**
- Make sure you're using the correct password
- If you forgot, you'll need to reset it in the database
- Or create a new account

### 7. Rate Limiting

**Problem:** Too many login attempts.

**Solution:**
- Wait 15 minutes
- Or restart the backend server

## Debugging Steps

### Step 1: Check Backend Logs

Look at your terminal where backend is running. You should see:
```
MongoDB Connected
Server running on port 5000
```

If you see errors, note them down.

### Step 2: Check Browser Console

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try to login
4. Check for any error messages

### Step 3: Check Network Tab

1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Try to login
4. Look for the login request (POST to `/api/auth/login`)
5. Check:
   - Status code (should be 200 for success)
   - Response body (check error message)

### Step 4: Test Backend Directly

Test the API endpoint directly:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test login (replace with your credentials)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Step 5: Verify Environment Variables

Run the validation script:

```bash
cd backend
node checkEnv.js
```

## Quick Fix Checklist

- [ ] `.env` file exists in `backend/` folder
- [ ] `JWT_SECRET` is set in `.env` (at least 32 characters)
- [ ] `MONGODB_URI` is correct in `.env`
- [ ] MongoDB is running
- [ ] Backend server is running (check terminal)
- [ ] Frontend is running (check terminal)
- [ ] User account exists (register first)
- [ ] Using correct email and password
- [ ] No CORS errors in browser console
- [ ] Backend restarted after changing `.env`

## Still Not Working?

1. **Check the exact error message:**
   - Look at browser console
   - Look at backend terminal
   - Share the error message for help

2. **Verify all services are running:**
   ```bash
   # Check if processes are running
   # Backend should be on port 5000
   # Frontend should be on port 3000
   ```

3. **Try creating a fresh user:**
   - Register a new account
   - Try logging in with that account

4. **Check database:**
   - Verify users exist in MongoDB
   - Check if passwords are hashed correctly

## Common Error Messages

### "Invalid credentials"
- User doesn't exist OR password is wrong
- Solution: Register first or check password

### "JWT_SECRET is not defined"
- Missing `.env` file or `JWT_SECRET` variable
- Solution: Create/update `backend/.env` file

### "MongoDB connection error"
- MongoDB not running or wrong connection string
- Solution: Start MongoDB or fix `MONGODB_URI`

### "Network Error" or "Failed to fetch"
- Backend not running or CORS issue
- Solution: Start backend and check `CLIENT_URL` in `.env`

### "Too many requests"
- Rate limit exceeded
- Solution: Wait 15 minutes or restart backend


