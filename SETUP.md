# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Environment**
   - Copy `backend/.env.example` to `backend/.env`
   - Update the values in `backend/.env`:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/e-voting
     JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
     JWT_EXPIRE=7d
     NODE_ENV=development
     CLIENT_URL=http://localhost:3000
     ```

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud) and update `MONGODB_URI`

4. **Create Admin User**
   ```bash
   cd backend
   node scripts/createAdmin.js admin@example.com yourpassword "Admin Name"
   ```

5. **Run the Application**
   ```bash
   # From root directory
   npm run dev
   ```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: http://localhost:3000/admin/login

## Default Admin Credentials

After running the createAdmin script, use:
- Email: (the email you provided)
- Password: (the password you provided)

## Testing the Application

1. **Register a User**
   - Go to http://localhost:3000/register
   - Create a new account

2. **Login as User**
   - Go to http://localhost:3000/login
   - Login with your credentials

3. **Cast a Vote**
   - After login, you'll be redirected to the voting page
   - Select a candidate and submit your vote

4. **View Results**
   - Click on "Results" in the navbar
   - See real-time election results

5. **Admin Dashboard**
   - Login as admin at http://localhost:3000/admin/login
   - Access the admin dashboard
   - Add/manage candidates
   - View user statistics

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check your MongoDB service
- Verify the connection string in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change the PORT in `backend/.env`
- Or stop the process using the port

### Frontend Not Loading
- Ensure backend is running first
- Check that `CLIENT_URL` in backend `.env` matches frontend URL
- Clear browser cache

### CORS Errors
- Verify `CLIENT_URL` in backend `.env` matches your frontend URL
- Check that backend is running on the correct port

## Production Deployment

1. **Environment Variables**
   - Use strong, random `JWT_SECRET`
   - Set `NODE_ENV=production`
   - Use secure MongoDB connection string
   - Configure proper `CLIENT_URL`

2. **Security**
   - Enable HTTPS
   - Use environment variables for all secrets
   - Enable MongoDB authentication
   - Set up proper firewall rules

3. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

4. **Deploy**
   - Deploy backend to a Node.js hosting service
   - Deploy frontend build to a static hosting service
   - Configure CORS and environment variables


