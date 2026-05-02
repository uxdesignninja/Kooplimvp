import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import koopliLogo from "../../imports/logo-icon.png";

interface Props {
  onLogin: () => void;
  onBack: () => void;
  onSignup: () => void;
}

export function LoginScreen({ onLogin, onBack, onSignup }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");

  const isValid = email.includes("@") && password.length >= 6;

  const handleLogin = () => {
    if (email === "test@email.com" && password === "123456") {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full px-8 pt-6"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
      </motion.button>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center"
            >
              <img src={koopliLogo} alt="Koopli" className="w-full h-full object-contain" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="text-[#1565C0] tracking-widest"
              style={{ fontSize: '0.8rem', fontWeight: 600 }}
            >
              KOOPLI
            </motion.span>
          </div>
          <h2 className="text-[#111827] tracking-tight" style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }}>
            Welcome back
          </h2>
          <p className="text-muted-foreground mt-1" style={{ fontSize: '1rem' }}>
            Log in to your account.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="text-muted-foreground block mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Email address
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-colors"
              style={{
                borderColor: emailFocused ? '#1565C0' : 'rgba(17,24,39,0.08)',
              }}
            >
              <Mail className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: '1rem' }}
              />
            </motion.div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-muted-foreground block mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Password
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border transition-colors"
              style={{
                borderColor: passwordFocused ? '#1565C0' : 'rgba(17,24,39,0.08)',
              }}
            >
              <Lock className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Enter your password"
                className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
                style={{ fontSize: '1rem' }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-[#111827] transition-colors shrink-0 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={1.5} />
                )}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#1565C0] py-1"
              style={{ fontSize: '0.9rem', fontWeight: 500 }}
            >
              Forgot password?
            </motion.button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#d4183d] text-center"
              style={{ fontSize: '0.9rem' }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 my-6"
        >
          <div className="flex-1 h-px bg-[rgba(17,24,39,0.08)]" />
          <span className="text-muted-foreground" style={{ fontSize: '0.85rem' }}>or continue with</span>
          <div className="flex-1 h-px bg-[rgba(17,24,39,0.08)]" />
        </motion.div>

        {/* Social Login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] flex items-center justify-center gap-2 hover:border-[rgba(17,24,39,0.16)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Google</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3.5 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] flex items-center justify-center gap-2 hover:border-[rgba(17,24,39,0.16)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#111827">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Apple</span>
          </motion.button>
        </motion.div>

        <div className="flex-1" />

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={!isValid}
            className="w-full py-4 rounded-2xl text-white transition-all disabled:opacity-40"
            style={{
              backgroundColor: '#1565C0',
              boxShadow: '0 4px 12px rgba(21,101,192,0.25)',
              fontSize: '1.0625rem',
              fontWeight: 600
            }}
          >
            Log In
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-muted-foreground"
            style={{ fontSize: '0.95rem' }}
          >
            Don't have an account?{" "}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignup}
              className="text-[#1565C0]"
              style={{ fontWeight: 500 }}
            >
              Sign up
            </motion.button>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}