import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, X, Check, Building2 } from "lucide-react";

interface Props {
  onComplete: (data: FinancialPreferencesData) => void;
  onBack: () => void;
}

export interface FinancialPreferencesData {
  coopMember: boolean | null;
  coopBankName: string | null;
  interestedInCoops: boolean;
  preferredCoops: string[];
  onboardingPath: "existing_member" | "discovery" | "skipped";
  hasPaluwagan: boolean | null;
  interestedInPaluwagan: boolean;
}

interface CoopBank {
  id: string;
  name: string;
  shortName: string;
  members: string;
  location: string;
  benefits: string[];
}

const COOP_BANKS: CoopBank[] = [
  {
    id: "ficco",
    name: "First Community Cooperative",
    shortName: "FICCO",
    members: "24,600+",
    location: "Cagayan de Oro, Philippines",
    benefits: ["Low-interest loans", "Annual dividends", "Financial education"],
  },
  {
    id: "oic",
    name: "Oro Integrated Cooperative",
    shortName: "OIC",
    members: "11,200+",
    location: "Cagayan de Oro, Philippines",
    benefits: ["Community savings", "Group lending", "Member rewards"],
  },
  {
    id: "tagum",
    name: "Tagum Cooperative",
    shortName: "TAGCOOP",
    members: "8,900+",
    location: "Tagum City, Philippines",
    benefits: ["Group savings", "Financial literacy", "Emergency loans"],
  },
  {
    id: "maynilad",
    name: "Maynilad Savers Cooperative",
    shortName: "MSCoop",
    members: "18,400+",
    location: "Manila, Philippines",
    benefits: ["Metro banking", "Digital services", "Quick approvals"],
  },
  {
    id: "cebu",
    name: "Cebu United Credit Cooperative",
    shortName: "CUCC",
    members: "14,750+",
    location: "Cebu City, Philippines",
    benefits: ["Credit building", "Business loans", "Savings programs"],
  },
  {
    id: "davao",
    name: "Davao City Teachers Cooperative",
    shortName: "DCTC",
    members: "9,300+",
    location: "Davao City, Philippines",
    benefits: ["Education focus", "Housing loans", "Retirement plans"],
  },
  {
    id: "iloilo",
    name: "Iloilo Community Cooperative",
    shortName: "ICC",
    members: "7,500+",
    location: "Iloilo City, Philippines",
    benefits: ["Agricultural loans", "Community dev", "Micro-financing"],
  },
  {
    id: "baguio",
    name: "Baguio Highlands Cooperative",
    shortName: "BHC",
    members: "6,800+",
    location: "Baguio City, Philippines",
    benefits: ["Tourism support", "Local business", "Eco-financing"],
  },
];

function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(17,24,39,0.08)" }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: i < current ? "100%" : "0%" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #1565C0 0%, #0d47a1 100%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function FinancialPreferences({ onComplete, onBack }: Props) {
  const [step, setStep] = useState<"question" | "member" | "discovery" | "acknowledgment" | "paluwagan" | "paluwaganAcknowledgment">("question");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoopName, setSelectedCoopName] = useState("");
  const [selectedCoops, setSelectedCoops] = useState<string[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [coopPath, setCoopPath] = useState<"member" | "discovery" | "skipped">("skipped");
  const [hasPaluwagan, setHasPaluwagan] = useState<boolean | null>(null);
  const [interestedInPaluwagan, setInterestedInPaluwagan] = useState(false);
  const [showPrivacyTooltip, setShowPrivacyTooltip] = useState(false);

  // Show privacy tooltip when entering question screen
  useEffect(() => {
    if (step === "question") {
      const timer = setTimeout(() => setShowPrivacyTooltip(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowPrivacyTooltip(false);
    }
  }, [step]);

  const filteredBanks = COOP_BANKS.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCardExpansion = (bankId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bankId)) {
        newSet.delete(bankId);
      } else {
        newSet.add(bankId);
      }
      return newSet;
    });
  };

  const handleMemberPath = () => {
    setCoopPath("member");
    setStep("acknowledgment");
  };

  const handleDiscoveryPath = () => {
    setCoopPath("discovery");
    setStep("acknowledgment");
  };

  const handleSkipCoop = () => {
    setCoopPath("skipped");
    setStep("paluwagan");
  };

  const handlePaluwaganNext = () => {
    setStep("paluwaganAcknowledgment");
  };

  const handleFinalComplete = () => {
    onComplete({
      coopMember: coopPath === "member",
      coopBankName: coopPath === "member" ? selectedCoopName || null : null,
      interestedInCoops: coopPath === "discovery",
      preferredCoops: coopPath === "discovery" ? selectedCoops : [],
      onboardingPath: coopPath,
      hasPaluwagan,
      interestedInPaluwagan,
    });
  };

  const toggleCoopSelection = (bankName: string) => {
    if (selectedCoops.includes(bankName)) {
      setSelectedCoops(selectedCoops.filter((c) => c !== bankName));
    } else if (selectedCoops.length < 3) {
      setSelectedCoops([...selectedCoops, bankName]);
    }
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
      {/* Header */}
      <div className="shrink-0 px-4 sm:px-7 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (step === "question") {
                onBack();
              } else if (step === "paluwaganAcknowledgment") {
                setStep("paluwagan");
              } else if (step === "paluwagan") {
                setStep("acknowledgment");
              } else if (step === "acknowledgment") {
                setStep(coopPath === "member" ? "member" : "discovery");
              } else {
                setStep("question");
              }
            }}
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors border border-[rgba(17,24,39,0.06)]"
          >
            <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-[#9CA3AF]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Step 3 of 4
            </span>
          </motion.div>
        </div>

        <StepBar current={3} total={4} />
      </div>

      <AnimatePresence mode="wait">
        {/* Initial Question */}
        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-4 sm:px-7 pt-6 overflow-y-auto pb-32"
          >
            <div className="flex-1 min-h-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(10,10,111,0.08), rgba(45,45,158,0.12))" }}
                >
                  <Building2 className="w-8 h-8 text-[#1565C0]" strokeWidth={1.5} />
                </motion.div>
                <h2
                  className="text-[#111827] tracking-tight mb-2"
                  style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}
                >
                  Banking with a cooperative?
                </h2>
                <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                  Cooperative banks offer lower fees and community-focused financial services.
                </p>
              </motion.div>

              <div className="space-y-3">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setStep("member")}
                  className="w-full py-4 px-5 rounded-2xl bg-white border border-[rgba(17,24,39,0.08)] text-left transition-all hover:border-[#1565C0] hover:shadow-md"
                  style={{
                    boxShadow: "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    Yes, I'm a member
                  </p>
                  <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.875rem" }}>
                    Tell us which cooperative bank
                  </p>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setStep("discovery")}
                  className="w-full py-4 px-5 rounded-2xl bg-white border border-[rgba(17,24,39,0.08)] text-left transition-all hover:border-[#1565C0] hover:shadow-md"
                  style={{
                    boxShadow: "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    No, but I'm interested
                  </p>
                  <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.875rem" }}>
                    Discover cooperative banking
                  </p>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleSkipCoop}
                  className="w-full py-4 px-5 rounded-2xl bg-white border border-[rgba(17,24,39,0.08)] text-left transition-all hover:border-[rgba(17,24,39,0.15)] hover:bg-[#F9F9FA]"
                  style={{
                    boxShadow: "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  <p className="text-[#6B7085]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    Skip for now
                  </p>
                  <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.875rem" }}>
                    Continue without selecting
                  </p>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Member Path */}
        {step === "member" && (
          <motion.div
            key="member"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-4 sm:px-7 pt-6 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto pb-4">
              <div className="mb-6">
                <h2
                  className="text-[#111827] tracking-tight mb-2"
                  style={{ fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.2 }}
                >
                  Great! Which cooperative bank are you with?
                </h2>
                <p className="text-[#6B7085]" style={{ fontSize: "0.95rem" }}>
                  This helps us tailor your experience <span className="text-[#9CA3AF]">(optional)</span>
                </p>
              </div>

              {/* Search Input */}
              <div className="mb-5">
                <div
                  className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] focus-within:border-[#1565C0] transition-colors"
                >
                  <Search className="w-5 h-5 text-[#6B7085]" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cooperative banks..."
                    className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                    style={{ fontSize: "0.95rem" }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-4 h-4 text-[#6B7085]" strokeWidth={2} />
                    </button>
                  )}
                </div>
              </div>

              {/* All Cooperatives */}
              <div className="mb-4">
                <p className="text-[#6B7085] mb-3" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  {searchQuery ? "Search Results" : "All Cooperatives"}
                </p>
                <div className="space-y-2.5">
                  {filteredBanks.map((bank) => (
                    <motion.button
                      key={bank.id}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedCoopName(bank.name)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all"
                      style={{
                        backgroundColor: selectedCoopName === bank.name ? "rgba(21,101,192,0.05)" : "white",
                        borderColor: selectedCoopName === bank.name ? "#1565C0" : "rgba(17,24,39,0.08)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "rgba(21,101,192,0.08)" }}
                      >
                        <span className="text-[#1565C0]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                          {bank.shortName.slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                          {bank.name}
                        </p>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                          {bank.members} members • {bank.location}
                        </p>
                      </div>
                      <AnimatePresence>
                        {selectedCoopName === bank.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <Check className="w-5 h-5 text-[#1565C0]" strokeWidth={2.5} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>

                {filteredBanks.length === 0 && (
                  <p className="text-center text-[#9CA3AF] py-8" style={{ fontSize: "0.9rem" }}>
                    No results for "{searchQuery}"
                  </p>
                )}
              </div>

              {/* Other Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCoopName("Other / Not Listed")}
                className="w-full py-3 rounded-xl border border-dashed border-[rgba(17,24,39,0.15)] text-[#6B7085] hover:border-[#1565C0] hover:text-[#1565C0] transition-all mb-20"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Other / Not Listed
              </motion.button>
            </div>

            <div className="shrink-0 pt-4 border-t border-[rgba(17,24,39,0.06)] bg-[#FAF9F7]">
              <div className="flex flex-col gap-4">
                {/* Primary: Continue */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMemberPath}
                  className="w-full py-4 rounded-2xl text-white transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#1565C0",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                  }}
                >
                  Continue
                  <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
                </motion.button>
                {/* Tertiary: Text-only Skip */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSkipCoop}
                  className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  Skip for now
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Discovery Path */}
        {step === "discovery" && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-4 sm:px-7 pt-6 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto pb-20">
              <div className="mb-6">
                <h2
                  className="text-[#111827] tracking-tight mb-2"
                  style={{ fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.2 }}
                >
                  Discover cooperative banking
                </h2>
                <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                  Pick up to 3 that interest you. We'll help you learn more.
                </p>
              </div>

              {/* Search Input */}
              <div className="mb-5">
                <div
                  className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] focus-within:border-[#1565C0] transition-colors"
                >
                  <Search className="w-5 h-5 text-[#6B7085]" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cooperative banks..."
                    className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[rgba(17,24,39,0.3)]"
                    style={{ fontSize: "0.95rem" }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-4 h-4 text-[#6B7085]" strokeWidth={2} />
                    </button>
                  )}
                </div>
              </div>

              {/* Selection Counter */}
              {selectedCoops.length > 0 && (
                <div className="mb-4 px-3 py-2 rounded-lg bg-[#1565C0]/5 border border-[#1565C0]/10">
                  <p className="text-[#1565C0] text-center" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    {selectedCoops.length} of 3 selected
                  </p>
                </div>
              )}

              {/* Cooperative Cards */}
              <div className="space-y-2.5">
                {filteredBanks.map((bank) => {
                  const isSelected = selectedCoops.includes(bank.name);
                  const isMaxReached = selectedCoops.length >= 3 && !isSelected;
                  const isExpanded = expandedCards.has(bank.id);

                  return (
                    <div
                      key={bank.id}
                      className="rounded-2xl border transition-all overflow-hidden"
                      style={{
                        backgroundColor: isSelected ? "rgba(21,101,192,0.05)" : "white",
                        borderColor: isSelected ? "#1565C0" : "rgba(17,24,39,0.08)",
                        opacity: isMaxReached ? 0.5 : 1,
                      }}
                    >
                      {/* Card Header - Clickable for selection */}
                      <motion.button
                        whileHover={{ scale: !isMaxReached ? 1.01 : 1 }}
                        whileTap={{ scale: !isMaxReached ? 0.99 : 1 }}
                        onClick={() => !isMaxReached && toggleCoopSelection(bank.name)}
                        disabled={isMaxReached}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
                        style={{
                          cursor: isMaxReached ? "not-allowed" : "pointer",
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            borderColor: isSelected ? "#1565C0" : "rgba(17,24,39,0.2)",
                            backgroundColor: isSelected ? "#1565C0" : "transparent",
                          }}
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#111827] mb-0.5" style={{ fontSize: "0.975rem", fontWeight: 600 }}>
                            {bank.name}
                          </p>
                          <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                            {bank.members} members • {bank.location}
                          </p>
                        </div>
                      </motion.button>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pt-1 border-t border-[rgba(17,24,39,0.06)]">
                              <p className="text-[#6B7085] mb-2" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                                Benefits:
                              </p>
                              <div className="space-y-1.5">
                                {bank.benefits.map((benefit, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <span className="text-[#4CAF50] mt-0.5" style={{ fontSize: "0.9rem" }}>✓</span>
                                    <span className="text-[#6B7085]" style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                                      {benefit}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* View Details Button */}
                      <button
                        onClick={() => toggleCardExpansion(bank.id)}
                        className="w-full px-4 py-2.5 border-t border-[rgba(17,24,39,0.06)] text-center hover:bg-[rgba(17,24,39,0.02)] transition-colors"
                      >
                        <span className="text-[#1565C0]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                          {isExpanded ? "Hide Details" : "View Details"}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredBanks.length === 0 && (
                <p className="text-center text-[#9CA3AF] py-8" style={{ fontSize: "0.9rem" }}>
                  No results for "{searchQuery}"
                </p>
              )}
            </div>

            {/* Fixed Bottom Actions */}
            <div className="shrink-0 pt-4 border-t border-[rgba(17,24,39,0.06)] bg-[#FAF9F7]">
              <div className="flex flex-col gap-4">
                {/* Primary: Next */}
                <motion.button
                  whileHover={{ scale: selectedCoops.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: selectedCoops.length > 0 ? 0.98 : 1 }}
                  onClick={handleDiscoveryPath}
                  disabled={selectedCoops.length === 0}
                  className="w-full py-4 rounded-2xl text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#1565C0",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    boxShadow: selectedCoops.length > 0 ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
                  }}
                >
                  Next {selectedCoops.length > 0 ? `(${selectedCoops.length})` : ""}
                  <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
                </motion.button>
                {/* Tertiary: Text-only Skip */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSkipCoop}
                  className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  Skip for now
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Acknowledgment Screen */}
        {step === "acknowledgment" && (
          <motion.div
            key="acknowledgment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col items-center justify-center px-4 sm:px-7 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#5cbf6a] flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-[#111827] mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                Got it!
              </h2>
              <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                {coopPath === "member"
                  ? "We've noted your cooperative membership."
                  : `Your interest in ${selectedCoops.length} cooperative${selectedCoops.length > 1 ? "s" : ""} has been saved.`}
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: 0.4 }}
              onClick={() => setStep("paluwagan")}
              className="w-full py-4 rounded-2xl text-white transition-all"
              style={{
                backgroundColor: "#1565C0",
                fontSize: "1.0625rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
              }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {/* Paluwagan Question */}
        {step === "paluwagan" && (
          <motion.div
            key="paluwagan"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-4 sm:px-7 pt-6 overflow-y-auto pb-24"
          >
            <div className="flex-1">
              <div className="mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,146,60,0.12))" }}
                >
                  <span style={{ fontSize: "2rem" }}>🤝</span>
                </div>
                <h2
                  className="text-[#111827] tracking-tight mb-2"
                  style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}
                >
                  Community savings group?
                </h2>
                <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                  Do you participate in a Paluwagan or Huloga group?
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => {
                    setHasPaluwagan(true);
                    setInterestedInPaluwagan(false);
                  }}
                  className="w-full py-4 px-5 rounded-2xl border text-left transition-all"
                  style={{
                    backgroundColor: hasPaluwagan === true ? "rgba(249,115,22,0.05)" : "white",
                    borderColor: hasPaluwagan === true ? "#F97316" : "rgba(17,24,39,0.08)",
                    boxShadow: hasPaluwagan === true ? "0 4px 12px rgba(249,115,22,0.15)" : "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    Yes, I'm in a group
                  </p>
                  <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.875rem" }}>
                    Active Paluwagan/Huloga member
                  </p>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => {
                    setHasPaluwagan(false);
                    setInterestedInPaluwagan(false);
                  }}
                  className="w-full py-4 px-5 rounded-2xl border text-left transition-all"
                  style={{
                    backgroundColor: hasPaluwagan === false && !interestedInPaluwagan ? "rgba(249,115,22,0.05)" : "white",
                    borderColor: hasPaluwagan === false && !interestedInPaluwagan ? "#F97316" : "rgba(17,24,39,0.08)",
                    boxShadow: hasPaluwagan === false && !interestedInPaluwagan ? "0 4px 12px rgba(249,115,22,0.15)" : "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    No, not currently
                  </p>
                  <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.875rem" }}>
                    Not participating in any group
                  </p>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    setHasPaluwagan(null);
                    setInterestedInPaluwagan(true);
                  }}
                  className="w-full py-4 px-5 rounded-2xl border text-left transition-all"
                  style={{
                    backgroundColor: interestedInPaluwagan ? "rgba(249,115,22,0.05)" : "white",
                    borderColor: interestedInPaluwagan ? "#F97316" : "rgba(17,24,39,0.08)",
                    boxShadow: interestedInPaluwagan ? "0 4px 12px rgba(249,115,22,0.15)" : "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    Interested to join
                  </p>
                  <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.875rem" }}>
                    Want to learn more about groups
                  </p>
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: hasPaluwagan !== null || interestedInPaluwagan ? 1.02 : 1 }}
              whileTap={{ scale: hasPaluwagan !== null || interestedInPaluwagan ? 0.98 : 1 }}
              onClick={handlePaluwaganNext}
              disabled={hasPaluwagan === null && !interestedInPaluwagan}
              className="w-full py-3.5 rounded-2xl text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#1565C0",
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: hasPaluwagan !== null || interestedInPaluwagan ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
              }}
            >
              Next
              <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
            </motion.button>
          </motion.div>
        )}

        {/* Paluwagan Acknowledgment Screen */}
        {step === "paluwaganAcknowledgment" && (
          <motion.div
            key="paluwaganAcknowledgment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col items-center justify-center px-4 sm:px-7 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#5cbf6a] flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-[#111827] mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                Thank you!
              </h2>
              <p className="text-[#6B7085]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                {hasPaluwagan === true
                  ? "We've noted your Paluwagan/Huloga participation."
                  : interestedInPaluwagan
                  ? "We'll help you discover community savings groups."
                  : "Your preferences have been saved."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <div className="flex flex-col gap-4">
                {/* Primary: Continue */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinalComplete}
                  className="w-full py-4 rounded-2xl text-white transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#1565C0",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                  }}
                >
                  Continue to Financial Academy
                  <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
                </motion.button>
                {/* Tertiary: Text-only Skip */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinalComplete}
                  className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  Skip for now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Privacy Tooltip - Only shows on question screen */}
      <AnimatePresence>
        {showPrivacyTooltip && step === "question" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed left-4 right-4 sm:left-7 sm:right-7 z-50"
            style={{ bottom: "calc(max(1.5rem, env(safe-area-inset-bottom, 1.5rem)) + 1rem)" }}
          >
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPrivacyTooltip(false)}
              className="relative bg-[#141B2C] rounded-2xl p-3 sm:p-4 overflow-hidden cursor-pointer max-w-lg mx-auto"
            >
              {/* Decorative glow */}
              <div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "#95F7B9" }}
              />

              {/* Close Button */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center z-10">
                <X className="w-4 h-4 text-white" strokeWidth={2} />
              </div>

              <div className="relative flex items-start gap-2 sm:gap-3 pr-8">
                <div className="w-5 h-5 shrink-0 mt-0.5">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔒
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#95F7B9] uppercase tracking-wider mb-1" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em" }}>
                    PRIVACY
                  </p>
                  <p className="text-white" style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                    Your preferences help us personalize your experience. We don't contact or share data with cooperative banks.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
