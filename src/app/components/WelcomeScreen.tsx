import { motion } from "motion/react";
import koopliLogo from "../../imports/logo-icon.png";

interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

export function WelcomeScreen({ onLogin, onSignup }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-between h-full px-8 pt-12"
      style={{
        paddingBottom:
          "max(3rem, env(safe-area-inset-bottom, 3rem))",
      }}
    >
      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col items-center text-center gap-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 12 }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center"
        >
          <img
            src={koopliLogo}
            alt="Koopli"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="-mt-5"
        >
          <p
            className="text-[#1565C0] tracking-widest"
            style={{ fontSize: "1.1rem", fontWeight: 700 }}
          >
            KOOPLI
          </p>
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-[#111827] tracking-tight"
            style={{
              fontSize: "1.875rem",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Grow Smart.
            <br />
            Live Bold.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-muted-foreground max-w-[280px]"
            style={{ fontSize: "1rem", lineHeight: 1.5 }}
          >
            Built for global workers supporting home.
          </motion.p>
        </div>
      </motion.div>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-full space-y-3"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSignup}
          className="w-full py-4 rounded-2xl text-white transition-all"
          style={{
            backgroundColor: "#1565C0",
            fontSize: "1.0625rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
          }}
        >
          Create Account
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogin}
          className="w-full py-4 rounded-2xl bg-transparent text-[#111827] transition-all border border-[rgba(17,24,39,0.1)]"
          style={{ fontSize: "1.0625rem", fontWeight: 500 }}
        >
          Log In
        </motion.button>
      </motion.div>
    </motion.div>
  );
}