import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BarChart3, Send, Target, CheckCircle2, ArrowRight, Building2, Shield } from "lucide-react";
import type { FinancialPreferencesData } from "./FinancialPreferences";

interface Props {
  onComplete: () => void;
  userName?: string;
  financialPrefs?: FinancialPreferencesData | null;
  learningSkipped?: boolean; // Track if learning was skipped
  kycSkipped?: boolean; // Track if KYC was skipped
}

const firstName = (fullName: string) => fullName.split(" ")[0] || "there";

// Floating confetti particle
function ConfettiDot({
  x,
  y,
  color,
  size,
  delay,
  rotation,
}: {
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  rotation: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x, rotate: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [y - 40, y + 160],
        x: [x, x + (Math.random() > 0.5 ? 30 : -30)],
        rotate: [0, rotation],
        scale: [0, 1, 1, 0.5],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeOut",
        times: [0, 0.1, 0.7, 1],
      }}
      className="absolute rounded-sm pointer-events-none"
      style={{ width: size, height: size * 0.6, backgroundColor: color, left: 0, top: 0 }}
    />
  );
}

const confettiConfig = [
  { x: 40, y: 80, color: "#4CAF50", size: 10, delay: 0.1, rotation: 45 },
  { x: 80, y: 60, color: "#1565C0", size: 8, delay: 0.2, rotation: -30 },
  { x: 140, y: 90, color: "#F97316", size: 12, delay: 0.15, rotation: 60 },
  { x: 200, y: 55, color: "#4CAF50", size: 7, delay: 0.3, rotation: -45 },
  { x: 260, y: 75, color: "#1565C0", size: 10, delay: 0.1, rotation: 90 },
  { x: 300, y: 50, color: "#F97316", size: 8, delay: 0.25, rotation: -60 },
  { x: 340, y: 95, color: "#4CAF50", size: 11, delay: 0.2, rotation: 30 },
  { x: 60, y: 120, color: "#F97316", size: 9, delay: 0.35, rotation: -90 },
  { x: 170, y: 110, color: "#1565C0", size: 7, delay: 0.05, rotation: 45 },
  { x: 320, y: 130, color: "#4CAF50", size: 8, delay: 0.4, rotation: -30 },
];

const features = [
  {
    icon: BarChart3,
    label: "Budget Tracker",
    detail: "Track spending & expenses",
    color: "#F97316",
    bg: "rgba(249,115,22,0.07)",
  },
  {
    icon: Target,
    label: "Goals",
    detail: "Personal & group saving",
    color: "#4CAF50",
    bg: "rgba(59,165,73,0.07)",
  },
  {
    icon: Send,
    label: "Payment",
    detail: "Send money easily",
    color: "#1565C0",
    bg: "rgba(10,10,111,0.07)",
  },
];

export function OnboardingSuccess({ onComplete, userName = "", financialPrefs, learningSkipped = false, kycSkipped = false }: Props) {
  const [phase, setPhase] = useState<"confetti" | "content">("confetti");

  useEffect(() => {
    const t = setTimeout(() => setPhase("content"), 600);
    return () => clearTimeout(t);
  }, []);

  // Dynamic account items based on financial preferences, learning, and KYC status
  const accountItems = [
    {
      icon: Shield,
      label: "Identity Verified",
      status: kycSkipped ? "Pending" : "Confirmed",
      color: kycSkipped ? "#F59E0B" : "#4CAF50"
    },
    {
      icon: Building2,
      label: "Coop Preferences",
      status: financialPrefs?.coopMember
        ? "Member Recorded"
        : financialPrefs?.interestedInCoops
        ? "Interests Saved"
        : "Not Set",
      color: financialPrefs?.coopMember || financialPrefs?.interestedInCoops ? "#1565C0" : "#9CA3AF"
    },
    {
      icon: CheckCircle2,
      label: "Financial Academy",
      status: learningSkipped ? "Pending" : "Completed",
      color: learningSkipped ? "#F59E0B" : "#4CAF50"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      {/* Hero section — dark navy */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ backgroundColor: "#1565C0" }}
      >
        {/* Decorative circles — matching Step 1 */}
        <div
          className="absolute rounded-full bg-white/5 pointer-events-none"
          style={{ width: 220, height: 220, top: -50, right: -30 }}
        />
        <div
          className="absolute rounded-full bg-white/5 pointer-events-none"
          style={{ width: 120, height: 120, top: 40, right: 30 }}
        />

        {/* Confetti layer */}
        <div className="relative h-44 overflow-hidden">
          <AnimatePresence>
            {phase === "confetti" &&
              confettiConfig.map((c, i) => (
                <ConfettiDot key={i} {...c} />
              ))}
          </AnimatePresence>

          {/* Concentric rings background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="absolute rounded-full border border-white/5"
                style={{ width: 80 + i * 72, height: 80 + i * 72 }}
              />
            ))}
          </div>

          {/* Checkmark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 250, damping: 16 }}
              className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-[#4CAF50]/40"
              style={{ background: "rgba(59,165,73,0.15)" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.55, type: "spring", stiffness: 300, damping: 15 }}
              >
                <CheckCircle2 className="w-10 h-10 text-[#4CAF50]" strokeWidth={1.6} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="px-6 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <h1 className="text-white tracking-tight mb-1.5" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>
              Welcome to Koopli,{" "}
              {userName ? `${firstName(userName)}!` : "welcome!"}
            </h1>
            <p className="text-white/55" style={{ fontSize: "0.85rem", lineHeight: 1.45 }}>
              Your account is ready. Start and grow your financial journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {/* Account overview card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-4 bg-white rounded-2xl border border-[rgba(17,24,39,0.07)] shadow-[0px_8px_32px_rgba(10,10,111,0.1)] p-4"
        >
        <div className="space-y-2.5">
          {accountItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.color}12` }}
              >
                <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.7} />
              </div>
              <p className="text-[#111827] flex-1" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {item.label}
              </p>
              <span
                className="rounded-full px-2.5 py-0.5"
                style={{ fontSize: "0.68rem", fontWeight: 600, color: item.color, backgroundColor: `${item.color}12` }}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-5"
        >
        <p className="text-muted-foreground uppercase tracking-widest mb-4" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
          What's waiting for you
        </p>
        <div className="flex flex-col gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: f.bg }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} strokeWidth={1.7} />
              </div>
              <div className="flex-1">
                <p className="text-[#111827] mb-0.5" style={{ fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.3 }}>
                  {f.label}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>
                  {f.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* Fixed Bottom CTA */}
      <div
        className="shrink-0 px-6 pt-4 bg-[#FAF9F7] border-t border-[rgba(17,24,39,0.06)]"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
      >
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: "#1565C0",
            fontSize: "1.0625rem",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(10,10,111,0.25)",
          }}
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </motion.button>
      </div>
    </motion.div>
  );
}