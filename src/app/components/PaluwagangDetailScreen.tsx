import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Wallet,
  AlertCircle,
  Award,
  TrendingUp,
  Shield,
  ChevronRight,
  Timer,
  MessageCircle,
  Flag,
  HelpCircle,
  X,
} from "lucide-react";
import type { Goal } from "./GoalsScreen";
import { PaluwagangAdminPanel } from "./PaluwagangAdminPanel";
import { PaluwagangChatScreen } from "./PaluwagangChatScreen";
import { PaymentGatewayLinkingScreen, type PaymentGatewayInfo } from "./PaymentGatewayLinkingScreen";
import { SubmitPaymentProofModal } from "./paluwagan/SubmitPaymentProofModal";
import { PaymentHistoryEnhanced } from "./paluwagan/PaymentHistoryEnhanced";

interface Props {
  goal: Goal;
  onBack: () => void;
  onPayMonthlyShare: () => void;
  onUpdate?: (goal: Goal) => void;
}

export function PaluwagangDetailScreen({ goal, onBack, onPayMonthlyShare, onUpdate }: Props) {
  const currentMonth = new Date().getMonth();
  const monthlyTarget = goal.monthlyTarget || 0;
  const members = goal.members || [];
  const totalMembers = members.length;
  const isAdmin = goal.adminId === goal.currentUserId;
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showPaymentGatewayLinking, setShowPaymentGatewayLinking] = useState(false);
  const [showSubmitProofModal, setShowSubmitProofModal] = useState(false);
  const [selectedProofUrl, setSelectedProofUrl] = useState("");
  const [showPaymentGatewayTooltip, setShowPaymentGatewayTooltip] = useState(false);
  const [showAllPaymentHistory, setShowAllPaymentHistory] = useState(false);

  // Find current user
  const currentUserMember = members.find(m => m.id === goal.currentUserId);
  const currentUserTrustScore = currentUserMember?.trustScore || 85;

  // Calculate payout date for current user
  const currentUserPayoutMonth = currentUserMember?.payoutOrder !== undefined
    ? currentUserMember.payoutOrder
    : members.findIndex(m => m.id === goal.currentUserId);

  // Calculate days until next payout
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), currentMonth + 1, 0).getDate();
  const daysUntilEndOfMonth = daysInMonth - currentDay;
  const monthsUntilPayout = currentUserPayoutMonth >= currentMonth
    ? currentUserPayoutMonth - currentMonth
    : (12 - currentMonth) + currentUserPayoutMonth;
  const daysUntilPayout = (monthsUntilPayout * 30) + daysUntilEndOfMonth;

  // Get next payout date
  const nextPayoutDate = new Date();
  nextPayoutDate.setMonth(currentMonth + monthsUntilPayout);
  nextPayoutDate.setDate(1);

  // Calculate stats
  const paidThisMonth = members.filter(
    (member) => member.monthlyContributions[currentMonth] >= monthlyTarget
  );
  const totalCollectedThisMonth = members.reduce(
    (sum, member) => sum + (member.monthlyContributions[currentMonth] || 0),
    0
  );

  // Current receiver (rotation logic)
  const currentReceiverIndex = currentMonth % totalMembers;
  const currentReceiver = members.sort((a, b) => (a.payoutOrder || 0) - (b.payoutOrder || 0))[currentReceiverIndex];

  // Payment history for current user
  const paymentHistory = currentUserMember?.paymentHistory || [];
  const hasPaidThisMonth = currentUserMember?.monthlyContributions[currentMonth] >= monthlyTarget;

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: daysUntilPayout,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextPayoutDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    }, 60000);

    return () => clearInterval(timer);
  }, [nextPayoutDate]);

  const handlePaymentGatewayUpdate = (gatewayInfo: PaymentGatewayInfo) => {
    if (!currentUserMember || !onUpdate) return;

    const updatedMembers = members.map(m =>
      m.id === currentUserMember.id
        ? { ...m, paymentGateway: gatewayInfo }
        : m
    );

    onUpdate({ ...goal, members: updatedMembers });
    setShowPaymentGatewayLinking(false);
  };

  const handleSubmitPaymentProof = (proofData: {
    image: File | null;
    referenceNumber: string;
    amount: number;
    date: string;
  }) => {
    if (!currentUserMember || !onUpdate) return;

    // In real implementation, upload to Supabase Storage here
    // For now, add to payment history as pending
    const updatedMembers = members.map(m => {
      if (m.id === currentUserMember.id) {
        const newHistory = [
          ...(m.paymentHistory || []),
          {
            month: currentMonth,
            amount: proofData.amount,
            date: proofData.date,
            status: "pending" as const,
            referenceNumber: proofData.referenceNumber,
            proofImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop",
          },
        ];

        return {
          ...m,
          isPending: true,
          paymentHistory: newHistory,
        };
      }
      return m;
    });

    onUpdate({ ...goal, members: updatedMembers });
    setShowSubmitProofModal(false);
  };

  const handleViewProof = (proofUrl: string) => {
    setSelectedProofUrl(proofUrl);
  };

  if (showAdminPanel && isAdmin && onUpdate) {
    return (
      <PaluwagangAdminPanel
        goal={goal}
        onBack={() => setShowAdminPanel(false)}
        onUpdate={onUpdate}
      />
    );
  }

  if (showChat) {
    return (
      <PaluwagangChatScreen
        goal={goal}
        onBack={() => setShowChat(false)}
        currentUserId={goal.currentUserId || ""}
      />
    );
  }

  if (showPaymentGatewayLinking) {
    return (
      <PaymentGatewayLinkingScreen
        onBack={() => setShowPaymentGatewayLinking(false)}
        onComplete={handlePaymentGatewayUpdate}
        currentGateway={currentUserMember?.paymentGateway || null}
      />
    );
  }

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
          <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
        </motion.button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              {goal.name}
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              Group savings · {totalMembers} members
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Tertiary: Chat button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChat(true)}
              className="w-10 h-10 rounded-full bg-white border border-[rgba(17,24,39,0.1)] flex items-center justify-center shadow-sm hover:border-[#1565C0]/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
            </motion.button>
            {/* Primary: Admin button */}
            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdminPanel(true)}
                className="px-3 py-2 rounded-full text-white flex items-center gap-2"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(21,101,192,0.25)",
                }}
              >
                <Shield className="w-4 h-4" strokeWidth={2} />
                Admin
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
        {/* Hero Section - Next Payout (Secondary styling for positive outcome) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #4CAF50 0%, #45A049 100%)",
            boxShadow: "0 6px 20px rgba(76,175,80,0.25)",
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-8 -translate-x-8" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-5 h-5" strokeWidth={2} />
              <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.9 }}>
                My Next Payout · {monthNames[currentUserPayoutMonth]}
              </p>
            </div>

            <p className="text-white/80 mb-1" style={{ fontSize: "0.85rem" }}>
              You'll receive
            </p>
            <p className="text-white mb-4" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
              ₱{(monthlyTarget * totalMembers).toLocaleString()}
            </p>

            {/* Countdown Timer */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <p className="text-white/70 mb-2" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                Time Until Payout
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-white" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1 }}>
                    {timeLeft.days}
                  </p>
                  <p className="text-white/60 mt-0.5" style={{ fontSize: "0.65rem" }}>Days</p>
                </div>
                <div className="text-center">
                  <p className="text-white" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1 }}>
                    {timeLeft.hours}
                  </p>
                  <p className="text-white/60 mt-0.5" style={{ fontSize: "0.65rem" }}>Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-white" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1 }}>
                    {timeLeft.minutes}
                  </p>
                  <p className="text-white/60 mt-0.5" style={{ fontSize: "0.65rem" }}>Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Score Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
          style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFA726]/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#FFA726]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Trust Score
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                  Based on payment history
                </p>
              </div>
            </div>
            <p className="text-[#FFA726]" style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
              {currentUserTrustScore}%
            </p>
          </div>
          <div className="w-full h-2 bg-[rgba(17,24,39,0.05)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentUserTrustScore}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#FFA726] to-[#FFB84D] rounded-full"
            />
          </div>
        </motion.div>

        {/* Payment Gateway Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
          style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#1565C0]/10 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6 text-[#1565C0]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    Payment Gateway
                  </p>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPaymentGatewayTooltip(!showPaymentGatewayTooltip)}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#1565C0]/10 transition-colors"
                      aria-label="Help"
                    >
                      <HelpCircle className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                    </motion.button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {showPaymentGatewayTooltip && (
                        <>
                          {/* Backdrop to close tooltip */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowPaymentGatewayTooltip(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 top-8 z-50 w-72 bg-white rounded-xl shadow-lg border border-[rgba(17,24,39,0.08)] p-4"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-[#1565C0]/10 flex items-center justify-center shrink-0">
                                <Wallet className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[#111827] mb-1" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                                  What is this for?
                                </p>
                                <p className="text-[#111827]" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                                  This is where you'll <strong>receive your payout</strong> when it's your turn in the rotation.
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2 pt-3 border-t border-[rgba(17,24,39,0.06)]">
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 shrink-0" />
                                <p className="text-[#111827]" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                                  <strong>For receiving:</strong> Admin sends the pot to your GCash/Maya
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0] mt-1.5 shrink-0" />
                                <p className="text-[#111827]" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                                  <strong>For contributing:</strong> You upload payment proof screenshots instead
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                  Where you'll receive your payout
                </p>
              </div>
            </div>
          </div>

          {currentUserMember?.paymentGateway ? (
            <>
              {/* Linked Gateway Info */}
              <div className="bg-[#4CAF50]/5 rounded-xl p-4 mb-4 border border-[#4CAF50]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#4CAF50]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {currentUserMember.paymentGateway.type === "gcash" ? "GCash" : "Maya"} Linked
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      Ready to receive your payout
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-3 border-t border-[#4CAF50]/10">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      Account Name
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                      {currentUserMember.paymentGateway.accountName}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      Number
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                      {currentUserMember.paymentGateway.accountNumber}
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-[#1565C0]/5 rounded-lg">
                  <p className="text-[#111827] text-center" style={{ fontSize: "0.7rem", lineHeight: 1.4 }}>
                    💡 Admin will send your payout here when it's your turn. Monthly contributions use payment proof uploads.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaymentGatewayLinking(true)}
                className="w-full py-3 rounded-xl text-[#1565C0] bg-[#1565C0]/5 hover:bg-[#1565C0]/10 transition-colors"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Update Gateway
              </motion.button>
            </>
          ) : (
            <>
              {/* No Gateway Linked */}
              <div className="flex items-start gap-3 p-4 bg-[#FFA726]/5 rounded-xl border border-[#FFA726]/20 mb-4">
                <AlertCircle className="w-5 h-5 text-[#FFA726] shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[#FFA726] mb-1" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    No Payment Gateway Linked
                  </p>
                  <p className="text-[#111827] mb-2" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                    Link your GCash or Maya account to receive your payout when it's your turn.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.7rem", lineHeight: 1.4 }}>
                    <strong>Note:</strong> Monthly contributions use payment proof uploads, not this gateway.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaymentGatewayLinking(true)}
                className="w-full py-3 rounded-xl text-white"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                }}
              >
                Link Payment Gateway
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Current Receiver */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
          style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
        >
          <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Current Receiver This Month
          </h3>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#1565C0]/10 to-[#2d2d9e]/10 border border-[#1565C0]/20">
            <div className="w-14 h-14 rounded-full bg-[#1565C0] flex items-center justify-center text-white shrink-0" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {currentReceiver?.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1">
              <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                {currentReceiver?.name}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                Receives ₱{(monthlyTarget * totalMembers).toLocaleString()} this month
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#1565C0] text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
              ACTIVE
            </div>
          </div>
        </motion.div>

        {/* Monthly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
          style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
        >
          <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
            This Month's Progress
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
                Members Paid
              </p>
              <p className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {paidThisMonth.length}/{totalMembers}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
                Total Collected
              </p>
              <p className="text-[#4CAF50]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                ₱{totalCollectedThisMonth.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-[rgba(17,24,39,0.05)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(paidThisMonth.length / totalMembers) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#4CAF50] to-[#5cbf6a] rounded-full"
            />
          </div>
        </motion.div>

        {/* Payment History Timeline - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
          style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
              My Payment History
            </h3>
            {currentUserMember?.paymentHistory && currentUserMember.paymentHistory.length > 2 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllPaymentHistory(true)}
                className="text-[#1565C0]"
                style={{ fontSize: "0.85rem", fontWeight: 600 }}
              >
                View All ({currentUserMember.paymentHistory.length})
              </motion.button>
            )}
          </div>
          <PaymentHistoryEnhanced
            paymentHistory={currentUserMember?.paymentHistory || []}
            monthNames={monthNames}
            monthlyTarget={monthlyTarget}
            onViewProof={handleViewProof}
            limit={2}
          />
        </motion.div>

        {/* Payment CTA - Submit Payment Proof */}
        {!hasPaidThisMonth && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSubmitProofModal(true)}
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
        )}

        {hasPaidThisMonth && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-[#4CAF50]/10 to-[#45A049]/10 rounded-2xl p-5 border border-[#4CAF50]/20 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-[#4CAF50] mx-auto mb-3" strokeWidth={2} />
            <p className="text-[#4CAF50] mb-1" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Payment Complete!
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
              You've paid ₱{monthlyTarget.toLocaleString()} for {monthNames[currentMonth]}
            </p>
          </motion.div>
        )}

        {/* Report Button (Members Only) - Tertiary */}
        {!isAdmin && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowReportModal(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white border border-[rgba(17,24,39,0.1)] text-[#F97316] hover:bg-[#FFF7ED] transition-colors"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            <Flag className="w-5 h-5" strokeWidth={2} />
            Report Issue
          </motion.button>
        )}

        {/* Info Notice */}
        <div className="flex items-start gap-3 p-4 bg-[#1565C0]/5 rounded-xl border border-[#1565C0]/10">
          <AlertCircle className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[#111827]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
            Your contributions help everyone in the group. Stay on track to maintain your trust score and ensure smooth payouts!
          </p>
        </div>
      </div>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {showReportModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-50"
              style={{ maxHeight: "80vh" }}
            >
              <div className="w-12 h-1 bg-[rgba(17,24,39,0.2)] rounded-full mx-auto mb-5" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center">
                  <Flag className="w-6 h-6 text-[#F97316]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[#111827]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                    Report Issue
                  </h2>
                  <p className="text-[#45474c]" style={{ fontSize: "0.85rem" }}>
                    Flag concerns or 'takbo' risk
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                    What's the issue?
                  </label>
                  <div className="space-y-2">
                    {["Member hasn't paid for 2+ months", "Suspicious behavior detected", "Admin not responding", "Other concerns"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setReportReason(option)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                          reportReason === option
                            ? "border-[#F97316] bg-[#F97316]/5 text-[#F97316]"
                            : "border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:border-[#F97316]/30"
                        }`}
                        style={{ fontSize: "0.9rem", fontWeight: 500 }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Tertiary: Cancel */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowReportModal(false);
                    setReportReason("");
                  }}
                  className="flex-1 px-6 py-4 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Cancel
                </motion.button>
                {/* Primary: Submit */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (reportReason) {
                      alert(`Issue reported: ${reportReason}\n\nThe admin will be notified.`);
                      setShowReportModal(false);
                      setReportReason("");
                    }
                  }}
                  disabled={!reportReason}
                  className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: "0.95rem", fontWeight: 600, boxShadow: !reportReason ? "none" : "0 4px 12px rgba(249,115,22,0.25)" }}
                >
                  Submit Report
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Submit Payment Proof Modal */}
      <SubmitPaymentProofModal
        isOpen={showSubmitProofModal}
        onClose={() => setShowSubmitProofModal(false)}
        monthlyTarget={monthlyTarget}
        monthName={monthNames[currentMonth]}
        onSubmit={handleSubmitPaymentProof}
      />

      {/* Proof Image Viewer */}
      <AnimatePresence>
        {selectedProofUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedProofUrl("")}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProofUrl}
                alt="Payment proof"
                className="w-full rounded-2xl shadow-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProofUrl("")}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
              >
                <X className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Payment History Modal */}
      <AnimatePresence>
        {showAllPaymentHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
            style={{ background: "rgba(10,10,111,0.4)" }}
            onClick={() => setShowAllPaymentHistory(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl w-full max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="shrink-0 p-6 pb-4 border-b border-[rgba(17,24,39,0.06)]">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1565C0]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#1565C0]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                      Payment History
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      {currentUserMember?.paymentHistory?.length || 0} payment{currentUserMember?.paymentHistory?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#4CAF50" }}>
                      Trust Score
                    </p>
                    <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4CAF50" }}>
                      {currentUserTrustScore}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <PaymentHistoryEnhanced
                  paymentHistory={currentUserMember?.paymentHistory || []}
                  monthNames={monthNames}
                  monthlyTarget={monthlyTarget}
                  onViewProof={handleViewProof}
                />
              </div>

              {/* Modal Footer - Close Button */}
              <div className="shrink-0 p-6 pt-4 border-t border-[rgba(17,24,39,0.06)]">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAllPaymentHistory(false)}
                  className="w-full py-3.5 rounded-full bg-white border border-[rgba(17,24,39,0.15)] text-[#111827] hover:bg-[#FAF9F7] transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
