# .env File Checklist

Your `backend/.env` file should contain the following variables:

## Required Variables

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/e-voting

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## Variable Descriptions

### PORT
- **Required**: No (defaults to 5000)
- **Description**: Port number for the Express server
- **Example**: `5000`, `3001`, `8000`

### MONGODB_URI
- **Required**: Yes (but has default fallback)
- **Description**: MongoDB connection string
- **Local MongoDB**: `mongodb://localhost:27017/e-voting`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/e-voting?retryWrites=true&w=majority`
- **With Authentication**: `mongodb://username:password@localhost:27017/e-voting`

### JWT_SECRET
- **Required**: Yes
- **Description**: Secret key for signing JWT tokens
- **Security**: Use a long, random string (at least 32 characters)
- **Generate**: You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **Example**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

### JWT_EXPIRE
- **Required**: No (defaults to 7d)
- **Description**: JWT token expiration time
- **Examples**: `7d`, `24h`, `1h`, `30m`

### CLIENT_URL
- **Required**: No (defaults to http://localhost:3000)
- **Description**: Frontend URL for CORS configuration
- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com`

### NODE_ENV
- **Required**: No (defaults to development)
- **Description**: Environment mode
- **Values**: `development`, `production`, `test`

## Complete Example .env File

```env
# Server Configuration
PORT=5000

# MongoDB Connection (Local)
MONGODB_URI=mongodb://localhost:27017/e-voting

# MongoDB Connection (Atlas - Example)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/e-voting?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## Validation Checklist

- [ ] PORT is set (or using default 5000)
- [ ] MONGODB_URI is set and correct
- [ ] JWT_SECRET is set and is at least 32 characters long
- [ ] JWT_EXPIRE is set (or using default 7d)
- [ ] CLIENT_URL matches your frontend URL
- [ ] NODE_ENV is set appropriately

## Common Issues

### Issue: "JWT_SECRET is not defined"
- **Solution**: Make sure JWT_SECRET is set in your .env file
- **Check**: No spaces around the `=` sign

### Issue: "MongoDB connection error"
- **Solution**: Verify MONGODB_URI is correct
- **Check**: MongoDB service is running
- **Check**: Connection string format is correct

### Issue: "CORS error"
- **Solution**: Verify CLIENT_URL matches your frontend URL exactly
- **Check**: Include protocol (http:// or https://)
- **Check**: Include port number if not default

### Issue: "Cannot read property of undefined"
- **Solution**: Make sure .env file is in the `backend/` directory
- **Check**: Restart the server after changing .env
- **Check**: No syntax errors in .env file (no quotes needed for values)

## Security Notes

1. **Never commit .env file** - It's already in .gitignore
2. **Use strong JWT_SECRET** - Generate a random 32+ character string
3. **Use environment-specific values** - Different values for dev/prod
4. **Protect MongoDB credentials** - Use strong passwords
5. **Use HTTPS in production** - Update CLIENT_URL accordingly


