# 🗳️ Online E-Voting System

A secure, full-stack web application for online voting built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based authentication for users and admins
- 🗳️ **Voting System**: One vote per user with verification
- 📊 **Real-time Results**: Live election results with statistics
- 👨‍💼 **Admin Dashboard**: Complete admin panel for managing candidates and users
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and gradient themes
- 🔒 **High Security**: Rate limiting, input validation, password hashing, and more
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🔒 Security Features

- JWT token-based authentication
- Bcrypt password hashing
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers
- MongoDB injection prevention
- One vote per user enforcement
- Express Mongo Sanitize for data sanitization

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** (jsonwebtoken) - Authentication
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **Express Rate Limit** - API protection
- **Express Mongo Sanitize** - Data sanitization
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Frontend
- **React.js** (v18.2.0) - UI library
- **React Router DOM** (v6.20.1) - Navigation
- **Axios** (v1.6.2) - HTTP client
- **Tailwind CSS** (v4.1.18) - Utility-first CSS framework
- **PostCSS** & **Autoprefixer** - CSS processing
- **React Icons** (v4.12.0) - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud instance) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd online-e-voting
```

### Step 2: Install Dependencies

Install all dependencies (root, backend, and frontend) with a single command:

```bash
npm run install-all
```

This command installs:
- Root dependencies (concurrently, nodemon, tailwindcss, etc.)
- Backend dependencies (Express, MongoDB, JWT, etc.)
- Frontend dependencies (React, Tailwind CSS, etc.)

**Alternative:** Install separately if needed:
```bash
npm install                    # Root dependencies
cd backend && npm install      # Backend dependencies
cd ../frontend && npm install  # Frontend dependencies
```

### Step 3: Configure Environment Variables

1. Navigate to the `backend` folder
2. Create a `.env` file:

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

**Important Notes:**
- Replace `JWT_SECRET` with a strong, random string (minimum 32 characters)
- If using MongoDB Atlas, replace `MONGODB_URI` with your connection string
- If your frontend runs on a different port, update `CLIENT_URL`

### Step 4: Configure Tailwind CSS

Tailwind CSS is already configured in this project. The configuration files are:

- `frontend/tailwind.config.js` - Tailwind configuration
- `frontend/postcss.config.js` - PostCSS configuration
- `frontend/src/index.css` - Contains Tailwind directives

If you need to reconfigure Tailwind CSS:

**For PowerShell (Windows):**
```powershell
cd frontend
npx tailwindcss init -p
```

**For Bash (Mac/Linux):**
```bash
cd frontend && npx tailwindcss init -p
```

### Step 5: Start MongoDB

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

### Step 6: Create Admin User (Optional but Recommended)

```bash
cd backend
node scripts/createAdmin.js admin@example.com yourpassword "Admin Name"
```

Replace:
- `admin@example.com` with your admin email
- `yourpassword` with your admin password
- `Admin Name` with the admin's name

**Other Admin Scripts:**
```bash
# Reset admin password
node scripts/resetAdmin.js admin@example.com newpassword

# Delete a user
node scripts/deleteUser.js user@example.com
```

## ▶️ Running the Application

### Development Mode (Recommended)

Run both backend and frontend concurrently:

```bash
# From project root
npm run dev
```

This starts:
- ✅ Backend server on http://localhost:5000
- ✅ Frontend React app on http://localhost:3000

### Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend (production)
cd ../backend
npm start
```

## 🌐 Access Points

Once running, access the application at:

- **Frontend (Main App):** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Admin Login:** http://localhost:3000/admin/login

## 📖 Usage

### For Users

1. **Register** a new account at `/register`
2. **Login** with your credentials at `/login`
3. **Browse** available candidates
4. **Cast your vote** (one vote per user)
5. **View real-time** election results at `/results`

### For Admins

1. **Login** with admin credentials at `/admin/login`
2. **Access** the admin dashboard
3. **Manage candidates**: Add, edit, delete, activate/deactivate
4. **View statistics**: User statistics and voting data
5. **Monitor** election progress in real-time

## 📁 Project Structure

```
online-e-voting/
├── backend/
│   ├── models/              # MongoDB models
│   │   ├── User.js          # User model
│   │   ├── Candidate.js     # Candidate model
│   │   └── Vote.js          # Vote model
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── votes.js         # Voting routes
│   │   ├── results.js       # Results routes
│   │   └── admin.js         # Admin routes
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # Authentication middleware
│   ├── scripts/             # Utility scripts
│   │   ├── createAdmin.js   # Create admin user
│   │   ├── resetAdmin.js    # Reset admin password
│   │   └── deleteUser.js    # Delete user
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables (create this)
├── frontend/
│   ├── public/              # Static files
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.js    # Navigation component
│   │   │   └── PrivateRoute.js  # Protected route component
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js      # Home page
│   │   │   ├── Login.js     # Login page
│   │   │   ├── Register.js  # Registration page
│   │   │   ├── Voting.js    # Voting page
│   │   │   ├── Results.js   # Results page
│   │   │   ├── AdminLogin.js        # Admin login
│   │   │   └── AdminDashboard.js    # Admin dashboard
│   │   ├── context/         # React context
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Global styles (Tailwind directives)
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── postcss.config.js    # PostCSS configuration
│   └── package.json         # Frontend dependencies
├── package.json             # Root package.json with scripts
└── README.md                # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - User/Admin login
  - Body: `{ email, password }`
- `GET /api/auth/me` - Get current user (Protected)
  - Headers: `Authorization: Bearer <token>`

### Voting
- `GET /api/votes/candidates` - Get all active candidates
- `POST /api/votes` - Cast a vote (Protected)
  - Body: `{ candidateId }`
  - Headers: `Authorization: Bearer <token>`

### Results
- `GET /api/results` - Get election results (Public)

### Admin (Protected - Admin Only)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/candidates` - Get all candidates
- `POST /api/admin/candidates` - Create candidate
  - Body: `{ name, party, bio }`
- `PUT /api/admin/candidates/:id` - Update candidate
- `DELETE /api/admin/candidates/:id` - Delete candidate
- `PUT /api/admin/candidates/:id/toggle` - Toggle candidate active status
- `GET /api/admin/users` - Get all users

## 📜 Available Scripts

### Root Scripts
- `npm run dev` - Run both backend and frontend concurrently
- `npm run server` - Start backend server only
- `npm run client` - Start frontend React app only
- `npm run install-all` - Install all dependencies (root, backend, frontend)
- `npm run install-server` - Install backend dependencies only
- `npm run install-client` - Install frontend dependencies only

### Backend Scripts
- `npm start` - Start backend server (production)
- `npm run dev` - Start backend server with nodemon (development)

### Frontend Scripts
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔐 Security Considerations

1. **Change JWT_SECRET**: Use a strong, random secret in production (minimum 32 characters)
2. **Use HTTPS**: Always use HTTPS in production environments
3. **Environment Variables**: Never commit `.env` files to version control
4. **Database Security**: Secure your MongoDB instance with authentication
5. **Rate Limiting**: Adjust rate limits based on your application needs
6. **Input Validation**: All inputs are validated and sanitized
7. **CORS Configuration**: Configure CORS properly for production
8. **Helmet.js**: Security headers are enabled via Helmet middleware

## 🐛 Troubleshooting

### MongoDB Connection Error
- **Solution:** Ensure MongoDB is running
- Check: `mongod` command or MongoDB service status
- Verify: `MONGODB_URI` in `.env` is correct
- For MongoDB Atlas: Ensure your IP is whitelisted

### Port Already in Use
- **Backend:** Change `PORT=5000` to another port (e.g., `PORT=5001`) in `.env`
- **Frontend:** React will automatically try port 3001, 3002, etc.
- Or set `PORT=3001` in `frontend/.env` (create if needed)

### Cannot Find Module
- **Solution:** Run `npm run install-all` again
- Or install in each directory separately:
  ```bash
  npm install
  cd backend && npm install
  cd ../frontend && npm install
  ```

### JWT_SECRET is Not Defined
- **Solution:** Make sure `backend/.env` file exists and has `JWT_SECRET` set
- Verify the file is in the `backend/` directory, not the root

### CORS Errors
- **Solution:** Verify `CLIENT_URL` in `backend/.env` matches your frontend URL exactly
- Check that backend is running on the correct port

### Tailwind CSS Not Working
- **Solution:** Ensure Tailwind CSS is installed in the frontend directory
- Verify `tailwind.config.js` has correct content paths: `"./src/**/*.{js,jsx,ts,tsx}"`
- Check that `index.css` contains Tailwind directives: `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
- Restart the development server after configuration changes

### PowerShell Command Issues
- **Problem:** `&&` doesn't work in PowerShell
- **Solution:** Use `;` instead: `cd frontend; npm start`
- Or run commands separately

## 🚀 Production Deployment

### Environment Variables
- Use strong, random `JWT_SECRET`
- Set `NODE_ENV=production`
- Use secure MongoDB connection string
- Configure proper `CLIENT_URL` for your domain

### Security Checklist
- ✅ Enable HTTPS
- ✅ Use environment variables for all secrets
- ✅ Enable MongoDB authentication
- ✅ Set up proper firewall rules
- ✅ Configure CORS for production domain
- ✅ Review and adjust rate limiting

### Build Frontend
```bash
cd frontend
npm run build
```

The build folder will contain optimized production files ready for deployment.

### Deploy
- **Backend:** Deploy to a Node.js hosting service (Heroku, Railway, Render, etc.)
- **Frontend:** Deploy build folder to a static hosting service (Vercel, Netlify, etc.)
- **Database:** Use MongoDB Atlas for cloud database hosting

## 📚 Additional Documentation

- `SETUP.md` - Detailed setup instructions
- `QUICK_START.md` - Quick start guide
- `backend/ENV_CHECKLIST.md` - Environment variable checklist
- `TROUBLESHOOTING.md` - Extended troubleshooting guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- MongoDB for the database solution
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Express.js for the robust backend framework

---

**Note:** This is an educational project. For production use, ensure all security measures are properly implemented and tested.
