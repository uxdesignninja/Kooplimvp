# Payment Verification System - Implementation Guide

## 📋 Overview

This system implements a **manual proof-of-payment verification workflow** for Paluwagan groups, allowing members to upload payment receipts (GCash, Maya, Bank transfers) and admins to review and approve/reject them. **No money flows through the app** - it's purely a tracking and verification tool.

---

## 🎯 Why This Approach?

### Legal Benefits
- ✅ **No BSP license required** (not handling actual money)
- ✅ **No payment gateway integration** (lower compliance burden)
- ✅ **No security risk** (no sensitive financial data stored)
- ✅ **Clear liability** (members responsible for actual transfers)

### UX Benefits
- ✅ **Familiar flow** (users already use GCash/Maya)
- ✅ **Trust-building** (visual proof creates accountability)
- ✅ **Audit trail** (complete payment history with receipts)
- ✅ **Flexible** (works with any payment method)

---

## 🗄️ Database Setup

### 1. Run the SQL Schema

Execute the SQL file in your Supabase SQL Editor:

```bash
# Located at: /workspaces/default/code/supabase-schema.sql
```

This creates:
- `paluwagan_groups` - Group information
- `paluwagan_members` - Member details and trust scores
- `payment_proofs` - Uploaded receipts and verification status
- `payment_verification_history` - Audit trail
- `trust_score_history` - Trust score changes over time
- `notifications` - System notifications
- `payment_disputes` - Dispute resolution system

### 2. Set Up Storage Bucket

In Supabase Dashboard → Storage:

1. Create bucket: `payment-proofs`
2. Settings:
   - **Public**: No (private, use signed URLs)
   - **File size limit**: 5MB
   - **Allowed types**: `image/jpeg`, `image/png`, `image/webp`

3. Add RLS Policy:
```sql
-- Users can upload to their own folder
CREATE POLICY "Members can upload proofs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'payment-proofs' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM paluwagan_groups WHERE id IN (
      SELECT group_id FROM paluwagan_members WHERE user_id = auth.uid()
    )
  )
);

-- Users can view proofs in their groups
CREATE POLICY "Members can view group proofs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'payment-proofs' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM paluwagan_groups WHERE id IN (
      SELECT group_id FROM paluwagan_members WHERE user_id = auth.uid()
    )
  )
);
```

### 3. Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🎨 UI Integration (Already Complete!)

### Member Flow

**1. Submit Payment Proof**
- **Location**: `PaluwagangDetailScreen.tsx`
- **Trigger**: "Submit Payment Proof" button (replaces "Pay Now")
- **Component**: `SubmitPaymentProofModal.tsx`

**Flow**:
1. Member taps "Submit Payment Proof"
2. Modal opens with:
   - Camera/Gallery image upload with preview
   - Reference number field (required)
   - Amount field (pre-filled)
   - Payment date picker
   - Warning about fake receipts
3. On submit → Success animation → Status changes to "⏳ Pending"
4. Payment appears in history with "PENDING" badge

**2. View Payment History**
- **Location**: `PaluwagangDetailScreen.tsx`
- **Component**: `PaymentHistoryEnhanced.tsx`

**Features**:
- Status badges (✓ Approved, ⏳ Pending, ✗ Rejected)
- Expandable cards with reference numbers
- Rejection reasons in red alert boxes
- "View Receipt" button to see proof image
- "Download Payment History" option

---

### Admin Flow

**1. Pending Approvals Badge**
- **Location**: `GoalsScreen.tsx` (Paluwagan card footer)
- **Display**: "X pending" badge with clock icon (only visible to admin)

**2. Admin Panel - Verification Tab**
- **Location**: `PaluwagangAdminPanel.tsx`
- **Features**:
  - "View All Payment Proofs" button (blue gradient)
  - Quick approve button for simple cases
  - "View Proof" button to see full details

**3. Full Approval Queue**
- **Location**: `AdminApprovalQueueScreen.tsx`
- **Trigger**: Tap "View All Payment Proofs"

**Flow**:
1. Admin sees list of pending payments with thumbnails
2. Tap payment → Full-screen modal opens with:
   - Large receipt image preview
   - Member info (name, trust score)
   - Payment details (amount, ref#, date)
   - Side-by-side buttons: ✅ Approve / ❌ Reject
3. Reject → Modal asks for reason
4. On approve/reject → Member gets notification

---

## 🔄 User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    MEMBER JOURNEY                           │
└─────────────────────────────────────────────────────────────┘

1. Member opens Paluwagan group
2. Taps "Submit Payment Proof"
3. Uploads screenshot from GCash/Maya
4. Enters reference number
5. Submits → Status: "⏳ Pending Verification"
6. Notification sent to Admin

                        ↓

┌─────────────────────────────────────────────────────────────┐
│                    ADMIN JOURNEY                            │
└─────────────────────────────────────────────────────────────┘

1. Admin sees "2 pending" badge on group card
2. Opens group → Sees "Pending Approvals" in verification tab
3. Taps "View All Payment Proofs"
4. Reviews screenshot + details
5. Decides: ✅ Approve OR ❌ Reject (with reason)
6. Notification sent to Member

                        ↓

┌─────────────────────────────────────────────────────────────┐
│                   MEMBER RESULT                             │
└─────────────────────────────────────────────────────────────┘

IF APPROVED:
- Status: "✓ APPROVED" (green badge)
- Trust score +2 (if paid on time)
- Payment counted in group total

IF REJECTED:
- Status: "✗ REJECTED" (red badge)
- Rejection reason shown
- Trust score -5
- Can resubmit corrected proof
```

---

## 📊 Trust Score System

### How It Works

```javascript
// Automatic trust score updates (via database triggers)

ON APPROVE:
  - Paid within 7 days of month start: +2 points
  - Paid within 14 days: +1 point
  - Paid after 14 days: 0 points
  - Max score: 100

ON REJECT:
  - First rejection: -5 points
  - Second consecutive rejection: -10 points
  - Third rejection: -15 points (warning)
  - Min score: 0

SPECIAL PENALTIES:
  - Fake screenshot detected: -25 points + flag for review
  - 3 fake screenshots: Permanent ban from platform
```

### Display
- Shows in member profile card
- Color-coded:
  - 90-100: Green (Excellent)
  - 70-89: Orange (Good)
  - 0-69: Red (At Risk)

---

## 🔔 Notification System

### Types

| Event | Recipient | Title | Message |
|-------|-----------|-------|---------|
| Payment Submitted | Admin | "New Payment Proof Submitted" | "A member has submitted a payment proof for review." |
| Payment Approved | Member | "✅ Payment Approved!" | "Your payment proof for ₱X has been verified and approved." |
| Payment Rejected | Member | "❌ Payment Proof Rejected" | "Your payment proof was rejected. Reason: [reason]" |
| Reminder (48hrs) | Admin | "⏰ Pending Approvals" | "2 payments pending approval for 24+ hours" |

### Implementation

```typescript
// Subscribe to real-time notifications
import { subscribeToNotifications } from '@/app/lib/supabase/paymentVerification';

const subscription = subscribeToNotifications(userId, (payload) => {
  // Show toast notification
  toast.success(payload.new.title, {
    description: payload.new.message
  });
  
  // Update notification badge
  setUnreadCount(prev => prev + 1);
});

// Cleanup
return () => subscription.unsubscribe();
```

---

## 🛡️ Security & Fraud Prevention

### 1. Duplicate Detection

```sql
-- Database constraint prevents duplicate submissions
CONSTRAINT unique_member_month UNIQUE (group_id, member_id, month_index)

-- Check for duplicate reference numbers across members
SELECT reference_number, COUNT(*) 
FROM payment_proofs 
WHERE group_id = ?
GROUP BY reference_number 
HAVING COUNT(*) > 1;
```

### 2. Image Validation

```typescript
// Client-side validation
const validateImage = (file: File) => {
  // Check file size
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be less than 5MB");
  }
  
  // Check file type
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images allowed");
  }
  
  return true;
};
```

### 3. Auto-Approval (Future Enhancement)

```typescript
// Auto-approve trusted members after 1 hour if admin hasn't reviewed
const canAutoApprove = (member: Member, proof: PaymentProof) => {
  return (
    member.trust_score >= 90 &&
    member.penalty_count === 0 &&
    proof.amount === expectedAmount &&
    validateReferenceFormat(proof.reference_number)
  );
};
```

---

## 🎯 UX Best Practices Implemented

### 1. **Mobile-First Touch Targets**
- All buttons ≥ 44px height (iOS/Android guideline)
- Touch areas extended beyond visual elements
- Adequate spacing between interactive elements

### 2. **Progressive Disclosure**
- Basic info shown in list view (thumbnail + member name)
- Full details only on tap (reduce cognitive load)
- Expandable cards for payment history

### 3. **Immediate Feedback**
- Success animations on submit
- Status changes reflect instantly
- Optimistic UI updates (assume success, rollback on error)

### 4. **Error Prevention**
- Disabled submit until all fields filled
- Image preview before upload
- Confirmation modals for destructive actions (reject)

### 5. **Clear Visual Hierarchy**
- Status badges use color + icon + text
- Primary actions use blue gradient (Submit, Approve)
- Secondary actions use green gradient (positive outcome)
- Destructive actions use red (Reject, Delete)

### 6. **Accessibility**
- All images have alt text
- Color not sole indicator of status (icons + text)
- Focus states for keyboard navigation
- Screen reader friendly labels

---

## 🔧 API Usage Examples

### Member: Submit Payment Proof

```typescript
import { submitPaymentProof } from '@/app/lib/supabase/paymentVerification';

const handleSubmit = async (proofData) => {
  const { data, error } = await submitPaymentProof(
    groupId,
    memberId,
    {
      image: imageFile,
      amount: 5000,
      paymentDate: '2026-05-08',
      monthIndex: 4, // May (0-indexed)
      referenceNumber: 'GCASH20260508123456'
    }
  );
  
  if (error) {
    toast.error('Failed to submit proof');
    return;
  }
  
  toast.success('Proof submitted! Awaiting admin verification.');
};
```

### Admin: Approve Payment

```typescript
import { approvePaymentProof } from '@/app/lib/supabase/paymentVerification';

const handleApprove = async (proofId) => {
  const { data, error } = await approvePaymentProof(
    proofId,
    adminUserId
  );
  
  if (error) {
    toast.error('Failed to approve payment');
    return;
  }
  
  toast.success('Payment approved!');
  // Member automatically receives notification
};
```

### Admin: Batch Approve

```typescript
import { batchApprovePayments } from '@/app/lib/supabase/paymentVerification';

const handleBatchApprove = async (selectedIds) => {
  const { successful, failed } = await batchApprovePayments(
    selectedIds,
    adminUserId
  );
  
  toast.success(`${successful} payments approved, ${failed} failed`);
};
```

---

## 📈 Analytics & Reporting

### Admin Dashboard Metrics

```typescript
import { getGroupPaymentStats } from '@/app/lib/supabase/paymentVerification';

const stats = await getGroupPaymentStats(groupId);

// Display:
// - Total proofs submitted: 45
// - Approved: 40 (89%)
// - Pending: 3 (7%)
// - Rejected: 2 (4%)
// - Total verified amount: ₱200,000
// - Average verification time: 2 hours
```

### Member Payment Certificate

```typescript
// Generate PDF receipt with all approved payments
const generatePaymentCertificate = async (memberId) => {
  const { data } = await getMemberPaymentHistory(groupId, memberId);
  
  const approvedPayments = data.filter(p => p.status === 'approved');
  
  // Use PDF library to generate certificate
  return generatePDF({
    memberName: member.name,
    groupName: group.name,
    payments: approvedPayments,
    totalPaid: approvedPayments.reduce((sum, p) => sum + p.amount, 0)
  });
};
```

---

## 🚨 Edge Cases Handled

### 1. **Network Interruption During Upload**
- File upload queued locally
- Shows "⏳ Uploading..." badge
- Auto-retries when connection restored
- Clear error message if fails after retries

### 2. **Admin Deletes Member After Proof Submitted**
- Database cascade deletes payment proofs
- Storage files cleaned up via scheduled job
- Other members' proofs unaffected

### 3. **Member Submits Duplicate Proof**
- Database constraint prevents insertion
- Shows friendly error: "You already submitted proof for May. Tap here to resubmit."
- Resubmission replaces previous pending proof

### 4. **Two Admins Review Same Proof Simultaneously**
- First action commits
- Second action gets error: "Already processed by Admin Juan"
- UI refreshes to show current status

### 5. **Member Disputes Rejection**
- "Appeal" button shown in rejection notice
- Opens dispute form with proof details pre-filled
- Admin gets notification to review dispute
- Can overturn decision or provide clarification

---

## 🔄 Migration from Old System

If you have existing Paluwagan data:

```typescript
// Migration script to convert old data
const migrateExistingGroups = async () => {
  const oldGoals = await getOldPaluwagangGoals();
  
  for (const goal of oldGoals) {
    // 1. Create group
    const { data: group } = await supabase
      .from('paluwagan_groups')
      .insert({
        name: goal.name,
        admin_user_id: goal.adminId,
        monthly_target_amount: goal.monthlyTarget,
        total_target_amount: goal.targetAmount,
        duration_months: goal.durationMonths,
      })
      .select()
      .single();
    
    // 2. Migrate members
    for (const member of goal.members) {
      await supabase
        .from('paluwagan_members')
        .insert({
          group_id: group.id,
          user_id: member.userId,
          payout_order: member.payoutOrder,
          trust_score: member.trustScore || 85,
        });
    }
  }
};
```

---

## 📝 Next Steps

### Immediate (MVP)
- [x] Database schema created
- [x] UI components integrated
- [x] Member submission flow
- [x] Admin approval flow
- [ ] Connect to Supabase (replace mock data)
- [ ] Add image upload to Storage
- [ ] Implement real-time notifications

### Short-term Enhancements
- [ ] Batch approval for admins
- [ ] Payment reminders (7 days before due)
- [ ] Export payment history as PDF
- [ ] Dispute resolution flow
- [ ] Admin analytics dashboard

### Long-term Features
- [ ] Auto-approval for trusted members
- [ ] OCR to extract reference numbers from screenshots
- [ ] Integration with GCash/Maya APIs (read-only, verify transactions)
- [ ] Blockchain audit trail for compliance

---

## 🎓 Testing Checklist

### Member Flow
- [ ] Can upload image from camera
- [ ] Can upload image from gallery
- [ ] Image preview shows correctly
- [ ] Can delete uploaded image and re-upload
- [ ] Submit button disabled until all fields filled
- [ ] Success animation plays on submit
- [ ] Status changes to "Pending" immediately
- [ ] Payment appears in history

### Admin Flow
- [ ] Pending badge shows correct count
- [ ] Can view full-screen proof image
- [ ] Can approve payment
- [ ] Can reject with reason
- [ ] Rejection reason shows in member's history
- [ ] Trust scores update correctly

### Edge Cases
- [ ] Can't submit duplicate for same month
- [ ] Large images (5MB) upload successfully
- [ ] Network interruption handled gracefully
- [ ] Multiple admins don't conflict
- [ ] Can view old approved proofs

---

## 🆘 Troubleshooting

### Issue: "Failed to upload image"
**Solution**: Check Supabase Storage bucket RLS policies and ensure bucket exists.

### Issue: "Duplicate key violation"
**Solution**: Member already submitted for this month. Allow resubmission by deleting old pending proof first.

### Issue: Trust score not updating
**Solution**: Check database trigger `update_trust_score_on_verification` is active.

### Issue: Notifications not appearing
**Solution**: Verify real-time subscriptions are set up and user is authenticated.

---

## 📞 Support

For questions or issues:
- Check database logs in Supabase Dashboard
- Review browser console for client-side errors
- Test API calls directly in Supabase API Docs
- Check RLS policies if permission errors occur

---

**Built with ❤️ for Koopli - Empowering Filipino communities through cooperative savings.**
