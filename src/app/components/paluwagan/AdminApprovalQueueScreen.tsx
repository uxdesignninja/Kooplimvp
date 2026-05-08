import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Image as ImageIcon,
  Calendar,
  Hash,
  DollarSign,
  User,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import type { Goal, GoalMember } from "../GoalsScreen";

interface PendingPayment {
  memberId: string;
  memberName: string;
  month: number;
  amount: number;
  referenceNumber: string;
  date: string;
  proofImageUrl: string;
  submittedAt: string;
}

interface Props {
  goal: Goal;
  onBack: () => void;
  onApprove: (memberId: string, month: number) => void;
  onReject: (memberId: string, month: number, reason: string) => void;
}

export function AdminApprovalQueueScreen({ goal, onBack, onApprove, onReject }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Mock pending payments - in real app, filter from goal.members
  const pendingPayments: PendingPayment[] = [
    {
      memberId: "member-2",
      memberName: "Maria Santos",
      month: 4,
      amount: goal.monthlyTarget || 5000,
      referenceNumber: "GCASH20260508123456",
      date: "2026-05-08",
      proofImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop",
      submittedAt: "2 hours ago",
    },
    {
      memberId: "member-3",
      memberName: "Juan Dela Cruz",
      month: 4,
      amount: goal.monthlyTarget || 5000,
      referenceNumber: "MAYA789123456",
      date: "2026-05-07",
      proofImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
      submittedAt: "5 hours ago",
    },
  ];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleApprove = (payment: PendingPayment) => {
    onApprove(payment.memberId, payment.month);
    setSelectedPayment(null);
  };

  const handleReject = () => {
    if (selectedPayment && rejectReason.trim()) {
      onReject(selectedPayment.memberId, selectedPayment.month, rejectReason);
      setShowRejectModal(false);
      setSelectedPayment(null);
      setRejectReason("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#111827] hover:text-[#1565C0] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back to Group</span>
        </motion.button>
        <div>
          <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Pending Approvals
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''} awaiting review
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
        {pendingPayments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-[#4CAF50]" strokeWidth={2} />
            </div>
            <p className="text-[#111827] mb-2" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              All Caught Up!
            </p>
            <p className="text-muted-foreground max-w-[260px]" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
              No pending payments to review at the moment.
            </p>
          </div>
        ) : (
          pendingPayments.map((payment, index) => (
            <motion.div
              key={`${payment.memberId}-${payment.month}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedPayment(payment)}
              className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] cursor-pointer transition-all"
              style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[rgba(17,24,39,0.1)] shrink-0">
                  <img
                    src={payment.proofImageUrl}
                    alt="Payment proof"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                        {payment.memberName}
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        {monthNames[payment.month]} · {payment.submittedAt}
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-[#FFA726]/10 text-[#FFA726]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                      PENDING
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#4CAF50]" strokeWidth={2} />
                      <span className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        ₱{payment.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
                      <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        {new Date(payment.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Full Detail Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPayment(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-[420px] bg-white rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Preview */}
              <div className="relative h-80 bg-[#111827]">
                <img
                  src={selectedPayment.proofImageUrl}
                  alt="Payment proof"
                  className="w-full h-full object-contain"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPayment(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
                </motion.button>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    {selectedPayment.memberName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                      {selectedPayment.memberName}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      Submitted {selectedPayment.submittedAt}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#4CAF50]" strokeWidth={2} />
                      <span className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>Amount</span>
                    </div>
                    <span className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                      ₱{selectedPayment.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                      <span className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>Reference</span>
                    </div>
                    <span className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600, fontFamily: "monospace" }}>
                      {selectedPayment.referenceNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-xl">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#76777D]" strokeWidth={2} />
                      <span className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>Date</span>
                    </div>
                    <span className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {new Date(selectedPayment.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowRejectModal(true);
                    }}
                    className="flex-1 py-3.5 rounded-2xl border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    style={{ fontSize: "0.95rem", fontWeight: 600 }}
                  >
                    <XCircle className="w-5 h-5" strokeWidth={2} />
                    Reject
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(selectedPayment)}
                    className="flex-1 py-3.5 rounded-2xl text-white flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#4CAF50",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(76,175,80,0.25)",
                    }}
                  >
                    <CheckCircle className="w-5 h-5" strokeWidth={2} />
                    Approve
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Reason Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
            onClick={() => setShowRejectModal(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative z-10 w-full sm:max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    Reject Payment
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Provide a reason for rejection
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Reason
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., Reference number doesn't match, incorrect amount, etc."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-red-500 transition-colors resize-none"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                  }}
                  className="flex-1 py-3.5 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    boxShadow: rejectReason.trim() ? "0 4px 12px rgba(239,68,68,0.25)" : "none",
                  }}
                >
                  Confirm Rejection
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
