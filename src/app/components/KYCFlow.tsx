import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Phone, User, CreditCard, FileCheck,
  Camera, Check, Loader2, ChevronDown, Search, X, MessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

export interface KYCData {
  phone: string;
  dialCode: string;
  countryName: string;
  countryCode: string;
  currency: string;
}

interface Props {
  onComplete: (data: KYCData) => void;
  onBack: () => void;
  onSkip?: () => void; // Skip KYC and Learning, go straight to dashboard
  coopSkipped?: boolean; // Track if cooperative was skipped
  prefilledPhone?: string; // Phone number from cooperative join
}

// ─── Country list ─────────────────────────────────────────────────────────

const COUNTRIES = [
  { flag: "🇺🇸", name: "United States",   dial: "+1",   code: "US", currency: "USD" },
  { flag: "🇬🇧", name: "United Kingdom",  dial: "+44",  code: "GB", currency: "GBP" },
  { flag: "🇦🇺", name: "Australia",       dial: "+61",  code: "AU", currency: "AUD" },
  { flag: "🇨🇦", name: "Canada",          dial: "+1",   code: "CA", currency: "CAD" },
  { flag: "🇳🇬", name: "Nigeria",         dial: "+234", code: "NG", currency: "NGN" },
  { flag: "🇿🇦", name: "South Africa",    dial: "+27",  code: "ZA", currency: "ZAR" },
  { flag: "🇰🇪", name: "Kenya",           dial: "+254", code: "KE", currency: "KES" },
  { flag: "🇬🇭", name: "Ghana",           dial: "+233", code: "GH", currency: "GHS" },
  { flag: "🇺🇬", name: "Uganda",          dial: "+256", code: "UG", currency: "UGX" },
  { flag: "🇹🇿", name: "Tanzania",        dial: "+255", code: "TZ", currency: "TZS" },
  { flag: "🇷🇼", name: "Rwanda",          dial: "+250", code: "RW", currency: "RWF" },
  { flag: "🇿🇲", name: "Zambia",          dial: "+260", code: "ZM", currency: "ZMW" },
  { flag: "🇪🇹", name: "Ethiopia",        dial: "+251", code: "ET", currency: "ETB" },
  { flag: "🇮🇳", name: "India",           dial: "+91",  code: "IN", currency: "INR" },
  { flag: "🇵🇭", name: "Philippines",     dial: "+63",  code: "PH", currency: "PHP" },
  { flag: "🇸🇬", name: "Singapore",       dial: "+65",  code: "SG", currency: "SGD" },
  { flag: "🇮🇩", name: "Indonesia",       dial: "+62",  code: "ID", currency: "IDR" },
  { flag: "🇲🇾", name: "Malaysia",        dial: "+60",  code: "MY", currency: "MYR" },
  { flag: "🇦🇪", name: "UAE",             dial: "+971", code: "AE", currency: "AED" },
  { flag: "🇯🇵", name: "Japan",           dial: "+81",  code: "JP", currency: "JPY" },
  { flag: "🇰🇷", name: "South Korea",     dial: "+82",  code: "KR", currency: "KRW" },
  { flag: "🇨🇳", name: "China",           dial: "+86",  code: "CN", currency: "CNY" },
  { flag: "🇩🇪", name: "Germany",         dial: "+49",  code: "DE", currency: "EUR" },
  { flag: "🇫🇷", name: "France",          dial: "+33",  code: "FR", currency: "EUR" },
  { flag: "🇪🇸", name: "Spain",           dial: "+34",  code: "ES", currency: "EUR" },
  { flag: "🇮🇹", name: "Italy",           dial: "+39",  code: "IT", currency: "EUR" },
  { flag: "🇳🇱", name: "Netherlands",     dial: "+31",  code: "NL", currency: "EUR" },
  { flag: "🇨🇭", name: "Switzerland",     dial: "+41",  code: "CH", currency: "CHF" },
  { flag: "🇧🇷", name: "Brazil",          dial: "+55",  code: "BR", currency: "BRL" },
  { flag: "🇲🇽", name: "Mexico",          dial: "+52",  code: "MX", currency: "MXN" },
  { flag: "🇦🇷", name: "Argentina",       dial: "+54",  code: "AR", currency: "ARS" },
  { flag: "🇨🇴", name: "Colombia",        dial: "+57",  code: "CO", currency: "COP" },
  { flag: "🇳🇿", name: "New Zealand",     dial: "+64",  code: "NZ", currency: "NZD" },
  { flag: "🇵🇰", name: "Pakistan",        dial: "+92",  code: "PK", currency: "PKR" },
  { flag: "🇧🇩", name: "Bangladesh",      dial: "+880", code: "BD", currency: "BDT" },
  { flag: "🇲🇿", name: "Mozambique",      dial: "+258", code: "MZ", currency: "MZN" },
  { flag: "🇿🇼", name: "Zimbabwe",        dial: "+263", code: "ZW", currency: "USD"  },
];

// ─── Shared Step Header ───────────────────────────────────────────────────
// Used by every KYC sub-screen for visual consistency with the broader onboarding flow.

function OnboardingStepHeader({
  onBack,
  isDark = false,
}: {
  onBack: () => void;
  isDark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="shrink-0"
    >
      {/* Nav row */}
      <div className="flex items-center justify-between px-7 pt-6 pb-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
            isDark ? "hover:bg-white/10" : "hover:bg-[rgba(17,24,39,0.04)]"
          }`}
          aria-label="Back"
        >
          <ArrowLeft
            className={`w-5 h-5 ${isDark ? "text-white" : "text-[#111827]"}`}
            strokeWidth={1.5}
          />
        </motion.button>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "0.8rem",
            color: isDark ? "rgba(255,255,255,0.45)" : "#9CA3AF",
          }}
        >
          Step 2 of 4
        </motion.span>
      </div>

      {/* 4-segment outer progress bar */}
      <div className="flex gap-1.5 px-7 pb-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{
              backgroundColor:
                i < 2
                  ? isDark
                    ? "rgba(255,255,255,0.75)"
                    : "#1565C0"
                  : isDark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(17,24,39,0.1)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── KYC sub-step dot trail ───────────────────────────────────────────────

const KYC_SUBSTEPS = ["Phone", "Portrait", "ID Front", "ID Back"];

function SubStepTrail({ activeIndex, isDark = false }: { activeIndex: number; isDark?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-5 mb-1 pb-1">
      {KYC_SUBSTEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1.5">
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 20 : 6,
              height: 6,
              backgroundColor:
                i === activeIndex
                  ? isDark ? "rgba(255,255,255,0.85)" : "#1565C0"
                  : i < activeIndex
                  ? "#4CAF50"
                  : isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.12)",
            }}
          />
          {i === activeIndex && (
            <span
              style={{
                fontSize: "0.7rem",
                color: isDark ? "rgba(255,255,255,0.45)" : "#9CA3AF",
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Root orchestrator ────────────────────────────────────────────────────

export function KYCFlow({ onComplete, onBack, onSkip, coopSkipped, prefilledPhone }: Props) {
  const [substep, setSubstep] = useState(0);
  const [kycData, setKycData] = useState<Partial<KYCData>>({});
  // 0=intro, 1=phone, 2=otp, 3=portrait, 4=id-front, 5=id-back, 6=processing, 7=success

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {substep === 0 && (
          <KYCIntro key="intro" onContinue={() => setSubstep(1)} onBack={onBack} onSkip={onSkip} />
        )}
        {substep === 1 && (
          <PhoneEntry
            key="phone"
            onVerified={(phone, dialCode, countryName, countryCode, currency) => {
              setKycData({ phone, dialCode, countryName, countryCode, currency });
              setSubstep(2);
            }}
            onBack={() => setSubstep(0)}
            prefilledPhone={prefilledPhone}
          />
        )}
        {substep === 2 && (
          <OTPVerification
            key="otp"
            phone={`${kycData.dialCode} ${kycData.phone}`}
            onVerified={() => setSubstep(3)}
            onBack={() => setSubstep(1)}
          />
        )}
        {substep === 3 && (
          <PortraitCapture key="portrait" onCaptured={() => setSubstep(4)} onBack={() => setSubstep(2)} />
        )}
        {(substep === 4 || substep === 5) && (
          <IDCapture
            key={`id-${substep}`}
            side={substep === 4 ? "front" : "back"}
            subStepIndex={substep === 4 ? 2 : 3}
            onCaptured={() => setSubstep(substep === 4 ? 5 : 6)}
            onBack={() => setSubstep(substep - 1)}
          />
        )}
        {substep === 6 && (
          <VerificationProcessing key="processing" onDone={() => setSubstep(7)} />
        )}
        {substep === 7 && (
          <VerificationSuccess
            key="success"
            countryName={kycData.countryName ?? ""}
            currency={kycData.currency ?? ""}
            coopSkipped={coopSkipped}
            onContinue={() => onComplete(kycData as KYCData)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────

function KYCIntro({ onContinue, onBack, onSkip }: { onContinue: () => void; onBack: () => void; onSkip?: () => void }) {
  const steps = [
    { icon: Phone,      label: "Phone Number", desc: "SMS verification" },
    { icon: User,       label: "Portrait",     desc: "Quick selfie"     },
    { icon: CreditCard, label: "Valid ID",      desc: "Front & back"    },
    { icon: FileCheck,  label: "Review",        desc: "Auto-verified"   },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#FAF9F7]"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
    >
      <OnboardingStepHeader onBack={onBack} />

      <div className="flex-1 flex flex-col px-7 pt-4 overflow-y-auto">
        <div className="mb-7">
          <h2
            className="text-[#111827] tracking-tight mb-1.5"
            style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}
          >
            Let's verify your identity.
          </h2>
          <p className="text-[#6B7085]" style={{ fontSize: "0.95rem" }}>
            Institutional-grade KYC for your security and compliance.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.08 }}
                className="flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(21,101,192,0.1)" }}
                >
                  <span className="text-[#1565C0]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[#111827] mb-1" style={{ fontSize: "1.05rem", fontWeight: 500 }}>
                    {step.label}
                  </p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.9375rem" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex-1" />

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.5 }}
          onClick={onContinue}
          className="w-full py-4 rounded-2xl text-white transition-all mt-6"
          style={{
            backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
            fontSize: "1.0625rem",
            fontWeight: 600
          }}
        >
          Begin Verification
        </motion.button>

        {onSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.6 }}
            onClick={onSkip}
            className="w-full py-3 rounded-2xl text-muted-foreground transition-colors hover:text-[#111827] mt-2"
            style={{ fontSize: "0.9rem" }}
          >
            Skip for now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Phone Entry ──────────────────────────────────────────────────────────

function PhoneEntry({
  onVerified,
  onBack,
  prefilledPhone,
}: {
  onVerified: (
    phone: string,
    dialCode: string,
    countryName: string,
    countryCode: string,
    currency: string
  ) => void;
  onBack: () => void;
  prefilledPhone?: string;
}) {
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((c) => c.code === "PH") ?? COUNTRIES[0]
  );
  const [phone, setPhone] = useState(prefilledPhone || "");
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");
  const [sending, setSending] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  const isValid = phone.replace(/\D/g, "").length >= 7;

  const handleSend = () => {
    if (!isValid) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onVerified(
        phone,
        selectedCountry.dial,
        selectedCountry.name,
        selectedCountry.code,
        selectedCountry.currency
      );
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#FAF9F7] relative overflow-hidden"
    >
      <OnboardingStepHeader onBack={onBack} />
      <SubStepTrail activeIndex={0} />

      <div
        className="flex-1 flex flex-col px-7 pt-4 overflow-y-auto"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, rgba(10,10,111,0.08), rgba(45,45,158,0.12))" }}
          >
            <Phone className="w-6 h-6 text-[#1565C0]" strokeWidth={1.5} />
          </motion.div>
          <h2
            className="text-[#111827] tracking-tight mb-1.5"
            style={{ fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.2 }}
          >
            Verify your phone
          </h2>
          <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
            We'll send a verification code. Your country sets your default currency.
          </p>
        </motion.div>

        {/* Country selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <label
            className="block mb-1.5 text-[#6B7085]"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            Country
          </label>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowPicker(true)}
            className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 border text-left transition-all hover:border-[#1565C0]/30"
            style={{ height: 57, borderColor: "rgba(17,24,39,0.08)", borderWidth: "0.653px" }}
          >
            <span style={{ fontSize: "1.35rem", lineHeight: 1 }}>{selectedCountry.flag}</span>
            <span className="flex-1 text-[#111827]" style={{ fontSize: "1rem" }}>
              {selectedCountry.name}
            </span>
            <span className="text-[#9CA3AF]" style={{ fontSize: "0.875rem" }}>
              {selectedCountry.dial}
            </span>
            <ChevronDown className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} />
          </motion.button>
          {/* Currency badge */}
          <div className="flex items-center gap-1.5 mt-2 px-1">
            <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
            <span style={{ fontSize: "0.8rem", color: "#4CAF50" }}>
              Default currency:{" "}
              <strong>{selectedCountry.currency}</strong>
            </span>
          </div>
        </motion.div>

        {/* Phone input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <label
            className="block mb-1.5 text-[#6B7085]"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            Phone number
          </label>
          <div
            className="flex items-center bg-white rounded-2xl border overflow-hidden"
            style={{ height: 57, borderColor: "rgba(17,24,39,0.08)", borderWidth: "0.653px" }}
          >
            <div
              className="flex items-center gap-1.5 px-4 h-full border-r shrink-0"
              style={{ borderColor: "rgba(17,24,39,0.08)" }}
            >
              <span style={{ fontSize: "1.1rem" }}>{selectedCountry.flag}</span>
              <span className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                {selectedCountry.dial}
              </span>
            </div>
            <input
              ref={phoneRef}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d\s\-().]/g, ""))}
              placeholder="Enter phone number"
              className="flex-1 px-4 h-full bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
              style={{ fontSize: "1rem" }}
            />
            {isValid && (
              <div
                className="rounded-full flex items-center justify-center shrink-0 mr-4"
                style={{ width: 22, height: 22, backgroundColor: "#4CAF50" }}
              >
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex-1" />

        <motion.button
          whileHover={{ scale: isValid && !sending ? 1.02 : 1 }}
          whileTap={{ scale: isValid && !sending ? 0.98 : 1 }}
          onClick={handleSend}
          disabled={!isValid || sending}
          className="w-full flex items-center justify-center gap-2 rounded-2xl text-white transition-all"
          style={{
            height: 57,
            backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
            fontSize: "1.0625rem",
            fontWeight: 600,
            opacity: isValid && !sending ? 1 : 0.4,
          }}
        >
          {sending ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5" strokeWidth={1.5} />
              </motion.div>
              Sending code…
            </>
          ) : (
            "Send Verification Code"
          )}
        </motion.button>
      </div>

      {/* Country Picker Bottom Sheet */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 z-20"
              onClick={() => { setShowPicker(false); setSearch(""); }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl flex flex-col"
              style={{ maxHeight: "75%", minHeight: "60%" }}
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-[rgba(17,24,39,0.12)]" />
              </div>
              <div className="flex items-center justify-between px-6 pb-3">
                <h3 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  Select Country
                </h3>
                <button
                  onClick={() => { setShowPicker(false); setSearch(""); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(17,24,39,0.06)]"
                >
                  <X className="w-4 h-4 text-[#6B7085]" strokeWidth={2} />
                </button>
              </div>
              <div className="px-6 pb-3">
                <div
                  className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-3"
                  style={{ height: 44 }}
                >
                  <Search className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search country or dial code…"
                    className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.35)]"
                    style={{ fontSize: "0.95rem" }}
                  />
                  {search && (
                    <button onClick={() => setSearch("")}>
                      <X className="w-3.5 h-3.5 text-[#6B7085]" strokeWidth={2} />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-6">
                {filtered.map((country) => {
                  const isSel = country.code === selectedCountry.code;
                  return (
                    <motion.button
                      key={country.code}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowPicker(false);
                        setSearch("");
                        setTimeout(() => phoneRef.current?.focus(), 200);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3.5 rounded-2xl transition-colors"
                      style={{ backgroundColor: isSel ? "rgba(10,10,111,0.05)" : "transparent" }}
                    >
                      <span style={{ fontSize: "1.35rem", width: 28, textAlign: "center" }}>
                        {country.flag}
                      </span>
                      <span
                        className="flex-1 text-left text-[#111827]"
                        style={{ fontSize: "0.975rem" }}
                      >
                        {country.name}
                      </span>
                      <span className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                        {country.dial}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5"
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          backgroundColor: "rgba(59,165,73,0.08)",
                          color: "#4CAF50",
                          minWidth: 36,
                          textAlign: "center",
                        }}
                      >
                        {country.currency}
                      </span>
                      {isSel && (
                        <Check className="w-4 h-4 text-[#1565C0] shrink-0" strokeWidth={2.5} />
                      )}
                    </motion.button>
                  );
                })}
                {filtered.length === 0 && (
                  <p
                    className="text-center text-[#9CA3AF] py-8"
                    style={{ fontSize: "0.9rem" }}
                  >
                    No results for "{search}"
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── OTP Verification ─────────────────────────────────────────────────────

function OTPVerification({
  phone,
  onVerified,
  onBack,
}: {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleDigit = (idx: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    setError(false);
    if (char && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0)
      inputRefs.current[idx - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setDigits(text.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const code = digits.join("");
  const isComplete = code.length === 6;

  const handleVerify = () => {
    if (!isComplete) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onVerified();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#FAF9F7]"
    >
      <OnboardingStepHeader onBack={onBack} />
      <SubStepTrail activeIndex={0} />

      <div
        className="flex-1 flex flex-col px-7 pt-4 overflow-y-auto"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-7"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, rgba(10,10,111,0.08), rgba(45,45,158,0.12))" }}
          >
            <MessageSquare className="w-6 h-6 text-[#1565C0]" strokeWidth={1.5} />
          </motion.div>
          <h2
            className="text-[#111827] tracking-tight mb-1.5"
            style={{ fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.2 }}
          >
            Enter verification code
          </h2>
          <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
            We sent a 6-digit code to{" "}
            <span className="text-[#111827]" style={{ fontWeight: 500 }}>
              {phone}
            </span>
          </p>
        </motion.div>

        {/* OTP boxes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-3"
          onPaste={handlePaste}
        >
          {digits.map((d, i) => (
            <motion.input
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25 + i * 0.05, type: "spring", stiffness: 200 }}
              whileFocus={{ scale: 1.1 }}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="text-center bg-white rounded-2xl border outline-none transition-all"
              style={{
                width: 46,
                height: 56,
                flexShrink: 0,
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#111827",
                borderColor: error ? "#ef4444" : d ? "#1565C0" : "rgba(17,24,39,0.1)",
                borderWidth: d ? 1.5 : "0.653px",
              }}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 mb-3"
              style={{ fontSize: "0.875rem" }}
            >
              Incorrect code. Please try again.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center mb-6">
          {resendCooldown > 0 ? (
            <p className="text-[#9CA3AF]" style={{ fontSize: "0.9rem" }}>
              Resend in{" "}
              <span className="text-[#1565C0]" style={{ fontWeight: 500 }}>
                {resendCooldown}s
              </span>
            </p>
          ) : (
            <button
              onClick={() => setResendCooldown(30)}
              className="text-[#1565C0]"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Resend verification code
            </button>
          )}
        </div>

        <div className="flex-1" />

        <motion.button
          whileHover={{ scale: isComplete && !verifying ? 1.02 : 1 }}
          whileTap={{ scale: isComplete && !verifying ? 0.98 : 1 }}
          onClick={handleVerify}
          disabled={!isComplete || verifying}
          className="w-full flex items-center justify-center gap-2 rounded-2xl text-white transition-all"
          style={{
            height: 57,
            backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
            fontSize: "1.0625rem",
            fontWeight: 600,
            opacity: isComplete && !verifying ? 1 : 0.4,
          }}
        >
          {verifying ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5" strokeWidth={1.5} />
              </motion.div>
              Verifying…
            </>
          ) : (
            "Verify Code"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Portrait Capture ─────────────────────────────────────────────────────

function PortraitCapture({
  onCaptured,
  onBack,
}: {
  onCaptured: () => void;
  onBack: () => void;
}) {
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    setCapturing(true);
    setTimeout(() => {
      setCaptured(true);
      setTimeout(() => onCaptured(), 800);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#0d1117]"
    >
      <OnboardingStepHeader onBack={onBack} isDark />
      <SubStepTrail activeIndex={1} isDark />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="relative">
          <div
            className="w-52 h-64 rounded-[2rem] border-2 transition-colors duration-500 flex items-center justify-center"
            style={{
              borderColor: captured
                ? "#4CAF50"
                : capturing
                ? "#4040cc"
                : "rgba(255,255,255,0.25)",
            }}
          >
            {captured ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="w-12 h-12 text-[#4CAF50]" strokeWidth={2} />
              </motion.div>
            ) : (
              <User className="w-16 h-16 text-white/20" strokeWidth={1} />
            )}
          </div>
          {capturing && !captured && (
            <motion.div
              className="absolute inset-0 rounded-[2rem] border-2 border-[#4040cc]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </div>
        <p className="text-white/70 mt-6 text-center" style={{ fontSize: "1rem" }}>
          {captured ? "Looking good!" : "Align your face within the frame."}
        </p>
      </div>

      {!capturing && !captured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-8 pb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCapture}
            className="w-full py-4 rounded-2xl bg-white text-[#111827] flex items-center justify-center gap-2 transition-all"
            style={{ fontSize: "1.0625rem", fontWeight: 500 }}
          >
            <Camera className="w-5 h-5" strokeWidth={1.5} />
            Take Photo
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── ID Capture ───────────────────────────────────────────────────────────

function IDCapture({
  side,
  subStepIndex,
  onCaptured,
  onBack,
}: {
  side: "front" | "back";
  subStepIndex: number;
  onCaptured: () => void;
  onBack: () => void;
}) {
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    setCaptured(true);
    setTimeout(() => onCaptured(), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#0d1117]"
    >
      <OnboardingStepHeader onBack={onBack} isDark />
      <SubStepTrail activeIndex={subStepIndex} isDark />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div
          className="w-64 h-40 rounded-2xl border-2 transition-colors duration-500 flex items-center justify-center"
          style={{
            borderColor: captured ? "#4CAF50" : "rgba(255,255,255,0.25)",
          }}
        >
          {captured ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className="w-10 h-10 text-[#4CAF50]" strokeWidth={2} />
            </motion.div>
          ) : (
            <CreditCard className="w-12 h-12 text-white/20" strokeWidth={1} />
          )}
        </div>
        <p className="text-white/70 mt-6 text-center" style={{ fontSize: "1rem" }}>
          {captured
            ? "Captured!"
            : `Place your ID inside the frame (${side}).`}
        </p>
      </div>

      {!captured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-8 pb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCapture}
            className="w-full py-4 rounded-2xl bg-white text-[#111827] flex items-center justify-center gap-2 transition-all"
            style={{ fontSize: "1.0625rem", fontWeight: 500 }}
          >
            <Camera className="w-5 h-5" strokeWidth={1.5} />
            Capture {side === "front" ? "Front" : "Back"}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Processing ───────────────────────────────────────────────────────────

function VerificationProcessing({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full px-8 bg-[#FAF9F7]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <Loader2 className="w-10 h-10 text-[#1565C0]" strokeWidth={1.5} />
      </motion.div>
      <h2 className="text-[#111827] mb-2" style={{ fontSize: "1.3rem", fontWeight: 600 }}>
        Verifying your identity
      </h2>
      <p className="text-[#9CA3AF] text-center" style={{ fontSize: "1rem" }}>
        This usually takes less than a minute.
      </p>
    </motion.div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────

function VerificationSuccess({
  countryName,
  currency,
  coopSkipped,
  onContinue,
}: {
  countryName: string;
  currency: string;
  coopSkipped?: boolean;
  onContinue: () => void;
}) {
  // Auto-redirect after 3 seconds if cooperative was skipped
  useEffect(() => {
    if (coopSkipped) {
      const timer = setTimeout(() => onContinue(), 3000);
      return () => clearTimeout(timer);
    }
  }, [coopSkipped, onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full px-8 bg-[#FAF9F7]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "rgba(59,165,73,0.1)" }}
      >
        <Check className="w-10 h-10 text-[#4CAF50]" strokeWidth={2} />
      </motion.div>

      <h2 className="text-[#111827] mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
        Identity Verified!
      </h2>
      <p className="text-[#9CA3AF] mb-5 text-center" style={{ fontSize: "1rem" }}>
        Your identity has been confirmed.
      </p>

      {countryName && currency && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ backgroundColor: "rgba(59,165,73,0.08)", marginBottom: coopSkipped ? "2rem" : "2rem" }}
        >
          <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
          <p style={{ fontSize: "0.9rem", color: "#4CAF50" }}>
            Default currency set to{" "}
            <strong>{currency}</strong> ({countryName})
          </p>
        </motion.div>
      )}

      {/* Only show button if cooperative was NOT skipped */}
      {!coopSkipped && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.5 }}
          onClick={onContinue}
          className="w-full py-4 rounded-2xl text-white transition-all"
          style={{
            backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
            fontSize: "1.0625rem",
            fontWeight: 600
          }}
        >
          Continue
        </motion.button>
      )}
    </motion.div>
  );
}