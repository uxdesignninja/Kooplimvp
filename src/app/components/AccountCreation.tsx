import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowLeft, Check } from "lucide-react";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const countries = [
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
];

export function AccountCreation({ onComplete, onBack }: Props) {
  const [substep, setSubstep] = useState(0); // 0: country, 1: phone, 2: otp
  const [selectedCountry, setSelectedCountry] = useState(
    countries[0],
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }

    if (newOtp.every((d) => d !== "")) {
      setTimeout(() => {
        setOtpVerified(true);
        setTimeout(() => onComplete(), 800);
      }, 600);
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden px-6 sm:px-8 pt-6"
      style={{
        paddingBottom:
          "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
      }}
    >
      <div className="flex items-center gap-4 mb-2 shrink-0">
        <button
          onClick={
            substep > 0 ? () => setSubstep(substep - 1) : onBack
          }
          className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
        >
          <ArrowLeft
            className="w-5 h-5 text-[#111827]"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-4 sm:mb-8 shrink-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{
              backgroundColor:
                i <= substep
                  ? "#1565C0"
                  : "rgba(17,24,39,0.08)",
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {substep === 0 && (
            <motion.div
              key="country"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col min-h-0"
            >
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-8 shrink-0">
                <h2
                  className="text-[#111827] tracking-tight"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  Where are you based?
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "1rem" }}
                >
                  Select your current country of residence.
                </p>
              </div>

              <div className="relative shrink-0">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-[rgba(17,24,39,0.08)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "1.375rem" }}>
                      {selectedCountry.flag}
                    </span>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {selectedCountry.name}
                    </span>
                  </div>
                  <ChevronDown
                    className="w-5 h-5 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                </button>

                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[rgba(17,24,39,0.08)] shadow-lg z-10 max-h-[240px] overflow-y-auto"
                  >
                    {countries.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c);
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(17,24,39,0.03)] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <span style={{ fontSize: "1.1rem" }}>
                          {c.flag}
                        </span>
                        <span style={{ fontSize: "0.95rem" }}>
                          {c.name}
                        </span>
                        <span
                          className="text-muted-foreground ml-auto"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {c.code}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="mt-auto pt-4 shrink-0">
                <button
                  onClick={() => setSubstep(1)}
                  className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: "#1565C0",
                    boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                  }}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {substep === 1 && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col min-h-0"
            >
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-8 shrink-0">
                <h2
                  className="text-[#111827] tracking-tight"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  Enter your phone number
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "1rem" }}
                >
                  We'll send you a verification code.
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-2xl border border-[rgba(17,24,39,0.08)] shrink-0">
                  <span style={{ fontSize: "1.1rem" }}>
                    {selectedCountry.flag}
                  </span>
                  <span
                    className="text-[#111827]"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {selectedCountry.code}
                  </span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Phone number"
                  className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-2xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                  style={{
                    fontSize: "1.0625rem",
                    letterSpacing: "0.5px",
                  }}
                  autoFocus
                />
              </div>

              <div className="mt-auto pt-4 shrink-0">
                <button
                  onClick={() => setSubstep(2)}
                  disabled={phone.length < 7}
                  className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
                  style={{
                    backgroundColor: "#1565C0",
                    boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                  }}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {substep === 2 && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col min-h-0"
            >
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-8 shrink-0">
                <h2
                  className="text-[#111827] tracking-tight"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  Enter verification code
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "1rem" }}
                >
                  Sent to {selectedCountry.code} {phone}
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 justify-center mb-4 sm:mb-8 shrink-0">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(i, e.target.value)
                    }
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    autoFocus={i === 0}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center bg-white rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-all"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </div>

              {otpVerified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="flex justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                    <Check
                      className="w-8 h-8 text-[#4CAF50]"
                      strokeWidth={2}
                    />
                  </div>
                </motion.div>
              )}

              <div className="mt-auto pt-4 shrink-0">
                <button
                  className="w-full text-center text-[#1565C0] py-3"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                >
                  Resend code
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}