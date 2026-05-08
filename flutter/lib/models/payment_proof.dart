/// Payment Proof Status
enum PaymentStatus {
  pending,
  approved,
  rejected;

  static PaymentStatus fromString(String status) {
    return PaymentStatus.values.firstWhere(
      (e) => e.name == status.toLowerCase(),
      orElse: () => PaymentStatus.pending,
    );
  }
}

/// Payment Proof Model
class PaymentProof {
  final String id;
  final String groupId;
  final String memberId;

  // Payment details
  final double amount;
  final DateTime paymentDate;
  final int monthIndex; // 0-11 for which month of the cycle
  final String referenceNumber;

  // Proof file
  final String proofImageUrl;
  final String proofImagePath;

  // Verification status
  final PaymentStatus status;

  // Admin verification
  final String? verifiedByUserId;
  final DateTime? verifiedAt;
  final String? rejectionReason;

  // Metadata
  final DateTime submittedAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  PaymentProof({
    required this.id,
    required this.groupId,
    required this.memberId,
    required this.amount,
    required this.paymentDate,
    required this.monthIndex,
    required this.referenceNumber,
    required this.proofImageUrl,
    required this.proofImagePath,
    this.status = PaymentStatus.pending,
    this.verifiedByUserId,
    this.verifiedAt,
    this.rejectionReason,
    required this.submittedAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory PaymentProof.fromJson(Map<String, dynamic> json) {
    return PaymentProof(
      id: json['id'] as String,
      groupId: json['group_id'] as String,
      memberId: json['member_id'] as String,
      amount: (json['amount'] as num).toDouble(),
      paymentDate: DateTime.parse(json['payment_date'] as String),
      monthIndex: json['month_index'] as int,
      referenceNumber: json['reference_number'] as String,
      proofImageUrl: json['proof_image_url'] as String,
      proofImagePath: json['proof_image_path'] as String,
      status: PaymentStatus.fromString(json['status'] as String),
      verifiedByUserId: json['verified_by_user_id'] as String?,
      verifiedAt: json['verified_at'] != null
          ? DateTime.parse(json['verified_at'] as String)
          : null,
      rejectionReason: json['rejection_reason'] as String?,
      submittedAt: DateTime.parse(json['submitted_at'] as String),
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'group_id': groupId,
      'member_id': memberId,
      'amount': amount,
      'payment_date': paymentDate.toIso8601String().split('T')[0],
      'month_index': monthIndex,
      'reference_number': referenceNumber,
      'proof_image_url': proofImageUrl,
      'proof_image_path': proofImagePath,
      'status': status.name,
      'verified_by_user_id': verifiedByUserId,
      'verified_at': verifiedAt?.toIso8601String(),
      'rejection_reason': rejectionReason,
      'submitted_at': submittedAt.toIso8601String(),
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// Get status color
  String get statusColor {
    switch (status) {
      case PaymentStatus.approved:
        return '#4CAF50'; // Green
      case PaymentStatus.pending:
        return '#FFA726'; // Orange
      case PaymentStatus.rejected:
        return '#EF4444'; // Red
    }
  }

  /// Get status icon
  String get statusIcon {
    switch (status) {
      case PaymentStatus.approved:
        return '✓';
      case PaymentStatus.pending:
        return '⏳';
      case PaymentStatus.rejected:
        return '✗';
    }
  }

  /// Get status label
  String get statusLabel {
    switch (status) {
      case PaymentStatus.approved:
        return 'Approved';
      case PaymentStatus.pending:
        return 'Pending';
      case PaymentStatus.rejected:
        return 'Rejected';
    }
  }

  /// Get month name
  String get monthName {
    final months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[monthIndex];
  }

  /// Format submitted time (e.g., "2 hours ago")
  String get submittedTimeAgo {
    final now = DateTime.now();
    final difference = now.difference(submittedAt);

    if (difference.inDays > 0) {
      return '${difference.inDays} day${difference.inDays > 1 ? 's' : ''} ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} hour${difference.inHours > 1 ? 's' : ''} ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} minute${difference.inMinutes > 1 ? 's' : ''} ago';
    } else {
      return 'Just now';
    }
  }

  PaymentProof copyWith({
    PaymentStatus? status,
    String? verifiedByUserId,
    DateTime? verifiedAt,
    String? rejectionReason,
  }) {
    return PaymentProof(
      id: id,
      groupId: groupId,
      memberId: memberId,
      amount: amount,
      paymentDate: paymentDate,
      monthIndex: monthIndex,
      referenceNumber: referenceNumber,
      proofImageUrl: proofImageUrl,
      proofImagePath: proofImagePath,
      status: status ?? this.status,
      verifiedByUserId: verifiedByUserId ?? this.verifiedByUserId,
      verifiedAt: verifiedAt ?? this.verifiedAt,
      rejectionReason: rejectionReason ?? this.rejectionReason,
      submittedAt: submittedAt,
      createdAt: createdAt,
      updatedAt: DateTime.now(),
    );
  }
}
