import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Target,
  Plus,
  Users,
  User,
  TrendingUp,
  Sparkles,
  ChevronRight,
  X,
  ChevronDown,
  Pencil,
  Trash2,
  CheckCircle,
  UserPlus,
  ArrowLeft,
  MoreVertical,
  Wallet,
  Calendar,
  AlertCircle,
  ScanLine,
  Clock,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";
import { DateRangePicker } from "./DateRangePicker";
import { PaluwagangDetailScreen } from "./PaluwagangDetailScreen";
import { PaluwagangPaymentScreen } from "./PaluwagangPaymentScreen";
import { AddMembersScreen } from "./AddMembersScreen";

export interface GoalMember {
  id: string;
  name: string;
  monthlyContributions: { [month: number]: number }; // month index (0-11) -> amount paid
  payoutOrder?: number; // Order in which member receives payout (0-based)
  trustScore?: number; // 0-100 score based on payment history
  penaltyCount?: number; // Number of late payments
  isPending?: boolean; // Payment verification pending
  paymentHistory?: { month: number; amount: number; date: string; status: "approved" | "pending" | "rejected" }[];
  paymentGateway?: { type: "gcash" | "maya"; accountName: string; accountNumber: string } | null; // Linked payment gateway for receiving payouts
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  type: "individual" | "group";
  category?: "paluwagan" | "targeted";
  createdAt: string;
  color: string;
  durationMonths?: number; // For Paluwagan, e.g., 12 months
  monthlyTarget?: number; // Expected amount per month
  members?: GoalMember[]; // For group/paluwagan goals
  contributions?: { date: string; amount: number; note?: string }[]; // Contribution history
  adminId?: string; // User ID of group admin
  currentUserId?: string; // Current logged-in user ID
  isActive?: boolean; // Whether the group is active or closed
  penaltyEnabled?: boolean; // Whether penalties are enabled for late payments
  penaltyAmount?: number; // Penalty amount for late payment
}

interface Props {
  goals: Goal[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onAddGoal?: (goal: Goal) => void;
  onUpdateGoal?: (goal: Goal) => void;
  onDeleteGoal?: (id: string) => void;
}

const goalColors = ["#4CAF50", "#1565C0", "#F97316", "#0EA5E9", "#8B5CF6", "#EC4899"];

function getGoalColor(index: number) {
  return goalColors[index % goalColors.length];
}

export function GoalsScreen({ goals, activeTab, onTabChange, onAddGoal, onUpdateGoal, onDeleteGoal }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdGoalData, setCreatedGoalData] = useState<{
    name: string;
    amount: number;
    category: "paluwagan" | "targeted";
    type: "individual" | "group";
  } | null>(null);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deleteConfirmGoal, setDeleteConfirmGoal] = useState<Goal | null>(null);
  const [showComingSoonToast, setShowComingSoonToast] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  // Paluwagan detail view state
  const [paluwagangDetailGoal, setPaluwagangDetailGoal] = useState<Goal | null>(null);
  const [paluwagangPaymentGoal, setPaluwagangPaymentGoal] = useState<Goal | null>(null);

  // Member management state
  const [showAddMembersScreen, setShowAddMembersScreen] = useState(false);
  const [addMembersGoal, setAddMembersGoal] = useState<Goal | null>(null);

  // Ellipses menu state
  const [menuOpenGoalId, setMenuOpenGoalId] = useState<string | null>(null);

  // Add contribution state
  const [showAddContribution, setShowAddContribution] = useState<string | null>(null); // goal ID
  const [contributionAmount, setContributionAmount] = useState("");
  const [contributionNote, setContributionNote] = useState("");

  // Form state
  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formCategory, setFormCategory] = useState<"paluwagan" | "targeted">("paluwagan");
  const [formType, setFormType] = useState<"individual" | "group">("group");
  const [formStartDate, setFormStartDate] = useState<Date | null>(null);
  const [formEndDate, setFormEndDate] = useState<Date | null>(null);
  const [durationPreset, setDurationPreset] = useState<"1week" | "1month" | "1year" | "custom" | null>(null);

  const openCreateModal = () => {
    setEditingGoal(null);
    setFormName("");
    setFormAmount("");
    setFormCategory("paluwagan");
    setFormType("group");
    setFormStartDate(null);
    setFormEndDate(null);
    setDurationPreset(null);
    setShowModal(true);
  };

  const handleDurationPreset = (preset: "1week" | "1month" | "1year") => {
    setDurationPreset(preset);
    const startDate = new Date();
    const endDate = new Date();

    if (preset === "1week") {
      endDate.setDate(startDate.getDate() + 7);
    } else if (preset === "1month") {
      endDate.setMonth(startDate.getMonth() + 1);
    } else if (preset === "1year") {
      endDate.setFullYear(startDate.getFullYear() + 1);
    }

    setFormStartDate(startDate);
    setFormEndDate(endDate);
  };

  const openEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setFormName(goal.name);
    setFormAmount(String(goal.targetAmount));
    setDurationPreset("custom"); // Set to custom when editing existing goal
    setFormCategory("paluwagan");
    setFormType(goal.type);
    setFormStartDate(null);
    setFormEndDate(null);
    setShowModal(true);
    setSelectedGoal(null);
  };

  const handleSave = () => {
    if (!canSave) return;
    if (editingGoal) {
      onUpdateGoal?.({
        ...editingGoal,
        name: formName,
        targetAmount: Number(formAmount),
        type: formType,
        createdAt: formStartDate
          ? formStartDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : editingGoal.createdAt,
      });
    } else {
      // For Paluwagan, always set type to "group" since it's a multi-member goal
      const goalType = formCategory === "paluwagan" ? "group" : formType;
      
      const goal: Goal = {
        id: crypto.randomUUID(),
        name: formName,
        targetAmount: Number(formAmount),
        currentAmount: 0,
        type: goalType,
        category: formCategory,
        createdAt: formStartDate
          ? formStartDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        color: goalColors[goals.length % goalColors.length],
      };
      onAddGoal?.(goal);
      setCreatedGoalData({
        name: formName,
        amount: Number(formAmount),
        category: formCategory,
        type: goalType,
      });
      setShowSuccessModal(true);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (deleteConfirmGoal) {
      onDeleteGoal?.(deleteConfirmGoal.id);
      setDeleteConfirmGoal(null);
      setSelectedGoal(null);
      setMenuOpenGoalId(null);
    }
  };

  const handleAddContribution = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || !contributionAmount) return;

    const amount = Number(contributionAmount);
    if (isNaN(amount) || amount <= 0) return;

    const updatedGoal: Goal = {
      ...goal,
      currentAmount: goal.currentAmount + amount,
      contributions: [
        ...(goal.contributions || []),
        {
          date: new Date().toISOString(),
          amount,
          note: contributionNote || undefined,
        },
      ],
    };

    onUpdateGoal?.(updatedGoal);
    setContributionAmount("");
    setContributionNote("");
    setShowAddContribution(null);
    // Don't close the card - let user close it manually with Close button
  };

  const canSave =
    formName.trim().length > 0 &&
    Number(formAmount) > 0 &&
    formStartDate !== null &&
    formEndDate !== null;

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // Separate personal and Paluwagan
  const personalGoals = goals.filter(g => g.category !== "paluwagan");
  const paluwagangGoals = goals.filter(g => g.category === "paluwagan");
  const personalSaved = personalGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const personalTarget = personalGoals.reduce((sum, g) => sum + g.targetAmount, 0);
  const personalProgress = personalTarget > 0 ? (personalSaved / personalTarget) * 100 : 0;

  // Calculate Paluwagan stats
  const currentMonth = new Date().getMonth();
  let totalReceived = 0;
  let totalContributed = 0;

  paluwagangGoals.forEach(goal => {
    const members = goal.members || [];
    const currentUserMember = members.find(m => m.id === goal.currentUserId);

    if (currentUserMember) {
      // Calculate contributed (all monthly contributions)
      Object.values(currentUserMember.monthlyContributions).forEach((amount) => {
        totalContributed += amount;
      });

      // Calculate received (user receives full pot on their payout month)
      const userPayoutOrder = currentUserMember.payoutOrder || 0;
      const monthlyTarget = goal.monthlyTarget || 0;
      const totalMembers = members.length;

      // Check which months user has already received payout
      for (let month = 0; month <= currentMonth; month++) {
        const receiverIndex = month % totalMembers;
        const receiver = members.sort((a, b) => (a.payoutOrder || 0) - (b.payoutOrder || 0))[receiverIndex];
        if (receiver?.id === goal.currentUserId) {
          // User received payout this month
          totalReceived += monthlyTarget * totalMembers;
        }
      }
    }
  });

  const netGain = totalReceived - totalContributed;

  // Generate last 6 months data for mini chart
  const last6MonthsPayouts = Array.from({ length: 6 }, (_, i) => {
    const month = currentMonth - (5 - i);
    let received = 0;

    paluwagangGoals.forEach(goal => {
      const members = goal.members || [];
      const currentUserMember = members.find(m => m.id === goal.currentUserId);
      if (currentUserMember) {
        const totalMembers = members.length;
        const receiverIndex = month % totalMembers;
        const receiver = members.sort((a, b) => (a.payoutOrder || 0) - (b.payoutOrder || 0))[receiverIndex];
        if (receiver?.id === goal.currentUserId && month >= 0 && month <= currentMonth) {
          received += (goal.monthlyTarget || 0) * totalMembers;
        }
      }
    });

    return received;
  });

  const maxPayout = Math.max(...last6MonthsPayouts, 1);

  const isEditing = editingGoal !== null;

  // Show Add Members screen
  if (showAddMembersScreen && addMembersGoal) {
    return (
      <AddMembersScreen
        onBack={() => {
          setShowAddMembersScreen(false);
          setAddMembersGoal(null);
        }}
        members={addMembersGoal.members || []}
        onAddMember={(member) => {
          const updatedGoal = {
            ...addMembersGoal,
            members: [...(addMembersGoal.members || []), member],
          };
          setAddMembersGoal(updatedGoal);
          onUpdateGoal?.(updatedGoal);
        }}
        onUpdateMember={(updatedMember) => {
          const updatedGoal = {
            ...addMembersGoal,
            members: (addMembersGoal.members || []).map((m) =>
              m.id === updatedMember.id ? updatedMember : m
            ),
          };
          setAddMembersGoal(updatedGoal);
          onUpdateGoal?.(updatedGoal);
        }}
        onRemoveMember={(memberId) => {
          const updatedGoal = {
            ...addMembersGoal,
            members: (addMembersGoal.members || []).filter((m) => m.id !== memberId),
          };
          setAddMembersGoal(updatedGoal);
          onUpdateGoal?.(updatedGoal);
        }}
      />
    );
  }

  // Show Paluwagan payment screen
  if (paluwagangPaymentGoal) {
    return (
      <PaluwagangPaymentScreen
        goal={paluwagangPaymentGoal}
        onBack={() => setPaluwagangPaymentGoal(null)}
        onPaymentComplete={() => {
          setPaluwagangPaymentGoal(null);
          setPaluwagangDetailGoal(null);
          // Update goal with new contribution (this would be handled by backend)
        }}
      />
    );
  }

  // Show Paluwagan detail screen if a Paluwagan goal is selected
  if (paluwagangDetailGoal) {
    return (
      <PaluwagangDetailScreen
        goal={paluwagangDetailGoal}
        onBack={() => setPaluwagangDetailGoal(null)}
        onPayMonthlyShare={() => {
          setPaluwagangPaymentGoal(paluwagangDetailGoal);
        }}
        onUpdate={(updatedGoal) => {
          if (onUpdateGoal) {
            onUpdateGoal(updatedGoal);
          }
          setPaluwagangDetailGoal(updatedGoal);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <style>{`
        /* Contribution slider styling */
        input[type="range"].contribution-slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
          transition: transform 0.1s ease;
        }
        input[type="range"].contribution-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"].contribution-slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
        }
        input[type="range"].contribution-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
          transition: transform 0.1s ease;
        }
        input[type="range"].contribution-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"].contribution-slider::-moz-range-thumb:active {
          transform: scale(1.05);
        }
      `}</style>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0"
      >
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange("home")}
            className="flex items-center gap-2 text-[#111827] hover:text-[#1565C0] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={openCreateModal}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all"
            style={{ backgroundColor: "#1565C0", boxShadow: "0 4px 14px rgba(10,10,111,0.25)" }}
            aria-label="Create Goal"
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2} />
          </motion.button>
        </div>
        <div>
          <p className="text-[#111827]" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Finance Goals
          </p>
          <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>
            {goals.length === 0 ? "Start saving towards something meaningful." : `${goals.length} active goal${goals.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
        {/* Overview Card - Smart Conditional Display */}
        {goals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 bg-gradient-to-br from-[#1565C0] to-[#1a1a8f] rounded-2xl text-white"
          >
            {/* Paluwagan-only or Both views */}
            {paluwagangGoals.length > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                  <span className="text-white/70" style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {personalGoals.length > 0 ? 'Savings Overview' : 'Paluwagan Performance'}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-white/60 mb-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Received</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2 }}>
                      ₱{totalReceived.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-white/60 mb-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contributed</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2 }}>
                      ₱{totalContributed.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-white/60 mb-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Gain</p>
                    <p className={netGain >= 0 ? "text-[#4CAF50]" : "text-[#EF4444]"} style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2 }}>
                      {netGain >= 0 ? '+' : ''}₱{netGain.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Mini Bar Chart - Last 6 Months */}
                <div className="mb-4">
                  <p className="text-white/70 mb-2" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    Last 6 Months Payouts
                  </p>
                  <div className="flex items-end gap-1.5 h-12">
                    {last6MonthsPayouts.map((amount, idx) => {
                      const height = maxPayout > 0 ? (amount / maxPayout) * 100 : 0;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
                          className="flex-1 bg-gradient-to-t from-[#4CAF50] to-[#66BB6A] rounded-t-sm min-h-[4px]"
                          title={`₱${amount.toLocaleString()}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Summary */}
                {personalGoals.length > 0 ? (
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-white/60" style={{ fontSize: '0.7rem' }}>Personal</p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>₱{personalSaved.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60" style={{ fontSize: '0.7rem' }}>Paluwagan</p>
                      <p className="text-[#4CAF50]" style={{ fontSize: '0.95rem', fontWeight: 700 }}>₱{totalReceived.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/70 text-center" style={{ fontSize: '0.8rem' }}>
                      {paluwagangGoals.length} Active Group{paluwagangGoals.length !== 1 ? 's' : ''} · Next payout: {new Date(0, currentMonth + 1).toLocaleString('default', { month: 'long' })}
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Personal Goals Only View */
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                  <span className="text-white/70" style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>My Savings Overview</span>
                </div>

                <div className="mb-4">
                  <p className="text-white/60 mb-1" style={{ fontSize: '0.75rem' }}>Personal Savings</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>
                    ₱{personalSaved.toLocaleString()}
                  </p>
                  <p className="text-white/50 mt-0.5" style={{ fontSize: '0.75rem' }}>
                    of ₱{personalTarget.toLocaleString()} target
                  </p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/70" style={{ fontSize: '0.8rem' }}>{personalGoals.length} Active Goal{personalGoals.length !== 1 ? 's' : ''}</p>
                  <p className="text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {personalProgress.toFixed(0)}%
                  </p>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(personalProgress, 100)}%` }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#4CAF50] to-[#5cbf6a] rounded-full"
                  />
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Section Header for Goals List */}
        {goals.length > 0 && (
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {paluwagangGoals.length > 0 && personalGoals.length > 0 ? "All Goals" : paluwagangGoals.length > 0 ? "Paluwagan Groups" : "My Goals"}
            </h3>
          </div>
        )}

        {/* Join Paluwagan Group CTA */}
        {goals.length > 0 && paluwagangGoals.length === 0 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setComingSoonMessage("QR scanner for joining Paluwagan groups");
              setShowComingSoonToast(true);
              setTimeout(() => setShowComingSoonToast(false), 2000);
            }}
            className="w-full bg-white rounded-2xl p-5 border-2 border-dashed border-[#4CAF50]/30 hover:border-[#4CAF50]/50 transition-all text-left"
            style={{ boxShadow: "0px 4px 20px 0px rgba(76, 175, 80, 0.08)" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                <ScanLine className="w-7 h-7 text-[#4CAF50]" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Join a Paluwagan Group
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  Save together with friends and family
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
            </div>
          </motion.button>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center text-center py-12"
          >
            <div className="w-20 h-20 rounded-3xl bg-[rgba(10,10,111,0.06)] flex items-center justify-center mb-5">
              <Target className="w-9 h-9 text-[#1565C0]/40" strokeWidth={1.5} />
            </div>
            <p className="text-[#111827] mb-2" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
              Start Your Savings Journey
            </p>
            <p className="text-muted-foreground max-w-[260px] mb-6" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
              Create personal goals or join a Paluwagan group to save together with friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary: Create a Goal */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={openCreateModal}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white transition-all"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  boxShadow: "0 6px 20px rgba(21,101,192,0.3)"
                }}
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                Create a Goal
              </motion.button>
              {/* Tertiary: Join a Group */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setComingSoonMessage("QR scanner for joining Paluwagan groups");
                  setShowComingSoonToast(true);
                  setTimeout(() => setShowComingSoonToast(false), 2000);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[#4CAF50] border border-[#4CAF50]/30 hover:border-[#4CAF50]/50 hover:bg-[#F1F8F4] transition-all bg-white"
                style={{ fontSize: '0.9rem', fontWeight: 600 }}
              >
                <ScanLine className="w-4 h-4" strokeWidth={2} />
                Join a Group
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Goals List */}
        <AnimatePresence>
          {goals.map((goal, index) => {
            const progress = goal.targetAmount > 0
              ? (goal.currentAmount / goal.targetAmount) * 100
              : 0;
            const color = goal.color || getGoalColor(index);
            const isDemo = goal.id.startsWith('demo-');

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                whileHover={{ y: -3, boxShadow: "0px 8px 30px 0px rgba(20, 27, 44, 0.08)" }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="w-full text-left bg-white rounded-2xl transition-all"
                style={{
                  boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
                  border: "1px solid rgba(198, 198, 205, 0.15)",
                  overflow: "visible",
                  background: "white",
                }}
              >
                <div
                  onClick={() => {
                    if (goal.category === "paluwagan") {
                      setPaluwagangDetailGoal(goal);
                    } else {
                      setSelectedGoal(selectedGoal?.id === goal.id ? null : goal);
                    }
                  }}
                  className="w-full text-left hover:bg-[rgba(17,24,39,0.01)] transition-colors cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Target className="w-7 h-7" strokeWidth={1.5} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#111827] mb-1" style={{ fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.2 }}>
                          {goal.name}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {goal.category === "paluwagan" ? (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#4CAF50]/10 rounded-full">
                              <Users className="w-3 h-3 text-[#4CAF50]" strokeWidth={2} />
                              <span className="text-[#4CAF50]" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Paluwagan</span>
                            </div>
                          ) : goal.type === "group" ? (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#1565C0]/6 rounded-full">
                              <Users className="w-3 h-3 text-[#1565C0]" strokeWidth={2} />
                              <span className="text-[#1565C0]" style={{ fontSize: '0.7rem', fontWeight: 600 }}>Group</span>
                            </div>
                          ) : null}
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color }}>
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="relative shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenGoalId(menuOpenGoalId === goal.id ? null : goal.id);
                          }}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.05)] transition-colors"
                          aria-label="Menu"
                        >
                          <MoreVertical className="w-5 h-5 text-[#45474c]" strokeWidth={2} />
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {menuOpenGoalId === goal.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-[rgba(17,24,39,0.08)] overflow-hidden z-50"
                              style={{ minWidth: "180px" }}
                            >
                              <motion.button
                                whileHover={{ backgroundColor: "rgba(17,24,39,0.03)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(goal);
                                  setMenuOpenGoalId(null);
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors border-b border-[rgba(17,24,39,0.06)]"
                              >
                                <Pencil className="w-4 h-4 text-[#1565C0]" strokeWidth={1.5} />
                                <span className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                                  Edit Goal
                                </span>
                              </motion.button>
                              <motion.button
                                whileHover={{ backgroundColor: "rgba(17,24,39,0.03)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirmGoal(goal);
                                  setMenuOpenGoalId(null);
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                                <span className="text-red-500" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                                  Delete Goal
                                </span>
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="text-[#45474c]" style={{ fontSize: '0.875rem' }}>
                      ₱{goal.currentAmount.toLocaleString()} of ₱{goal.targetAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-5 pb-3">
                    <div className="w-full h-2 bg-[rgba(17,24,39,0.05)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ delay: 0.3 + index * 0.08, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}90)` }}
                      />
                    </div>
                  </div>

                  {/* View Details for Paluwagan */}
                  {goal.category === "paluwagan" && (
                    <div className="px-5 pb-4 pt-2 border-t border-[rgba(17,24,39,0.04)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-[#45474c]">
                            <Users className="w-4 h-4" strokeWidth={2} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                              {goal.members?.length || 0} {goal.members?.length === 1 ? 'member' : 'members'}
                            </span>
                          </div>
                          {/* Pending Verification Badge (Admin Only) */}
                          {goal.adminId === goal.currentUserId && goal.members?.some(m => m.isPending) && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FFA726]/10 rounded-full">
                              <Clock className="w-3 h-3 text-[#FFA726]" strokeWidth={2} />
                              <span className="text-[#FFA726]" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                                {goal.members.filter(m => m.isPending).length} pending
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[#1565C0]">
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>View Details</span>
                          <ChevronRight className="w-4 h-4" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedGoal?.id === goal.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-[rgba(17,24,39,0.04)]">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="bg-[#FAF9F7] rounded-xl p-3">
                            <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>Remaining</p>
                            <p className="text-[#111827]" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                              ₱{(goal.targetAmount - goal.currentAmount).toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-[#FAF9F7] rounded-xl p-3">
                            <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>Type</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {goal.type === "individual" ? (
                                <User className="w-3 h-3 text-[#111827]" strokeWidth={1.5} />
                              ) : (
                                <Users className="w-3 h-3 text-[#111827]" strokeWidth={1.5} />
                              )}
                              <p className="text-[#111827] capitalize" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                                {goal.type}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#FAF9F7] rounded-xl p-3">
                            <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>Created</p>
                            <p className="text-[#111827]" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                              {goal.createdAt}
                            </p>
                          </div>
                        </div>

                        {/* AI tip */}
                        <div className="flex items-start gap-2.5 p-3 bg-gradient-to-br from-[#1565C0]/4 to-[#2d2d9e]/4 rounded-xl mb-3">
                          <Sparkles className="w-4 h-4 text-[#1565C0] shrink-0 mt-0.5" strokeWidth={1.5} />
                          <p className="text-muted-foreground" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                            Save ₱{Math.ceil((goal.targetAmount - goal.currentAmount) / 12).toLocaleString()}/mo to reach this goal in 12 months.
                          </p>
                        </div>

                        {/* Add Contribution Section */}
                        <div className="p-5 pt-6 pb-6 bg-[rgba(21,101,192,0.02)] rounded-xl border-t border-[rgba(17,24,39,0.06)]">
                          <div className="flex items-center gap-2 mb-4">
                            <Wallet className="w-5 h-5 text-[#1565C0]" strokeWidth={1.5} />
                            <h3 className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                              Add Contribution
                            </h3>
                          </div>

                          <div className="space-y-4">
                            {/* Amount Slider */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-[#45474c]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                                  Amount
                                </label>
                                <motion.p
                                  key={contributionAmount}
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                  style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1, color: "#4CAF50" }}
                                >
                                  ₱{contributionAmount || "0"}
                                </motion.p>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max={goal.targetAmount - goal.currentAmount}
                                step="50"
                                value={contributionAmount || "0"}
                                onChange={(e) => setContributionAmount(e.target.value)}
                                className="contribution-slider w-full h-2 rounded-full appearance-none cursor-pointer"
                                style={{
                                  background: contributionAmount
                                    ? `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${
                                        (parseFloat(contributionAmount) / (goal.targetAmount - goal.currentAmount)) * 100
                                      }%, rgba(17,24,39,0.1) ${
                                        (parseFloat(contributionAmount) / (goal.targetAmount - goal.currentAmount)) * 100
                                      }%, rgba(17,24,39,0.1) 100%)`
                                    : "rgba(17,24,39,0.1)",
                                }}
                              />
                            </div>

                            {/* Note Input */}
                            <div>
                              <label className="text-[#45474c] block mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                                Note (Optional)
                              </label>
                              <input
                                type="text"
                                value={contributionNote}
                                onChange={(e) => setContributionNote(e.target.value)}
                                placeholder="e.g. Monthly contribution"
                                className="w-full px-4 py-3 bg-white rounded-lg border border-[rgba(17,24,39,0.08)] text-[#111827] placeholder:text-[#B0B3BE] focus:outline-none focus:border-[#1565C0] transition-colors"
                                style={{ fontSize: "0.9rem" }}
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-4 pt-2">
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setContributionAmount("");
                                  setContributionNote("");
                                  setSelectedGoal(null);
                                }}
                                className="text-[#45474c] hover:text-[#111827] transition-colors px-3"
                                style={{ fontSize: "0.95rem", fontWeight: 600 }}
                              >
                                Close
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddContribution(goal.id);
                                }}
                                disabled={!contributionAmount || parseFloat(contributionAmount) === 0}
                                className="py-3 px-6 rounded-xl text-white disabled:opacity-50"
                                style={{
                                  backgroundColor: "#1565C0",
                                  fontSize: "0.9rem",
                                  fontWeight: 600,
                                  boxShadow: "0 4px 14px rgba(10,10,111,0.25)",
                                }}
                              >
                                Add Contribution
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Create / Edit Goal Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full sm:max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[rgba(17,24,39,0.06)]">
                <h3 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {isEditing ? "Edit Goal" : "Create New Goal"}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
                >
                  <X className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(90vh - 140px)" }}>
                {/* Goal Name */}
                <div>
                  <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    Goal name
                  </label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Emergency fund"
                    className="w-full px-4 py-4 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                {/* Target Amount */}
                <div>
                  <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    Target amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: "1rem" }}>
                      ₱
                    </span>
                    <input
                      type="text"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value.replace(/\D/g, ""))}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-4 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                      style={{ fontSize: "1rem" }}
                    />
                  </div>
                </div>

                {/* Goal Category */}
                <div>
                  <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    Goal category
                  </label>
                  <div className="w-full px-4 py-4 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] text-[#111827]" style={{ fontSize: "1rem" }}>
                    Paluwagan
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-muted-foreground block mb-3" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    Duration <span className="text-red-400">*</span>
                  </label>

                  {/* Preset Duration Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { id: "1week" as const, label: "1 Week" },
                      { id: "1month" as const, label: "1 Month" },
                      { id: "1year" as const, label: "1 Year" },
                    ].map((preset) => (
                      <motion.button
                        key={preset.id}
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDurationPreset(preset.id)}
                        className={`py-3 px-4 rounded-xl border transition-all ${
                          durationPreset === preset.id
                            ? "border-[#1565C0] bg-[#1565C0]/10 text-[#1565C0]"
                            : "border-[rgba(17,24,39,0.08)] bg-[#FAF9F7] text-[#111827] hover:border-[#1565C0]/30"
                        }`}
                        style={{ fontSize: "0.9rem", fontWeight: 600 }}
                      >
                        {preset.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom Date Button */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDurationPreset("custom");
                      setFormStartDate(null);
                      setFormEndDate(null);
                    }}
                    className={`w-full py-3 px-4 rounded-xl border transition-all mb-3 ${
                      durationPreset === "custom"
                        ? "border-[#1565C0] bg-[#1565C0]/10 text-[#1565C0]"
                        : "border-[rgba(17,24,39,0.08)] bg-[#FAF9F7] text-[#111827] hover:border-[#1565C0]/30"
                    }`}
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" strokeWidth={2} />
                      Custom Date Range
                    </div>
                  </motion.button>

                  {/* Date Range Picker - Show only when custom is selected */}
                  {durationPreset === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <DateRangePicker
                        startDate={formStartDate}
                        endDate={formEndDate}
                        onStartDateChange={(date) => {
                          setFormStartDate(date);
                        }}
                        onEndDateChange={(date) => {
                          setFormEndDate(date);
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Selected Duration Display */}
                  {durationPreset && durationPreset !== "custom" && formStartDate && formEndDate && (
                    <div className="mt-3 p-3 bg-[#4CAF50]/10 rounded-xl border border-[#4CAF50]/20">
                      <p className="text-[#4CAF50] text-center" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {formStartDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {" → "}
                        {formEndDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  )}

                  {/* Validation hint */}
                  {!formStartDate || !formEndDate ? (
                    <p className="mt-2 text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      Please select a duration to continue.
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 pb-6 pt-3">
                {/* Primary Button */}
                <motion.button
                  whileHover={{ scale: canSave ? 1.02 : 1 }}
                  whileTap={{ scale: canSave ? 0.98 : 1 }}
                  onClick={handleSave}
                  disabled={!canSave}
                  className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    backgroundColor: canSave ? "#1565C0" : "rgba(17,24,39,0.12)",
                    color: canSave ? "white" : "rgba(17,24,39,0.35)",
                    boxShadow: canSave ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
                  }}
                >
                  <Target className="w-5 h-5" strokeWidth={1.5} />
                  {isEditing ? "Save Changes" : "Create Goal"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setDeleteConfirmGoal(null)}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full sm:max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 pt-6 pb-2 text-center">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-7 h-7 text-red-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  Delete Goal?
                </h3>
                <p className="text-muted-foreground mx-auto max-w-[260px]" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                  Are you sure you want to delete <strong style={{ color: "#111827" }}>{deleteConfirmGoal.name}</strong>? This action cannot be undone.
                </p>
              </div>
              <div className="px-6 pt-4 pb-6 flex gap-3">
                {/* Tertiary: Cancel */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirmGoal(null)}
                  className="flex-1 py-3.5 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-all"
                  style={{ fontSize: "0.95rem", fontWeight: 500 }}
                >
                  Cancel
                </motion.button>
                {/* Destructive Primary: Delete */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white shadow-lg transition-all"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(239,68,68,0.25)",
                  }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && createdGoalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setShowSuccessModal(false)}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full sm:max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 pt-6 pb-2 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-[#4CAF50]" strokeWidth={2} />
                </motion.div>
                <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  Goal Created Successfully!
                </h3>
                <p className="text-muted-foreground mx-auto max-w-[280px] mb-1" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                  <strong style={{ color: "#111827" }}>{createdGoalData.name}</strong>
                </p>
                <p className="text-[#4CAF50] mx-auto" style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  ₱{createdGoalData.amount.toLocaleString()}
                </p>
                <p className="text-muted-foreground mx-auto max-w-[280px] mt-2" style={{ fontSize: "0.85rem" }}>
                  {createdGoalData.category === "paluwagan" ? "Paluwagan" : createdGoalData.type === "group" ? "Group Goal" : "Individual Goal"}
                </p>
              </div>
              <div className="px-6 pt-4 pb-6 space-y-3">
                {/* Show "Add Members" button if Paluwagan or Group Goal */}
                {(createdGoalData.category === "paluwagan" || createdGoalData.type === "group") && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Find the newly created goal
                      const newGoal = goals.find(
                        (g) =>
                          g.name === createdGoalData.name &&
                          g.targetAmount === createdGoalData.amount &&
                          g.category === createdGoalData.category
                      );
                      if (newGoal) {
                        setAddMembersGoal(newGoal);
                        setShowAddMembersScreen(true);
                        setShowSuccessModal(false);
                      }
                    }}
                    className="w-full py-3.5 rounded-2xl text-white transition-all flex items-center justify-center gap-2"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      backgroundColor: "#1565C0"
                    }}
                  >
                    <UserPlus className="w-5 h-5" strokeWidth={1.5} />
                    Add Members to this Goal
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3.5 rounded-2xl border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] transition-all"
                  style={{ fontSize: "0.95rem", fontWeight: 500 }}
                >
                  {createdGoalData.category === "paluwagan" || createdGoalData.type === "group" ? "Skip for Now" : "Done"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Toast */}
      <AnimatePresence>
        {showComingSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-5 right-5 z-50 bg-[#1565C0] text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between"
          >
            <p className="text-sm" style={{ fontSize: "0.9rem" }}>
              {comingSoonMessage}
            </p>
            <button
              onClick={() => setShowComingSoonToast(false)}
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
            >
              <X className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}