import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Search, Check, Users, MapPin, Hash, ChevronRight, X, Phone, Mail, MapPinned, Building2, Edit2, CreditCard, Lock } from "lucide-react";

interface Props {
  onComplete: (coopName: string, joinPhone?: string) => void;
  onBack: () => void;
  onSkip: () => void;
  identityData?: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    province?: string;
  };
}

interface Cooperative {
  id: string;
  name: string;
  shortName: string;
  members: string;
  location: string;
  country: string;
  flag: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  accent: string;
  initials: string;
}

const cooperatives: Cooperative[] = [
  {
    id: "ficco",
    name: "First Community Cooperative",
    shortName: "FICCO",
    members: "24,600+",
    location: "Cagayan de Oro",
    country: "Philippines",
    flag: "🇵🇭",
    tag: "Featured",
    tagColor: "#1565C0",
    tagBg: "rgba(10,10,111,0.08)",
    accent: "#1565C0",
    initials: "FICCO",
  },
  {
    id: "oic",
    name: "Oro Integrated Cooperative",
    shortName: "OIC",
    members: "11,200+",
    location: "Cagayan de Oro",
    country: "Philippines",
    flag: "🇵🇭",
    tag: "Verified",
    tagColor: "#4CAF50",
    tagBg: "rgba(59,165,73,0.08)",
    accent: "#4CAF50",
    initials: "OIC",
  },
  {
    id: "tagum",
    name: "Tagum Cooperative",
    shortName: "TAGCOOP",
    members: "8,900+",
    location: "Cagayan de Oro",
    country: "Philippines",
    flag: "🇵🇭",
    tag: "Community",
    tagColor: "#F97316",
    tagBg: "rgba(249,115,22,0.08)",
    accent: "#F97316",
    initials: "TC",
  },
  {
    id: "maynilad",
    name: "Maynilad Savers Cooperative",
    shortName: "MSCoop",
    members: "18,400+",
    location: "Manila",
    country: "Philippines",
    flag: "🇵🇭",
    tag: "Metro",
    tagColor: "#7C3AED",
    tagBg: "rgba(124,58,237,0.08)",
    accent: "#7C3AED",
    initials: "MSC",
  },
  {
    id: "cebu-united",
    name: "Cebu United Credit Cooperative",
    shortName: "CUCC",
    members: "14,750+",
    location: "Cebu City",
    country: "Philippines",
    flag: "🇵🇭",
    tag: "Visayas",
    tagColor: "#0891B2",
    tagBg: "rgba(8,145,178,0.08)",
    accent: "#0891B2",
    initials: "CUCC",
  },
];

function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-500"
          style={{ backgroundColor: i < current ? "#1565C0" : "rgba(17,24,39,0.1)" }}
        />
      ))}
    </div>
  );
}

export function CooperativeSelection({ onComplete, onBack, onSkip, identityData }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Cooperative | null>(null);
  const [memberId, setMemberId] = useState("");
  const [memberIdFocused, setMemberIdFocused] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberFocused, setAccountNumberFocused] = useState(false);
  const [accountType, setAccountType] = useState<"Savings" | "Share Capital" | "Time Deposit">("Savings");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isPending, setIsPending] = useState(false); // Track if application is submitted
  const [isEditMode, setIsEditMode] = useState(false); // Track if user is editing
  const [showSuccess, setShowSuccess] = useState(false); // Track success screen
  const [joinData, setJoinData] = useState({
    fullName: identityData?.fullName || "",
    email: identityData?.email || "",
    phone: identityData?.phone || "",
    address: identityData?.address || "",
    city: identityData?.city || "",
    province: identityData?.province || "",
  });

  const filtered = cooperatives.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase()) ||
      c.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full overflow-hidden"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
    >
      {/* Header */}
      <div className="shrink-0 px-7 pt-6 pb-1">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
          </button>
          <span className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
            Step 2 of 5
          </span>
        </div>

        <StepBar current={2} total={5} />

        <div className="mt-5 mb-2">
          <h2 className="text-[#111827] tracking-tight" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}>
            Join your cooperative
          </h2>
          <p className="text-[#9CA3AF] mt-1.5" style={{ fontSize: "0.95rem" }}>
            Connect with your financial community and unlock member-exclusive benefits.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="shrink-0 px-6 pb-3">
        <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border border-[rgba(17,24,39,0.08)]">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or location…"
            className="flex-1 bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)]"
            style={{ fontSize: "0.95rem" }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground shrink-0">
              <Check className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filtered.map((coop, idx) => (
            <motion.div
              key={coop.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => setSelected(selected?.id === coop.id ? null : coop)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(selected?.id === coop.id ? null : coop);
                }
              }}
              className="w-full text-left rounded-2xl border transition-all active:scale-[0.99] cursor-pointer"
              style={{
                background: selected?.id === coop.id ? `${coop.accent}06` : "white",
                borderColor: selected?.id === coop.id ? coop.accent : "rgba(17,24,39,0.07)",
              }}
            >
              <div className="flex items-center gap-3.5 p-3.5">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${coop.accent}14` }}
                >
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: coop.accent, letterSpacing: "-0.02em" }}>
                    {coop.initials}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[#111827] truncate" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {coop.name}
                    </p>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5"
                      style={{ fontSize: "0.62rem", fontWeight: 600, color: coop.tagColor, backgroundColor: coop.tagBg }}
                    >
                      {coop.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.78rem" }}>
                      <Users className="w-3 h-3" strokeWidth={1.5} />
                      {coop.members}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.78rem" }}>
                      <MapPin className="w-3 h-3" strokeWidth={1.5} />
                      {coop.location} {coop.flag}
                    </span>
                  </div>
                </div>

                {/* Check or chevron */}
                {selected?.id === coop.id ? (
                  <Check className="w-5 h-5 shrink-0" style={{ color: coop.accent }} strokeWidth={2.5} />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                )}
              </div>

              {/* Expanded content when selected */}
              <AnimatePresence>
                {selected?.id === coop.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Account Number field */}
                    <div className="mx-3.5 mb-2.5 mt-3">
                      <p className="text-[#6B7085] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        Account Number
                      </p>
                      <div className="rounded-xl border p-3.5 transition-colors" style={{ borderColor: accountNumberFocused ? coop.accent : "rgba(17,24,39,0.08)", background: "white" }}>
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          onFocus={() => setAccountNumberFocused(true)}
                          onBlur={() => setAccountNumberFocused(false)}
                          placeholder="Enter your account number"
                          className="w-full bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)] text-[#111827]"
                          style={{ fontSize: "0.88rem" }}
                        />
                      </div>
                    </div>

                    {/* Account Type */}
                    <div className="mx-3.5 mb-2.5">
                      <p className="text-[#6B7085] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        Account Type
                      </p>
                      <div className="flex gap-2">
                        {(["Savings", "Share Capital", "Time Deposit"] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setAccountType(type)}
                            className="flex-1 py-2.5 rounded-xl border transition-all active:scale-[0.97]"
                            style={{
                              backgroundColor: accountType === type ? `${coop.accent}08` : "white",
                              borderColor: accountType === type ? coop.accent : "rgba(17,24,39,0.08)",
                              color: accountType === type ? coop.accent : "#111827",
                              fontSize: "0.82rem",
                              fontWeight: accountType === type ? 600 : 500,
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Member ID field */}
                    <div className="mx-3.5 mb-2.5">
                      <p className="text-[#6B7085] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        Member ID{" "}
                        <span className="text-muted-foreground" style={{ fontWeight: 400 }}>
                          (optional)
                        </span>
                      </p>
                      <div className="rounded-xl border p-3.5 transition-colors" style={{ borderColor: memberIdFocused ? coop.accent : "rgba(17,24,39,0.08)", background: "white" }}>
                        <input
                          type="text"
                          value={memberId}
                          onChange={(e) => setMemberId(e.target.value)}
                          onFocus={() => setMemberIdFocused(true)}
                          onBlur={() => setMemberIdFocused(false)}
                          placeholder="Cooperative member ID"
                          className="w-full bg-transparent outline-none placeholder:text-[rgba(17,24,39,0.3)] text-[#111827]"
                          style={{ fontSize: "0.88rem" }}
                        />
                      </div>
                    </div>

                    {/* Security Info */}
                    <div className="mx-3.5 mb-2.5 px-3.5 py-3 rounded-xl" style={{ backgroundColor: "rgba(17,24,39,0.03)" }}>
                      <div className="flex items-start gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#6B7085] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p className="text-[#6B7085] text-center flex-1" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                          We'll verify your account with {selected.shortName} using a secure encrypted connection. This usually takes a few seconds.
                        </p>
                      </div>
                    </div>

                    {/* Cooperative Benefits */}
                    <div className="mx-3.5 mb-2.5">
                      <p className="text-[#111827] mb-2.5" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        Cooperative Benefits:
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: coop.accent }} />
                          <p className="text-[#6B7085]" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                            <strong>Save Money:</strong> Pay lower interest on your loans.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: coop.accent }} />
                          <p className="text-[#6B7085]" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                            <strong>Skip the Stress:</strong> Enjoy a simpler approval process.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: coop.accent }} />
                          <p className="text-[#6B7085]" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                            <strong>Grow Your Cash:</strong> Earn dividends on the money you put in.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: coop.accent }} />
                          <p className="text-[#6B7085]" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                            <strong>Be Prepared:</strong> Get quick help during emergencies.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Join Now Button */}
                    <div className="mx-3.5 mb-3.5">
                      <button
                        onClick={() => {
                          setShowJoinModal(true);
                          if (isPending) {
                            setIsEditMode(false); // Start in view mode when pending
                          }
                        }}
                        className="w-full py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        style={{ 
                          backgroundColor: isPending ? "#F5F5F7" : "#4CAF50",
                          color: isPending ? "#6B7085" : "white",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          boxShadow: isPending ? "none" : "0 2px 8px rgba(59, 165, 73, 0.2)",
                          border: isPending ? "1.5px solid rgba(107,112,133,0.2)" : "none"
                        }}
                      >
                        {isPending ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                            Pending Approval
                          </>
                        ) : (
                          "Not a member? Join Now"
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground" style={{ fontSize: "0.9rem" }}>
            No cooperatives found for "{query}"
          </div>
        )}

        {/* Spacer */}
        <div className="h-4" />
      </div>

      {/* Footer */}
      <div className="shrink-0 px-6 pt-3 space-y-2.5">
        <button
          onClick={() => onComplete(selected?.name ?? "", joinData.phone)}
          disabled={!selected}
          className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
          style={{
            backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
            fontSize: "1.0625rem",
            fontWeight: 600,
          }}
        >
          Continue
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </button>
        <button
          onClick={onSkip}
          className="w-full py-3 rounded-2xl text-muted-foreground transition-colors hover:text-[#111827]"
          style={{ fontSize: "0.9rem" }}
        >
          Skip for now
        </button>
      </div>

      {/* Join Modal */}
      <AnimatePresence>
        {showJoinModal && selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setShowJoinModal(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl flex flex-col"
              style={{ maxHeight: "85%", paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-[rgba(17,24,39,0.12)]" />
              </div>

              <AnimatePresence mode="wait">
                {showSuccess ? (
                  /* Success Screen */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col items-center justify-center px-6 py-8"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                      className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${selected.accent}14` }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: selected.accent }}
                      >
                        <Check className="w-9 h-9 text-white" strokeWidth={3} />
                      </motion.div>
                    </motion.div>

                    {/* Success Text */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-[#111827] text-center mb-3"
                      style={{ fontSize: "1.4rem", fontWeight: 700 }}
                    >
                      Application Submitted!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-[#6B7085] text-center mb-2"
                      style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
                    >
                      Your application to join <strong>{selected.name}</strong> has been successfully submitted.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-[#6B7085] text-center mb-8"
                      style={{ fontSize: "0.9rem", lineHeight: 1.6 }}
                    >
                      The cooperative will review your application and contact you within 3-5 business days.
                    </motion.p>

                    {/* Info Box */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="w-full px-4 py-4 rounded-xl mb-6"
                      style={{ backgroundColor: `${selected.accent}08`, border: `1.5px solid ${selected.accent}20` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: selected.accent }} />
                        <div className="flex-1">
                          <p className="text-[#111827] mb-1" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                            What's next?
                          </p>
                          <p className="text-[#6B7085]" style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
                            You can view your application status by clicking the "Pending Approval" button on the cooperative card.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Close Button */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      onClick={() => {
                        setShowSuccess(false);
                        setShowJoinModal(false);
                        setIsEditMode(false);
                      }}
                      className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98]"
                      style={{
                        backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                      }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Form Content */
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pb-3">
                      <h3 className="text-[#111827]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                        {isPending && !isEditMode ? "Application Submitted" : `Join ${selected.name}`}
                      </h3>
                      <div className="flex items-center gap-2">
                        {isPending && !isEditMode && (
                          <button
                            onClick={() => setIsEditMode(true)}
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#4CAF50] transition-colors hover:bg-[#33943f]"
                            aria-label="Edit application"
                          >
                            <Edit2 className="w-4 h-4 text-white" strokeWidth={2} />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setShowJoinModal(false);
                            setIsEditMode(false);
                          }}
                          className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(17,24,39,0.06)] transition-colors hover:bg-[rgba(17,24,39,0.1)]"
                        >
                          <X className="w-4 h-4 text-[#6B7085]" strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    {/* Status Banner when pending */}
                    {isPending && !isEditMode && (
                      <div className="mx-6 mb-3 px-4 py-3 rounded-xl flex items-center gap-3" style={{ backgroundColor: "rgba(245,158,11,0.08)" }}>
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse shrink-0" />
                        <p className="text-[#F59E0B]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                          Your application is being reviewed by {selected.name}
                        </p>
                      </div>
                    )}

                    {/* Form Fields */}
                    <div className="flex-1 overflow-y-auto px-6 space-y-3">
                      {/* Full Name */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Full Name
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <Users className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={joinData.fullName}
                            onChange={(e) => setJoinData({ ...joinData, fullName: e.target.value })}
                            placeholder="Enter your full name"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.95rem", opacity: (isPending && !isEditMode) ? 0.7 : 1 }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Email Address
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <Mail className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="email"
                            value={joinData.email}
                            onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                            placeholder="Enter your email"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.95rem", opacity: (isPending && !isEditMode) ? 0.7 : 1 }}
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Phone Number
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <Phone className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="tel"
                            value={joinData.phone}
                            onChange={(e) => setJoinData({ ...joinData, phone: e.target.value })}
                            placeholder="Enter your phone number"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.95rem", opacity: (isPending && !isEditMode) ? 0.7 : 1 }}
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Address
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <MapPinned className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={joinData.address}
                            onChange={(e) => setJoinData({ ...joinData, address: e.target.value })}
                            placeholder="Enter your address"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.95rem", opacity: (isPending && !isEditMode) ? 0.7 : 1 }}
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          City
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <Building2 className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={joinData.city}
                            onChange={(e) => setJoinData({ ...joinData, city: e.target.value })}
                            placeholder="Enter your city"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.95rem", opacity: (isPending && !isEditMode) ? 0.7 : 1 }}
                          />
                        </div>
                      </div>

                      {/* Province */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Province
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <MapPin className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={joinData.province}
                            onChange={(e) => setJoinData({ ...joinData, province: e.target.value })}
                            placeholder="Enter your province"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.95rem", opacity: (isPending && !isEditMode) ? 0.7 : 1 }}
                          />
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="h-2" />
                    </div>

                    {/* Submit/Update Button */}
                    <div className="px-6 pt-4">
                      {(isPending && !isEditMode) ? (
                        <button
                          onClick={() => {
                            setShowJoinModal(false);
                            setIsEditMode(false);
                          }}
                          className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98]"
                          style={{
                            background: "linear-gradient(135deg, #6B7085 0%, #555a6d 100%)",
                            fontSize: "1.0625rem",
                            fontWeight: 600,
                          }}
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (!isPending || isEditMode) {
                              // Show success screen
                              setShowSuccess(true);
                              // After a delay, hide success and set pending
                              setTimeout(() => {
                                setIsPending(true);
                                setIsEditMode(false);
                              }, 2500);
                            }
                          }}
                          className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98]"
                          style={{
                            backgroundColor: "#1565C0",
            boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                            fontSize: "1.0625rem",
                            fontWeight: 600,
                          }}
                        >
                          {isPending && isEditMode ? "Update Application" : "Submit Application"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}