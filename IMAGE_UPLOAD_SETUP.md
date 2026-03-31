# HealthAppoint - Image Upload & Profile Setup Guide

## Overview
This guide explains the complete image upload and profile setup flow for both doctors and patients.

## Cloudinary Setup (Already Configured)
Your `.env` file contains:
```
CLOUD_NAME=your_cloud_name
API_KEY=551238988134113
API_SECRET=-GDwK8jLuWeUl_4x1sHCufprYfI
```

## Backend Setup

### 1. Files Created/Updated

**New Controllers:**
- `controllers/uploadController.js` - Handles image uploads to Cloudinary

**New Middleware:**
- `middleware/uploadMiddleware.js` - Multer configuration for file uploads (5MB limit)

**New Routes:**
- `routes/uploadRoutes.js` - Routes: `/api/upload/profile-image`, `/api/upload/delete-image`

**Updated Files:**
- `controllers/authController.js` - Added `completeProfile()` endpoint
- `routes/authRoutes.js` - Added `/auth/complete-profile` route
- `models/User.js` - Added `profileComplete` boolean field
- `server.js` - Registered upload routes

### 2. API Endpoints

**Image Upload:**
```
POST /api/upload/profile-image
- Headers: Authorization: Bearer {token}
- Body: FormData with 'image' file
- Returns: { success: true, imageUrl, publicId }
```

**Delete Image:**
```
POST /api/upload/delete-image
- Headers: Authorization: Bearer {token}
- Body: { publicId }
- Returns: { success: true }
```

**Complete Doctor Profile:**
```
POST /api/auth/complete-profile
- Headers: Authorization: Bearer {token}
- Body: {
    phone: string,
    bio: string,
    specialization: string,
    experience: string,
    profileImage: string (URL from upload) 
  }
- Returns: { success: true, user }
```

**Update Profile:**
```
PUT /api/auth/profile
- Headers: Authorization: Bearer {token}
- Body: { name, email, phone, bio, specialization, clinicAddress, qualifications, experience, profileImage }
- Returns: user object
```

## Frontend Setup

### 1. New Dependencies
Add `expo-image-picker` to package.json (already added)

Run:
```bash
npm install
# or
yarn install
# or
expo install
```

### 2. New Screens

**Doctor Profile Setup** (`app/doctor-profile-setup.tsx`):
- Shown immediately after doctor registration
- Fields:
  - Profile Picture (image picker with upload to Cloudinary)
  - Phone Number
  - Bio (multiline)
  - Specialization (dropdown)
  - Experience (multiline)
- On completion → Redirected to `/doctor/dashboard`

**Profile Edit** (`app/profile.tsx`):
- Accessible from header profile icon
- Edit mode allows:
  - Change profile image (tap camera icon)
  - Update all fields
  - For doctors: Specialization dropdown
  - For patients: No specialization field
- Save/Cancel buttons

### 3. API Integration

**New API Methods** (`services/api.ts`):
```typescript
uploadProfileImage(imageUri: string)
  - Uploads image to backend
  - Returns: { imageUrl, publicId }

completeProfile(profileData)
  - Completes doctor profile
  - Called after registration

updateUser(userData)
  - Updates any user profile data
  - Called from edit profile screen
```

## Registration Flow

### Doctor Registration:
1. Fill name, email, password, role (doctor)
2. Click Register
3. → Redirected to `/doctor-profile-setup`
4. Fill: phone, bio, specialization, experience, upload image
5. Click "Complete Profile"
6. Image uploaded to Cloudinary
7. Profile saved to MongoDB
8. → Redirected to Doctor Dashboard
9. `profileComplete` flag set to `true`

### Patient Registration:
1. Fill name, email, password, role (patient)
2. Click Register
3. → Redirected to Patient Home
4. Can edit profile later via header icon

## Profile Editing

Both doctors and patients can:
1. Navigate to `/profile` (tap profile icon in header)
2. Click pencil icon to edit
3. For image: Tap the profile photo to pick new image
4. Update any fields
5. Click "Save Changes"
6. Image automatically uploaded if changed
7. Changes saved to MongoDB

## File Structure

```
healthAppoint-backend/
├── controllers/
│   ├── authController.js (updated)
│   └── uploadController.js (new)
├── middleware/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js (new)
├── routes/
│   ├── authRoutes.js (updated)
│   └── uploadRoutes.js (new)
├── models/
│   └── User.js (updated - added profileComplete)
├── uploads/
│   └── .gitkeep (directory for temporary files)
└── server.js (updated)

healthAppoint-App/
├── app/
│   ├── doctor-profile-setup.tsx (new)
│   ├── profile.tsx (updated)
│   ├── register.tsx (updated)
│   └── _layout.tsx (updated)
├── services/
│   └── api.ts (updated)
└── package.json (updated - added expo-image-picker)
```

## Testing

### Test Doctor Registration:
1. Start expo app
2. Register as Doctor
3. Fill all profile fields
4. Select image
5. Submit
6. Verify: Profile appears in dashboard
7. Check MongoDB: User has profileComplete: true

### Test Profile Edit:
1. Login as any user
2. Tap profile icon in header
3. Click pencil icon
4. Change image (tap photo)
5. Update fields
6. Save changes
7. Verify changes reflected immediately

## Troubleshooting

**Image not uploading:**
- Check Cloudinary credentials in `.env`
- Ensure image size < 5MB
- Check file format (jpeg, jpg, png, gif)

**Profile setup screen not showing:**
- Ensure doctor-profile-setup.tsx exists
- Check register.tsx redirects to `/doctor-profile-setup` for doctors
- Clear app cache and restart

**Multer file errors:**
- Check uploads/ directory exists
- Ensure server has write permissions
- Check file size limits (5MB)

## Environment Variables

Backend `.env` should contain:
```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

Frontend config is in `config/index.ts` - update API_BASE_URL if needed.
