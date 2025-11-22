# 🚀 Quick Start Guide - How to Run the Project

## Prerequisites

Before running, make sure you have:
- ✅ **Node.js** installed (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** installed and running - [Download](https://www.mongodb.com/try/download/community)
  - OR use **MongoDB Atlas** (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)

## Step-by-Step Instructions

### Step 1: Install Dependencies

Open terminal in the project root and run:

```bash
npm run install-all
```

This will install dependencies for:
- Root project (concurrently, nodemon)
- Backend (Express, MongoDB, etc.)
- Frontend (React, etc.)

**Note:** If you get errors, you can install separately:
```bash
npm install                    # Root dependencies
cd backend && npm install      # Backend dependencies
cd ../frontend && npm install  # Frontend dependencies
```

### Step 2: Set Up Environment Variables

1. **Create `.env` file in `backend/` folder**

2. **Copy this content into `backend/.env`:**

```env
# Server Configuration
PORT=5000

# MongoDB Connection (Local)
MONGODB_URI=mongodb://localhost:27017/e-voting

# OR MongoDB Atlas (Cloud) - Replace with your connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/e-voting

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_min_32_characters_long
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

3. **Important:** 
   - Replace `JWT_SECRET` with a random string (at least 32 characters)
   - If using MongoDB Atlas, replace `MONGODB_URI` with your connection string
   - If your frontend runs on a different port, update `CLIENT_URL`

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows (if MongoDB is installed as service, it should auto-start)
# Or start manually:
mongod

# Mac/Linux
sudo systemctl start mongod
# OR
mongod --dbpath /path/to/data
```

**Option B: MongoDB Atlas (Cloud)**
- No need to start anything, just use your connection string in `.env`

### Step 4: Create Admin User (Optional but Recommended)

```bash
cd backend
node scripts/createAdmin.js admin@example.com yourpassword "Admin Name"
```

Replace:
- `admin@example.com` with your admin email
- `yourpassword` with your admin password
- `Admin Name` with the admin's name

### Step 5: Run the Application

**From the project root directory, run:**

```bash
npm run dev
```

This will start:
- ✅ Backend server on http://localhost:5000
- ✅ Frontend React app on http://localhost:3000

**Or run separately in two terminals:**

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## 🎉 Access the Application

Once running, open your browser:

- **Frontend (Main App):** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health
- **Admin Login:** http://localhost:3000/admin/login

## 📝 First Time Usage

1. **Create Admin Account** (if you didn't use the script):
   - Register at http://localhost:3000/register
   - Then update the user role to 'admin' in MongoDB

2. **Login as Admin:**
   - Go to http://localhost:3000/admin/login
   - Add candidates from the admin dashboard

3. **Register Regular Users:**
   - Go to http://localhost:3000/register
   - Create user accounts

4. **Vote:**
   - Login as a user
   - Select a candidate and vote

5. **View Results:**
   - Click "Results" in the navbar
   - See real-time election results

## 🔧 Troubleshooting

### Error: "MongoDB connection error"
- **Solution:** Make sure MongoDB is running
- Check: `mongod` command or MongoDB service status
- Verify: `MONGODB_URI` in `.env` is correct

### Error: "Port 5000 already in use"
- **Solution:** Change `PORT=5000` to another port (e.g., `PORT=5001`) in `.env`
- Or stop the process using port 5000

### Error: "Port 3000 already in use"
- **Solution:** React will automatically try port 3001, 3002, etc.
- Or set `PORT=3001` in `frontend/.env` (create if needed)

### Error: "Cannot find module"
- **Solution:** Run `npm run install-all` again
- Or install in each directory separately

### Error: "JWT_SECRET is not defined"
- **Solution:** Make sure `backend/.env` file exists and has `JWT_SECRET` set

### CORS Errors
- **Solution:** Verify `CLIENT_URL` in `backend/.env` matches your frontend URL exactly

## 🛑 Stop the Application

Press `Ctrl + C` in the terminal where the app is running.

## 📚 More Information

- See `SETUP.md` for detailed setup instructions
- See `README.md` for project documentation
- See `backend/ENV_CHECKLIST.md` for environment variable details


