import 'dart:io';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/supabase_config.dart';
import '../models/payment_proof.dart';

/// Payment Verification Service
/// Handles all payment proof submission and verification operations
class PaymentService {
  final _supabase = SupabaseConfig.client;

  // ============================================================
  // MEMBER FUNCTIONS
  // ============================================================

  /// Submit a payment proof
  Future<PaymentProof?> submitPaymentProof({
    required String groupId,
    required String memberId,
    required File imageFile,
    required double amount,
    required DateTime paymentDate,
    required int monthIndex,
    required String referenceNumber,
  }) async {
    try {
      // 1. Upload image to Supabase Storage
      final fileName = '${DateTime.now().millisecondsSinceEpoch}.jpg';
      final filePath = '$groupId/$memberId/$fileName';

      await _supabase.storage.from('payment-proofs').upload(
            filePath,
            imageFile,
            fileOptions: const FileOptions(
              cacheControl: '3600',
              upsert: false,
            ),
          );

      // 2. Get public URL (signed URL for private bucket)
      final imageUrl = _supabase.storage
          .from('payment-proofs')
          .getPublicUrl(filePath);

      // 3. Create payment proof record
      final response = await _supabase
          .from('payment_proofs')
          .insert({
            'group_id': groupId,
            'member_id': memberId,
            'amount': amount,
            'payment_date': paymentDate.toIso8601String().split('T')[0],
            'month_index': monthIndex,
            'reference_number': referenceNumber,
            'proof_image_url': imageUrl,
            'proof_image_path': filePath,
            'status': 'pending',
          })
          .select()
          .single();

      return PaymentProof.fromJson(response);
    } on StorageException catch (e) {
      print('Storage error: ${e.message}');
      throw Exception('Failed to upload proof image: ${e.message}');
    } on PostgrestException catch (e) {
      print('Database error: ${e.message}');
      throw Exception('Failed to save payment proof: ${e.message}');
    } catch (e) {
      print('Unexpected error: $e');
      throw Exception('Failed to submit payment proof: $e');
    }
  }

  /// Get payment history for a member
  Future<List<PaymentProof>> getMemberPaymentHistory({
    required String groupId,
    required String memberId,
  }) async {
    try {
      final response = await _supabase
          .from('payment_proofs')
          .select()
          .eq('group_id', groupId)
          .eq('member_id', memberId)
          .order('month_index', ascending: false);

      return (response as List)
          .map((json) => PaymentProof.fromJson(json))
          .toList();
    } on PostgrestException catch (e) {
      print('Error fetching payment history: ${e.message}');
      return [];
    }
  }

  /// Get signed URL for viewing payment proof image
  Future<String> getPaymentProofSignedUrl(String filePath) async {
    try {
      final signedUrl = await _supabase.storage
          .from('payment-proofs')
          .createSignedUrl(filePath, 3600); // Valid for 1 hour

      return signedUrl;
    } catch (e) {
      print('Error getting signed URL: $e');
      throw Exception('Failed to load payment proof image');
    }
  }

  // ============================================================
  // ADMIN FUNCTIONS
  // ============================================================

  /// Get all pending payment proofs for a group (Admin only)
  Future<List<PaymentProof>> getPendingPaymentProofs(String groupId) async {
    try {
      final response = await _supabase
          .from('payment_proofs')
          .select('*')
          .eq('group_id', groupId)
          .eq('status', 'pending')
          .order('submitted_at', ascending: true);

      return (response as List)
          .map((json) => PaymentProof.fromJson(json))
          .toList();
    } on PostgrestException catch (e) {
      print('Error fetching pending proofs: ${e.message}');
      return [];
    }
  }

  /// Approve a payment proof (Admin only)
  Future<PaymentProof?> approvePaymentProof({
    required String proofId,
    required String adminUserId,
  }) async {
    try {
      final response = await _supabase
          .from('payment_proofs')
          .update({
            'status': 'approved',
            'verified_by_user_id': adminUserId,
            'verified_at': DateTime.now().toIso8601String(),
          })
          .eq('id', proofId)
          .select()
          .single();

      return PaymentProof.fromJson(response);
    } on PostgrestException catch (e) {
      print('Error approving payment: ${e.message}');
      throw Exception('Failed to approve payment: ${e.message}');
    }
  }

  /// Reject a payment proof (Admin only)
  Future<PaymentProof?> rejectPaymentProof({
    required String proofId,
    required String adminUserId,
    required String rejectionReason,
  }) async {
    try {
      final response = await _supabase
          .from('payment_proofs')
          .update({
            'status': 'rejected',
            'verified_by_user_id': adminUserId,
            'verified_at': DateTime.now().toIso8601String(),
            'rejection_reason': rejectionReason,
          })
          .eq('id', proofId)
          .select()
          .single();

      return PaymentProof.fromJson(response);
    } on PostgrestException catch (e) {
      print('Error rejecting payment: ${e.message}');
      throw Exception('Failed to reject payment: ${e.message}');
    }
  }

  /// Get all payment proofs for a group (Admin view)
  Future<List<PaymentProof>> getAllGroupPaymentProofs(String groupId) async {
    try {
      final response = await _supabase
          .from('payment_proofs')
          .select('*')
          .eq('group_id', groupId)
          .order('submitted_at', ascending: false);

      return (response as List)
          .map((json) => PaymentProof.fromJson(json))
          .toList();
    } on PostgrestException catch (e) {
      print('Error fetching all payment proofs: ${e.message}');
      return [];
    }
  }

  /// Batch approve multiple payment proofs
  Future<Map<String, int>> batchApprovePayments({
    required List<String> proofIds,
    required String adminUserId,
  }) async {
    int successful = 0;
    int failed = 0;

    for (final proofId in proofIds) {
      try {
        await approvePaymentProof(
          proofId: proofId,
          adminUserId: adminUserId,
        );
        successful++;
      } catch (e) {
        failed++;
      }
    }

    return {'successful': successful, 'failed': failed};
  }

  // ============================================================
  // REAL-TIME SUBSCRIPTIONS
  // ============================================================

  /// Subscribe to payment proof changes for a group
  RealtimeChannel subscribeToPaymentProofs({
    required String groupId,
    required Function(Map<String, dynamic>) onUpdate,
  }) {
    return _supabase
        .channel('payment-proofs-$groupId')
        .onPostgresChanges(
          event: PostgresChangeEvent.all,
          schema: 'public',
          table: 'payment_proofs',
          filter: PostgresChangeFilter(
            type: PostgresChangeFilterType.eq,
            column: 'group_id',
            value: groupId,
          ),
          callback: (payload) {
            onUpdate(payload.newRecord);
          },
        )
        .subscribe();
  }

  /// Unsubscribe from payment proof updates
  Future<void> unsubscribeFromPaymentProofs(RealtimeChannel channel) async {
    await _supabase.removeChannel(channel);
  }

  // ============================================================
  // ANALYTICS
  // ============================================================

  /// Get payment statistics for a group
  Future<Map<String, dynamic>> getGroupPaymentStats(String groupId) async {
    try {
      final proofs = await getAllGroupPaymentProofs(groupId);

      final approved = proofs.where((p) => p.status == PaymentStatus.approved);
      final pending = proofs.where((p) => p.status == PaymentStatus.pending);
      final rejected = proofs.where((p) => p.status == PaymentStatus.rejected);

      final totalAmount = approved.fold<double>(
        0,
        (sum, proof) => sum + proof.amount,
      );

      return {
        'total': proofs.length,
        'approved': approved.length,
        'pending': pending.length,
        'rejected': rejected.length,
        'totalAmount': totalAmount,
      };
    } catch (e) {
      print('Error calculating stats: $e');
      return {
        'total': 0,
        'approved': 0,
        'pending': 0,
        'rejected': 0,
        'totalAmount': 0.0,
      };
    }
  }
}
