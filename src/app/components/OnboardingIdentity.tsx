import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EyeOff, ArrowLeft } from "lucide-react";
import koopliLogo from "../../imports/logo-icon.png";
import svgPaths from "../../imports/Frame2-1/svg-v8mk66p5zv";

interface Props {
  onComplete: (name: string, email: string) => void;
  onLogin: () => void;
  onBack: () => void;
}

// ─── Inline SVG icons matching the Figma exactly ───────────────────────────

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.9983 19.9983" fill="none">
      <path d={svgPaths.p1b626f00} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
      <path d={svgPaths.p1bfbfe00} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.9983 19.9983" fill="none">
      <path d={svgPaths.p2d367200} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
      <path d={svgPaths.p257a7000} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.9983 19.9983" fill="none">
      <path d={svgPaths.p3184cbf0} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
      <path d={svgPaths.p3ac69500} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
    </svg>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11.999 11.999" fill="none">
      <path d={svgPaths.p27086100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49987" />
    </svg>
  );
}

function SmallCheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 9.99915 9.99915" fill="none">
      <path d={svgPaths.p1fcef140} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
    </svg>
  );
}

function ArrowIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.9983 19.9983" fill="none">
      <path d="M4.16631 9.99915H15.832" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66652" />
      <path d={svgPaths.p2d431ae0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66652" />
    </svg>
  );
}

function EyeOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.9983 19.9983" fill="none">
      <path d={svgPaths.p8f01800} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
      <path d={svgPaths.p1a143b80} stroke="#6B7085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24989" />
    </svg>
  );
}

// ─── Password validation pill ───────────────────────────────────────────────

function ValidationPill({ met, label }: { met: boolean; label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-2xl px-2.5 py-2.5 transition-colors"
      style={{
        backgroundColor: met ? "rgba(59,165,73,0.08)" : "rgba(17,24,39,0.05)",
        flex: 1,
      }}
    >
      <div
        className="rounded-full flex items-center justify-center shrink-0 transition-colors"
        style={{
          width: 16,
          height: 16,
          backgroundColor: met ? "#4CAF50" : "rgba(17,24,39,0.15)",
        }}
      >
        {met && <SmallCheckIcon />}
      </div>
      <span
        style={{
          fontSize: "0.68rem",
          color: met ? "#4CAF50" : "#9CA3AF",
          lineHeight: 1.3,
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function OnboardingIdentity({ onComplete, onLogin, onBack }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Track which fields have been touched (blurred)
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  // Exactly 2 password rules per spec
  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
  ];

  const allPasswordMet = passwordChecks.every((c) => c.met);
  const nameValid = fullName.trim().length >= 2;
  const emailValid = email.includes("@") && email.includes(".");
  const isValid = nameValid && emailValid && allPasswordMet && agreedToTerms;

  // Helper to determine border color
  const getBorderColor = (fieldName: 'name' | 'email' | 'password', isFieldValid: boolean) => {
    if (focusedField === fieldName) return "#1565C0";
    if (touchedFields[fieldName] && !isFieldValid) return "#ef4444";
    return "rgba(17,24,39,0.08)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Gradient Header Section */}
      <div
        className="relative px-8 pt-8 pb-8 overflow-hidden"
        style={{
          backgroundColor: '#1565C0',
          boxShadow: '0 4px 12px rgba(21,101,192,0.25)',
          paddingTop: "max(2rem, env(safe-area-inset-top, 2rem))"
        }}
      >
        {/* Decorative Circles */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-80px',
            right: '-80px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
            filter: 'blur(1px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: '40px',
            right: '20px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%, transparent 80%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </motion.button>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/70"
            style={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            Step 1 of 4
          </motion.span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-2 mb-6 relative z-10"
        >
          {[1, 2, 3, 4].map((step, idx) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
              className="h-1 flex-1 rounded-full transition-all"
              style={{ backgroundColor: step === 1 ? 'white' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-white tracking-tight" style={{ fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.3 }}>
            Build wealth with your community.
          </h1>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-y-auto bg-[#FAF9F7] px-8 pt-8" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-6"
        >
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="text-[#6B7085] block mb-2 px-1" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
              Full Name
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-all"
              style={{
                borderColor: getBorderColor("name", nameValid),
              }}
            >
              <UserIcon />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => {
                  setFocusedField(null);
                  setTouchedFields(prev => ({ ...prev, name: true }));
                }}
                placeholder="Enter your full name"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: "0.9375rem" }}
              />
              <AnimatePresence>
                {nameValid && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#4CAF50" }}
                  >
                    <CheckIcon size={12} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-[#6B7085] block mb-2 px-1" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
              Email
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-all"
              style={{
                borderColor: getBorderColor("email", emailValid),
              }}
            >
              <MailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => {
                  setFocusedField(null);
                  setTouchedFields(prev => ({ ...prev, email: true }));
                }}
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: "0.9375rem" }}
              />
              <AnimatePresence>
                {emailValid && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#4CAF50" }}
                  >
                    <CheckIcon size={12} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="text-[#6B7085] block mb-2 px-1" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
              Password
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-all"
              style={{
                borderColor: getBorderColor("password", allPasswordMet),
              }}
            >
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => {
                  setFocusedField(null);
                  setTouchedFields(prev => ({ ...prev, password: true }));
                }}
                placeholder="Create a password"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: "0.9375rem" }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#6B7085] hover:text-[#111827] transition-colors"
              >
                {showPassword ? <EyeOpenIcon /> : <EyeOff className="w-5 h-5" strokeWidth={1.5} />}
              </motion.button>
            </motion.div>

            {/* Password Requirements */}
            <div className="flex gap-2 mt-3">
              {passwordChecks.map((check, idx) => (
                <motion.div
                  key={check.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                >
                  <ValidationPill met={check.met} label={check.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Terms Checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-start gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className="shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5"
              style={{
                borderColor: agreedToTerms ? "#1565C0" : "rgba(17,24,39,0.2)",
                backgroundColor: agreedToTerms ? "#1565C0" : "transparent",
              }}
            >
              <AnimatePresence>
                {agreedToTerms && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckIcon size={10} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <p className="text-[#6B7085]" style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
              I agree to the{" "}
              <span className="text-[#1565C0]" style={{ fontWeight: 600 }}>
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#1565C0]" style={{ fontWeight: 600 }}>
                Privacy Policy
              </span>
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-auto space-y-4 pt-6">
          {/* Create Account Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => {
              if (isValid) {
                onComplete(fullName.trim(), email.trim());
              }
            }}
            disabled={!isValid}
            className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
            style={{
              backgroundColor: isValid ? "#1565C0" : "rgba(17,24,39,0.08)",
              boxShadow: isValid ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
              fontSize: "1.0625rem",
              fontWeight: 600,
            }}
          >
            Continue
            <ArrowIconSvg />
          </motion.button>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-[#6B7085]" style={{ fontSize: "0.875rem" }}>
              Already have an account?{" "}
              <button onClick={onLogin} className="text-[#1565C0]" style={{ fontWeight: 600 }}>
                Log in
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
