# HealthAppoint - Complete Image Upload & Profile Setup Implementation

## 🎯 Overview
Complete integration of Cloudinary image uploads with doctor profile setup flow after registration and editable profiles for both doctors and patients.

## 📦 Cloudinary Configuration
```
CLOUD_NAME: your_cloud_name
API_KEY: 551238988134113
API_SECRET: -GDwK8jLuWeUl_4x1sHCufprYfI
```

---

## 🔧 Backend Implementation

### New Files Created

#### 1. `controllers/uploadController.js`
- **uploadProfileImage()**: Uploads image to Cloudinary
  - Accepts multipart file upload
  - Saves to `healthappoint/profiles` folder
  - Returns: `{ success, imageUrl, publicId }`
- **deleteProfileImage()**: Deletes image from Cloudinary
  - Requires publicId

#### 2. `middleware/uploadMiddleware.js`
- Multer configuration for file uploads
- Accepts: jpeg, jpg, png, gif
- Max file size: 5MB
- Stores in `uploads/` directory temporarily

#### 3. `routes/uploadRoutes.js`
```
POST /api/upload/profile-image (protected)
POST /api/upload/delete-image (protected)
```

### Modified Files

#### 1. `controllers/authController.js`
Added **completeProfile()** endpoint:
```javascript
exports.completeProfile = async (req, res) => {
  // Fields: phone, bio, specialization, experience, profileImage
  // Sets profileComplete: true flag
  // Returns user with updated profile
}
```

#### 2. `routes/authRoutes.js`
Added route:
```
POST /api/auth/complete-profile (protected)
```

#### 3. `models/User.js`
Added fields:
- `profileComplete: Boolean` - Tracks if doctor has completed setup

#### 4. `server.js`
Registered upload routes:
```javascript
app.use("/api/upload", require("./routes/uploadRoutes"));
```

---

## 📱 Frontend Implementation

### New Files Created

#### 1. `app/doctor-profile-setup.tsx`
Complete profile setup screen shown after doctor registration:
- **Profile Picture Upload**
  - Image picker
  - Automatic upload to Cloudinary
- **Form Fields**:
  - Phone Number
  - Bio (multiline)
  - Specialization (dropdown)
  - Experience (multiline)
- **Flow**: 
  - Doctor registers → Automatic redirect to this screen
  - Fills all fields → Uploads to Cloudinary
  - Saved to MongoDB → Redirected to doctor dashboard

#### 2. `app/(doctor)/profile.tsx`
Doctor profile edit screen:
- View/Edit profile information
- Image picker (tap photo in edit mode)
- Specialization dropdown
- Professional information (clinic address, qualifications, experience)
- Logout option

#### 3. `app/(patient)/profile.tsx`
Patient profile edit screen:
- View/Edit profile information
- Image picker (tap photo in edit mode)
- Personal information (name, email, phone, bio)
- Logout option

### Modified Files

#### 1. `services/api.ts`
Added methods:
```typescript
async uploadProfileImage(imageUri: string)
  - Uploads image via FormData
  - Returns: { imageUrl, publicId }

async completeProfile(profileData: any)
  - POST /auth/complete-profile
  - Saves doctor's profile setup

async updateUser(userData: any)
  - PUT /auth/profile
  - Updates any user profile fields
```

#### 2. `app/register.tsx`
Updated registration flow:
```javascript
if (role === 'doctor') {
  router.replace('/doctor-profile-setup');
}
// Patients automatically go to home
```

#### 3. `app/(doctor)/_layout.tsx`
- Added profile button in header
- Routes to `/(doctor)/profile`
- Added profile screen to stack

#### 4. `app/(patient)/_layout.tsx`
- Added profile button in header
- Routes to `/(patient)/profile`
- Added profile screen to stack

#### 5. `app/_layout.tsx`
- Added doctor-profile-setup screen
- Removed fallback profile screen (now in group layouts)

#### 6. `stores/authStore.ts`
Updated User interface with new fields:
- `profileImage`: string
- `phone`: string
- `bio`: string
- `qualifications`: string
- `experience`: string

#### 7. `package.json`
Added dependency:
```json
"expo-image-picker": "~15.0.5"
```

---

## 🔄 Complete User Flow

### Doctor Registration & Setup
1. **Register Screen**
   - Enter: name, email, password, select "Doctor" role
   - Click Register

2. **Doctor Profile Setup** (Auto-redirected)
   - Upload profile image (picked from gallery, uploaded to Cloudinary)
   - Enter phone number
   - Write bio
   - Select specialization from dropdown
   - Enter experience
   - Click "Complete Profile"

3. **Backend Processing**
   - Image uploaded to Cloudinary
   - User document updated with all fields
   - `profileComplete` flag set to `true`
   - Redirected to Doctor Dashboard

4. **Later Profile Editing**
   - Tap profile icon in header
   - Click pencil icon to edit
   - Tap profile photo to change image
   - Update any field
   - Click "Save Changes"
   - Image automatically re-uploaded if changed

### Patient Registration & Setup
1. **Register Screen**
   - Enter: name, email, password, select "Patient" role
   - Click Register
   - Auto-redirected to Patient Home

2. **Profile Editing (Optional)**
   - Tap profile icon in header
   - Can edit: name, email, phone, bio
   - Can upload profile picture
   - Click "Save Changes"

---

## 📁 File Structure

```
healthAppoint-backend/
├── controllers/
│   ├── authController.js (UPDATED - added completeProfile)
│   └── uploadController.js (NEW)
├── middleware/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js (NEW)
├── routes/
│   ├── authRoutes.js (UPDATED - added complete-profile route)
│   └── uploadRoutes.js (NEW)
├── models/
│   └── User.js (UPDATED - added profileComplete field)
├── uploads/
│   └── .gitkeep (directory for temp files)
├── server.js (UPDATED - added upload routes)
├── IMAGE_UPLOAD_SETUP.md (NEW - documentation)
└── .env (already has Cloudinary config)

healthAppoint-App/
├── app/
│   ├── doctor-profile-setup.tsx (NEW)
│   ├── register.tsx (UPDATED - routes to profile setup)
│   ├── _layout.tsx (UPDATED)
│   ├── (doctor)/
│   │   ├── _layout.tsx (UPDATED)
│   │   ├── profile.tsx (NEW)
│   │   └── [other files unchanged]
│   ├── (patient)/
│   │   ├── _layout.tsx (UPDATED)
│   │   ├── profile.tsx (NEW)
│   │   └── [other files unchanged]
├── services/
│   └── api.ts (UPDATED - added upload methods)
├── stores/
│   └── authStore.ts (UPDATED - User interface)
└── package.json (UPDATED - added expo-image-picker)
```

---

## 🚀 Setup Instructions

### Backend
1. Environment variables already set in `.env`
2. Run: `npm install` (multer and cloudinary already in dependencies)
3. Start server: `npm start` or `node server.js`

### Frontend
1. Install new dependency: 
   ```bash
   npm install
   # or
   yarn install
   # or
   expo install
   ```
2. Ensure `expo-image-picker` is available
3. Run: `npm start` or `expo start`

---

## ✅ Testing Checklist

- [ ] Doctor can register
- [ ] Doctor sees profile setup screen after registration
- [ ] Can pick image from phone gallery
- [ ] Image uploads to Cloudinary successfully
- [ ] Can fill phone, bio, specialization, experience
- [ ] Profile saves to MongoDB
- [ ] Doctor redirected to dashboard
- [ ] Doctor can edit profile later (header icon)
- [ ] Can change profile image during edit
- [ ] Patient can register
- [ ] Patient goes to home (no profile setup screen)
- [ ] Patient can edit profile from header icon
- [ ] Can upload profile image as patient
- [ ] All profile changes persist
- [ ] Logout works correctly

---

## 🔐 Security Notes

- All upload endpoints protected with authentication middleware
- File type validation (images only)
- File size limit: 5MB
- Temporary files cleanup on upload completion
- Images stored in Cloudinary (not on server)

---

## 📊 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/complete-profile` - Complete doctor profile (protected)

### Upload
- `POST /api/upload/profile-image` - Upload profile picture (protected)
- `POST /api/upload/delete-image` - Delete profile picture (protected)

---

## 🐛 Troubleshooting

**Image picker not working:**
- Ensure `expo-image-picker` is installed
- Check permissions on device
- Clear app cache and reinstall

**Cloudinary upload failing:**
- Verify credentials in `.env`
- Check file size (< 5MB)
- Ensure valid image format

**Profile setup not showing for doctors:**
- Check `register.tsx` routing
- Verify doctor-profile-setup.tsx exists
- Clear cache and restart app

**Images not persisting:**
- Check MongoDB connection
- Verify API calls completing successfully
- Check browser console for errors

---

## 📝 Notes

- Doctors MUST complete profile after registration
- Patients can edit profile anytime (optional immediate setup)
- All images go through Cloudinary (secure, scalable)
- Profile edits can be made anytime after registration
- Temporary files cleaned up automatically after upload

