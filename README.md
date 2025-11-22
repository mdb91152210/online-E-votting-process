# Online E-Voting System

A secure, full-stack web application for online voting built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🔐 **Secure Authentication**: JWT-based authentication for users and admins
- 🗳️ **Voting System**: One vote per user with verification
- 📊 **Real-time Results**: Live election results with statistics
- 👨‍💼 **Admin Dashboard**: Complete admin panel for managing candidates and users
- 🎨 **Modern UI**: Beautiful, responsive design with gradient themes
- 🔒 **High Security**: Rate limiting, input validation, password hashing, and more

## Security Features

- JWT token-based authentication
- Bcrypt password hashing
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers
- MongoDB injection prevention
- One vote per user enforcement

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation
- Helmet for security headers
- Express Rate Limit for API protection

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Modern CSS with gradients and animations

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "online E-votting process"
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure Backend**
   - Navigate to `backend` folder
   - Create a `.env` file:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/e-voting
     JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
     JWT_EXPIRE=7d
     NODE_ENV=development
     CLIENT_URL=http://localhost:3000
     ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or update `MONGODB_URI` in `.env` to point to your MongoDB instance

5. **Run the application**
   ```bash
   # Run both backend and frontend concurrently
   npm run dev
   
   # Or run separately:
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### For Users
1. Register a new account or login
2. Browse available candidates
3. Cast your vote (one vote per user)
4. View real-time election results

### For Admins
1. Login with admin credentials at `/admin/login`
2. Access the admin dashboard
3. Manage candidates (add, edit, delete, activate/deactivate)
4. View user statistics and voting data

### Creating an Admin User

To create an admin user, you can use MongoDB directly or create a script:

```javascript
// In MongoDB shell or using a script
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or register a user normally and update the role in the database.

## Project Structure

```
online E-votting process/
├── backend/
│   ├── models/          # MongoDB models (User, Candidate, Vote)
│   ├── routes/          # API routes (auth, votes, results, admin)
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (AuthContext)
│   │   └── App.js       # Main app component
│   └── public/          # Static files
└── package.json         # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User/Admin login
- `GET /api/auth/me` - Get current user

### Voting
- `GET /api/votes/candidates` - Get all active candidates
- `POST /api/votes` - Cast a vote

### Results
- `GET /api/results` - Get election results

### Admin (Protected)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/candidates` - Get all candidates
- `POST /api/admin/candidates` - Create candidate
- `PUT /api/admin/candidates/:id` - Update candidate
- `DELETE /api/admin/candidates/:id` - Delete candidate
- `GET /api/admin/users` - Get all users

## Security Considerations

1. **Change JWT_SECRET**: Use a strong, random secret in production
2. **Use HTTPS**: Always use HTTPS in production
3. **Environment Variables**: Never commit `.env` files
4. **Database Security**: Secure your MongoDB instance
5. **Rate Limiting**: Adjust rate limits based on your needs
6. **Input Validation**: All inputs are validated and sanitized

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


