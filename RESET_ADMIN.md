# 🔄 Reset Admin User

## Quick Method: Delete Old and Create New

### Option 1: Use the Reset Script (Recommended)

This will delete the old admin and create a new one in one command:

```bash
cd backend
node scripts/resetAdmin.js old_email@example.com newadmin@example.com newpassword123 "New Admin Name"
```

**Example:**
```bash
cd backend
node scripts/resetAdmin.js mohamedbilalks44@gmail.com admin@example.com admin123 "Admin User"
```

This will:
1. ✅ Delete the old admin (mohamedbilalks44@gmail.com)
2. ✅ Create a new admin (admin@example.com) with password "admin123"

---

### Option 2: Delete and Create Separately

**Step 1: Delete the old admin**
```bash
cd backend
node scripts/deleteUser.js mohamedbilalks44@gmail.com
```

**Step 2: Create new admin**
```bash
cd backend
node scripts/createAdmin.js newadmin@example.com newpassword123 "New Admin"
```

---

## After Resetting

1. **Login with new credentials:**
   - Go to: http://localhost:3000/admin/login
   - Email: (the new email you used)
   - Password: (the new password you used)

2. **Verify it works:**
   - You should be able to access the admin dashboard
   - You can add candidates and manage the system

---

## Example Commands

### Delete old admin and create new one:
```bash
cd backend
node scripts/resetAdmin.js mohamedbilalks44@gmail.com admin@voting.com securepass123 "Admin"
```

### Just delete the old admin:
```bash
cd backend
node scripts/deleteUser.js mohamedbilalks44@gmail.com
```

### Just create a new admin:
```bash
cd backend
node scripts/createAdmin.js admin@voting.com securepass123 "Admin User"
```

---

## Notes

- The old admin will be permanently deleted
- The new admin will have full access
- Make sure to remember the new password!
- You can create multiple admins if needed


