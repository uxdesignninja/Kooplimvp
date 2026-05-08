import 'paluwagan_member.dart';

/// Paluwagan Group Model
class PaluwagangGroup {
  final String id;
  final String name;
  final String? description;
  final String adminUserId;

  // Financial settings
  final double monthlyTargetAmount;
  final double totalTargetAmount;
  final int durationMonths;

  // Penalty settings
  final bool penaltyEnabled;
  final double penaltyAmount;
  final int latePaymentGraceDays;

  // Status
  final bool isActive;
  final String status; // active, paused, completed, closed

  // Metadata
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? startedAt;
  final DateTime? completedAt;

  // Members (populated from join)
  final List<PaluwagangMember>? members;

  PaluwagangGroup({
    required this.id,
    required this.name,
    this.description,
    required this.adminUserId,
    required this.monthlyTargetAmount,
    required this.totalTargetAmount,
    required this.durationMonths,
    this.penaltyEnabled = false,
    this.penaltyAmount = 0,
    this.latePaymentGraceDays = 3,
    this.isActive = true,
    this.status = 'active',
    required this.createdAt,
    required this.updatedAt,
    this.startedAt,
    this.completedAt,
    this.members,
  });

  factory PaluwagangGroup.fromJson(Map<String, dynamic> json) {
    return PaluwagangGroup(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      adminUserId: json['admin_user_id'] as String,
      monthlyTargetAmount: (json['monthly_target_amount'] as num).toDouble(),
      totalTargetAmount: (json['total_target_amount'] as num).toDouble(),
      durationMonths: json['duration_months'] as int,
      penaltyEnabled: json['penalty_enabled'] as bool? ?? false,
      penaltyAmount: (json['penalty_amount'] as num?)?.toDouble() ?? 0,
      latePaymentGraceDays: json['late_payment_grace_days'] as int? ?? 3,
      isActive: json['is_active'] as bool? ?? true,
      status: json['status'] as String? ?? 'active',
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      startedAt: json['started_at'] != null
          ? DateTime.parse(json['started_at'] as String)
          : null,
      completedAt: json['completed_at'] != null
          ? DateTime.parse(json['completed_at'] as String)
          : null,
      members: json['paluwagan_members'] != null
          ? (json['paluwagan_members'] as List)
              .map((m) => PaluwagangMember.fromJson(m as Map<String, dynamic>))
              .toList()
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'admin_user_id': adminUserId,
      'monthly_target_amount': monthlyTargetAmount,
      'total_target_amount': totalTargetAmount,
      'duration_months': durationMonths,
      'penalty_enabled': penaltyEnabled,
      'penalty_amount': penaltyAmount,
      'late_payment_grace_days': latePaymentGraceDays,
      'is_active': isActive,
      'status': status,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'started_at': startedAt?.toIso8601String(),
      'completed_at': completedAt?.toIso8601String(),
    };
  }

  /// Calculate current amount collected
  double get currentAmount {
    if (members == null) return 0;
    return members!.fold<double>(
      0,
      (sum, member) => sum + member.totalContributed,
    );
  }

  /// Calculate progress percentage
  double get progressPercentage {
    if (totalTargetAmount == 0) return 0;
    return (currentAmount / totalTargetAmount) * 100;
  }

  /// Get pending payment proofs count (admin only)
  int get pendingCount {
    if (members == null) return 0;
    return members!.where((m) => m.hasPendingProof).length;
  }

  PaluwagangGroup copyWith({
    String? name,
    String? description,
    double? monthlyTargetAmount,
    double? totalTargetAmount,
    int? durationMonths,
    bool? penaltyEnabled,
    double? penaltyAmount,
    bool? isActive,
    String? status,
    List<PaluwagangMember>? members,
  }) {
    return PaluwagangGroup(
      id: id,
      name: name ?? this.name,
      description: description ?? this.description,
      adminUserId: adminUserId,
      monthlyTargetAmount: monthlyTargetAmount ?? this.monthlyTargetAmount,
      totalTargetAmount: totalTargetAmount ?? this.totalTargetAmount,
      durationMonths: durationMonths ?? this.durationMonths,
      penaltyEnabled: penaltyEnabled ?? this.penaltyEnabled,
      penaltyAmount: penaltyAmount ?? this.penaltyAmount,
      latePaymentGraceDays: latePaymentGraceDays,
      isActive: isActive ?? this.isActive,
      status: status ?? this.status,
      createdAt: createdAt,
      updatedAt: DateTime.now(),
      startedAt: startedAt,
      completedAt: completedAt,
      members: members ?? this.members,
    );
  }
}
