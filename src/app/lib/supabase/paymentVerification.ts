/**
 * Payment Verification System - Supabase API Functions
 *
 * This file contains all the API functions for interacting with the
 * payment verification system in Supabase.
 *
 * Prerequisites:
 * 1. Run supabase-schema.sql in your Supabase SQL Editor
 * 2. Set up Supabase Storage bucket named "payment-proofs"
 * 3. Configure SUPABASE_URL and SUPABASE_ANON_KEY in your environment
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Replace with your actual Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// TYPES
// ============================================================

export interface PaymentProof {
  id: string;
  group_id: string;
  member_id: string;
  amount: number;
  payment_date: string;
  month_index: number;
  reference_number: string;
  proof_image_url: string;
  proof_image_path: string;
  status: 'pending' | 'approved' | 'rejected';
  verified_by_user_id?: string;
  verified_at?: string;
  rejection_reason?: string;
  submitted_at: string;
}

export interface PaluwagangMember {
  id: string;
  group_id: string;
  user_id: string;
  payout_order: number;
  trust_score: number;
  penalty_count: number;
  payment_gateway_type?: 'gcash' | 'maya' | 'bank';
  payment_gateway_account_name?: string;
  payment_gateway_account_number?: string;
  is_active: boolean;
  joined_at: string;
}

// ============================================================
// MEMBER FUNCTIONS
// ============================================================

/**
 * Submit a payment proof
 *
 * @param groupId - Paluwagan group ID
 * @param memberId - Member ID
 * @param proofData - Payment proof details
 * @returns The created payment proof record
 */
export async function submitPaymentProof(
  groupId: string,
  memberId: string,
  proofData: {
    image: File;
    amount: number;
    paymentDate: string;
    monthIndex: number;
    referenceNumber: string;
  }
) {
  try {
    // 1. Upload image to Supabase Storage
    const fileExt = proofData.image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${groupId}/${memberId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, proofData.image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 2. Get public URL
    const { data: urlData } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(filePath);

    // 3. Create payment proof record
    const { data, error } = await supabase
      .from('payment_proofs')
      .insert({
        group_id: groupId,
        member_id: memberId,
        amount: proofData.amount,
        payment_date: proofData.paymentDate,
        month_index: proofData.monthIndex,
        reference_number: proofData.referenceNumber,
        proof_image_url: urlData.publicUrl,
        proof_image_path: filePath,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // 4. Create notification for admin
    const { data: groupData } = await supabase
      .from('paluwagan_groups')
      .select('admin_user_id')
      .eq('id', groupId)
      .single();

    if (groupData) {
      await supabase.from('notifications').insert({
        user_id: groupData.admin_user_id,
        type: 'payment_submitted',
        title: 'New Payment Proof Submitted',
        message: `A member has submitted a payment proof for review.`,
        group_id: groupId,
        payment_proof_id: data.id,
      });
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error submitting payment proof:', error);
    return { data: null, error };
  }
}

/**
 * Get payment history for a member
 */
export async function getMemberPaymentHistory(
  groupId: string,
  memberId: string
) {
  const { data, error } = await supabase
    .from('payment_proofs')
    .select('*')
    .eq('group_id', groupId)
    .eq('member_id', memberId)
    .order('month_index', { ascending: false });

  return { data, error };
}

/**
 * Get member's trust score history
 */
export async function getTrustScoreHistory(memberId: string) {
  const { data, error } = await supabase
    .from('trust_score_history')
    .select('*')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(10);

  return { data, error };
}

// ============================================================
// ADMIN FUNCTIONS
// ============================================================

/**
 * Get all pending payment proofs for a group
 */
export async function getPendingPaymentProofs(groupId: string) {
  const { data, error } = await supabase
    .from('payment_proofs')
    .select(`
      *,
      paluwagan_members (
        id,
        user_id,
        payout_order,
        trust_score
      )
    `)
    .eq('group_id', groupId)
    .eq('status', 'pending')
    .order('submitted_at', { ascending: true });

  return { data, error };
}

/**
 * Approve a payment proof
 */
export async function approvePaymentProof(
  proofId: string,
  adminUserId: string
) {
  try {
    // 1. Update payment proof status
    const { data, error } = await supabase
      .from('payment_proofs')
      .update({
        status: 'approved',
        verified_by_user_id: adminUserId,
        verified_at: new Date().toISOString(),
      })
      .eq('id', proofId)
      .select()
      .single();

    if (error) throw error;

    // 2. Get member info to send notification
    const { data: memberData } = await supabase
      .from('paluwagan_members')
      .select('user_id')
      .eq('id', data.member_id)
      .single();

    if (memberData) {
      await supabase.from('notifications').insert({
        user_id: memberData.user_id,
        type: 'payment_approved',
        title: '✅ Payment Approved!',
        message: `Your payment proof for ₱${data.amount.toLocaleString()} has been verified and approved.`,
        payment_proof_id: proofId,
      });
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error approving payment:', error);
    return { data: null, error };
  }
}

/**
 * Reject a payment proof
 */
export async function rejectPaymentProof(
  proofId: string,
  adminUserId: string,
  rejectionReason: string
) {
  try {
    // 1. Update payment proof status
    const { data, error } = await supabase
      .from('payment_proofs')
      .update({
        status: 'rejected',
        verified_by_user_id: adminUserId,
        verified_at: new Date().toISOString(),
        rejection_reason: rejectionReason,
      })
      .eq('id', proofId)
      .select()
      .single();

    if (error) throw error;

    // 2. Get member info to send notification
    const { data: memberData } = await supabase
      .from('paluwagan_members')
      .select('user_id')
      .eq('id', data.member_id)
      .single();

    if (memberData) {
      await supabase.from('notifications').insert({
        user_id: memberData.user_id,
        type: 'payment_rejected',
        title: '❌ Payment Proof Rejected',
        message: `Your payment proof was rejected. Reason: ${rejectionReason}`,
        payment_proof_id: proofId,
      });
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error rejecting payment:', error);
    return { data: null, error };
  }
}

/**
 * Get all payment proofs for a group (for admin view)
 */
export async function getAllGroupPaymentProofs(groupId: string) {
  const { data, error } = await supabase
    .from('payment_proofs')
    .select(`
      *,
      paluwagan_members (
        id,
        user_id,
        payout_order,
        trust_score
      )
    `)
    .eq('group_id', groupId)
    .order('submitted_at', { ascending: false });

  return { data, error };
}

/**
 * Batch approve multiple payment proofs
 */
export async function batchApprovePayments(
  proofIds: string[],
  adminUserId: string
) {
  const results = await Promise.all(
    proofIds.map(id => approvePaymentProof(id, adminUserId))
  );

  const successful = results.filter(r => !r.error).length;
  const failed = results.filter(r => r.error).length;

  return {
    successful,
    failed,
    results,
  };
}

// ============================================================
// NOTIFICATION FUNCTIONS
// ============================================================

/**
 * Get user notifications
 */
export async function getUserNotifications(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .update({
        is_read: true,
      read_at: new Date().toISOString(),
    })
    .eq('id', notificationId);

  return { data, error };
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string) {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  return { count, error };
}

// ============================================================
// DISPUTE FUNCTIONS
// ============================================================

/**
 * Create a payment dispute
 */
export async function createPaymentDispute(
  proofId: string,
  userId: string,
  disputeData: {
    type: string;
    description: string;
  }
) {
  const { data, error } = await supabase
    .from('payment_disputes')
    .insert({
      payment_proof_id: proofId,
      raised_by_user_id: userId,
      dispute_type: disputeData.type,
      description: disputeData.description,
      status: 'open',
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Resolve a payment dispute
 */
export async function resolvePaymentDispute(
  disputeId: string,
  adminUserId: string,
  resolutionNotes: string
) {
  const { data, error } = await supabase
    .from('payment_disputes')
    .update({
      status: 'resolved',
      resolved_by_user_id: adminUserId,
      resolution_notes: resolutionNotes,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', disputeId);

  return { data, error };
}

// ============================================================
// ANALYTICS FUNCTIONS
// ============================================================

/**
 * Get payment verification statistics for a group
 */
export async function getGroupPaymentStats(groupId: string) {
  const { data: allProofs } = await supabase
    .from('payment_proofs')
    .select('status, amount, submitted_at, verified_at')
    .eq('group_id', groupId);

  if (!allProofs) return null;

  const stats = {
    total: allProofs.length,
    approved: allProofs.filter(p => p.status === 'approved').length,
    pending: allProofs.filter(p => p.status === 'pending').length,
    rejected: allProofs.filter(p => p.status === 'rejected').length,
    totalAmount: allProofs
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0),
    averageVerificationTime: calculateAverageVerificationTime(allProofs),
  };

  return stats;
}

function calculateAverageVerificationTime(proofs: any[]) {
  const verifiedProofs = proofs.filter(
    p => p.verified_at && p.submitted_at
  );

  if (verifiedProofs.length === 0) return 0;

  const totalMs = verifiedProofs.reduce((sum, p) => {
    const submitted = new Date(p.submitted_at).getTime();
    const verified = new Date(p.verified_at).getTime();
    return sum + (verified - submitted);
  }, 0);

  // Return average in hours
  return Math.round((totalMs / verifiedProofs.length) / (1000 * 60 * 60));
}

// ============================================================
// REAL-TIME SUBSCRIPTIONS
// ============================================================

/**
 * Subscribe to payment proof changes for a group
 *
 * Usage:
 * const subscription = subscribeToPaymentProofs(groupId, (payload) => {
 *   console.log('Payment proof updated:', payload);
 * });
 *
 * // Cleanup
 * subscription.unsubscribe();
 */
export function subscribeToPaymentProofs(
  groupId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`payment-proofs-${groupId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'payment_proofs',
        filter: `group_id=eq.${groupId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to notifications for a user
 */
export function subscribeToNotifications(
  userId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`notifications-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}
