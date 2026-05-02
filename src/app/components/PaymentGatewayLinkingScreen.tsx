import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  Wallet,
  ChevronRight,
  AlertCircle,
  Shield,
  Link as LinkIcon,
  Edit3,
} from "lucide-react";

interface Props {
  onBack: () => void;
  onComplete: (gateway: PaymentGatewayInfo) => void;
  currentGateway?: PaymentGatewayInfo | null;
}

export interface PaymentGatewayInfo {
  type: "gcash" | "maya";
  accountName: string;
  accountNumber: string;
}

type Step = "select" | "form" | "success";
type GatewayType = "gcash" | "maya" | null;

const gatewayOptions = [
  {
    id: "gcash" as const,
    name: "GCash",
    description: "Link your GCash account",
    color: "#0052E0",
    bgColor: "rgba(0,82,224,0.1)",
    initial: "G",
    placeholder: "09XX XXX XXXX",
  },
  {
    id: "maya" as const,
    name: "Maya",
    description: "Link your Maya account",
    color: "#141B2C",
    bgColor: "rgba(20,27,44,0.05)",
    initial: "M",
    placeholder: "09XX XXX XXXX",
  },
];

export function PaymentGatewayLinkingScreen({ onBack, onComplete, currentGateway }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [selectedType, setSelectedType] = useState<GatewayType>(currentGateway?.type || null);
  const [accountName, setAccountName] = useState(currentGateway?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(currentGateway?.accountNumber || "");

  const selectedGateway = gatewayOptions.find((g) => g.id === selectedType);

  const handleGatewaySelect = (type: GatewayType) => {
    setSelectedType(type);
    // If switching to a different gateway type, clear the form
    if (currentGateway && type !== currentGateway.type) {
      setAccountName("");
      setAccountNumber("");
    }
    setStep("form");
  };

  const handleSubmit = () => {
    if (selectedType && accountName && accountNumber) {
      setStep("success");
      setTimeout(() => {
        onComplete({
          type: selectedType,
          accountName,
          accountNumber,
        });
      }, 2000);
    }
  };

  const isFormValid = accountName.trim() && accountNumber.trim();

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
                  Link Payment Gateway
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  Receive payouts directly to your account
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-5">
              {/* Info Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] rounded-3xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <LinkIcon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.9 }}>
                      Secure Setup
                    </p>
                    <p style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                      Choose Your Gateway
                    </p>
                  </div>
                </div>
                <p className="text-white/80" style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                  Link your preferred payment gateway to receive your Paluwagan payouts seamlessly when it's your turn.
                </p>
              </motion.div>

              {/* Gateway Options */}
              <div>
                <h3 className="text-[#111827] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Select Payment Gateway
                </h3>
                <div className="space-y-3">
                  {gatewayOptions.map((gateway, idx) => (
                    <motion.button
                      key={gateway.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGatewaySelect(gateway.id)}
                      className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)] hover:border-[#1565C0]/40 transition-all flex items-center justify-between"
                      style={{ boxShadow: "0px 4px 16px 0px rgba(20, 27, 44, 0.04)" }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: gateway.bgColor }}
                        >
                          <span
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: gateway.color,
                            }}
                          >
                            {gateway.initial}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                            {gateway.name}
                          </p>
                          <p className="text-[#45474C]" style={{ fontSize: "0.8rem" }}>
                            {gateway.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#76777D]" strokeWidth={2} />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 bg-[#4CAF50]/5 rounded-xl border border-[#4CAF50]/10">
                <Shield className="w-5 h-5 text-[#4CAF50] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[#111827]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  Your payment information is encrypted and secure. We never share your details with third parties.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === "form" && selectedGateway && (
          <motion.div
            key="form"
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
                onClick={() => setStep("select")}
                className="flex items-center gap-2 mb-4 text-[#111827] hover:text-[#1565C0] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
              </motion.button>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: selectedGateway.bgColor }}
                >
                  <span style={{ fontSize: "1.125rem", fontWeight: 700, color: selectedGateway.color }}>
                    {selectedGateway.initial}
                  </span>
                </div>
                <div>
                  <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    Link {selectedGateway.name}
                  </h1>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Enter your account details
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 mt-4"
              >
                {/* Account Name */}
                <div>
                  <label className="block text-[#111827] mb-2" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    className="w-full px-4 py-3.5 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none transition-all"
                    style={{ fontSize: "0.95rem" }}
                  />
                  <p className="text-muted-foreground mt-1.5" style={{ fontSize: "0.75rem" }}>
                    Name as registered on your {selectedGateway.name} account
                  </p>
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-[#111827] mb-2" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={selectedGateway.placeholder}
                    className="w-full px-4 py-3.5 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none transition-all"
                    style={{ fontSize: "0.95rem" }}
                  />
                  <p className="text-muted-foreground mt-1.5" style={{ fontSize: "0.75rem" }}>
                    11-digit mobile number linked to {selectedGateway.name}
                  </p>
                </div>

                {/* Info Notice */}
                <div className="flex items-start gap-3 p-4 bg-[#1565C0]/5 rounded-xl border border-[#1565C0]/10">
                  <AlertCircle className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="text-[#111827]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                    Double-check your details. Incorrect information may delay or prevent your payout.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <div className="px-6 pb-8 shrink-0">
              <motion.button
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full py-4 rounded-2xl text-white transition-all"
                style={{
                  backgroundColor: isFormValid ? "#1565C0" : "#9CA3AF",
                  boxShadow: isFormValid ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
              >
                Save Details
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === "success" && selectedGateway && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-6"
          >
            {/* Confetti Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-14 h-14 text-[#4CAF50]" strokeWidth={2} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#111827] text-center mb-2"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            >
              Gateway Linked! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-center mb-8"
              style={{ fontSize: "0.95rem" }}
            >
              You're all set to receive payouts via {selectedGateway.name}
            </motion.p>

            {/* Gateway Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-white rounded-2xl p-5 border border-[rgba(198,198,205,0.15)]"
              style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: selectedGateway.bgColor }}
                >
                  <span style={{ fontSize: "1.125rem", fontWeight: 700, color: selectedGateway.color }}>
                    {selectedGateway.initial}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[#111827]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {selectedGateway.name}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    Linked Account
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-3 border-t border-[rgba(17,24,39,0.05)]">
                <div className="flex justify-between">
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Name
                  </p>
                  <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                    {accountName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Number
                  </p>
                  <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                    {accountNumber}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
