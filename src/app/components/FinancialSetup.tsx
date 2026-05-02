import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  PiggyBank,
  TrendingUp,
  Receipt,
  Users,
  User,
  Check,
  Sparkles,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { DateRangePicker } from "./DateRangePicker";

interface Props {
  onComplete: () => void;
  onBack: () => void;
  onSaveGoal?: (goal: {
    name: string;
    amount: number;
    type: "individual" | "group";
  }) => void;
}

const intents = [
  {
    id: "send",
    icon: Send,
    label: "Send money home",
    desc: "Fast global transfers",
  },
  {
    id: "save",
    icon: PiggyBank,
    label: "Finance Goals",
    desc: "Reach your goals",
  },
  {
    id: "credit",
    icon: TrendingUp,
    label: "Improve credit",
    desc: "Build your score",
  },
  {
    id: "expense",
    icon: Receipt,
    label: "Manage expenses",
    desc: "Track spending",
  },
];

export function FinancialSetup({
  onComplete,
  onBack,
  onSaveGoal,
}: Props) {
  const [substep, setSubstep] = useState(0);
  // 0: intent, 1: goal, 2: credit, 3: AI intro
  const [selectedIntents, setSelectedIntents] = useState<
    string[]
  >([]);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalCategory, setGoalCategory] = useState<"paluwagan" | "targeted">("targeted");
  const [goalType, setGoalType] = useState<
    "individual" | "group"
  >("individual");
  const [creditAccepted, setCreditAccepted] = useState(false);
  const [goalStartDate, setGoalStartDate] = useState<Date | null>(null);
  const [goalEndDate, setGoalEndDate] = useState<Date | null>(null);

  const toggleIntent = (id: string) => {
    setSelectedIntents((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  };

  return (
    <div
      className="flex flex-col h-full px-8 pt-6"
      style={{
        paddingBottom:
          "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={
            substep > 0 ? () => setSubstep(substep - 1) : onBack
          }
          className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors border border-[rgba(17,24,39,0.06)]"
        >
          <ArrowLeft
            className="w-5 h-5 text-[#111827]"
            strokeWidth={1.5}
          />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-[#9CA3AF]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            Step {substep + 1} of 4
          </span>
        </motion.div>
      </div>

      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(17,24,39,0.08)" }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: i <= substep ? "100%" : "0%" }}
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

      <AnimatePresence mode="wait">
        {substep === 0 && (
          <motion.div
            key="intent"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="space-y-2 mb-6">
              <h2
                className="tracking-tight"
                className="text-[#111827]"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                What would you like to focus on?
              </h2>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.95rem" }}
              >
                Select all that apply.
              </p>
            </div>

            <div className="space-y-3 flex-1">
              {intents.map((intent, idx) => {
                const Icon = intent.icon;
                const selected = selectedIntents.includes(
                  intent.id,
                );
                return (
                  <motion.button
                    key={intent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleIntent(intent.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left"
                    style={{
                      backgroundColor: selected
                        ? "rgba(21,101,192,0.06)"
                        : "white",
                      borderColor: selected
                        ? "#1565C0"
                        : "rgba(17,24,39,0.06)",
                      boxShadow: selected
                        ? "0 4px 12px rgba(21,101,192,0.15)"
                        : "0 2px 8px rgba(20,27,44,0.04)",
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: selected ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: selected
                          ? "#1565C0"
                          : "rgba(17,24,39,0.04)",
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        strokeWidth={1.5}
                        style={{
                          color: selected ? "white" : "#6B7085",
                        }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <p
                        className="text-[#111827]"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 600,
                        }}
                      >
                        {intent.label}
                      </p>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {intent.desc}
                      </p>
                    </div>
                    <AnimatePresence>
                      {selected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="w-6 h-6 rounded-full bg-[#1565C0] flex items-center justify-center"
                        >
                          <Check
                            className="w-3.5 h-3.5 text-white"
                            strokeWidth={2.5}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: selectedIntents.length > 0 ? 1.02 : 1 }}
              whileTap={{ scale: selectedIntents.length > 0 ? 0.98 : 1 }}
              onClick={() => setSubstep(1)}
              disabled={selectedIntents.length === 0}
              className="w-full py-4 rounded-2xl text-white transition-all disabled:opacity-40"
              style={{
                backgroundColor: "#1565C0",
                fontSize: "1.0625rem",
                fontWeight: 600,
                boxShadow: selectedIntents.length > 0 ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
              }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {substep === 1 && (
          <motion.div
            key="goal"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="space-y-2 mb-6">
              <h2
                className="tracking-tight"
                className="text-[#111827]"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Set your first goal
              </h2>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.95rem" }}
              >
                Optional but encouraged.
              </p>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              <div>
                <label
                  className="text-muted-foreground block mb-2"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Goal name
                </label>
                <input
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g. Emergency fund"
                  className="w-full px-4 py-4 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div>
                <label
                  className="text-muted-foreground block mb-2"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Target amount
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    style={{ fontSize: "1rem" }}
                  >
                    ₱
                  </span>
                  <input
                    type="text"
                    value={goalAmount}
                    onChange={(e) =>
                      setGoalAmount(
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-4 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                    style={{ fontSize: "1rem" }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-muted-foreground block mb-2"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Goal category
                </label>
                <div className="relative">
                  <select
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value as "paluwagan" | "targeted")}
                    className="w-full px-4 py-4 bg-white rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors appearance-none cursor-pointer text-[#111827]"
                    style={{ fontSize: "1rem" }}
                  >
                    <option value="targeted">Targeted Goals</option>
                    <option value="paluwagan">Paluwagan</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {goalCategory === "targeted" && (
                <div>
                  <label
                    className="text-muted-foreground block mb-2"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    Goal type
                  </label>
                  <div className="flex gap-3">
                    {(["individual", "group"] as const).map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => setGoalType(type)}
                          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-all"
                          style={{
                            backgroundColor:
                              goalType === type
                                ? "rgba(10,10,111,0.06)"
                                : "white",
                            borderColor:
                              goalType === type
                                ? "#1565C0"
                                : "rgba(17,24,39,0.08)",
                          }}
                        >
                          {type === "individual" ? (
                            <User
                              className="w-5 h-5"
                              strokeWidth={1.5}
                              style={{
                                color:
                                  goalType === type
                                    ? "#1565C0"
                                    : "#6B7085",
                              }}
                            />
                          ) : (
                            <Users
                              className="w-5 h-5"
                              strokeWidth={1.5}
                              style={{
                                color:
                                  goalType === type
                                    ? "#1565C0"
                                    : "#6B7085",
                              }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: 500,
                              color:
                                goalType === type
                                  ? "#1565C0"
                                  : "#6B7085",
                            }}
                          >
                            {type === "individual"
                              ? "Individual"
                              : "Group"}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {goalCategory === "targeted" && (
                <div>
                  <label
                    className="text-muted-foreground block mb-3"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    Duration
                  </label>
                  <DateRangePicker
                    startDate={goalStartDate}
                    endDate={goalEndDate}
                    onStartDateChange={setGoalStartDate}
                    onEndDateChange={setGoalEndDate}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {/* Primary: Save Goal */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (onSaveGoal) {
                    onSaveGoal({
                      name: goalName,
                      amount: Number(goalAmount),
                      type: goalType,
                    });
                  }
                  setSubstep(2);
                }}
                className="w-full py-4 rounded-2xl text-white transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                }}
              >
                Save Goal
                <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
              </motion.button>
              {/* Tertiary: Text-only Skip */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSubstep(2)}
                className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
                style={{ fontSize: "1.0625rem", fontWeight: 600 }}
              >
                Skip for now
              </motion.button>
            </div>
          </motion.div>
        )}

        {substep === 2 && (
          <motion.div
            key="credit"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="space-y-2 mb-6">
              <h2
                className="tracking-tight"
                className="text-[#111827]"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Unlock your credit line.
              </h2>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.95rem" }}
              >
                Build credit responsibly with transparent terms.
              </p>
            </div>

            <div className="flex-1 space-y-5">
              <div className="p-5 bg-gradient-to-br from-[#1565C0] to-[#1a1a8f] rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard
                    className="w-6 h-6"
                    strokeWidth={1.5}
                  />
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    Koopli Credit
                  </span>
                </div>
                <p
                  className="text-white/60 mb-1"
                  style={{ fontSize: "0.85rem" }}
                >
                  Available limit
                </p>
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                >
                  ₱500.00
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                  <div>
                    <p
                      className="text-white/50"
                      style={{ fontSize: "0.8rem" }}
                    >
                      APR
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      12.9%
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-white/50"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Min. Payment
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      ₱25/mo
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-white/50"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Fees
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      None
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <button
                  onClick={() =>
                    setCreditAccepted(!creditAccepted)
                  }
                  className="w-6 h-6 rounded border transition-all shrink-0 mt-0.5 flex items-center justify-center"
                  style={{
                    backgroundColor: creditAccepted
                      ? "#1565C0"
                      : "transparent",
                    borderColor: creditAccepted
                      ? "#1565C0"
                      : "rgba(17,24,39,0.2)",
                  }}
                >
                  {creditAccepted && (
                    <Check
                      className="w-3.5 h-3.5 text-white"
                      strokeWidth={3}
                    />
                  )}
                </button>
                <p
                  className="text-muted-foreground"
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                  }}
                >
                  I agree to the credit terms and conditions. I
                  understand this is a responsible credit
                  product.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Primary: Enable Credit */}
              <motion.button
                whileHover={{ scale: creditAccepted ? 1.02 : 1 }}
                whileTap={{ scale: creditAccepted ? 0.98 : 1 }}
                onClick={() => setSubstep(3)}
                disabled={!creditAccepted}
                className="w-full py-4 rounded-2xl text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  boxShadow: creditAccepted ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
                }}
              >
                Enable Credit
                <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
              </motion.button>
              {/* Tertiary: Text-only Skip */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSubstep(3)}
                className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
                style={{ fontSize: "1.0625rem", fontWeight: 600 }}
              >
                Skip for now
              </motion.button>
            </div>
          </motion.div>
        )}

        {substep === 3 && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center shrink-0">
                  <Sparkles
                    className="w-4.5 h-4.5 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md p-4 border border-[rgba(17,24,39,0.06)] flex-1">
                  <p
                    className="text-[#111827]"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Hi, I'm your financial assistant. I'll help
                    you reach your goals faster. What can I help
                    with?
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 ml-12 mb-8"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: 0,
                  }}
                  className="w-2 h-2 rounded-full bg-[#1565C0]"
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-[#1565C0]"
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                  className="w-2 h-2 rounded-full bg-[#1565C0]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  "Analyze my budget",
                  "Plan my savings",
                  "When can I send money home?",
                ].map((chip) => (
                  <button
                    key={chip}
                    className="px-4 py-3 bg-white rounded-full border border-[rgba(17,24,39,0.08)] text-[#111827] hover:border-[#1565C0] transition-colors"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="w-full py-3.5 rounded-2xl text-white flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: "#1565C0",
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
              }}
            >
              Go to Dashboard
              <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}