# 👋 Welcome Mobile Developer!

## 🎯 Your Mission

Convert the **Koopli web app** (React + TypeScript + Supabase) to a **Flutter mobile app** with full feature parity, focusing on the **Paluwagan payment verification system**.

---

## 📦 What You're Getting

### ✅ Complete and Ready:

1. **Database Schema** (`supabase-schema.sql`)
   - 7 tables fully designed
   - Automatic trust score updates via triggers
   - Row Level Security configured
   - Audit trail system
   - **Status:** Production-ready, just run the SQL script

2. **API Functions** (`src/app/lib/supabase/paymentVerification.ts`)
   - All CRUD operations defined
   - Real-time subscriptions
   - File upload/download
   - **Status:** Reference implementation (TypeScript)

3. **Flutter Foundation** (`flutter/` directory)
   - Supabase config
   - 3 complete data models (Group, Member, PaymentProof)
   - Complete PaymentService with all APIs
   - **Status:** Ready to integrate

4. **Documentation**
   - `MOBILE_SETUP_GUIDE.md` - Database + Supabase setup
   - `FLUTTER_IMPLEMENTATION_GUIDE.md` - Code structure + templates
   - This file - Overview

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Set Up Supabase (One-time)

```bash
# 1. Go to your Supabase project dashboard
# 2. SQL Editor → Run the entire supabase-schema.sql file
# 3. Storage → Create bucket "payment-proofs" (private, 5MB limit)
# 4. Settings → API → Copy your URL and anon key
```

### Step 2: Create Flutter Project

```bash
flutter create koopli_mobile
cd koopli_mobile

# Copy the foundation code
cp -r ../flutter/lib/* lib/

# Install dependencies
flutter pub add supabase_flutter provider image_picker intl cached_network_image go_router
flutter pub get
```

### Step 3: Configure Environment

Create `lib/config/env.dart`:

```dart
class Env {
  static const supabaseUrl = 'https://YOUR-PROJECT.supabase.co';
  static const supabaseAnonKey = 'YOUR-ANON-KEY';
}
```

Update `lib/config/supabase_config.dart` to use these constants.

### Step 4: Run!

```bash
flutter run
```

---

## 🏗️ Architecture Overview

```
Koopli Mobile App
├── Supabase Backend
│   ├── PostgreSQL Database (7 tables)
│   ├── Storage (payment proof images)
│   ├── Auth (email/password)
│   └── Realtime (subscriptions)
│
├── Flutter App
│   ├── Models (Data structures)
│   ├── Services (API calls to Supabase)
│   ├── Providers (State management)
│   ├── Screens (UI pages)
│   └── Widgets (Reusable components)
```

### Data Flow:

```
User Action → Provider → Service → Supabase → Database
                ↓                      ↓
            Update UI ← Realtime ← Trigger (auto trust score)
```

---

## 📋 Development Roadmap

### Phase 1: Foundation (Week 1)
**Goal:** User can log in and see their groups

- [ ] Auth screens (Welcome, Login, Signup)
- [ ] Main navigation (Bottom tabs)
- [ ] Goals screen (list view)
- [ ] Fetch and display user's Paluwagan groups

**Key Files to Build:**
- `screens/auth/welcome_screen.dart`
- `screens/auth/login_screen.dart`
- `screens/home/home_dashboard.dart`
- `screens/goals/goals_screen.dart`
- `services/auth_service.dart`
- `services/group_service.dart`
- `providers/auth_provider.dart`
- `providers/goals_provider.dart`

---

### Phase 2: Payment Proof Submission (Week 2)
**Goal:** Members can submit payment proofs

- [ ] Paluwagan detail screen
- [ ] Payment history display
- [ ] Submit payment proof screen
- [ ] Image picker integration
- [ ] Upload to Supabase Storage

**Key Files to Build:**
- `screens/goals/paluwagan_detail_screen.dart`
- `screens/goals/submit_payment_proof_screen.dart`
- `widgets/payment_history_card.dart`
- `widgets/status_badge.dart`

**Already Complete:**
- ✅ `services/payment_service.dart` - Has submitPaymentProof()
- ✅ `models/payment_proof.dart` - Data model

---

### Phase 3: Admin Approval (Week 3)
**Goal:** Admins can review and approve/reject proofs

- [ ] Admin panel screen
- [ ] Approval queue (pending proofs)
- [ ] Approve/Reject actions
- [ ] Real-time updates when status changes

**Key Files to Build:**
- `screens/admin/admin_panel_screen.dart`
- `screens/admin/approval_queue_screen.dart`
- `widgets/pending_badge.dart`

**Already Complete:**
- ✅ `services/payment_service.dart` - Has approvePaymentProof(), rejectPaymentProof()
- ✅ Realtime subscriptions - subscribeToPaymentProofs()

---

### Phase 4: Polish (Week 4)
**Goal:** Production-ready app

- [ ] Profile screen
- [ ] Notifications
- [ ] Error handling
- [ ] Loading states
- [ ] Animations
- [ ] Testing

---

## 🎨 Design System

Match the web app design exactly:

### Colors
```dart
// lib/theme/app_colors.dart
class AppColors {
  static const primary = Color(0xFF1565C0);      // Blue
  static const success = Color(0xFF4CAF50);      // Green
  static const warning = Color(0xFFFFA726);      // Orange
  static const error = Color(0xFFEF4444);        // Red
  static const background = Color(0xFFFAF9F7);   // Off-white
  static const textPrimary = Color(0xFF111827);
  static const textSecondary = Color(0xFF6B7280);
}
```

### Typography
- Use system fonts (SF Pro on iOS, Roboto on Android)
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Rounded corners: 12-16px for cards, 8px for buttons
- Shadows: Subtle elevation, similar to web app
- Spacing: 8px grid system

---

## 🔑 Key Features to Implement

### 1. Demo Goals (Already in Database)

The app should show 2 predefined demo goals:

**Barkada Savings** (Member view)
- You are a regular member (not admin)
- Submit payment proof button visible
- Payment history shows: Pending, Approved, Rejected statuses
- Trust score: 88

**Family Fund** (Admin view)
- You are the admin
- Shows "3 pending" badge
- Admin Panel button visible
- Can approve/reject proofs

**Important:** These goals use mock data stored in `src/app/data/demoGoals.ts` for the web app. For Flutter, you'll seed these in Supabase or use local mock data initially.

---

### 2. Payment Proof Workflow

#### Member Flow:
1. Open Paluwagan group
2. See "Submit Payment Proof" button
3. Tap button → Opens camera/gallery
4. Take/select photo of GCash/Maya receipt
5. Enter:
   - Amount: ₱5,000
   - Payment date: Today
   - Reference number: GCASH20260508123456
6. Submit → Uploads to Supabase Storage
7. Creates record in `payment_proofs` table
8. Status: "Pending" (orange badge)
9. Wait for admin approval

#### Admin Flow:
1. Open Paluwagan group (where user is admin)
2. See "3 pending" badge on card
3. Tap "Admin Panel" button
4. Go to "Verification" tab
5. See list of pending proofs
6. Tap "View All Payment Proofs"
7. See full-screen list with proof images
8. Tap a proof → View full image + details
9. Either:
   - Tap "Approve" → Status changes to "Approved" (green)
   - Tap "Reject" → Enter reason → Status changes to "Rejected" (red)
10. Trust score updates automatically via database trigger

---

### 3. Real-Time Updates

When admin approves/rejects:
1. Database trigger fires
2. Supabase Realtime sends event
3. Member's app shows notification
4. Payment history updates instantly (no refresh needed)

**Implementation:**
```dart
// In PaluwagangDetailScreen
@override
void initState() {
  super.initState();
  _subscription = paymentService.subscribeToPaymentProofs(
    groupId: widget.groupId,
    onUpdate: (data) {
      setState(() {
        // Refresh payment history
      });
    },
  );
}
```

---

## 📊 Database Tables You'll Use

### `paluwagan_groups`
Stores group info (name, target amount, duration, admin)

### `paluwagan_members`
Stores who's in each group (trust score, payout order)

### `payment_proofs`
Stores all payment submissions (status, image URL, reference number)

### `payment_verification_history`
Audit trail (who approved/rejected when)

### `trust_score_history`
Track how trust scores change over time

### `notifications`
Push notifications (payment approved, rejected, reminder)

---

## 🔐 Security

### Already Configured in Schema:

1. **Row Level Security (RLS)**
   - Users can only see groups they're in
   - Only admins can approve/reject proofs
   - Members can only submit their own proofs

2. **Storage Policies**
   - Users can upload to their own folder
   - Users can view proofs in their groups
   - Private bucket (signed URLs only)

3. **Database Triggers**
   - Trust scores update automatically
   - Verification history logged automatically
   - Notifications sent automatically

**You don't need to implement these - they're already done!**

---

## 🧪 Testing Strategy

### Manual Testing Checklist:

**Member Flow:**
- [ ] Sign up new account
- [ ] Join/view demo groups
- [ ] Submit payment proof (use test image)
- [ ] Verify proof shows as "Pending"
- [ ] Receive notification when approved/rejected

**Admin Flow:**
- [ ] View group as admin
- [ ] See pending badge count
- [ ] Open Admin Panel
- [ ] Approve a proof
- [ ] Reject a proof with reason
- [ ] Verify trust score updated

**Edge Cases:**
- [ ] No internet connection (show error)
- [ ] Image upload fails (retry mechanism)
- [ ] Proof already submitted for month (show error)
- [ ] Non-admin tries to approve (RLS blocks it)

---

## 📱 Platform-Specific Notes

### iOS
- Request photo library permission
- Handle camera permission
- Test on iPhone SE (small screen)
- Test on iPhone 14 Pro Max (large screen)

### Android
- Request storage permission
- Handle file picker
- Test on different Android versions (11+)
- Test on various screen sizes

---

## 🆘 Common Issues & Solutions

### Issue: "RLS policy violation"
**Solution:** User not authenticated or trying to access data they don't own
- Check: `SupabaseConfig.currentUserId` is not null
- Check: User is member of the group

### Issue: "Storage upload failed"
**Solution:** Bucket not created or RLS policy wrong
- Create "payment-proofs" bucket
- Set to private
- Add storage policies from MOBILE_SETUP_GUIDE.md

### Issue: "Payment proof not showing"
**Solution:** Realtime subscription not set up
- Check: `subscribeToPaymentProofs()` called in initState
- Check: Subscription disposed in dispose()

---

## 📞 Getting Help

### Reference Files:

1. **Database Questions** → `supabase-schema.sql` (see comments)
2. **API Questions** → `src/app/lib/supabase/paymentVerification.ts`
3. **UI Reference** → `src/app/components/` (React components)
4. **Setup Questions** → `MOBILE_SETUP_GUIDE.md`
5. **Code Templates** → `FLUTTER_IMPLEMENTATION_GUIDE.md`

### Web App Running Locally:

```bash
cd src
npm install
npm run dev
# Open http://localhost:5173
```

Use this to:
- See exact UI/UX
- Test workflows
- Understand user flows
- Copy design details

---

## ✅ Definition of Done

Your app is ready when:

- [ ] Authentication works (signup, login, logout)
- [ ] User can view their Paluwagan groups
- [ ] Demo goals ("Barkada Savings" & "Family Fund") visible
- [ ] Member can submit payment proof with image
- [ ] Proof shows in payment history as "Pending"
- [ ] Admin can view pending proofs
- [ ] Admin can approve/reject with reason
- [ ] Trust score updates automatically
- [ ] Real-time updates work (no refresh needed)
- [ ] Error states handled gracefully
- [ ] Loading states shown during operations
- [ ] Works on iOS and Android
- [ ] Matches web app design

---

## 🎉 You're All Set!

### Your toolkit:
- ✅ Production-ready database schema
- ✅ Complete API reference (TypeScript)
- ✅ Flutter foundation code (models + services)
- ✅ Comprehensive documentation
- ✅ Design system
- ✅ Testing checklist

### Estimated timeline:
- **Week 1:** Auth + Navigation + Goals List = **60%** complete
- **Week 2:** Payment Submission = **80%** complete
- **Week 3:** Admin Approval = **95%** complete
- **Week 4:** Polish + Testing = **100%** complete

**Start with Phase 1 and work your way through. You got this!** 💪

---

**Questions?** Check the reference docs or review the web app code for examples.

**Happy coding!** 🚀
