import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  X,
  Clock,
  AlertCircle,
  Send,
  Shield,
  Calendar,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  Award,
  ChevronRight,
  Shuffle,
  UserX,
  DollarSign as PenaltyIcon,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import type { Goal, GoalMember } from "./GoalsScreen";
import { AddMembersScreen } from "./AddMembersScreen";
import { PayoutProcessingScreen } from "./PayoutProcessingScreen";
import { AdminApprovalQueueScreen } from "./paluwagan/AdminApprovalQueueScreen";

interface Props {
  goal: Goal;
  onBack: () => void;
  onUpdate: (goal: Goal) => void;
}

type AdminTab = "overview" | "verification" | "slots" | "settings";

export function PaluwagangAdminPanel({ goal, onBack, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [memberMenuOpen, setMemberMenuOpen] = useState<string | null>(null);
  const [showKickConfirm, setShowKickConfirm] = useState<GoalMember | null>(null);
  const [showLateFeeModal, setShowLateFeeModal] = useState<GoalMember | null>(null);
  const [lateFeeAmount, setLateFeeAmount] = useState("");
  const [showPayoutProcessing, setShowPayoutProcessing] = useState(false);
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);

  const members = goal.members || [];
  const currentMonth = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate current receiver
  const currentReceiverIndex = currentMonth % members.length;
  const currentReceiver = members.sort((a, b) => (a.payoutOrder || 0) - (b.payoutOrder || 0))[currentReceiverIndex];

  // Calculate stats
  const paidThisMonth = members.filter(
    (m) => m.monthlyContributions[currentMonth] >= (goal.monthlyTarget || 0)
  );
  const pendingVerification = members.filter((m) => m.isPending);
  const totalCollected = members.reduce((sum, m) => sum + (m.monthlyContributions[currentMonth] || 0), 0);
  const expectedTotal = members.length * (goal.monthlyTarget || 0);

  const handleApprovePayment = (memberId: string, month: number) => {
    const updatedMembers = members.map((m) => {
      if (m.id === memberId) {
        const updatedHistory = (m.paymentHistory || []).map(p =>
          p.month === month ? { ...p, status: "approved" as const, verifiedBy: "Admin" } : p
        );
        return {
          ...m,
          isPending: false,
          monthlyContributions: {
            ...m.monthlyContributions,
            [month]: goal.monthlyTarget || 0,
          },
          paymentHistory: updatedHistory,
        };
      }
      return m;
    });
    onUpdate({ ...goal, members: updatedMembers });
  };

  const handleRejectPayment = (memberId: string, month: number, reason: string) => {
    const updatedMembers = members.map((m) => {
      if (m.id === memberId) {
        const updatedHistory = (m.paymentHistory || []).map(p =>
          p.month === month ? { ...p, status: "rejected" as const, rejectionReason: reason, verifiedBy: "Admin" } : p
        );
        return {
          ...m,
          isPending: false,
          monthlyContributions: {
            ...m.monthlyContributions,
            [month]: 0,
          },
          paymentHistory: updatedHistory,
        };
      }
      return m;
    });
    onUpdate({ ...goal, members: updatedMembers });
  };

  const handleShuffleSlots = () => {
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    const updatedMembers = shuffled.map((m, idx) => ({ ...m, payoutOrder: idx }));
    onUpdate({ ...goal, members: updatedMembers });
  };

  const handleTogglePenalty = () => {
    onUpdate({ ...goal, penaltyEnabled: !goal.penaltyEnabled });
  };

  const handleBroadcast = () => {
    // In real app, this would send notifications
    alert(`Message sent to ${members.length} members: ${broadcastMessage}`);
    setShowBroadcastModal(false);
    setBroadcastMessage("");
  };

  const handleAddMember = (member: GoalMember) => {
    const updatedMembers = [...members, member];
    onUpdate({ ...goal, members: updatedMembers });
  };

  const handleUpdateMember = (updatedMember: GoalMember) => {
    const updatedMembers = members.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    );
    onUpdate({ ...goal, members: updatedMembers });
  };

  const handleRemoveMember = (memberId: string) => {
    const updatedMembers = members.filter((m) => m.id !== memberId);
    onUpdate({ ...goal, members: updatedMembers });
  };

  const handleKickMember = (memberId: string) => {
    const updatedMembers = members.filter((m) => m.id !== memberId);
    onUpdate({ ...goal, members: updatedMembers });
    setShowKickConfirm(null);
    setMemberMenuOpen(null);
  };

  const handleApplyLateFee = (memberId: string) => {
    if (!lateFeeAmount || isNaN(Number(lateFeeAmount))) return;

    const updatedMembers = members.map((m) =>
      m.id === memberId
        ? {
            ...m,
            penaltyCount: (m.penaltyCount || 0) + 1,
            trustScore: Math.max(0, (m.trustScore || 100) - 5),
          }
        : m
    );
    onUpdate({ ...goal, members: updatedMembers });
    setShowLateFeeModal(null);
    setLateFeeAmount("");
    setMemberMenuOpen(null);
    alert(`Late fee of ₱${lateFeeAmount} applied to ${showLateFeeModal?.name}`);
  };

  // If showing add members screen, render it instead
  if (showAddMembers) {
    return (
      <AddMembersScreen
        onBack={() => setShowAddMembers(false)}
        members={members}
        onAddMember={handleAddMember}
        onUpdateMember={handleUpdateMember}
        onRemoveMember={handleRemoveMember}
      />
    );
  }

  // If showing payout processing screen, render it instead
  if (showPayoutProcessing && currentReceiver) {
    return (
      <PayoutProcessingScreen
        goal={goal}
        receiver={currentReceiver}
        onBack={() => setShowPayoutProcessing(false)}
        onPayoutComplete={() => {
          setShowPayoutProcessing(false);
          // In a real app, you'd update the goal with payout history here
        }}
      />
    );
  }

  // Show full approval queue screen
  if (showApprovalQueue) {
    return (
      <AdminApprovalQueueScreen
        goal={goal}
        onBack={() => setShowApprovalQueue(false)}
        onApprove={handleApprovePayment}
        onReject={handleRejectPayment}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0 border-b border-[rgba(17,24,39,0.06)]">
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
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
              <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Admin Panel
              </h1>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              {goal.name} · {members.length} members
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddMembers(true)}
              className="px-3 py-2 rounded-xl bg-[#4CAF50] text-white flex items-center gap-2"
              style={{ fontSize: "0.8rem", fontWeight: 600 }}
            >
              <UserPlus className="w-4 h-4" strokeWidth={2} />
              Invite
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBroadcastModal(true)}
              className="px-3 py-2 rounded-xl bg-[#1565C0] text-white flex items-center gap-2"
              style={{ fontSize: "0.8rem", fontWeight: 600 }}
            >
              <Send className="w-4 h-4" strokeWidth={2} />
              Broadcast
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 px-5 py-3 bg-white border-b border-[rgba(17,24,39,0.06)] overflow-x-auto">
        {[
          { id: "overview" as const, label: "Overview", icon: TrendingUp },
          { id: "verification" as const, label: "Verification", icon: CheckCircle2, badge: pendingVerification.length },
          { id: "slots" as const, label: "Slots", icon: Shuffle },
          { id: "settings" as const, label: "Settings", icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? tab.id === "overview"
                  ? "bg-[rgba(17,24,39,0.08)] text-[#111827]"
                  : "bg-[#1565C0] text-white"
                : "bg-[#FAF9F7] text-[#111827] hover:bg-[rgba(17,24,39,0.04)]"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            <tab.icon className="w-4 h-4" strokeWidth={2} />
            {tab.label}
            {tab.badge && tab.badge > 0 ? (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                {tab.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#4CAF50]/10 rounded-2xl p-4 border border-[#4CAF50]/20">
                  <DollarSign className="w-5 h-5 mb-2 text-[#4CAF50]" strokeWidth={2} />
                  <p className="text-[#4CAF50]" style={{ fontSize: "0.75rem", marginBottom: "4px", fontWeight: 600 }}>Collected</p>
                  <p className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>
                    ₱{totalCollected.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "0.7rem" }}>
                    of ₱{expectedTotal.toLocaleString()}
                  </p>
                </div>

                <div className="bg-[#1565C0]/10 rounded-2xl p-4 border border-[#1565C0]/20">
                  <Users className="w-5 h-5 mb-2 text-[#1565C0]" strokeWidth={2} />
                  <p className="text-[#1565C0]" style={{ fontSize: "0.75rem", marginBottom: "4px", fontWeight: 600 }}>Paid Members</p>
                  <p className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>
                    {paidThisMonth.length}/{members.length}
                  </p>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "0.7rem" }}>
                    {monthNames[currentMonth]} 2026
                  </p>
                </div>
              </div>

              {/* Process Payout CTA */}
              {currentReceiver && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPayoutProcessing(true)}
                  className="w-full bg-gradient-to-br from-[#4CAF50] to-[#45A049] rounded-2xl p-5 text-white text-left relative overflow-hidden"
                  style={{ boxShadow: "0 6px 24px rgba(76,175,80,0.3)" }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-8 -translate-x-8" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5" strokeWidth={2} />
                        <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.9 }}>
                          Ready to Pay
                        </p>
                      </div>
                      <p className="mb-1" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                        Process Payout
                      </p>
                      <p className="text-white/80" style={{ fontSize: "0.8rem" }}>
                        Send ₱{((goal.monthlyTarget || 0) * members.length).toLocaleString()} to {currentReceiver.name}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ml-4">
                      <Send className="w-6 h-6" strokeWidth={2} />
                    </div>
                  </div>
                </motion.button>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]" style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}>
                <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab("verification")}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#FFA726]/10 hover:bg-[#FFA726]/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FFA726]/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#FFA726]" strokeWidth={2} />
                    </div>
                    <p className="text-[#FFA726]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      {pendingVerification.length} Pending
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("slots")}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1565C0]/10 hover:bg-[#1565C0]/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1565C0]/20 flex items-center justify-center">
                      <Shuffle className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
                    </div>
                    <p className="text-[#1565C0]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      Manage Slots
                    </p>
                  </button>
                </div>
              </div>

              {/* Member Overview */}
              <div className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]" style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}>
                <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  All Members
                </h3>
                <div className="space-y-3">
                  {members.map((member) => {
                    const hasPaid = member.monthlyContributions[currentMonth] >= (goal.monthlyTarget || 0);
                    const trustScore = member.trustScore || 85;
                    return (
                      <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F7] relative">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasPaid ? "bg-[#4CAF50]/10" : "bg-[rgba(17,24,39,0.05)]"}`}>
                            {hasPaid ? (
                              <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                            ) : (
                              <Clock className="w-5 h-5 text-[#76777D]" strokeWidth={2} />
                            )}
                          </div>
                          <div>
                            <p className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                              {member.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-[#FFA726]" strokeWidth={2} />
                              <p className="text-[#FFA726]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                                {trustScore}% Trust
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className={hasPaid ? "text-[#4CAF50]" : "text-[#76777D]"} style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            {hasPaid ? "Paid" : "Pending"}
                          </p>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMemberMenuOpen(memberMenuOpen === member.id ? null : member.id)}
                            className="w-8 h-8 rounded-full hover:bg-[rgba(17,24,39,0.05)] flex items-center justify-center"
                          >
                            <MoreVertical className="w-4 h-4 text-[#45474c]" strokeWidth={2} />
                          </motion.button>
                        </div>

                        {/* Member Menu Dropdown */}
                        <AnimatePresence>
                          {memberMenuOpen === member.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-3 top-12 bg-white rounded-xl shadow-lg border border-[rgba(17,24,39,0.08)] overflow-hidden z-10"
                              style={{ minWidth: "160px" }}
                            >
                              <button
                                onClick={() => {
                                  setShowLateFeeModal(member);
                                  setMemberMenuOpen(null);
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[rgba(17,24,39,0.03)] transition-colors border-b border-[rgba(17,24,39,0.06)]"
                              >
                                <PenaltyIcon className="w-4 h-4 text-[#F97316]" strokeWidth={1.5} />
                                <span className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                                  Apply Late Fee
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  setShowKickConfirm(member);
                                  setMemberMenuOpen(null);
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[rgba(17,24,39,0.03)] transition-colors"
                              >
                                <UserX className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                                <span className="text-red-500" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                                  Remove Member
                                </span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Quick Access to Full Queue */}
              {pendingVerification.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowApprovalQueue(true)}
                  className="w-full bg-gradient-to-r from-[#1565C0] to-[#1a1a8f] rounded-2xl p-5 text-white text-left transition-all"
                  style={{ boxShadow: "0 6px 20px rgba(21,101,192,0.25)" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: "1rem", fontWeight: 700 }}>
                        View All Payment Proofs
                      </p>
                      <p className="text-white/70 mt-1" style={{ fontSize: "0.85rem" }}>
                        {pendingVerification.length} proof{pendingVerification.length !== 1 ? 's' : ''} awaiting review
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6" strokeWidth={2} />
                  </div>
                </motion.button>
              )}

              <div className="flex items-center gap-3 p-4 bg-[#FFA726]/10 rounded-xl border border-[#FFA726]/20">
                <AlertCircle className="w-5 h-5 text-[#FFA726]" strokeWidth={2} />
                <p className="text-[#111827]" style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                  Quick approve/reject below, or tap "View All Payment Proofs" to see full details
                </p>
              </div>

              {pendingVerification.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-[#4CAF50] mx-auto mb-3 opacity-40" strokeWidth={1.5} />
                  <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                    All Caught Up!
                  </p>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "0.85rem" }}>
                    No pending verifications
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingVerification.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
                      style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                            {member.name}
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                            Submitted: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-[#1565C0]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                          ₱{(goal.monthlyTarget || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprovePayment(member.id, currentMonth)}
                          className="flex-1 py-3 rounded-xl bg-[#4CAF50] text-white flex items-center justify-center gap-2 hover:bg-[#45A049] transition-colors"
                          style={{ fontSize: "0.9rem", fontWeight: 600 }}
                        >
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                          Quick Approve
                        </button>
                        <button
                          onClick={() => setShowApprovalQueue(true)}
                          className="flex-1 py-3 rounded-xl border-2 border-[#1565C0] text-[#1565C0] flex items-center justify-center gap-2 hover:bg-[#1565C0]/10 transition-colors"
                          style={{ fontSize: "0.9rem", fontWeight: 600 }}
                        >
                          View Proof
                          <ChevronRight className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "slots" && (
            <motion.div
              key="slots"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Payout Order
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShuffleSlots}
                  className="px-4 py-2 rounded-xl bg-[#1565C0] text-white flex items-center gap-2"
                  style={{ fontSize: "0.85rem", fontWeight: 600 }}
                >
                  <Shuffle className="w-4 h-4" strokeWidth={2} />
                  Shuffle
                </motion.button>
              </div>

              <div className="space-y-3">
                {members
                  .sort((a, b) => (a.payoutOrder || 0) - (b.payoutOrder || 0))
                  .map((member, index) => {
                    const isCurrentReceiver = index === currentMonth % members.length;
                    return (
                      <div
                        key={member.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          isCurrentReceiver
                            ? "bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/10 border-[#4CAF50]/30"
                            : "bg-white border-[rgba(198,198,205,0.15)]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCurrentReceiver ? "bg-[#4CAF50]" : "bg-[#1565C0]"} text-white`} style={{ fontSize: "1rem", fontWeight: 700 }}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                            {member.name}
                          </p>
                          {isCurrentReceiver && (
                            <p className="text-[#4CAF50]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              Current Receiver
                            </p>
                          )}
                        </div>
                        {isCurrentReceiver && (
                          <div className="px-3 py-1 rounded-full bg-[#4CAF50] text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                            ACTIVE
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]" style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}>
                <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Group Settings
                </h3>
                <div className="space-y-4">
                  {/* Penalty Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF9F7]">
                    <div>
                      <p className="text-[#111827] mb-1" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        Late Payment Penalties
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        Charge ₱50 for late contributions
                      </p>
                    </div>
                    <button
                      onClick={handleTogglePenalty}
                      className={`w-14 h-8 rounded-full transition-colors ${
                        goal.penaltyEnabled ? "bg-[#4CAF50]" : "bg-[#E2E2E3]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                          goal.penaltyEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                        style={{ marginTop: "4px" }}
                      />
                    </button>
                  </div>

                  {/* Group Status */}
                  <div className="p-4 rounded-xl bg-[#FAF9F7]">
                    <p className="text-[#111827] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Group Status
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                      <p className="text-[#4CAF50]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Active Cycle
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showBroadcastModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBroadcastModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-md w-full"
            >
              <h3 className="text-[#111827] mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Broadcast Message
              </h3>
              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Type your message to all members..."
                className="w-full p-4 rounded-xl bg-[#FAF9F7] border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors resize-none"
                rows={4}
                style={{ fontSize: "0.9rem" }}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#FAF9F7] text-[#111827] hover:bg-[#E2E2E3] transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBroadcast}
                  disabled={!broadcastMessage.trim()}
                  className="flex-1 py-3 rounded-xl bg-[#1565C0] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a1a8f] transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Send to All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Kick Member Confirmation Modal */}
        {showKickConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowKickConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <UserX className="w-6 h-6 text-red-500" strokeWidth={2} />
              </div>
              <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Remove Member?
              </h3>
              <p className="text-[#45474c] mb-6" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                Are you sure you want to remove <strong>{showKickConfirm.name}</strong> from the group? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowKickConfirm(null)}
                  className="flex-1 py-3 rounded-xl bg-[#FAF9F7] text-[#111827] hover:bg-[#E2E2E3] transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleKickMember(showKickConfirm.id)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Apply Late Fee Modal */}
        {showLateFeeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLateFeeModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4">
                <PenaltyIcon className="w-6 h-6 text-[#F97316]" strokeWidth={2} />
              </div>
              <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Apply Late Fee
              </h3>
              <p className="text-[#45474c] mb-4" style={{ fontSize: "0.9rem" }}>
                Apply penalty to <strong>{showLateFeeModal.name}</strong>
              </p>
              <div className="mb-6">
                <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Penalty Amount (₱)
                </label>
                <input
                  type="number"
                  value={lateFeeAmount}
                  onChange={(e) => setLateFeeAmount(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#F97316] transition-colors"
                  style={{ fontSize: "0.95rem" }}
                />
                <p className="text-[#9CA3AF] mt-2" style={{ fontSize: "0.75rem" }}>
                  This will also reduce their trust score by 5 points
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLateFeeModal(null);
                    setLateFeeAmount("");
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#FAF9F7] text-[#111827] hover:bg-[#E2E2E3] transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApplyLateFee(showLateFeeModal.id)}
                  disabled={!lateFeeAmount || isNaN(Number(lateFeeAmount))}
                  className="flex-1 py-3 rounded-xl bg-[#F97316] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EA580C] transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Apply Fee
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
