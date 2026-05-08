-- ============================================================
-- KOOPLI PALUWAGAN - PAYMENT VERIFICATION SYSTEM
-- Database Schema for Supabase
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PALUWAGAN GROUPS
-- ============================================================
CREATE TABLE paluwagan_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  admin_user_id UUID NOT NULL, -- References auth.users

  -- Financial settings
  monthly_target_amount DECIMAL(10, 2) NOT NULL,
  total_target_amount DECIMAL(10, 2) NOT NULL,
  duration_months INTEGER NOT NULL,

  -- Penalty settings
  penalty_enabled BOOLEAN DEFAULT false,
  penalty_amount DECIMAL(10, 2) DEFAULT 0,
  late_payment_grace_days INTEGER DEFAULT 3,

  -- Status
  is_active BOOLEAN DEFAULT true,
  status VARCHAR(50) DEFAULT 'active', -- active, paused, completed, closed

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Indexes
  CONSTRAINT fk_admin FOREIGN KEY (admin_user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_paluwagan_groups_admin ON paluwagan_groups(admin_user_id);
CREATE INDEX idx_paluwagan_groups_status ON paluwagan_groups(status);

-- ============================================================
-- 2. PALUWAGAN MEMBERS
-- ============================================================
CREATE TABLE paluwagan_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL,
  user_id UUID NOT NULL, -- References auth.users

  -- Payout settings
  payout_order INTEGER NOT NULL, -- 0-based index for rotation

  -- Trust & penalties
  trust_score INTEGER DEFAULT 85 CHECK (trust_score >= 0 AND trust_score <= 100),
  penalty_count INTEGER DEFAULT 0,

  -- Payment gateway for receiving payouts
  payment_gateway_type VARCHAR(50), -- gcash, maya, bank
  payment_gateway_account_name VARCHAR(255),
  payment_gateway_account_number VARCHAR(100),

  -- Status
  is_active BOOLEAN DEFAULT true,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES paluwagan_groups(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT unique_group_user UNIQUE (group_id, user_id),
  CONSTRAINT unique_group_payout_order UNIQUE (group_id, payout_order)
);

CREATE INDEX idx_paluwagan_members_group ON paluwagan_members(group_id);
CREATE INDEX idx_paluwagan_members_user ON paluwagan_members(user_id);
CREATE INDEX idx_paluwagan_members_trust ON paluwagan_members(trust_score);

-- ============================================================
-- 3. PAYMENT PROOFS
-- ============================================================
CREATE TABLE payment_proofs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL,
  member_id UUID NOT NULL,

  -- Payment details
  amount DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL,
  month_index INTEGER NOT NULL, -- 0-11 for which month of the cycle
  reference_number VARCHAR(255) NOT NULL,

  -- Proof file
  proof_image_url TEXT NOT NULL, -- Supabase Storage URL (encrypted)
  proof_image_path TEXT NOT NULL, -- Storage bucket path

  -- Verification status
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected

  -- Admin verification
  verified_by_user_id UUID, -- Admin who verified
  verified_at TIMESTAMPTZ,
  rejection_reason TEXT,

  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT fk_proof_group FOREIGN KEY (group_id) REFERENCES paluwagan_groups(id) ON DELETE CASCADE,
  CONSTRAINT fk_proof_member FOREIGN KEY (member_id) REFERENCES paluwagan_members(id) ON DELETE CASCADE,
  CONSTRAINT fk_verifier FOREIGN KEY (verified_by_user_id) REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT unique_member_month UNIQUE (group_id, member_id, month_index),
  CONSTRAINT check_amount_positive CHECK (amount > 0)
);

CREATE INDEX idx_payment_proofs_group ON payment_proofs(group_id);
CREATE INDEX idx_payment_proofs_member ON payment_proofs(member_id);
CREATE INDEX idx_payment_proofs_status ON payment_proofs(status);
CREATE INDEX idx_payment_proofs_month ON payment_proofs(month_index);
CREATE INDEX idx_payment_proofs_reference ON payment_proofs(reference_number);

-- ============================================================
-- 4. PAYMENT VERIFICATION HISTORY (Audit Trail)
-- ============================================================
CREATE TABLE payment_verification_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_proof_id UUID NOT NULL,

  -- Action details
  action VARCHAR(50) NOT NULL, -- submitted, approved, rejected, resubmitted
  performed_by_user_id UUID NOT NULL,

  -- Context
  previous_status VARCHAR(50),
  new_status VARCHAR(50),
  notes TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,

  CONSTRAINT fk_verification_proof FOREIGN KEY (payment_proof_id) REFERENCES payment_proofs(id) ON DELETE CASCADE,
  CONSTRAINT fk_verification_user FOREIGN KEY (performed_by_user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_verification_history_proof ON payment_verification_history(payment_proof_id);
CREATE INDEX idx_verification_history_user ON payment_verification_history(performed_by_user_id);
CREATE INDEX idx_verification_history_action ON payment_verification_history(action);

-- ============================================================
-- 5. TRUST SCORE HISTORY
-- ============================================================
CREATE TABLE trust_score_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL,

  -- Score change
  previous_score INTEGER NOT NULL,
  new_score INTEGER NOT NULL,
  change_amount INTEGER NOT NULL,

  -- Reason
  reason VARCHAR(255) NOT NULL,
  reason_category VARCHAR(50), -- on_time_payment, late_payment, rejection, fake_proof, etc.

  -- Related proof (if applicable)
  related_payment_proof_id UUID,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_trust_member FOREIGN KEY (member_id) REFERENCES paluwagan_members(id) ON DELETE CASCADE,
  CONSTRAINT fk_trust_proof FOREIGN KEY (related_payment_proof_id) REFERENCES payment_proofs(id) ON DELETE SET NULL
);

CREATE INDEX idx_trust_history_member ON trust_score_history(member_id);
CREATE INDEX idx_trust_history_category ON trust_score_history(reason_category);

-- ============================================================
-- 6. NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,

  -- Notification details
  type VARCHAR(50) NOT NULL, -- payment_submitted, payment_approved, payment_rejected, payment_reminder, etc.
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,

  -- Related entities
  group_id UUID,
  payment_proof_id UUID,

  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,

  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT fk_notification_group FOREIGN KEY (group_id) REFERENCES paluwagan_groups(id) ON DELETE CASCADE,
  CONSTRAINT fk_notification_proof FOREIGN KEY (payment_proof_id) REFERENCES payment_proofs(id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- ============================================================
-- 7. DISPUTES (For conflict resolution)
-- ============================================================
CREATE TABLE payment_disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_proof_id UUID NOT NULL,
  raised_by_user_id UUID NOT NULL,

  -- Dispute details
  dispute_type VARCHAR(50) NOT NULL, -- rejection_appeal, duplicate_reference, amount_mismatch, etc.
  description TEXT NOT NULL,

  -- Resolution
  status VARCHAR(50) DEFAULT 'open', -- open, investigating, resolved, closed
  resolved_by_user_id UUID,
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_dispute_proof FOREIGN KEY (payment_proof_id) REFERENCES payment_proofs(id) ON DELETE CASCADE,
  CONSTRAINT fk_dispute_raiser FOREIGN KEY (raised_by_user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT fk_dispute_resolver FOREIGN KEY (resolved_by_user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_disputes_proof ON payment_disputes(payment_proof_id);
CREATE INDEX idx_disputes_status ON payment_disputes(status);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_paluwagan_groups_updated_at BEFORE UPDATE ON paluwagan_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paluwagan_members_updated_at BEFORE UPDATE ON paluwagan_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_proofs_updated_at BEFORE UPDATE ON payment_proofs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create verification history on payment proof status change
CREATE OR REPLACE FUNCTION create_verification_history()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO payment_verification_history (
      payment_proof_id,
      action,
      performed_by_user_id,
      previous_status,
      new_status,
      notes
    ) VALUES (
      NEW.id,
      NEW.status,
      COALESCE(NEW.verified_by_user_id, OLD.verified_by_user_id),
      OLD.status,
      NEW.status,
      NEW.rejection_reason
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payment_proof_status_change AFTER UPDATE ON payment_proofs
  FOR EACH ROW EXECUTE FUNCTION create_verification_history();

-- Auto-update trust score when payment is approved/rejected
CREATE OR REPLACE FUNCTION update_trust_score_on_verification()
RETURNS TRIGGER AS $$
DECLARE
  member_record RECORD;
  score_change INTEGER;
  change_reason VARCHAR(255);
BEGIN
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    -- Calculate score change based on payment timing
    IF NEW.payment_date <= (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '7 days')::DATE THEN
      score_change := 2; -- Bonus for paying within first week
      change_reason := 'Payment approved (on time)';
    ELSIF NEW.payment_date <= (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '14 days')::DATE THEN
      score_change := 1;
      change_reason := 'Payment approved (within 2 weeks)';
    ELSE
      score_change := 0;
      change_reason := 'Payment approved (late)';
    END IF;

    -- Update member trust score
    UPDATE paluwagan_members
    SET trust_score = LEAST(100, trust_score + score_change)
    WHERE id = NEW.member_id
    RETURNING * INTO member_record;

    -- Log trust score change
    IF score_change > 0 THEN
      INSERT INTO trust_score_history (
        member_id,
        previous_score,
        new_score,
        change_amount,
        reason,
        reason_category,
        related_payment_proof_id
      ) VALUES (
        NEW.member_id,
        member_record.trust_score - score_change,
        member_record.trust_score,
        score_change,
        change_reason,
        'on_time_payment',
        NEW.id
      );
    END IF;

  ELSIF NEW.status = 'rejected' AND OLD.status = 'pending' THEN
    -- Penalty for rejection
    score_change := -5;
    change_reason := 'Payment proof rejected';

    UPDATE paluwagan_members
    SET
      trust_score = GREATEST(0, trust_score + score_change),
      penalty_count = penalty_count + 1
    WHERE id = NEW.member_id
    RETURNING * INTO member_record;

    -- Log trust score change
    INSERT INTO trust_score_history (
      member_id,
      previous_score,
      new_score,
      change_amount,
      reason,
      reason_category,
      related_payment_proof_id
    ) VALUES (
      NEW.member_id,
      member_record.trust_score - score_change,
      member_record.trust_score,
      score_change,
      change_reason,
      'payment_rejected',
      NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trust_score AFTER UPDATE ON payment_proofs
  FOR EACH ROW EXECUTE FUNCTION update_trust_score_on_verification();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE paluwagan_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE paluwagan_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_verification_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_disputes ENABLE ROW LEVEL SECURITY;

-- Paluwagan Groups: Users can see groups they're members of or admins of
CREATE POLICY "Users can view their groups" ON paluwagan_groups
  FOR SELECT USING (
    auth.uid() = admin_user_id OR
    EXISTS (
      SELECT 1 FROM paluwagan_members
      WHERE group_id = paluwagan_groups.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their groups" ON paluwagan_groups
  FOR UPDATE USING (auth.uid() = admin_user_id);

-- Paluwagan Members: Users can see members in their groups
CREATE POLICY "Users can view members in their groups" ON paluwagan_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM paluwagan_members AS self
      WHERE self.group_id = paluwagan_members.group_id AND self.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can update their own record" ON paluwagan_members
  FOR UPDATE USING (user_id = auth.uid());

-- Payment Proofs: Members can submit, view own proofs; Admins can view all
CREATE POLICY "Members can view proofs in their groups" ON payment_proofs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM paluwagan_members
      WHERE group_id = payment_proofs.group_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Members can submit payment proofs" ON payment_proofs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM paluwagan_members
      WHERE id = payment_proofs.member_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update payment proofs" ON payment_proofs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM paluwagan_groups
      WHERE id = payment_proofs.group_id AND admin_user_id = auth.uid()
    )
  );

-- Notifications: Users can only see their own
CREATE POLICY "Users can view their notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- ============================================================
-- STORAGE BUCKETS (Execute via Supabase Dashboard or API)
-- ============================================================
-- Create a storage bucket for payment proofs:
-- Bucket name: payment-proofs
-- Public: false (private, signed URLs only)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp
--
-- RLS Policy for storage:
-- - Users can upload to: {group_id}/{member_id}/{proof_id}.{ext}
-- - Users can view: Only their own proofs or if they're in the group

-- ============================================================
-- SEED DATA (Optional - for testing)
-- ============================================================
-- Add sample data for testing the system
-- (Replace UUIDs with actual auth.users IDs from your app)

-- Example:
-- INSERT INTO paluwagan_groups (id, name, admin_user_id, monthly_target_amount, total_target_amount, duration_months)
-- VALUES (
--   uuid_generate_v4(),
--   'Test Paluwagan Group',
--   'your-admin-user-id',
--   5000.00,
--   60000.00,
--   12
-- );
