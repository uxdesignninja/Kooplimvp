import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, CheckCircle2, Check } from "lucide-react";

interface Props {
  userEmail?: string;
  onVerify: () => void;
  onSkip: () => void;
}

export function EmailVerificationPrompt({ userEmail = "your email", onVerify, onSkip }: Props) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);

    // Show verification feedback for 1.5 seconds before proceeding
    setTimeout(() => {
      setIsVerified(true);

      // Proceed to next screen after showing success
      setTimeout(() => {
        onVerify();
      }, 800);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#FAF9F7]"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-7">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, rgba(21,101,192,0.1), rgba(10,10,111,0.15))" }}
        >
          <div className="relative">
            <Mail className="w-12 h-12 text-[#1565C0]" strokeWidth={1.5} />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center border-2 border-[#FAF9F7]"
            >
              <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-[#111827] tracking-tight mb-3" style={{ fontSize: "1.65rem", fontWeight: 700, lineHeight: 1.2 }}>
            Verify your email
          </h2>
          <p className="text-[#6B7085] mb-4" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
            We've sent a confirmation link to
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-2.5 rounded-xl bg-white border border-[rgba(17,24,39,0.08)] mb-5"
            style={{ boxShadow: "0 2px 8px rgba(20,27,44,0.04)" }}
          >
            <p className="text-[#1565C0]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              {userEmail}
            </p>
          </motion.div>
          <p className="text-[#6B7085]" style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
            Click the link in the email to verify your account and unlock all features.
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm px-4 py-3.5 rounded-xl border border-[rgba(21,101,192,0.15)] mb-8"
          style={{ backgroundColor: "rgba(21,101,192,0.04)" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 shrink-0 mt-0.5">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                💡
              </motion.div>
            </div>
            <p className="text-[#1565C0] flex-1" style={{ fontSize: "0.8rem", lineHeight: 1.5, fontWeight: 500 }}>
              Check your inbox and spam folder. The email should arrive within a few minutes.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="flex flex-col gap-4">
            {/* Primary: Verify Email */}
            <motion.button
              whileHover={{ scale: !isVerifying ? 1.02 : 1, y: !isVerifying ? -2 : 0 }}
              whileTap={{ scale: !isVerifying ? 0.98 : 1 }}
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full py-4 rounded-2xl text-white transition-all flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                backgroundColor: isVerified ? "#4CAF50" : "#1565C0",
                fontSize: "1.0625rem",
                fontWeight: 600,
                boxShadow: isVerified ? "0 4px 12px rgba(76,175,80,0.25)" : "0 4px 12px rgba(21,101,192,0.25)",
              }}
            >
              <AnimatePresence mode="wait">
                {isVerifying && !isVerified ? (
                  <motion.div
                    key="verifying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Verifying...
                  </motion.div>
                ) : isVerified ? (
                  <motion.div
                    key="verified"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </motion.div>
                    Email Verified
                  </motion.div>
                ) : (
                  <motion.div
                    key="verify"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Verify Email
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Tertiary: Text-only Skip */}
            {!isVerifying && (
              <motion.button
                initial={{ opacity: 1 }}
                animate={{ opacity: isVerifying ? 0 : 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSkip}
                className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
                style={{ fontSize: "1.0625rem", fontWeight: 600 }}
              >
                I'll do it later
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Resend Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <button
            onClick={() => {
              // In a real app, this would trigger a resend email API call
              alert("Verification email resent!");
            }}
            className="text-[#9CA3AF] hover:text-[#1565C0] transition-colors underline"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            Didn't receive the email? Resend
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
