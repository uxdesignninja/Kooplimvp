import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Users, MapPin, Check, ChevronRight, Lock, ChevronDown, Phone, Mail, MapPinned, Building2, Edit2 } from "lucide-react";

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

interface Props {
  onClose: () => void;
  onSelect: (coopName: string) => void;
  userData?: {
    fullName: string;
    email: string;
    address: string;
  };
}

export function CooperativeJoinModal({ onClose, onSelect, userData }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Cooperative | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberFocused, setAccountNumberFocused] = useState(false);
  const [accountType, setAccountType] = useState<"Savings" | "Share Capital" | "Time Deposit">("Savings");
  const [memberId, setMemberId] = useState("");
  const [memberIdFocused, setMemberIdFocused] = useState(false);
  
  // Join form state (for new members)
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinFormCoop, setJoinFormCoop] = useState<Cooperative | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [joinData, setJoinData] = useState({
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: "",
    address: userData?.address || "",
    city: "",
    province: "",
  });

  const filtered = cooperatives.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase()) ||
      c.country.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = () => {
    if (selected) {
      onSelect(selected.name);
      onClose();
    }
  };

  const handleJoinNow = (coop: Cooperative) => {
    setJoinFormCoop(coop);
    setShowJoinForm(true);
  };

  const handleSubmitJoinForm = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setShowJoinForm(false);
    setIsPending(true);
    setIsEditMode(false);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Main Modal */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="absolute bottom-0 left-0 right-0 z-50 bg-[#FAF9F7] rounded-t-3xl flex flex-col"
        style={{ 
          maxHeight: "85%", 
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" 
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[rgba(17,24,39,0.12)]" />
        </div>

        {/* Header */}
        <div className="shrink-0 px-6 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[#111827]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Join a Cooperative
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>
                Connect with your financial community
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(17,24,39,0.06)] hover:bg-[rgba(17,24,39,0.1)] transition-colors"
            >
              <X className="w-4 h-4 text-[#6B7085]" strokeWidth={2} />
            </button>
          </div>

          {/* Search */}
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
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 space-y-2.5 mb-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((coop, idx) => (
              <CooperativeCard
                key={coop.id}
                coop={coop}
                idx={idx}
                selected={selected}
                onToggleSelect={(c) => setSelected(selected?.id === c.id ? null : c)}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                accountNumberFocused={accountNumberFocused}
                setAccountNumberFocused={setAccountNumberFocused}
                accountType={accountType}
                setAccountType={setAccountType}
                memberId={memberId}
                setMemberId={setMemberId}
                memberIdFocused={memberIdFocused}
                setMemberIdFocused={setMemberIdFocused}
                onJoinNow={handleJoinNow}
                isPending={isPending && joinFormCoop?.id === coop.id}
              />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground" style={{ fontSize: "0.9rem" }}>
              No cooperatives found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6">
          <button
            onClick={handleSelect}
            disabled={!selected}
            className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
            style={{
              backgroundColor: selected ? "#1565C0" : "rgba(17,24,39,0.08)",
              boxShadow: selected ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
              fontSize: "1.0625rem",
              fontWeight: 600,
              color: selected ? "#fff" : "#B0B3BE",
            }}
          >
            Select Cooperative
          </button>
        </div>
      </motion.div>

      {/* Join Form Modal */}
      <AnimatePresence>
        {showJoinForm && joinFormCoop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-[60]"
              onClick={() => {
                setShowJoinForm(false);
                setIsEditMode(false);
              }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl flex flex-col"
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
                      style={{ backgroundColor: `${joinFormCoop.accent}14` }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: joinFormCoop.accent }}
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
                      Your application to join <strong>{joinFormCoop.name}</strong> has been successfully submitted.
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
                      style={{ backgroundColor: `${joinFormCoop.accent}08`, border: `1.5px solid ${joinFormCoop.accent}20` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: joinFormCoop.accent }} />
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
                    <div className="shrink-0 px-6 pt-4 pb-2">
                      <button
                        onClick={handleCloseSuccess}
                        className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98]"
                        style={{
                          background: `linear-gradient(135deg, ${joinFormCoop.accent} 0%, ${joinFormCoop.accent}dd 100%)`,
                          fontSize: "1.0625rem",
                          fontWeight: 600,
                        }}
                      >
                        Close
                      </button>
                    </div>
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
                        {isPending && !isEditMode ? "Application Submitted" : `Join ${joinFormCoop.name}`}
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
                            setShowJoinForm(false);
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
                          Your application is being reviewed by {joinFormCoop.name}
                        </p>
                      </div>
                    )}

                    {/* Form Fields */}
                    <div className="flex-1 overflow-y-auto px-6 space-y-3.5 pb-3">
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
                            style={{ fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Email
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
                            style={{ fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>

                      {/* Phone */}
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
                            style={{ fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block mb-1.5 text-[#6B7085]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Street Address
                        </label>
                        <div className="flex items-center gap-2 px-4 py-3.5 rounded-xl" style={{ backgroundColor: (isPending && !isEditMode) ? "#FAFAFA" : "#F5F5F7" }}>
                          <MapPinned className="w-4 h-4 text-[#6B7085] shrink-0" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={joinData.address}
                            onChange={(e) => setJoinData({ ...joinData, address: e.target.value })}
                            placeholder="Enter your street address"
                            readOnly={isPending && !isEditMode}
                            className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                            style={{ fontSize: "0.88rem" }}
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
                            style={{ fontSize: "0.88rem" }}
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
                            style={{ fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>

                      {/* Info Box */}
                      <div className="px-4 py-3.5 rounded-xl mt-4" style={{ backgroundColor: `${joinFormCoop.accent}08` }}>
                        <div className="flex items-start gap-2.5">
                          <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: joinFormCoop.accent }} strokeWidth={1.5} />
                          <p className="text-[#6B7085] flex-1" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                            Your information will be securely shared with {joinFormCoop.shortName} for membership verification. The cooperative will contact you within 3-5 business days.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    {(!isPending || isEditMode) && (
                      <div className="shrink-0 px-6 pt-4 pb-2">
                        <button
                          onClick={handleSubmitJoinForm}
                          disabled={!joinData.fullName || !joinData.email || !joinData.phone}
                          className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98] disabled:opacity-40"
                          style={{
                            background: `linear-gradient(135deg, ${joinFormCoop.accent} 0%, ${joinFormCoop.accent}dd 100%)`,
                            fontSize: "1.0625rem",
                            fontWeight: 600,
                          }}
                        >
                          {isEditMode ? "Update Application" : "Submit Application"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Cooperative Card Component
const CooperativeCard = forwardRef<
  HTMLDivElement,
  {
    coop: Cooperative;
    idx: number;
    selected: Cooperative | null;
    onToggleSelect: (coop: Cooperative) => void;
    accountNumber: string;
    setAccountNumber: (value: string) => void;
    accountNumberFocused: boolean;
    setAccountNumberFocused: (value: boolean) => void;
    accountType: "Savings" | "Share Capital" | "Time Deposit";
    setAccountType: (value: "Savings" | "Share Capital" | "Time Deposit") => void;
    memberId: string;
    setMemberId: (value: string) => void;
    memberIdFocused: boolean;
    setMemberIdFocused: (value: boolean) => void;
    onJoinNow: (coop: Cooperative) => void;
    isPending: boolean;
  }
>(({
  coop,
  idx,
  selected,
  onToggleSelect,
  accountNumber,
  setAccountNumber,
  accountNumberFocused,
  setAccountNumberFocused,
  accountType,
  setAccountType,
  memberId,
  setMemberId,
  memberIdFocused,
  setMemberIdFocused,
  onJoinNow,
  isPending,
}, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: idx * 0.04 }}
      className="w-full text-left rounded-2xl border transition-all cursor-pointer"
      style={{
        background: selected?.id === coop.id ? `${coop.accent}06` : "white",
        borderColor: selected?.id === coop.id ? coop.accent : "rgba(17,24,39,0.07)",
      }}
    >
      <div 
        onClick={() => onToggleSelect(coop)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleSelect(coop);
          }
        }}
        className="flex items-center gap-3.5 p-3.5 active:scale-[0.99] transition-transform"
      >
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
          <ChevronDown className="w-5 h-5 shrink-0" style={{ color: coop.accent }} strokeWidth={2.5} />
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
            <div className="mx-3.5 mb-2.5">
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
                  We'll verify your account with {coop.shortName} using a secure encrypted connection. This usually takes a few seconds.
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

            {/* Not a Member? Join Now Button */}
            <div className="mx-3.5 mb-3.5">
              <button
                onClick={() => onJoinNow(coop)}
                disabled={isPending}
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
  );
});
CooperativeCard.displayName = "CooperativeCard";