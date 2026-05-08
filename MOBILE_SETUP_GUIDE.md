# Koopli Mobile App - Complete Setup Guide

## 📋 Table of Contents
1. [Supabase Database Setup](#supabase-database-setup)
2. [Supabase Storage Setup](#supabase-storage-setup)
3. [Environment Variables](#environment-variables)
4. [Flutter Project Structure](#flutter-project-structure)
5. [Dependencies](#dependencies)
6. [Authentication Flow](#authentication-flow)
7. [API Integration Checklist](#api-integration-checklist)

---

## 🗄️ Supabase Database Setup

### Step 1: Run the SQL Schema
1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase-schema.sql` from this repository
4. Execute the entire script

This will create:
- ✅ 7 tables (groups, members, payment_proofs, notifications, etc.)
- ✅ Automatic triggers for trust score updates
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Audit trail system

### Step 2: Verify Tables Created
Check that these tables exist:
- [ ] `paluwagan_groups`
- [ ] `paluwagan_members`
- [ ] `payment_proofs`
- [ ] `payment_verification_history`
- [ ] `trust_score_history`
- [ ] `notifications`
- [ ] `payment_disputes`

---

## 📦 Supabase Storage Setup

### Create Storage Bucket for Payment Proofs

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Configure as follows:

```
Bucket name: payment-proofs
Public bucket: NO (private)
File size limit: 5 MB
Allowed MIME types: image/jpeg, image/png, image/webp
```

### Set Storage Policies

In the Storage policies section, add these RLS policies:

**Upload Policy:**
```sql
-- Allow members to upload their payment proofs
CREATE POLICY "Members can upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'payment-proofs' AND
  (storage.foldername(name))[1] IN (
    SELECT group_id::text FROM paluwagan_members WHERE user_id = auth.uid()
  )
);
```

**Read Policy:**
```sql
-- Allow members to read proofs in their groups
CREATE POLICY "Members can read group payment proofs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'payment-proofs' AND
  (storage.foldername(name))[1] IN (
    SELECT group_id::text FROM paluwagan_members WHERE user_id = auth.uid()
  )
);
```

**Delete Policy:**
```sql
-- Allow users to delete their own pending proofs
CREATE POLICY "Users can delete their pending proofs"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'payment-proofs' AND
  auth.uid()::text IN (
    SELECT user_id::text FROM paluwagan_members 
    WHERE group_id::text = (storage.foldername(name))[1]
  )
);
```

---

## 🔐 Environment Variables

### Create `.env` file in Flutter project root:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Storage
SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1

# Optional: Deep Links
DEEP_LINK_SCHEME=koopli
```

### Get Your Credentials:
1. Go to Supabase Dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_ANON_KEY`

---

## 📱 Flutter Project Structure

```
lib/
├── main.dart
├── config/
│   └── supabase_config.dart          # Supabase initialization
├── models/
│   ├── paluwagan_group.dart          # Group model
│   ├── paluwagan_member.dart         # Member model
│   ├── payment_proof.dart            # Payment proof model
│   └── notification_model.dart       # Notification model
├── services/
│   ├── auth_service.dart             # Authentication
│   ├── payment_service.dart          # Payment proof APIs
│   ├── notification_service.dart     # Notifications
│   └── storage_service.dart          # File upload/download
├── providers/
│   ├── auth_provider.dart            # Auth state management
│   ├── goals_provider.dart           # Goals state
│   └── payment_provider.dart         # Payment state
├── screens/
│   ├── auth/
│   │   ├── welcome_screen.dart
│   │   ├── login_screen.dart
│   │   └── onboarding/
│   ├── home/
│   │   └── home_dashboard.dart
│   ├── goals/
│   │   ├── goals_screen.dart
│   │   ├── paluwagan_detail_screen.dart
│   │   └── submit_payment_proof_screen.dart
│   ├── admin/
│   │   ├── admin_panel_screen.dart
│   │   └── approval_queue_screen.dart
│   └── profile/
│       └── profile_screen.dart
└── widgets/
    ├── payment_history_card.dart
    ├── trust_score_badge.dart
    └── status_badge.dart
```

---

## 📦 Dependencies

### Add to `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Supabase
  supabase_flutter: ^2.0.0
  
  # State Management
  provider: ^6.1.0
  
  # UI/UX
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0
  image_picker: ^1.0.4
  
  # Utilities
  intl: ^0.18.1              # Date/number formatting
  timeago: ^3.6.0            # Relative time (2 hours ago)
  uuid: ^4.2.1               # UUID generation
  
  # Navigation
  go_router: ^12.0.0
  
  # Local Storage
  shared_preferences: ^2.2.2
  
  # File Handling
  path_provider: ^2.1.1
  path: ^1.8.3
  
  # Animations
  lottie: ^2.7.0
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
```

---

## 🔄 Authentication Flow

### User Journey:
1. **Welcome Screen** → Login/Signup
2. **Onboarding** (if first time):
   - Identity verification (KYC)
   - Financial preferences
   - Cooperative selection (optional)
3. **Home Dashboard** → Main app

### Supabase Auth Setup:
1. Enable **Email** auth in Supabase dashboard
2. Configure email templates (Settings → Auth → Email Templates)
3. Set redirect URLs for email confirmation

---

## ✅ API Integration Checklist

### Authentication APIs
- [ ] Sign up with email/password
- [ ] Log in with email/password
- [ ] Password reset
- [ ] Email verification
- [ ] Session management
- [ ] Logout

### Paluwagan Group APIs
- [ ] Create new group
- [ ] Fetch user's groups
- [ ] Get group details
- [ ] Update group settings (admin only)
- [ ] Add members to group

### Payment Proof APIs (Members)
- [ ] Submit payment proof (upload image + metadata)
- [ ] Get own payment history
- [ ] View proof image (signed URL)
- [ ] Get trust score history

### Payment Proof APIs (Admin)
- [ ] Get pending approvals for group
- [ ] Approve payment proof
- [ ] Reject payment proof with reason
- [ ] View all group payment proofs
- [ ] Batch approve multiple proofs

### Notification APIs
- [ ] Fetch user notifications
- [ ] Mark notification as read
- [ ] Get unread count
- [ ] Real-time subscription for new notifications

### Storage APIs
- [ ] Upload payment proof image
- [ ] Get signed URL for viewing image
- [ ] Delete uploaded image

---

## 🔔 Real-Time Features

### Implement Realtime Subscriptions:
1. **Payment proof status changes** - Notify members when admin approves/rejects
2. **New notifications** - Show badge count updates
3. **New pending approvals** - Alert admins of submissions

Example:
```dart
supabase
  .channel('payment-proofs-$groupId')
  .on(
    RealtimeListenTypes.postgresChanges,
    ChannelFilter(
      event: '*',
      schema: 'public',
      table: 'payment_proofs',
      filter: 'group_id=eq.$groupId',
    ),
    (payload) {
      // Handle payment proof update
    },
  )
  .subscribe();
```

---

## 🎨 UI/UX Notes

### Design System (from current web app):
- **Primary Color**: #1565C0 (Blue)
- **Success**: #4CAF50 (Green)
- **Warning**: #FFA726 (Orange)
- **Error**: #EF4444 (Red)
- **Background**: #FAF9F7 (Off-white)
- **Font**: System default (San Francisco on iOS, Roboto on Android)

### Key Screens to Implement:
1. **Goals Screen** - Shows Barkada Savings and Family Fund
2. **Paluwagan Detail** - Payment history, submit proof button
3. **Submit Payment Proof** - Image picker, ref number, date
4. **Admin Panel** - Pending approvals, verification tab
5. **Approval Queue** - Full-screen proof review

---

## 🚀 Getting Started

### Quick Start Steps:
1. ✅ Set up Supabase (database + storage)
2. ✅ Create Flutter project
3. ✅ Add dependencies
4. ✅ Configure environment variables
5. ✅ Copy Flutter code from `flutter/` directory
6. ✅ Test with demo data
7. ✅ Build and run on device

---

## 📞 Support

**Questions about:**
- Database schema → Check `supabase-schema.sql` comments
- API functions → Check `src/app/lib/supabase/paymentVerification.ts`
- UI components → Check React components in `src/app/components/`

**Current Demo Data:**
- **Barkada Savings** - Member view (you can submit proofs)
- **Family Fund** - Admin view (you can approve/reject)

---

## 🔒 Security Notes

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use Row Level Security** - Already configured in schema
3. **Validate on server** - Trust score updates happen via triggers
4. **Signed URLs only** - Payment proof images are private
5. **Rate limiting** - Consider adding in production

---

## 📊 Testing Checklist

### Member Flow:
- [ ] View goals
- [ ] Open Barkada Savings
- [ ] Submit payment proof
- [ ] See "Pending" status
- [ ] Receive notification when approved/rejected

### Admin Flow:
- [ ] View goals
- [ ] Open Family Fund (shows "3 pending" badge)
- [ ] Open Admin Panel
- [ ] Review pending proofs
- [ ] Approve/reject with reason
- [ ] Verify trust score updates

---

**Ready to build!** 🎉
