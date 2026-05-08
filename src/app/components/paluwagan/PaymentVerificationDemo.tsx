import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Shield,
  ArrowLeft,
  Users,
  CheckCircle,
  Clock,
  Bell,
  Eye,
  Wallet,
} from "lucide-react";
import { SubmitPaymentProofModal } from "./SubmitPaymentProofModal";
import { AdminApprovalQueueScreen } from "./AdminApprovalQueueScreen";
import { PaymentHistoryEnhanced } from "./PaymentHistoryEnhanced";
import type { Goal, GoalMember } from "../GoalsScreen";

type ViewMode = "landing" | "member" | "admin";

interface Props {
  onExit?: () => void;
}

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

export function PaymentVerificationDemo({ onExit }: Props = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>("landing");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedProofUrl, setSelectedProofUrl] = useState("");
  const [pendingCount, setPendingCount] = useState(2);

  // Mock data
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = 4; // May
  const monthlyTarget = 5000;

  const [paymentHistory, setPaymentHistory] = useState([
    {
      month: 4,
      amount: 5000,
      date: "2026-05-08",
      status: "pending" as const,
      referenceNumber: "GCASH20260508123456",
      proofImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop",
      submittedAt: "2 hours ago",
    },
    {
      month: 3,
      amount: 5000,
      date: "2026-04-05",
      status: "approved" as const,
      referenceNumber: "GCASH20260405987654",
      proofImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
      verifiedBy: "Admin Juan",
      verifiedAt: "2026-04-06",
    },
    {
      month: 2,
      amount: 5000,
      date: "2026-03-10",
      status: "rejected" as const,
      referenceNumber: "MAYA20260310111111",
      proofImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop",
      rejectionReason: "Screenshot shows amount of ₱4,800, but monthly target is ₱5,000. Please submit correct payment proof.",
      verifiedBy: "Admin Juan",
    },
    {
      month: 1,
      amount: 5000,
      date: "2026-02-03",
      status: "approved" as const,
      referenceNumber: "GCASH20260203555555",
      proofImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop",
      verifiedBy: "Admin Juan",
      verifiedAt: "2026-02-04",
    },
  ]);

  const mockGoal: Goal = {
    id: "demo-goal",
    name: "Barkada Savings 2026",
    targetAmount: 60000,
    currentAmount: 25000,
    type: "group",
    category: "paluwagan",
    createdAt: "Jan 2026",
    color: "#4CAF50",
    monthlyTarget: 5000,
    adminId: "admin-1",
    currentUserId: viewMode === "admin" ? "admin-1" : "member-1",
    members: [
      {
        id: "member-1",
        name: "You (Maria Santos)",
        monthlyContributions: { 1: 5000, 3: 5000 },
        payoutOrder: 2,
        trustScore: 85,
      },
      {
        id: "member-2",
        name: "Juan Dela Cruz",
        monthlyContributions: { 1: 5000, 2: 5000, 3: 5000, 4: 5000 },
        payoutOrder: 0,
        trustScore: 95,
      },
      {
        id: "member-3",
        name: "Pedro Garcia",
        monthlyContributions: { 1: 5000, 3: 5000 },
        payoutOrder: 1,
        trustScore: 80,
      },
    ],
  };

  const handleSubmitProof = (proofData: {
    image: File | null;
    referenceNumber: string;
    amount: number;
    date: string;
  }) => {
    // Add to payment history as pending
    const newPayment = {
      month: currentMonth,
      amount: proofData.amount,
      date: proofData.date,
      status: "pending" as const,
      referenceNumber: proofData.referenceNumber,
      proofImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop",
      submittedAt: "Just now",
    };

    setPaymentHistory([newPayment, ...paymentHistory.filter(p => p.month !== currentMonth)]);
    setPendingCount(prev => prev + 1);
    setShowSubmitModal(false);
  };

  const handleApprove = (memberId: string, month: number) => {
    setPaymentHistory(prev =>
      prev.map(p =>
        p.month === month
          ? {
              ...p,
              status: "approved" as const,
              verifiedBy: "Admin Juan",
              verifiedAt: new Date().toISOString().split("T")[0],
            }
          : p
      )
    );
    setPendingCount(prev => Math.max(0, prev - 1));
  };

  const handleReject = (memberId: string, month: number, reason: string) => {
    setPaymentHistory(prev =>
      prev.map(p =>
        p.month === month
          ? {
              ...p,
              status: "rejected" as const,
              rejectionReason: reason,
              verifiedBy: "Admin Juan",
            }
          : p
      )
    );
    setPendingCount(prev => Math.max(0, prev - 1));
  };

  const handleViewProof = (proofUrl: string) => {
    setSelectedProofUrl(proofUrl);
    setShowProofModal(true);
  };

  // Landing page - choose role
  if (viewMode === "landing") {
    return (
      <div className="flex flex-col h-full bg-[#FAF9F7]">
        {/* Header */}
        <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#1565C0]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  Payment Verification Demo
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  Manual proof-of-payment system
                </p>
              </div>
            </div>
            {onExit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExit}
                className="px-3 py-2 rounded-full bg-white border border-[rgba(17,24,39,0.1)] text-[#111827] hover:bg-[#FAF9F7] transition-colors flex items-center gap-1.5"
                style={{ fontSize: "0.8rem", fontWeight: 600 }}
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                Exit Demo
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1565C0]/10 to-[#2d2d9e]/10 rounded-2xl p-5 border border-[#1565C0]/20"
          >
            <h3 className="text-[#111827] mb-2" style={{ fontSize: "1rem", fontWeight: 700 }}>
              How It Works
            </h3>
            <div className="space-y-2 text-[#111827]" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
              <p>
                <strong>Members</strong> upload payment screenshots (GCash, Maya, Bank) with reference numbers.
              </p>
              <p>
                <strong>Admins</strong> review and approve/reject each proof. No actual money flows through the app.
              </p>
              <p className="pt-2 text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                Choose a role below to explore the flow:
              </p>
            </div>
          </motion.div>

          {/* Role Selection */}
          <div className="space-y-3">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode("member")}
              className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] text-left transition-all"
              style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-[#4CAF50]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                    Member View
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                    Submit payment proofs, view history
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#4CAF50]/10 text-[#4CAF50]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                  DEMO
                </div>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode("admin")}
              className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] text-left transition-all"
              style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#1565C0]/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#1565C0]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                    Admin View
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                    Review and approve payment proofs
                  </p>
                </div>
                {pendingCount > 0 && (
                  <div className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                    {pendingCount}
                  </div>
                )}
              </div>
            </motion.button>
          </div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <h3 className="text-[#111827] mb-4" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Current Demo State
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-[#4CAF50]/5 rounded-xl">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] mx-auto mb-1" strokeWidth={2} />
                <p className="text-[#4CAF50]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {paymentHistory.filter(p => p.status === "approved").length}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Approved</p>
              </div>
              <div className="text-center p-3 bg-[#FFA726]/5 rounded-xl">
                <Clock className="w-5 h-5 text-[#FFA726] mx-auto mb-1" strokeWidth={2} />
                <p className="text-[#FFA726]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {pendingCount}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Pending</p>
              </div>
              <div className="text-center p-3 bg-red-500/5 rounded-xl">
                <Users className="w-5 h-5 text-red-500 mx-auto mb-1" strokeWidth={2} />
                <p className="text-red-500" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {paymentHistory.filter(p => p.status === "rejected").length}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Rejected</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <div className="space-y-3">
            <h3 className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Key Features
            </h3>
            {[
              { icon: "📸", text: "Camera/Gallery upload with preview" },
              { icon: "✅", text: "Admin approval/rejection with reasons" },
              { icon: "📜", text: "Full payment history with receipts" },
              { icon: "🔔", text: "Real-time status updates" },
              { icon: "⚖️", text: "No BSP license required (tracking only)" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[rgba(17,24,39,0.06)]"
              >
                <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
                <p className="text-[#111827]" style={{ fontSize: "0.85rem" }}>
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Admin View - Show approval queue
  if (viewMode === "admin" && showApprovalQueue) {
    return (
      <AdminApprovalQueueScreen
        goal={mockGoal}
        onBack={() => setShowApprovalQueue(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    );
  }

  // Member View
  if (viewMode === "member") {
    const hasPaidThisMonth = paymentHistory.some(
      p => p.month === currentMonth && (p.status === "approved" || p.status === "pending")
    );

    return (
      <div className="flex flex-col h-full bg-[#FAF9F7]">
        {/* Header */}
        <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setViewMode("landing")}
            className="flex items-center gap-2 mb-4 text-[#111827] hover:text-[#1565C0] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back to Demo Home</span>
          </motion.button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {mockGoal.name}
              </h1>
              <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                Member View · {monthNames[currentMonth]} Contribution
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#4CAF50]/10 text-[#4CAF50]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
              DEMO MODE
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Current Month Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {monthNames[currentMonth]} 2026
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  Monthly contribution: ₱{monthlyTarget.toLocaleString()}
                </p>
              </div>
              {hasPaidThisMonth && (
                <div className="px-3 py-1.5 rounded-full bg-[#FFA726]/10 text-[#FFA726]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                  PENDING REVIEW
                </div>
              )}
            </div>

            {!hasPaidThisMonth ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 6px 20px rgba(21,101,192,0.3)",
                }}
              >
                <Wallet className="w-5 h-5" strokeWidth={2} />
                Submit Payment Proof
              </motion.button>
            ) : (
              <div className="bg-[#FFA726]/5 rounded-xl p-4 border border-[#FFA726]/20">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#FFA726]" strokeWidth={2} />
                  <div className="flex-1">
                    <p className="text-[#FFA726] mb-0.5" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Proof Submitted
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.8rem" }}>
                      Your payment proof is being reviewed by the admin. You'll be notified once it's verified.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
              My Payment History
            </h3>
            <PaymentHistoryEnhanced
              paymentHistory={paymentHistory}
              monthNames={monthNames}
              monthlyTarget={monthlyTarget}
              onViewProof={handleViewProof}
            />
          </motion.div>

          {/* Demo Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-[#1565C0]/5 to-[#2d2d9e]/5 rounded-2xl p-4 border border-[#1565C0]/20"
          >
            <p className="text-[#111827] mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              💡 Demo Tip
            </p>
            <p className="text-muted-foreground mb-3" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
              Try submitting a payment proof to see the full flow. Then switch to Admin View to approve/reject it!
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode("admin")}
              className="w-full py-2.5 rounded-xl bg-[#1565C0] text-white flex items-center justify-center gap-2"
              style={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              <Shield className="w-4 h-4" strokeWidth={2} />
              Switch to Admin View
            </motion.button>
          </motion.div>
        </div>

        {/* Submit Payment Proof Modal */}
        <SubmitPaymentProofModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          monthlyTarget={monthlyTarget}
          monthName={monthNames[currentMonth]}
          onSubmit={handleSubmitProof}
        />

        {/* Proof Image Modal */}
        {showProofModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowProofModal(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative z-10 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProofUrl}
                alt="Payment proof"
                className="w-full rounded-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowProofModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }

  // Admin View - Dashboard
  if (viewMode === "admin") {
    return (
      <div className="flex flex-col h-full bg-[#FAF9F7]">
        {/* Header */}
        <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setViewMode("landing")}
            className="flex items-center gap-2 mb-4 text-[#111827] hover:text-[#1565C0] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back to Demo Home</span>
          </motion.button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                {mockGoal.name}
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#1565C0]/10 text-[#1565C0] flex items-center gap-1.5" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
              <Shield className="w-3.5 h-3.5" strokeWidth={2} />
              ADMIN
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Pending Approvals Card */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowApprovalQueue(true)}
            className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] text-left transition-all"
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-[#FFA726]/10 flex items-center justify-center">
                  <Bell className="w-7 h-7 text-[#FFA726]" strokeWidth={1.5} />
                </div>
                {pendingCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#F97316] text-white flex items-center justify-center" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                    {pendingCount}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  Pending Approvals
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                  {pendingCount} payment{pendingCount !== 1 ? 's' : ''} awaiting review
                </p>
              </div>
              <div className="text-[#1565C0]">
                <ArrowLeft className="w-5 h-5 rotate-180" strokeWidth={2} />
              </div>
            </div>
          </motion.button>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
              This Month's Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#4CAF50]/5 rounded-xl border border-[#4CAF50]/20">
                <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
                  Verified
                </p>
                <p className="text-[#4CAF50]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {paymentHistory.filter(p => p.month === currentMonth && p.status === "approved").length}/{mockGoal.members?.length || 0}
                </p>
              </div>
              <div className="p-4 bg-[#FFA726]/5 rounded-xl border border-[#FFA726]/20">
                <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
                  Pending
                </p>
                <p className="text-[#FFA726]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {pendingCount}
                </p>
              </div>
            </div>
          </motion.div>

          {/* All Members Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
              Member Payment Status
            </h3>
            <div className="space-y-3">
              {mockGoal.members?.map((member, idx) => {
                const hasPaid = member.monthlyContributions[currentMonth] >= monthlyTarget;
                return (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0]" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                      {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        {member.name}
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        Trust Score: {member.trustScore}%
                      </p>
                    </div>
                    {member.id === "member-1" ? (
                      <div className="px-2.5 py-1 rounded-full bg-[#FFA726]/10 text-[#FFA726]" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                        PENDING
                      </div>
                    ) : hasPaid ? (
                      <CheckCircle className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                    ) : (
                      <Clock className="w-5 h-5 text-[#76777D]" strokeWidth={2} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Demo Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#4CAF50]/5 to-[#45A049]/5 rounded-2xl p-4 border border-[#4CAF50]/20"
          >
            <p className="text-[#111827] mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              💡 Demo Tip
            </p>
            <p className="text-muted-foreground mb-3" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
              Tap "Pending Approvals" to review and approve/reject payment proofs. Try rejecting one with a custom reason!
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode("member")}
              className="w-full py-2.5 rounded-xl bg-[#4CAF50] text-white flex items-center justify-center gap-2"
              style={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              <User className="w-4 h-4" strokeWidth={2} />
              Switch to Member View
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
