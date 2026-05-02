import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  AlertCircle,
  Users,
  Calendar,
  Sparkles,
  Trophy,
  TrendingUp,
  Link as LinkIcon,
} from "lucide-react";
import type { Goal, GoalMember } from "./GoalsScreen";

interface Props {
  goal: Goal;
  receiver: GoalMember;
  onBack: () => void;
  onPayoutComplete: () => void;
}

type PayoutStep = "confirm" | "processing" | "success";

export function PayoutProcessingScreen({ goal, receiver, onBack, onPayoutComplete }: Props) {
  const [step, setStep] = useState<PayoutStep>("confirm");
  const monthlyTarget = goal.monthlyTarget || 0;
  const totalMembers = goal.members?.length || 0;
  const payoutAmount = monthlyTarget * totalMembers;
  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Check if receiver has linked payment gateway
  const hasPaymentGateway = receiver.paymentGateway !== undefined && receiver.paymentGateway !== null;
  const gatewayName = receiver.paymentGateway?.type === "gcash" ? "GCash" : "Maya";

  const handleProcessPayout = () => {
    if (!hasPaymentGateway) {
      alert("This member hasn't linked a payment gateway yet. Please ask them to link their GCash or Maya account first.");
      return;
    }

    setStep("processing");
    // Simulate payout processing
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const handleComplete = () => {
    onPayoutComplete();
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <AnimatePresence mode="wait">
        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
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
              <div>
                <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  Process Payout
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  Send this month's payout to the receiver
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-5">
              {/* Payout Hero Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#4CAF50] to-[#45A049] rounded-3xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-8 -translate-x-8" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" strokeWidth={2} />
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.9 }}>
                      Monthly Payout
                    </p>
                  </div>
                  <p className="text-white mb-2" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>
                    ₱{payoutAmount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-80" strokeWidth={2} />
                    <p className="text-white/90" style={{ fontSize: "0.85rem" }}>
                      {currentMonth}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Receiver Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
                style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-[#FFA726]" strokeWidth={2} />
                  <h3 className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                    This Month's Receiver
                  </h3>
                </div>

                {/* Receiver Profile */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/10 border border-[#4CAF50]/20 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#4CAF50] flex items-center justify-center text-white shrink-0" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    {receiver.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                      {receiver.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#4CAF50]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                        RECEIVER
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        Trust Score: {receiver.trustScore}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Gateway Info */}
                {hasPaymentGateway ? (
                  <div className="space-y-2 pt-3 border-t border-[rgba(17,24,39,0.05)]">
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                        Payment Gateway
                      </p>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-3.5 h-3.5 text-[#4CAF50]" strokeWidth={2} />
                        <p className="text-[#4CAF50]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                          {gatewayName}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                        Account Name
                      </p>
                      <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        {receiver.paymentGateway?.accountName}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                        Account Number
                      </p>
                      <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        {receiver.paymentGateway?.accountNumber}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-4 bg-[#FFA726]/5 rounded-xl border border-[#FFA726]/20">
                    <AlertCircle className="w-5 h-5 text-[#FFA726] shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-[#FFA726] mb-1" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        No Payment Gateway Linked
                      </p>
                      <p className="text-[#111827]" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                        This member needs to link their GCash or Maya account before receiving payouts.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Collection Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
                style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
                  <h3 className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                    Collection Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Monthly Contribution
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      ₱{monthlyTarget.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Total Members
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {totalMembers}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[rgba(17,24,39,0.05)]">
                    <div className="flex justify-between">
                      <p className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                        Total Payout
                      </p>
                      <p className="text-[#4CAF50]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                        ₱{payoutAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Info Notice */}
              <div className="flex items-start gap-3 p-4 bg-[#1565C0]/5 rounded-xl border border-[#1565C0]/10">
                <AlertCircle className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[#111827]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  This payout will be sent to {receiver.name}'s linked {hasPaymentGateway ? gatewayName : "payment"} account. Please verify the details before confirming.
                </p>
              </div>
            </div>

            {/* Process Button */}
            <div className="px-6 pb-8 shrink-0">
              <motion.button
                whileHover={hasPaymentGateway ? { scale: 1.02 } : {}}
                whileTap={hasPaymentGateway ? { scale: 0.98 } : {}}
                onClick={handleProcessPayout}
                disabled={!hasPaymentGateway}
                className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all"
                style={{
                  backgroundColor: hasPaymentGateway ? "#1565C0" : "#9CA3AF",
                  boxShadow: hasPaymentGateway ? "0 6px 20px rgba(21,101,192,0.3)" : "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: hasPaymentGateway ? "pointer" : "not-allowed",
                }}
              >
                <Send className="w-5 h-5" strokeWidth={2} />
                Process Payout - ₱{payoutAmount.toLocaleString()}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border-4 border-[#4CAF50]/20 border-t-[#4CAF50] mb-6"
            />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.05, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="mb-4"
            >
              <Sparkles className="w-12 h-12 text-[#4CAF50]" strokeWidth={1.5} />
            </motion.div>
            <p className="text-[#111827] mb-2 text-center" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              Processing Payout...
            </p>
            <p className="text-muted-foreground text-center" style={{ fontSize: "0.9rem" }}>
              Sending ₱{payoutAmount.toLocaleString()} to {receiver.name}
            </p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Success Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute inset-0 bg-[#4CAF50]/20 rounded-full blur-2xl"
                />
                <div className="w-24 h-24 rounded-full bg-[#4CAF50]/10 flex items-center justify-center relative">
                  <CheckCircle2 className="w-14 h-14 text-[#4CAF50]" strokeWidth={2} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <h1 className="text-[#111827] mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                  Payout Successful! 🎉
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: "0.95rem" }}>
                  {receiver.name} has been paid
                </p>
              </motion.div>

              {/* Payout Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] mb-6"
                style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Receiver
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {receiver.name}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Amount
                    </p>
                    <p className="text-[#4CAF50]" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      ₱{payoutAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Payment Method
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {gatewayName}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Month
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {currentMonth}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/10 rounded-2xl px-6 py-4 border border-[#4CAF50]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[#4CAF50]" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                      Great job managing your group! 🌟
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      Your Paluwagan is thriving
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Done Button */}
            <div className="px-6 pb-8 shrink-0">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl text-white"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 6px 20px rgba(10,10,111,0.22)",
                }}
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
