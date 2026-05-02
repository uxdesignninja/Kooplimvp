import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  Wallet,
  ChevronRight,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import type { Goal } from "./GoalsScreen";

interface Props {
  goal: Goal;
  onBack: () => void;
  onPaymentComplete: () => void;
}

type PaymentStep = "select" | "processing" | "success";
type PaymentMethod = "gcash" | "maya" | null;

const paymentMethods = [
  {
    id: "gcash" as const,
    name: "GCash",
    description: "Pay via GCash app",
    color: "#0052E0",
    bgColor: "rgba(0,82,224,0.1)",
    initial: "G",
  },
  {
    id: "maya" as const,
    name: "Maya",
    description: "Pay via Maya app",
    color: "#141B2C",
    bgColor: "rgba(20,27,44,0.05)",
    initial: "M",
  },
];

export function PaluwagangPaymentScreen({ goal, onBack, onPaymentComplete }: Props) {
  const [step, setStep] = useState<PaymentStep>("select");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const monthlyTarget = goal.monthlyTarget || 0;
  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleComplete = () => {
    onPaymentComplete();
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <AnimatePresence mode="wait">
        {step === "select" && (
          <motion.div
            key="select"
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
                  Pay Monthly Share
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  Choose your payment method
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
              {/* Payment Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#4CAF50] to-[#45A049] rounded-3xl p-6 text-white"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5" strokeWidth={2} />
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.9 }}>
                    {goal.name}
                  </p>
                </div>
                <p className="text-white/80 mb-2" style={{ fontSize: "0.9rem" }}>
                  Monthly Contribution for
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>
                      ₱{monthlyTarget.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 opacity-80" strokeWidth={2} />
                      <p className="opacity-90" style={{ fontSize: "0.85rem" }}>
                        {currentMonth}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Select Payment Method
                </h3>
                <div className="space-y-3">
                  {paymentMethods.map((method, idx) => (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] hover:border-[#1565C0]/40 transition-all flex items-center justify-between"
                      style={{ boxShadow: "0px 4px 16px 0px rgba(20, 27, 44, 0.04)" }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: method.bgColor }}
                        >
                          <span
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: method.color,
                            }}
                          >
                            {method.initial}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                            {method.name}
                          </p>
                          <p className="text-[#45474C]" style={{ fontSize: "0.8rem" }}>
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#76777D]" strokeWidth={2} />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Info Notice */}
              <div className="flex items-start gap-3 p-4 bg-[#1565C0]/5 rounded-xl border border-[#1565C0]/10">
                <AlertCircle className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[#111827]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  Your payment will be securely processed and your contribution will be recorded immediately.
                </p>
              </div>
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
              className="w-20 h-20 rounded-full border-4 border-[#1565C0]/20 border-t-[#1565C0] mb-6"
            />
            <p className="text-[#111827] mb-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              Processing Payment...
            </p>
            <p className="text-muted-foreground text-center" style={{ fontSize: "0.9rem" }}>
              Please wait while we securely process your ₱{monthlyTarget.toLocaleString()} contribution
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-14 h-14 text-[#4CAF50]" strokeWidth={2} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#111827] text-center mb-2"
                style={{ fontSize: "1.5rem", fontWeight: 700 }}
              >
                Payment Successful! 🎉
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground text-center mb-8"
                style={{ fontSize: "0.95rem" }}
              >
                Your monthly contribution has been recorded
              </motion.p>

              {/* Payment Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] mb-8"
                style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Group
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {goal.name}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Amount
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      ₱{monthlyTarget.toLocaleString()}
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
                  <div className="flex justify-between">
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      Payment Method
                    </p>
                    <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {selectedMethod === "gcash" ? "GCash" : "Maya"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/10 rounded-2xl px-6 py-3 border border-[#4CAF50]/30"
              >
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                  <p className="text-[#4CAF50]" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                    Keep up the great savings habit! 🌟
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Done Button */}
            <div className="px-6 pb-8">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl text-white"
                style={{
                  backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
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
