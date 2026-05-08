import 'payment_proof.dart';

/// Paluwagan Member Model
class PaluwagangMember {
  final String id;
  final String groupId;
  final String userId;
  final int payoutOrder;
  final int trustScore;
  final int penaltyCount;

  // Payment gateway for receiving payouts
  final String? paymentGatewayType; // gcash, maya, bank
  final String? paymentGatewayAccountName;
  final String? paymentGatewayAccountNumber;

  // Status
  final bool isActive;
  final DateTime joinedAt;
  final DateTime? leftAt;

  // Metadata
  final DateTime createdAt;
  final DateTime updatedAt;

  // Payment history (populated from join)
  final List<PaymentProof>? paymentHistory;

  // User profile (if joined)
  final Map<String, dynamic>? userProfile;

  PaluwagangMember({
    required this.id,
    required this.groupId,
    required this.userId,
    required this.payoutOrder,
    this.trustScore = 85,
    this.penaltyCount = 0,
    this.paymentGatewayType,
    this.paymentGatewayAccountName,
    this.paymentGatewayAccountNumber,
    this.isActive = true,
    required this.joinedAt,
    this.leftAt,
    required this.createdAt,
    required this.updatedAt,
    this.paymentHistory,
    this.userProfile,
  });

  factory PaluwagangMember.fromJson(Map<String, dynamic> json) {
    return PaluwagangMember(
      id: json['id'] as String,
      groupId: json['group_id'] as String,
      userId: json['user_id'] as String,
      payoutOrder: json['payout_order'] as int,
      trustScore: json['trust_score'] as int? ?? 85,
      penaltyCount: json['penalty_count'] as int? ?? 0,
      paymentGatewayType: json['payment_gateway_type'] as String?,
      paymentGatewayAccountName: json['payment_gateway_account_name'] as String?,
      paymentGatewayAccountNumber: json['payment_gateway_account_number'] as String?,
      isActive: json['is_active'] as bool? ?? true,
      joinedAt: DateTime.parse(json['joined_at'] as String),
      leftAt: json['left_at'] != null
          ? DateTime.parse(json['left_at'] as String)
          : null,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      paymentHistory: json['payment_proofs'] != null
          ? (json['payment_proofs'] as List)
              .map((p) => PaymentProof.fromJson(p as Map<String, dynamic>))
              .toList()
          : null,
      userProfile: json['user_profile'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'group_id': groupId,
      'user_id': userId,
      'payout_order': payoutOrder,
      'trust_score': trustScore,
      'penalty_count': penaltyCount,
      'payment_gateway_type': paymentGatewayType,
      'payment_gateway_account_name': paymentGatewayAccountName,
      'payment_gateway_account_number': paymentGatewayAccountNumber,
      'is_active': isActive,
      'joined_at': joinedAt.toIso8601String(),
      'left_at': leftAt?.toIso8601String(),
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// Get display name from user profile or fallback
  String get displayName {
    if (userProfile != null && userProfile!.containsKey('full_name')) {
      return userProfile!['full_name'] as String;
    }
    return 'Member #${payoutOrder + 1}';
  }

  /// Calculate total contributed amount
  double get totalContributed {
    if (paymentHistory == null) return 0;
    return paymentHistory!
        .where((p) => p.status == PaymentStatus.approved)
        .fold<double>(0, (sum, proof) => sum + proof.amount);
  }

  /// Check if member has pending payment proof
  bool get hasPendingProof {
    if (paymentHistory == null) return false;
    return paymentHistory!.any((p) => p.status == PaymentStatus.pending);
  }

  /// Get trust score color
  String get trustScoreColor {
    if (trustScore >= 90) return '#4CAF50'; // Green
    if (trustScore >= 70) return '#FFA726'; // Orange
    return '#EF4444'; // Red
  }

  /// Get trust score label
  String get trustScoreLabel {
    if (trustScore >= 90) return 'Excellent';
    if (trustScore >= 70) return 'Good';
    if (trustScore >= 50) return 'Fair';
    return 'Poor';
  }

  PaluwagangMember copyWith({
    int? trustScore,
    int? penaltyCount,
    String? paymentGatewayType,
    String? paymentGatewayAccountName,
    String? paymentGatewayAccountNumber,
    bool? isActive,
    List<PaymentProof>? paymentHistory,
  }) {
    return PaluwagangMember(
      id: id,
      groupId: groupId,
      userId: userId,
      payoutOrder: payoutOrder,
      trustScore: trustScore ?? this.trustScore,
      penaltyCount: penaltyCount ?? this.penaltyCount,
      paymentGatewayType: paymentGatewayType ?? this.paymentGatewayType,
      paymentGatewayAccountName: paymentGatewayAccountName ?? this.paymentGatewayAccountName,
      paymentGatewayAccountNumber: paymentGatewayAccountNumber ?? this.paymentGatewayAccountNumber,
      isActive: isActive ?? this.isActive,
      joinedAt: joinedAt,
      leftAt: leftAt,
      createdAt: createdAt,
      updatedAt: DateTime.now(),
      paymentHistory: paymentHistory ?? this.paymentHistory,
      userProfile: userProfile,
    );
  }
}
