import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";
import koopliLogo from "../../imports/logo-icon.png";

interface Props {
  onSignup: () => void;
  onBack: () => void;
  onLogin: () => void;
}

export function SignupScreen({ onSignup, onBack, onLogin }: Props) {
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

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /\d/.test(password) },
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
        className="relative px-8 pt-8 pb-12"
        style={{
          background: 'linear-gradient(180deg, #1565C0 0%, #0d4a8f 100%)',
          paddingTop: "max(2rem, env(safe-area-inset-top, 2rem))"
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <span className="text-white/70" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
            Step 1 of 5
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="h-1 flex-1 rounded-full transition-all"
              style={{ backgroundColor: step === 1 ? 'white' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>

        {/* Logo & Brand */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <img src={koopliLogo} alt="Koopli" className="w-10 h-10 object-contain" />
          </div>
          <span className="text-white tracking-wider" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            KOOPLI
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-white tracking-tight mb-3" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 }}>
            Your journey<br />starts here.
          </h1>
          <p className="text-white/80" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
            Create your account to unlock cooperative banking with AI-powered financial tools.
          </p>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-y-auto bg-[#FAF9F7] px-8 pt-8" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Full Name */}
          <div>
            <label className="text-muted-foreground block mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Full name
            </label>
            <div
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-colors"
              style={{
                borderColor: getBorderColor("name", nameValid),
              }}
            >
              <User className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => {
                  setFocusedField(null);
                  setTouchedFields(prev => ({ ...prev, name: true }));
                }}
                placeholder="Your full name"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: '1rem' }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-muted-foreground block mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Email address
            </label>
            <div
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-colors"
              style={{
                borderColor: getBorderColor("email", emailValid),
              }}
            >
              <Mail className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => {
                  setFocusedField(null);
                  setTouchedFields(prev => ({ ...prev, email: true }));
                }}
                placeholder="you@example.com"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: '1rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-muted-foreground block mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Password
            </label>
            <div
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-colors"
              style={{
                borderColor: getBorderColor("password", allPasswordMet),
              }}
            >
              <Lock className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
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
                style={{ fontSize: '1rem' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-[#111827] transition-colors shrink-0 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Password Strength */}
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 space-y-1.5"
              >
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: check.met ? '#4CAF50' : 'rgba(17,24,39,0.08)',
                      }}
                    >
                      {check.met && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span
                      style={{
                        fontSize: '0.875rem',
                        color: check.met ? '#4CAF50' : '#6B7085',
                      }}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-1">
            <button
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className="w-6 h-6 rounded border transition-all shrink-0 mt-0.5 flex items-center justify-center"
              style={{
                backgroundColor: agreedToTerms ? '#1565C0' : 'transparent',
                borderColor: agreedToTerms ? '#1565C0' : 'rgba(17,24,39,0.2)',
              }}
            >
              {agreedToTerms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </button>
            <p className="text-muted-foreground" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
              I agree to the{" "}
              <span className="text-[#1565C0]" style={{ fontWeight: 500 }}>Terms of Service</span>
              {" "}and{" "}
              <span className="text-[#1565C0]" style={{ fontWeight: 500 }}>Privacy Policy</span>
            </p>
          </div>
        </motion.div>

        <div className="flex-1 min-h-6" />

        {/* Sign Up Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mt-6 pb-2"
        >
          <button
            onClick={onSignup}
            disabled={!isValid}
            className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
            style={{
              backgroundColor: '#1565C0',
              boxShadow: '0 4px 12px rgba(21,101,192,0.25)',
              fontSize: '1.0625rem',
              fontWeight: 600
            }}
          >
            Continue
          </button>

          <p className="text-center text-muted-foreground" style={{ fontSize: '0.95rem' }}>
            Already have an account?{" "}
            <button onClick={onLogin} className="text-[#1565C0]" style={{ fontWeight: 500 }}>
              Log in
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}