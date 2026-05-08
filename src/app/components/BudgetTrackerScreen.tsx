import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Plus,
  Minus,
  AlertTriangle,
  ChevronRight,
  Utensils,
  Bus,
  Home,
  ShoppingBag,
  HeartPulse,
  DollarSign,
  Trash2,
  MoreVertical,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Edit2,
  GraduationCap,
  ShoppingCart,
  X,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onBack: () => void;
}

type BudgetCategoryType =
  | "Food"
  | "Transportation"
  | "Housing"
  | "Health"
  | "Schools"
  | "Essentials";
type SecondaryIncomeCategory =
  | "Online Work"
  | "Part-time Job"
  | "Business"
  | "Passive Income"
  | "Commission";

interface Budget {
  id: string;
  category: BudgetCategoryType;
  targetAmount: number | null;
  spent: number;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  note?: string;
  subCategory?: string; // Sub-category to identify expense allocation
}

interface SecondaryIncome {
  id: string;
  amount: number;
  category: SecondaryIncomeCategory;
}

const categoryConfig: Record<
  BudgetCategoryType,
  {
    icon: React.ElementType;
    color: string;
    subCategories: string[];
  }
> = {
  Food: {
    icon: Utensils,
    color: "#F97316",
    subCategories: ["Grocery", "Dine Out", "Snacks"],
  },
  Transportation: {
    icon: Bus,
    color: "#1565C0",
    subCategories: [
      "Public Transit",
      "Gas",
      "Parking",
      "Ride Share",
    ],
  },
  Housing: {
    icon: Home,
    color: "#4CAF50",
    subCategories: [
      "Rent",
      "Utilities",
      "Maintenance",
      "Furniture",
    ],
  },
  Health: {
    icon: HeartPulse,
    color: "#059669",
    subCategories: [
      "Medicine",
      "Doctor Visits",
      "Fitness",
      "Insurance",
    ],
  },
  Schools: {
    icon: GraduationCap,
    color: "#9C27B0",
    subCategories: [
      "Tuition",
      "Books",
      "Supplies",
      "Activities",
    ],
  },
  Essentials: {
    icon: ShoppingCart,
    color: "#FF6F00",
    subCategories: [
      "Toiletries",
      "Clothing",
      "Household",
      "Personal Care",
    ],
  },
};

// Circular Progress Component
function CircularProgress({
  spent,
  salary,
  size = 160,
}: {
  spent: number;
  salary: number;
  size?: number;
}) {
  const percentage =
    salary > 0 ? (spent / salary) * 100 : 0;
  const displayPercentage = Math.min(percentage, 100); // Cap visual progress at 100%
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = isNaN(displayPercentage)
    ? circumference
    : circumference - (displayPercentage / 100) * circumference;

  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, [spent, salary]);

  // Determine color based on spending with gradient support
  const getColor = () => {
    if (percentage >= 100) return "#EF4444"; // Error red for over budget
    if (percentage >= 85) return "#FFA726"; // Orange for near limit
    if (percentage >= 50) return "#2E7D32"; // Darker green for visibility
    return "#2E7D32"; // Darker green for healthy
  };

  // Get text color based on budget health
  const getTextColor = () => {
    if (percentage >= 100) return "#EF4444"; // Red for overspending
    if (percentage >= 85) return "#FFA726"; // Orange for warning
    return "#2E7D32"; // Darker green for healthy
  };

  // Get background gradient colors based on budget health
  const getBgGradient = () => {
    if (percentage >= 100) {
      return { start: "#FEE2E2", end: "#FECACA" }; // Red tint for overspending
    }
    if (percentage >= 85) {
      return { start: "#FFE0B2", end: "#FFCC80" }; // Faint orange for warning
    }
    return { start: "#E8F5E9", end: "#C8E6C9" }; // Green for healthy
  };

  const strokeColor = getColor();
  const textColor = getTextColor();
  const bgGradient = getBgGradient();

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Drop shadow for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 8px 24px rgba(76, 175, 80, 0.15)",
          filter: "blur(8px)",
          opacity: 0.6,
        }}
      />

      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(-90deg)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Background circle with subtle gradient */}
        <defs>
          <linearGradient
            id="bgGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={bgGradient.start}
            />
            <stop
              offset="100%"
              stopColor={bgGradient.end}
            />
          </linearGradient>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={strokeColor}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={strokeColor}
              stopOpacity="1"
            />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#bgGradient)"
          strokeWidth={16}
        />
        {/* Progress circle with gradient */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{
            transition:
              "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1), stroke 0.3s ease",
            filter:
              "drop-shadow(0 2px 8px rgba(76, 175, 80, 0.3))",
          }}
        />
      </svg>
      {/* Center content with percentage */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div
          className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-md mb-1"
          style={{
            boxShadow: "0 4px 12px rgba(255,255,255,0.2)",
          }}
        >
          {percentage >= 100 ? (
            <AlertCircle
              className="w-7 h-7 text-[#EF4444]"
              strokeWidth={2.5}
            />
          ) : (
            <CheckCircle2
              className="w-7 h-7 text-[#2E7D32]"
              strokeWidth={2.5}
            />
          )}
        </div>
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: textColor,
          }}
        >
          {Math.round(percentage)}%
        </motion.p>
      </div>
    </div>
  );
}

export function BudgetTrackerScreen({
  activeTab,
  onTabChange,
  onBack,
}: Props) {
  const [salary, setSalary] = useState<number | null>(() => {
    const saved = localStorage.getItem("budgetTracker_salary");
    return saved ? parseFloat(saved) : null;
  });
  const [secondaryIncomes, setSecondaryIncomes] = useState<
    SecondaryIncome[]
  >(() => {
    const saved = localStorage.getItem(
      "budgetTracker_secondaryIncomes",
    );
    return saved ? JSON.parse(saved) : [];
  });
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem("budgetTracker_budgets");
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedBudget, setExpandedBudget] = useState<
    string | null
  >(null);
  const [showSalaryInput, setShowSalaryInput] = useState(false);
  const [showCreateBudget, setShowCreateBudget] =
    useState(false);
  const [newBudgetCategory, setNewBudgetCategory] =
    useState<BudgetCategoryType>("Food");
  const [newBudgetSubCategory, setNewBudgetSubCategory] =
    useState("");
  const [showCustomSubCategory, setShowCustomSubCategory] =
    useState(false);
  const [customSubCategory, setCustomSubCategory] =
    useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  const [sliderAmount, setSliderAmount] = useState<number>(0);
  const [transactionNote, setTransactionNote] = useState("");
  const [transactionSubCategory, setTransactionSubCategory] =
    useState("");
  const [
    showCustomTransactionSubCategory,
    setShowCustomTransactionSubCategory,
  ] = useState(false);
  const [
    customTransactionSubCategory,
    setCustomTransactionSubCategory,
  ] = useState("");
  const [editingBudgetId, setEditingBudgetId] = useState<
    string | null
  >(null);
  const [editingBudgetAmount, setEditingBudgetAmount] =
    useState("");
  const [showEditBudget, setShowEditBudget] = useState<
    string | null
  >(null);
  const [deleteConfirmBudgetId, setDeleteConfirmBudgetId] =
    useState<string | null>(null);
  const [menuOpenBudgetId, setMenuOpenBudgetId] = useState<
    string | null
  >(null);
  const [setTargetBudgetId, setSetTargetBudgetId] = useState<
    string | null
  >(null);
  const [viewAllExpensesBudgetId, setViewAllExpensesBudgetId] =
    useState<string | null>(null);
  const [showAddSecondaryIncome, setShowAddSecondaryIncome] =
    useState(false);
  const [newSecondaryAmount, setNewSecondaryAmount] =
    useState("");
  const [newSecondaryCategory, setNewSecondaryCategory] =
    useState<SecondaryIncomeCategory>("Online Work");
  const [editingSecondaryId, setEditingSecondaryId] = useState<
    string | null
  >(null);
  const [showIncomeBreakdown, setShowIncomeBreakdown] =
    useState(false);
  const [showIncomeDetailsModal, setShowIncomeDetailsModal] =
    useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(
    null,
  );

  // Persist salary to localStorage
  useEffect(() => {
    if (salary !== null) {
      localStorage.setItem(
        "budgetTracker_salary",
        salary.toString(),
      );
    } else {
      localStorage.removeItem("budgetTracker_salary");
    }
  }, [salary]);

  // Persist budgets to localStorage
  useEffect(() => {
    localStorage.setItem(
      "budgetTracker_budgets",
      JSON.stringify(budgets),
    );
  }, [budgets]);

  // Persist secondary incomes to localStorage
  useEffect(() => {
    localStorage.setItem(
      "budgetTracker_secondaryIncomes",
      JSON.stringify(secondaryIncomes),
    );
  }, [secondaryIncomes]);

  const totalSecondaryIncome = secondaryIncomes.reduce(
    (sum, income) => sum + income.amount,
    0,
  );
  const totalIncome = (salary || 0) + totalSecondaryIncome;
  const totalBudgeted = budgets.reduce(
    (sum, b) => sum + (b.targetAmount || 0),
    0,
  );
  const totalSpent = budgets.reduce(
    (sum, b) => sum + b.spent,
    0,
  );
  const exceedsSalary =
    totalIncome > 0 && totalBudgeted > totalIncome;
  const remainingSalary = totalIncome - totalSpent;

  const availableCategories = (
    Object.keys(categoryConfig) as BudgetCategoryType[]
  ).filter((cat) => !budgets.some((b) => b.category === cat));

  const handleCreateBudget = () => {
    const newBudget: Budget = {
      id: Date.now().toString(),
      category: newBudgetCategory,
      targetAmount:
        newBudgetAmount && parseFloat(newBudgetAmount) > 0
          ? parseFloat(newBudgetAmount)
          : null,
      spent: 0,
      transactions: [],
    };

    setBudgets([...budgets, newBudget]);
    setNewBudgetAmount("");
    setShowCreateBudget(false);
  };

  const handleAddTransaction = (budgetId: string) => {
    if (sliderAmount <= 0) return;

    const finalSubCategory = showCustomTransactionSubCategory
      ? customTransactionSubCategory.trim()
      : transactionSubCategory;

    if (!finalSubCategory) {
      setAlertMessage(
        "Please select a sub-category to identify where this expense is allocated.",
      );
      return;
    }

    setBudgets((prev) =>
      prev.map((b) => {
        if (b.id === budgetId) {
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            amount: sliderAmount,
            date: new Date().toISOString(),
            note: transactionNote || undefined,
            subCategory: finalSubCategory,
          };
          return {
            ...b,
            spent: b.spent + sliderAmount,
            transactions: [newTransaction, ...b.transactions],
          };
        }
        return b;
      }),
    );

    setSliderAmount(0);
    setTransactionNote("");
    setTransactionSubCategory("");
    setShowCustomTransactionSubCategory(false);
    setCustomTransactionSubCategory("");
    setEditingBudgetId(null);
  };

  const handleDeleteBudget = (budgetId: string) => {
    setBudgets((prev) => prev.filter((b) => b.id !== budgetId));
    if (expandedBudget === budgetId) setExpandedBudget(null);
  };

  const handleEditBudget = (budgetId: string) => {
    setBudgets((prev) =>
      prev.map((b) => {
        if (b.id === budgetId) {
          return {
            ...b,
            targetAmount:
              editingBudgetAmount &&
              parseFloat(editingBudgetAmount) > 0
                ? parseFloat(editingBudgetAmount)
                : null,
          };
        }
        return b;
      }),
    );

    setEditingBudgetAmount("");
    setShowEditBudget(null);
  };

  const handleAddSecondaryIncome = () => {
    if (
      !newSecondaryAmount ||
      parseFloat(newSecondaryAmount) <= 0
    )
      return;

    const newIncome: SecondaryIncome = {
      id: Date.now().toString(),
      amount: parseFloat(newSecondaryAmount),
      category: newSecondaryCategory,
    };

    setSecondaryIncomes([...secondaryIncomes, newIncome]);
    setNewSecondaryAmount("");
    setNewSecondaryCategory("Online Work");
    setShowAddSecondaryIncome(false);
  };

  const handleDeleteSecondaryIncome = (id: string) => {
    setSecondaryIncomes((prev) =>
      prev.filter((income) => income.id !== id),
    );
  };

  const getStatus = (
    spent: number,
    target: number | null,
  ):
    | "healthy"
    | "on-track"
    | "near-limit"
    | "over-budget"
    | "no-target" => {
    if (target === null) return "no-target";
    const pct = (spent / target) * 100;
    if (pct >= 100) return "over-budget";
    if (pct >= 85) return "near-limit";
    if (pct >= 50) return "on-track";
    return "healthy";
  };

  // Generate last 7 days spending data for graph
  const getWeeklyData = (transactions: Transaction[]) => {
    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];

      const dayTotal = transactions
        .filter((txn) => {
          const txnDate = new Date(txn.date);
          return txnDate.toDateString() === date.toDateString();
        })
        .reduce((sum, txn) => sum + txn.amount, 0);

      weekData.push({ day: dayName, amount: dayTotal });
    }

    return weekData;
  };

  return (
    <div
      className="flex flex-col h-full bg-[#FAF9F7]"
      onClick={() => {
        if (menuOpenBudgetId) setMenuOpenBudgetId(null);
      }}
    >
      <style>{`
        /* Hide number input spinner arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-5 pb-4 shrink-0"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#111827] hover:text-[#1565C0] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span
            style={{ fontSize: "0.95rem", fontWeight: 500 }}
          >
            Back
          </span>
        </motion.button>
        <div>
          <p
            className="text-[#111827]"
            style={{ fontSize: "1.1rem", fontWeight: 600 }}
          >
            Budget Tracker
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "0.8rem" }}
          >
            {salary !== null
              ? `Monthly Salary: ₱${salary.toLocaleString()}`
              : "Manage your spending"}
          </p>
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-5">
        {/* Salary Alert if exceeds */}
        <AnimatePresence>
          {exceedsSalary && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="bg-[#BA1A1A]/10 border border-[#BA1A1A]/20 rounded-2xl p-4 flex gap-3"
            >
              <AlertTriangle
                className="w-5 h-5 text-[#BA1A1A] shrink-0"
                strokeWidth={1.7}
              />
              <div className="flex-1">
                <p
                  className="text-[#BA1A1A]"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  Budget Exceeds Salary
                </p>
                <p
                  className="text-[#45474c]"
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  Your total budgeted amount (₱
                  {totalBudgeted.toLocaleString()}) exceeds your
                  monthly salary (₱
                  {salary?.toLocaleString()}).
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Salary Gamified Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl p-6 relative overflow-hidden bg-white"
          style={{
            boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
            border: "1px solid rgba(198, 198, 205, 0.15)",
          }}
        >
          {/* Decorative circles - very faint light gray scattered pattern */}
          {/* Top right - large */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 180,
              height: 180,
              top: -40,
              right: -30,
              background: "rgba(156,163,175,0.03)",
            }}
          />
          {/* Top right - medium */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 100,
              height: 100,
              top: 30,
              right: 20,
              background: "rgba(156,163,175,0.04)",
            }}
          />
          {/* Top left - small */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 60,
              height: 60,
              top: 10,
              left: -10,
              background: "rgba(156,163,175,0.03)",
            }}
          />
          {/* Bottom left - medium */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 80,
              height: 80,
              bottom: 30,
              left: 40,
              background: "rgba(156,163,175,0.03)",
            }}
          />
          {/* Middle center - small */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 70,
              height: 70,
              top: "50%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              background: "rgba(156,163,175,0.025)",
            }}
          />
          {/* Middle right - tiny */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 45,
              height: 45,
              top: "40%",
              right: 40,
              background: "rgba(156,163,175,0.035)",
            }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p
                className="text-[#2E7D32] uppercase tracking-widest mb-1"
                style={{ fontSize: "0.68rem", fontWeight: 600 }}
              >
                Monthly Salary
              </p>
              <p
                className="text-[#2E7D32]"
                style={{ fontSize: "0.8rem" }}
              >
                Budget allocation overview
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setShowSalaryInput(!showSalaryInput)
              }
              className="w-9 h-9 rounded-full bg-[rgba(76,175,80,0.15)] flex items-center justify-center hover:bg-[rgba(76,175,80,0.25)] transition-colors"
              aria-label={
                salary === null ? "Set salary" : "Edit salary"
              }
            >
              <Edit2
                className="w-4 h-4 text-[#2E7D32]"
                strokeWidth={2}
              />
            </motion.button>
          </div>

          {/* Edit Input Mode */}
          <AnimatePresence>
            {showSalaryInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden relative z-10"
              >
                {/* Amount Display */}
                <div className="text-center mb-6">
                  <motion.p
                    key={salary || 0}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#4CAF50]"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ₱{salary ? salary.toLocaleString() : "0"}
                  </motion.p>
                </div>

                {/* +/- Controls */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    {/* Minus Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const newValue = Math.max(
                          0,
                          (salary || 0) - 1,
                        );
                        setSalary(newValue);
                      }}
                      className="flex-shrink-0 w-14 h-14 rounded-full bg-[rgba(76,175,80,0.2)] hover:bg-[rgba(76,175,80,0.3)] flex items-center justify-center transition-colors"
                      style={{
                        minWidth: "56px",
                        minHeight: "56px",
                      }}
                    >
                      <Minus
                        className="w-6 h-6 text-[#1B5E20]"
                        strokeWidth={2.5}
                      />
                    </motion.button>

                    {/* Value Input */}
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={salary || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            inputValue === "" ||
                            inputValue === null
                          ) {
                            setSalary(0);
                          } else {
                            const value =
                              parseFloat(inputValue);
                            setSalary(
                              isNaN(value) || value < 0
                                ? 0
                                : value,
                            );
                          }
                        }}
                        className="w-full px-4 py-3.5 rounded-xl bg-white text-[#1B5E20] text-center border border-[rgba(76,175,80,0.3)] focus:bg-white focus:border-[#4CAF50] outline-none transition-all"
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 600,
                        }}
                        placeholder="0"
                      />
                    </div>

                    {/* Plus Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const newValue = Math.min(
                          100000,
                          (salary || 0) + 1,
                        );
                        setSalary(newValue);
                      }}
                      className="flex-shrink-0 w-14 h-14 rounded-full bg-[rgba(76,175,80,0.2)] hover:bg-[rgba(76,175,80,0.3)] flex items-center justify-center transition-colors"
                      style={{
                        minWidth: "56px",
                        minHeight: "56px",
                      }}
                    >
                      <Plus
                        className="w-6 h-6 text-[#1B5E20]"
                        strokeWidth={2.5}
                      />
                    </motion.button>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[5000, 10000, 20000, 50000].map(
                      (amount) => (
                        <motion.button
                          key={amount}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSalary(amount)}
                          className="py-2 px-2 rounded-lg bg-[rgba(76,175,80,0.15)] hover:bg-[rgba(76,175,80,0.25)] text-[#1B5E20] transition-colors"
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          ₱{amount.toLocaleString()}
                        </motion.button>
                      ),
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSalaryInput(false)}
                  className="w-full py-3 rounded-xl text-white bg-[#4CAF50] hover:bg-[#388E3C] transition-colors mb-3"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Save Salary
                </motion.button>

                {/* Add Secondary Income Button - Edit Mode */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddSecondaryIncome(true);
                    setShowSalaryInput(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[rgba(76,175,80,0.15)] hover:bg-[rgba(76,175,80,0.25)] text-[#1B5E20] flex items-center justify-center gap-2 transition-colors"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Add Secondary Income
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Display Mode */}
          {salary !== null && !showSalaryInput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10"
            >
              {/* Circular Progress Ring */}
              <div className="flex justify-center mb-6">
                <CircularProgress
                  spent={totalSpent}
                  salary={totalIncome}
                  size={160}
                />
              </div>

              {/* Total Income Display */}
              <div className="mb-4">
                <p
                  className="text-[#111827] uppercase tracking-widest mb-2 text-center"
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  {secondaryIncomes.length > 0
                    ? "Total Income"
                    : "Monthly Salary"}
                </p>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mb-3 text-center"
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                    color: totalIncome > 0 && totalSpent >= totalIncome
                      ? "#EF4444" // Red for overspending
                      : totalIncome > 0 && totalSpent >= totalIncome * 0.85
                        ? "#FFA726" // Orange for warning
                        : "#4CAF50", // Green for healthy
                  }}
                >
                  ₱{totalIncome.toLocaleString()}
                </motion.div>



                {/* Health Indicator */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay:
                      secondaryIncomes.length > 0 ? 0.35 : 0.2,
                  }}
                  className="flex items-center gap-2 justify-center"
                >
                  {/* Status Badge */}
                  {totalIncome > 0 && (
                    <div 
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 
                          totalSpent >= totalIncome
                            ? "rgba(239, 68, 68, 0.1)" // Red tint for overspent
                            : totalSpent >= totalIncome * 0.85
                              ? "rgba(255, 167, 38, 0.1)" // Orange tint for warning
                              : "rgba(76, 175, 80, 0.1)", // Green tint for healthy
                      }}
                    >
                      {totalSpent >= totalIncome ? (
                        <>
                          <AlertCircle className="w-3 h-3 text-[#EF4444]" strokeWidth={2} />
                          <span className="text-[#EF4444]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                            Overspent
                          </span>
                        </>
                      ) : totalSpent >= totalIncome * 0.85 ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-[#FFA726]" strokeWidth={2} />
                          <span className="text-[#FFA726]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                            Warning
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#4CAF50]" strokeWidth={2} />
                          <span className="text-[#4CAF50]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                            Healthy
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  <span
                    className={totalSpent > totalIncome ? "text-[#111827] ml-1" : "text-[#558B2F] ml-1"}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {totalSpent > 0
                      ? `${Math.round((totalSpent / totalIncome) * 100)}% utilized`
                      : "No spending yet"}
                  </span>
                </motion.div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white/60 rounded-xl p-4"
                >
                  <p
                    className="text-[#111827] mb-1.5"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    ALLOCATED
                  </p>
                  <p
                    className={totalSpent > totalIncome ? "text-[#111827] flex items-baseline" : "text-[#4CAF50] flex items-baseline"}
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ₱{totalSpent.toLocaleString()}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/60 rounded-xl p-4"
                >
                  <p
                    className="text-[#111827] mb-1.5"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    REMAINING
                  </p>
                  <p
                    className={
                      remainingSalary < 0
                        ? "text-[#EF4444]"
                        : "text-[#4CAF50]"
                    }
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    {remainingSalary < 0 ? "-₱" : "₱"}
                    {Math.abs(remainingSalary).toLocaleString()}
                  </p>
                </motion.div>
              </div>

              {/* View Details Button - Opens Modal */}
              {secondaryIncomes.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowIncomeDetailsModal(true)}
                  className="w-full text-center py-2 rounded-lg bg-[rgba(76,175,80,0.15)] hover:bg-[rgba(76,175,80,0.25)] transition-colors"
                >
                  <span
                    className="text-[#2E7D32]"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    View Details
                  </span>
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Empty State */}
          {salary === null && !showSalaryInput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[rgba(76,175,80,0.15)] flex items-center justify-center mx-auto mb-3">
                <DollarSign
                  className="w-8 h-8 text-[#2E7D32]"
                  strokeWidth={1.7}
                />
              </div>
              <p
                className="text-[#1B5E20] mb-2"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Set Your Monthly Salary
              </p>
              <p
                className="text-[#558B2F] mb-4"
                style={{ fontSize: "0.85rem" }}
              >
                Start tracking your budget by setting your
                salary
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSalaryInput(true)}
                className="px-6 py-3 rounded-xl bg-[#4CAF50] text-white hover:bg-[#388E3C] transition-colors"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                Set Salary
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Empty State */}
        {budgets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-8 text-center border border-[rgba(17,24,39,0.06)] mt-8"
            style={{
              boxShadow:
                "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag
                className="w-8 h-8 text-[#1565C0]"
                strokeWidth={1.5}
              />
            </div>
            <p
              className="text-[#111827] mb-2"
              style={{ fontSize: "1.125rem", fontWeight: 700 }}
            >
              No Budget Tracked Yet
            </p>
            <p
              className="text-muted-foreground mb-5"
              style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
            >
              Start tracking your expenses by creating your
              first budget category.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateBudget(true)}
              className="px-6 py-3 rounded-xl text-white flex items-center gap-2 mx-auto"
              style={{
                backgroundColor: "#1565C0",
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: "0 6px 20px rgba(10,10,111,0.22)",
              }}
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
              Create Budget
            </motion.button>
          </motion.div>
        )}

        {/* Budget List */}
        {budgets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6 gap-4">
              <p
                className="text-[#111827] uppercase tracking-widest"
                style={{ fontSize: "0.7rem", fontWeight: 600 }}
              >
                Your Budgets
              </p>
              {availableCategories.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateBudget(true)}
                  className="text-[#1565C0] flex items-center gap-2 px-4 py-2.5 -mr-4 rounded-xl hover:bg-[#1565C0]/5 active:bg-[#1565C0]/10 transition-colors"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    minHeight: "44px",
                    minWidth: "44px",
                  }}
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                  <span>Add Budget</span>
                </motion.button>
              )}
            </div>

            <div className="space-y-4">
              {budgets.map((budget, idx) => {
                const config = categoryConfig[budget.category];
                const pct =
                  budget.targetAmount && budget.targetAmount > 0
                    ? (budget.spent / budget.targetAmount) * 100
                    : 0;
                const remaining =
                  budget.targetAmount !== null
                    ? budget.targetAmount - budget.spent
                    : 0;
                const status = getStatus(
                  budget.spent,
                  budget.targetAmount,
                );
                const isExpanded = expandedBudget === budget.id;
                const weekData = getWeeklyData(
                  budget.transactions,
                );
                const maxWeekAmount = Math.max(
                  ...weekData.map((d) => d.amount),
                  1,
                );

                const statusColor =
                  status === "over-budget"
                    ? "#EF4444"
                    : status === "near-limit"
                      ? "#FFA726"
                      : status === "healthy"
                        ? "#4CAF50"
                        : status === "no-target"
                          ? "#1565C0"
                          : "#F97316";
                
                // Determine currency color based on status
                const currencyColor =
                  status === "over-budget"
                    ? "#111827"
                    : status === "near-limit"
                      ? "#FFA726"
                      : "#4CAF50";

                return (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className={`bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] relative ${isExpanded ? "cursor-pointer" : ""}`}
                    style={{
                      boxShadow:
                        "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
                      overflow: "visible",
                    }}
                    onClick={() => {
                      if (isExpanded) {
                        setExpandedBudget(null);
                        setEditingBudgetId(null);
                        setSliderAmount(0);
                        setTransactionNote("");
                      }
                    }}
                  >
                    <div
                      className={`p-5 ${!isExpanded ? "cursor-pointer" : ""}`}
                      onClick={(e) => {
                        if (!isExpanded) {
                          e.stopPropagation();
                          setExpandedBudget(budget.id);
                          setEditingBudgetId(null);
                          setSliderAmount(0);
                          setTransactionNote("");
                        }
                      }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${config.color}20`,
                          }}
                        >
                          <config.icon
                            className="w-7 h-7"
                            style={{ color: config.color }}
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[#111827] mb-1"
                            style={{
                              fontSize: "1.0625rem",
                              fontWeight: 700,
                              lineHeight: 1.2,
                            }}
                          >
                            {budget.category}
                          </p>
                          <p
                            style={{ 
                              fontSize: "0.875rem",
                              color: currencyColor
                            }}
                          >
                            {budget.targetAmount !== null
                              ? `₱${budget.spent.toLocaleString()} of ₱${budget.targetAmount.toLocaleString()}`
                              : `₱${budget.spent.toLocaleString()} spent`}
                          </p>
                        </div>
                        <div className="relative">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenBudgetId(
                                menuOpenBudgetId === budget.id
                                  ? null
                                  : budget.id,
                              );
                            }}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.05)] transition-colors shrink-0"
                            aria-label="Menu"
                          >
                            <MoreVertical
                              className="w-5 h-5 text-[#45474c]"
                              strokeWidth={2}
                            />
                          </motion.button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {menuOpenBudgetId === budget.id && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  scale: 0.95,
                                  y: -10,
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  y: 0,
                                }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.95,
                                  y: -10,
                                }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-[rgba(17,24,39,0.08)] overflow-hidden z-50"
                                style={{ minWidth: "180px" }}
                              >
                                <motion.button
                                  whileHover={{
                                    backgroundColor:
                                      "rgba(17,24,39,0.03)",
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSetTargetBudgetId(
                                      budget.id,
                                    );
                                    setEditingBudgetAmount(
                                      budget.targetAmount !==
                                        null
                                        ? budget.targetAmount.toString()
                                        : "",
                                    );
                                    setMenuOpenBudgetId(null);
                                  }}
                                  className="w-full px-4 py-3 text-left flex items-center gap-3"
                                >
                                  <Target
                                    className="w-4 h-4 text-[#4CAF50]"
                                    strokeWidth={1.7}
                                  />
                                  <span
                                    className="text-[#111827]"
                                    style={{
                                      fontSize: "0.9rem",
                                      fontWeight: 500,
                                    }}
                                  >
                                    Set Budget
                                  </span>
                                </motion.button>
                                <div className="h-px bg-[rgba(17,24,39,0.06)]" />
                                <motion.button
                                  whileHover={{
                                    backgroundColor:
                                      "rgba(186,26,26,0.05)",
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmBudgetId(
                                      budget.id,
                                    );
                                    setMenuOpenBudgetId(null);
                                  }}
                                  className="w-full px-4 py-3 text-left flex items-center gap-3"
                                >
                                  <Trash2
                                    className="w-4 h-4 text-[#BA1A1A]"
                                    strokeWidth={1.7}
                                  />
                                  <span
                                    className="text-[#BA1A1A]"
                                    style={{
                                      fontSize: "0.9rem",
                                      fontWeight: 500,
                                    }}
                                  >
                                    Delete Budget
                                  </span>
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Progress Bar - only show if target is set */}
                      {budget.targetAmount !== null ? (
                        <>
                          <div className="w-full h-2 bg-[rgba(17,24,39,0.05)] rounded-full overflow-hidden mb-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min(pct, 100)}%`,
                              }}
                              transition={{
                                delay: 0.3 + idx * 0.05,
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: statusColor,
                              }}
                            />
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="uppercase tracking-wide"
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                color: statusColor,
                              }}
                            >
                              {status === "over-budget"
                                ? "Over Budget"
                                : status === "near-limit"
                                  ? "Near Limit"
                                  : status === "healthy"
                                    ? "Healthy"
                                    : "On Track"}
                            </span>
                            <div className="flex items-center gap-3">
                              <span
                                className="text-[#45474c] uppercase tracking-wide"
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                }}
                              >
                                {pct.toFixed(0)}% utilized
                              </span>
                              <span
                                className="text-[#45474c] uppercase tracking-wide"
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                }}
                              >
                                ₱
                                {Math.max(
                                  0,
                                  remaining,
                                ).toLocaleString()}{" "}
                                remaining
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="uppercase tracking-wide"
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              color: statusColor,
                            }}
                          >
                            No Target Set
                          </span>
                          <span
                            className="text-[#45474c] uppercase tracking-wide"
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                            }}
                          >
                            Deducted from salary
                          </span>
                        </div>
                      )}

                      {/* Add Expense Button - Show when collapsed */}
                      {!isExpanded && (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedBudget(budget.id);
                            setEditingBudgetId(null);
                            setSliderAmount(0);
                            setTransactionNote("");
                          }}
                          className="w-full py-2.5 rounded-xl bg-[rgba(17,24,39,0.03)] text-[#1565C0] flex items-center justify-center gap-2 hover:bg-[rgba(17,24,39,0.05)] transition-colors"
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <Plus
                            className="w-4 h-4"
                            strokeWidth={2}
                          />
                          Add Expense
                        </motion.button>
                      )}
                    </div>

                    {/* Expanded Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-[rgba(17,24,39,0.06)] overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="divide-y divide-[rgba(17,24,39,0.06)]">
                            {/* Section 1: Weekly Spending */}
                            <div className="p-5 pb-6">
                              <div className="flex items-center justify-between mb-4">
                                <p
                                  className="text-[#111827]"
                                  style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  Weekly Spending
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <TrendingUp
                                    className="w-3.5 h-3.5"
                                    style={{
                                      color: config.color,
                                    }}
                                    strokeWidth={2}
                                  />
                                  <span
                                    style={{
                                      fontSize: "0.75rem",
                                      fontWeight: 600,
                                      color: config.color,
                                    }}
                                  >
                                    Last 7 Days
                                  </span>
                                </div>
                              </div>

                              {/* Bar Chart */}
                              <div className="bg-[#FAF9F7] rounded-xl p-4">
                                <div className="flex items-end justify-between gap-2 h-28">
                                  {weekData.map(
                                    (data, dayIdx) => {
                                      const barHeight =
                                        maxWeekAmount > 0
                                          ? (data.amount /
                                              maxWeekAmount) *
                                            100
                                          : 0;
                                      return (
                                        <div
                                          key={dayIdx}
                                          className="flex-1 flex flex-col items-center gap-2"
                                        >
                                          <div
                                            className="w-full flex flex-col justify-end items-center"
                                            style={{
                                              height: "100px",
                                            }}
                                          >
                                            {data.amount >
                                              0 && (
                                              <motion.div
                                                initial={{
                                                  height: 0,
                                                }}
                                                animate={{
                                                  height: `${barHeight}%`,
                                                }}
                                                transition={{
                                                  delay:
                                                    0.1 +
                                                    dayIdx *
                                                      0.05,
                                                  duration: 0.6,
                                                  ease: "easeOut",
                                                }}
                                                className="w-full rounded-t-lg relative group"
                                                style={{
                                                  background: `linear-gradient(180deg, ${config.color} 0%, ${config.color}90 100%)`,
                                                  minHeight:
                                                    data.amount >
                                                    0
                                                      ? "8px"
                                                      : "0px",
                                                }}
                                              >
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                  <div
                                                    className="bg-[#111827] text-white px-2 py-1 rounded-lg whitespace-nowrap"
                                                    style={{
                                                      fontSize:
                                                        "0.7rem",
                                                    }}
                                                  >
                                                    ₱
                                                    {data.amount.toLocaleString()}
                                                  </div>
                                                </div>
                                              </motion.div>
                                            )}
                                          </div>
                                          <span
                                            className="text-muted-foreground"
                                            style={{
                                              fontSize:
                                                "0.7rem",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {data.day}
                                          </span>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Section 2: Recent Expenses */}
                            {budget.transactions.length > 0 && (
                              <div className="p-5 pb-6">
                                <div className="flex items-center justify-between mb-4">
                                  <p
                                    className="text-[#111827]"
                                    style={{
                                      fontSize: "0.875rem",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Recent Expenses
                                  </p>
                                  {budget.transactions.length >
                                    3 && (
                                    <motion.button
                                      whileHover={{
                                        scale: 1.05,
                                      }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setViewAllExpensesBudgetId(
                                          budget.id,
                                        );
                                      }}
                                      className="text-[#1565C0] text-sm"
                                      style={{
                                        fontSize: "0.85rem",
                                        fontWeight: 600,
                                      }}
                                    >
                                      View All (
                                      {
                                        budget.transactions
                                          .length
                                      }
                                      )
                                    </motion.button>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  {budget.transactions
                                    .slice(0, 3)
                                    .map((txn, txnIdx) => {
                                      const txnDate = new Date(
                                        txn.date,
                                      );
                                      const isToday =
                                        txnDate.toDateString() ===
                                        new Date().toDateString();
                                      const formattedDate =
                                        isToday
                                          ? `Today, ${txnDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`
                                          : txnDate.toLocaleDateString(
                                              "en-US",
                                              {
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute:
                                                  "2-digit",
                                                hour12: true,
                                              },
                                            );

                                      return (
                                        <motion.div
                                          key={txn.id}
                                          initial={{
                                            opacity: 0,
                                            x: -10,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            x: 0,
                                          }}
                                          transition={{
                                            delay:
                                              txnIdx * 0.05,
                                          }}
                                          className="p-3 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.04)]"
                                        >
                                          <div className="flex items-start justify-between gap-3 mb-1">
                                            <p
                                              className="text-[#4CAF50]"
                                              style={{
                                                fontSize:
                                                  "1rem",
                                                fontWeight: 700,
                                              }}
                                            >
                                              ₱
                                              {txn.amount.toLocaleString()}
                                            </p>
                                            <p
                                              className="text-muted-foreground text-right"
                                              style={{
                                                fontSize:
                                                  "0.75rem",
                                                lineHeight: 1.4,
                                              }}
                                            >
                                              {formattedDate}
                                            </p>
                                          </div>
                                          {txn.note && (
                                            <p
                                              className="text-[#45474c] truncate"
                                              style={{
                                                fontSize:
                                                  "0.85rem",
                                              }}
                                            >
                                              {txn.note}
                                            </p>
                                          )}
                                        </motion.div>
                                      );
                                    })}
                                </div>
                              </div>
                            )}

                            {/* Section 3: Add Expense */}
                            <div className="p-5 pt-6 pb-6 bg-[rgba(21,101,192,0.02)]">
                              <p
                                className="text-[#111827] mb-4"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                }}
                              >
                                Add Expense
                              </p>

                              {/* Amount Display */}
                              <div className="text-center mb-6">
                                <motion.p
                                  key={
                                    editingBudgetId ===
                                    budget.id
                                      ? sliderAmount
                                      : 0
                                  }
                                  initial={{
                                    scale: 1.2,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    scale: 1,
                                    opacity: 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                  style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: "#4CAF50",
                                  }}
                                >
                                  ₱
                                  {editingBudgetId === budget.id
                                    ? sliderAmount.toLocaleString()
                                    : "0"}
                                </motion.p>
                              </div>

                              {/* +/- Controls */}
                              <div className="mb-6">
                                <div className="flex items-center gap-3">
                                  {/* Minus Button */}
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentAmount =
                                        editingBudgetId ===
                                        budget.id
                                          ? sliderAmount
                                          : 0;
                                      const newValue = Math.max(
                                        0,
                                        currentAmount - 1,
                                      );
                                      setEditingBudgetId(
                                        budget.id,
                                      );
                                      setSliderAmount(newValue);
                                    }}
                                    className="flex-shrink-0 w-14 h-14 rounded-full bg-[#4CAF50]/20 hover:bg-[#4CAF50]/30 flex items-center justify-center transition-colors"
                                    style={{
                                      minWidth: "56px",
                                      minHeight: "56px",
                                    }}
                                  >
                                    <Minus
                                      className="w-6 h-6 text-[#4CAF50]"
                                      strokeWidth={2.5}
                                    />
                                  </motion.button>

                                  {/* Value Input */}
                                  <div className="flex-1 relative">
                                    <input
                                      type="number"
                                      value={
                                        editingBudgetId ===
                                        budget.id
                                          ? sliderAmount || ""
                                          : ""
                                      }
                                      onChange={(e) => {
                                        const inputValue =
                                          e.target.value;
                                        setEditingBudgetId(
                                          budget.id,
                                        );
                                        if (
                                          inputValue === "" ||
                                          inputValue === null
                                        ) {
                                          setSliderAmount(0);
                                        } else {
                                          const value =
                                            parseFloat(
                                              inputValue,
                                            );
                                          setSliderAmount(
                                            isNaN(value) ||
                                              value < 0
                                              ? 0
                                              : value,
                                          );
                                        }
                                      }}
                                      onClick={(e) =>
                                        e.stopPropagation()
                                      }
                                      className="w-full px-4 py-3.5 rounded-xl bg-[#4CAF50]/10 text-[#111827] text-center border border-[#4CAF50]/20 focus:bg-[#4CAF50]/15 focus:border-[#4CAF50]/40 outline-none transition-all"
                                      style={{
                                        fontSize: "1.125rem",
                                        fontWeight: 600,
                                      }}
                                      placeholder="0"
                                    />
                                  </div>

                                  {/* Plus Button */}
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentAmount =
                                        editingBudgetId ===
                                        budget.id
                                          ? sliderAmount
                                          : 0;
                                      const maxAmount =
                                        salary !== null
                                          ? Math.min(
                                              salary,
                                              10000,
                                            )
                                          : 10000;
                                      const newValue = Math.min(
                                        maxAmount,
                                        currentAmount + 1,
                                      );
                                      setEditingBudgetId(
                                        budget.id,
                                      );
                                      setSliderAmount(newValue);
                                    }}
                                    className="flex-shrink-0 w-14 h-14 rounded-full bg-[#4CAF50]/20 hover:bg-[#4CAF50]/30 flex items-center justify-center transition-colors"
                                    style={{
                                      minWidth: "56px",
                                      minHeight: "56px",
                                    }}
                                  >
                                    <Plus
                                      className="w-6 h-6 text-[#4CAF50]"
                                      strokeWidth={2.5}
                                    />
                                  </motion.button>
                                </div>

                                {/* Quick Amount Buttons */}
                                <div className="grid grid-cols-4 gap-2 mt-4">
                                  {[50, 100, 500, 1000].map(
                                    (amount) => (
                                      <motion.button
                                        key={amount}
                                        whileHover={{
                                          scale: 1.05,
                                        }}
                                        whileTap={{
                                          scale: 0.95,
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingBudgetId(
                                            budget.id,
                                          );
                                          setSliderAmount(
                                            amount,
                                          );
                                        }}
                                        className="py-2 px-2 rounded-lg bg-[#4CAF50]/10 hover:bg-[#4CAF50]/20 text-[#4CAF50] transition-colors"
                                        style={{
                                          fontSize: "0.75rem",
                                          fontWeight: 600,
                                        }}
                                      >
                                        ₱
                                        {amount.toLocaleString()}
                                      </motion.button>
                                    ),
                                  )}
                                </div>
                              </div>

                              {/* Sub-Category Selection */}
                              <div className="mb-4">
                                <label
                                  className="text-[#111827] mb-2 block"
                                  style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  Sub-Category{" "}
                                  <span className="text-[#BA1A1A]">
                                    *
                                  </span>
                                </label>
                                <p
                                  className="text-[#45474c] mb-3"
                                  style={{
                                    fontSize: "0.75rem",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  Select where this expense is
                                  allocated
                                </p>

                                {/* Preset Sub-Categories */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {categoryConfig[
                                    budget.category
                                  ].subCategories.map(
                                    (subCat) => (
                                      <motion.button
                                        key={subCat}
                                        whileHover={{
                                          scale: 1.05,
                                        }}
                                        whileTap={{
                                          scale: 0.95,
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingBudgetId(
                                            budget.id,
                                          );
                                          setTransactionSubCategory(
                                            subCat,
                                          );
                                          setShowCustomTransactionSubCategory(
                                            false,
                                          );
                                          setCustomTransactionSubCategory(
                                            "",
                                          );
                                        }}
                                        className="px-4 py-2.5 rounded-xl border transition-all"
                                        style={{
                                          backgroundColor:
                                            editingBudgetId ===
                                              budget.id &&
                                            transactionSubCategory ===
                                              subCat &&
                                            !showCustomTransactionSubCategory
                                              ? `${categoryConfig[budget.category].color}15`
                                              : "#FAF9F7",
                                          borderColor:
                                            editingBudgetId ===
                                              budget.id &&
                                            transactionSubCategory ===
                                              subCat &&
                                            !showCustomTransactionSubCategory
                                              ? categoryConfig[
                                                  budget
                                                    .category
                                                ].color
                                              : "rgba(17,24,39,0.1)",
                                          color:
                                            editingBudgetId ===
                                              budget.id &&
                                            transactionSubCategory ===
                                              subCat &&
                                            !showCustomTransactionSubCategory
                                              ? categoryConfig[
                                                  budget
                                                    .category
                                                ].color
                                              : "#111827",
                                          fontSize: "0.875rem",
                                          fontWeight:
                                            editingBudgetId ===
                                              budget.id &&
                                            transactionSubCategory ===
                                              subCat &&
                                            !showCustomTransactionSubCategory
                                              ? 600
                                              : 500,
                                        }}
                                      >
                                        {subCat}
                                      </motion.button>
                                    ),
                                  )}

                                  {/* Add Custom Button */}
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingBudgetId(
                                        budget.id,
                                      );
                                      setShowCustomTransactionSubCategory(
                                        !showCustomTransactionSubCategory,
                                      );
                                      setTransactionSubCategory(
                                        "",
                                      );
                                    }}
                                    className="px-4 py-2.5 rounded-xl border transition-all"
                                    style={{
                                      backgroundColor:
                                        editingBudgetId ===
                                          budget.id &&
                                        showCustomTransactionSubCategory
                                          ? `${categoryConfig[budget.category].color}15`
                                          : "#FAF9F7",
                                      borderColor:
                                        editingBudgetId ===
                                          budget.id &&
                                        showCustomTransactionSubCategory
                                          ? categoryConfig[
                                              budget.category
                                            ].color
                                          : "rgba(17,24,39,0.1)",
                                      color:
                                        editingBudgetId ===
                                          budget.id &&
                                        showCustomTransactionSubCategory
                                          ? categoryConfig[
                                              budget.category
                                            ].color
                                          : "#111827",
                                      fontSize: "0.875rem",
                                      fontWeight:
                                        editingBudgetId ===
                                          budget.id &&
                                        showCustomTransactionSubCategory
                                          ? 600
                                          : 500,
                                    }}
                                  >
                                    <Plus
                                      className="w-4 h-4 inline mr-1"
                                      strokeWidth={2}
                                    />
                                    Custom
                                  </motion.button>
                                </div>

                                {/* Custom Sub-Category Input */}
                                <AnimatePresence>
                                  {editingBudgetId ===
                                    budget.id &&
                                    showCustomTransactionSubCategory && (
                                      <motion.div
                                        initial={{
                                          opacity: 0,
                                          height: 0,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          height: "auto",
                                        }}
                                        exit={{
                                          opacity: 0,
                                          height: 0,
                                        }}
                                        transition={{
                                          duration: 0.2,
                                        }}
                                        className="overflow-hidden mb-3"
                                      >
                                        <div className="relative">
                                          <input
                                            type="text"
                                            placeholder="Enter custom sub-category"
                                            value={
                                              customTransactionSubCategory
                                            }
                                            onChange={(e) => {
                                              setCustomTransactionSubCategory(
                                                e.target.value,
                                              );
                                            }}
                                            onClick={(e) =>
                                              e.stopPropagation()
                                            }
                                            className="w-full px-4 py-3 pr-10 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] focus:border-[#4CAF50] focus:outline-none transition-colors"
                                            style={{
                                              fontSize:
                                                "0.95rem",
                                            }}
                                          />
                                          {customTransactionSubCategory && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setCustomTransactionSubCategory(
                                                  "",
                                                );
                                                setShowCustomTransactionSubCategory(
                                                  false,
                                                );
                                              }}
                                              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[rgba(17,24,39,0.1)] hover:bg-[rgba(17,24,39,0.15)] flex items-center justify-center transition-colors"
                                            >
                                              <X
                                                className="w-3.5 h-3.5 text-[#111827]"
                                                strokeWidth={2}
                                              />
                                            </button>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                </AnimatePresence>
                              </div>

                              {/* Note Input */}
                              <input
                                type="text"
                                placeholder="Note (optional)"
                                value={
                                  editingBudgetId === budget.id
                                    ? transactionNote
                                    : ""
                                }
                                onChange={(e) => {
                                  setEditingBudgetId(budget.id);
                                  setTransactionNote(
                                    e.target.value,
                                  );
                                }}
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827] mb-5"
                                style={{ fontSize: "0.95rem" }}
                              />

                              {/* Bottom Buttons */}
                              <div className="flex items-center justify-end gap-4">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedBudget(null);
                                    setEditingBudgetId(null);
                                    setSliderAmount(0);
                                    setTransactionNote("");
                                    setTransactionSubCategory(
                                      "",
                                    );
                                    setShowCustomTransactionSubCategory(
                                      false,
                                    );
                                    setCustomTransactionSubCategory(
                                      "",
                                    );
                                  }}
                                  className="text-[#45474c] hover:text-[#111827] transition-colors px-3"
                                  style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  Close
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddTransaction(
                                      budget.id,
                                    );
                                  }}
                                  className="py-3 px-6 rounded-xl text-white"
                                  style={{
                                    backgroundColor: "#1565C0",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    boxShadow:
                                      "0 4px 14px rgba(10,10,111,0.25)",
                                  }}
                                >
                                  Add Expense
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Budget Modal */}
      <AnimatePresence>
        {showCreateBudget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
            style={{ background: "rgba(10,10,111,0.4)" }}
            onClick={() => setShowCreateBudget(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
              </div>

              <p
                className="text-[#111827] mb-4"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                }}
              >
                Create New Budget
              </p>

              {availableCategories.length === 0 ? (
                <p
                  className="text-muted-foreground mb-4"
                  style={{ fontSize: "0.9rem" }}
                >
                  You've created budgets for all available
                  categories.
                </p>
              ) : (
                <>
                  {/* Category Selection */}
                  <div className="mb-5">
                    <label
                      className="text-[#111827] mb-2 block"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      Category
                    </label>
                    <select
                      value={newBudgetCategory}
                      onChange={(e) => {
                        setNewBudgetCategory(
                          e.target.value as BudgetCategoryType,
                        );
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827]"
                      style={{ fontSize: "1rem" }}
                    >
                      {availableCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Amount */}
                  <div className="mb-6">
                    <label
                      className="text-[#111827] mb-2 block"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      Target Amount (Optional)
                    </label>
                    <p
                      className="text-muted-foreground mb-2"
                      style={{
                        fontSize: "0.75rem",
                        lineHeight: 1.4,
                      }}
                    >
                      Leave empty to track spending without a
                      limit. Expenses are always deducted from
                      salary.
                    </p>
                    <input
                      type="number"
                      placeholder="Enter budget limit (optional)"
                      value={newBudgetAmount}
                      onChange={(e) =>
                        setNewBudgetAmount(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827] focus:border-[#1565C0] focus:outline-none transition-colors"
                      style={{ fontSize: "1rem" }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowCreateBudget(false);
                      }}
                      className="flex-1 py-3.5 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827] hover:bg-[rgba(17,24,39,0.08)] transition-colors"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateBudget}
                      className="flex-1 py-3.5 rounded-xl text-white transition-all"
                      style={{
                        backgroundColor: "#1565C0",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        boxShadow:
                          "0 4px 14px rgba(10,10,111,0.25)",
                      }}
                    >
                      Create Budget
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmBudgetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(10,10,111,0.5)" }}
            onClick={() => setDeleteConfirmBudgetId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="bg-white rounded-3xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-[#BA1A1A]/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle
                  className="w-7 h-7 text-[#BA1A1A]"
                  strokeWidth={1.7}
                />
              </div>

              <p
                className="text-[#111827] text-center mb-2"
                style={{ fontSize: "1.25rem", fontWeight: 700 }}
              >
                Delete Budget?
              </p>
              <p
                className="text-muted-foreground text-center mb-6"
                style={{ fontSize: "0.9rem", lineHeight: 1.5 }}
              >
                This action cannot be undone. All expenses and
                data for this budget will be permanently
                removed.
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirmBudgetId(null)}
                  className="flex-1 py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827]"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleDeleteBudget(deleteConfirmBudgetId);
                    setDeleteConfirmBudgetId(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#BA1A1A] text-white"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Set Budget Modal */}
      <AnimatePresence>
        {setTargetBudgetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
            style={{ background: "rgba(10,10,111,0.4)" }}
            onClick={() => {
              setSetTargetBudgetId(null);
              setEditingBudgetAmount("");
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                  <Target
                    className="w-6 h-6 text-[#4CAF50]"
                    strokeWidth={1.7}
                  />
                </div>
                <div>
                  <p
                    className="text-[#111827]"
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                    }}
                  >
                    Set Budget
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Optional spending limit
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label
                  className="text-[#111827] mb-2 block"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  Target Amount
                </label>
                <p
                  className="text-muted-foreground mb-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  Leave empty to remove target and track
                  spending only
                </p>
                <input
                  type="number"
                  placeholder="Enter target amount"
                  value={editingBudgetAmount}
                  onChange={(e) =>
                    setEditingBudgetAmount(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827]"
                  style={{ fontSize: "1rem" }}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSetTargetBudgetId(null);
                    setEditingBudgetAmount("");
                  }}
                  className="flex-1 py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827]"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (setTargetBudgetId) {
                      handleEditBudget(setTargetBudgetId);
                      setSetTargetBudgetId(null);
                    }
                  }}
                  className="flex-1 py-3 rounded-xl text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #4CAF50 0%, #2d8f2d 100%)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Save Target
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Expenses Modal */}
      <AnimatePresence>
        {viewAllExpensesBudgetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
            style={{ background: "rgba(10,10,111,0.4)" }}
            onClick={() => setViewAllExpensesBudgetId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="shrink-0 p-6 pb-4 border-b border-[rgba(17,24,39,0.06)]">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
                </div>

                {(() => {
                  const budget = budgets.find(
                    (b) => b.id === viewAllExpensesBudgetId,
                  );
                  if (!budget) return null;
                  const config =
                    categoryConfig[budget.category];
                  
                  const status = getStatus(
                    budget.spent,
                    budget.targetAmount,
                  );
                  
                  const modalCurrencyColor =
                    status === "over-budget"
                      ? "#111827"
                      : status === "near-limit"
                        ? "#FFA726"
                        : "#4CAF50";

                  return (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${config.color}20`,
                        }}
                      >
                        <config.icon
                          className="w-6 h-6"
                          style={{ color: config.color }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-[#111827]"
                          style={{
                            fontSize: "1.125rem",
                            fontWeight: 700,
                          }}
                        >
                          {budget.category} Expenses
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {budget.transactions.length}{" "}
                          {budget.transactions.length === 1
                            ? "transaction"
                            : "transactions"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: modalCurrencyColor,
                          }}
                        >
                          ₱{budget.spent.toLocaleString()}
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Total spent
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Scrollable Expenses List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {(() => {
                  const budget = budgets.find(
                    (b) => b.id === viewAllExpensesBudgetId,
                  );
                  if (
                    !budget ||
                    budget.transactions.length === 0
                  ) {
                    return (
                      <div className="text-center py-12">
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: "0.9rem" }}
                        >
                          No expenses yet
                        </p>
                      </div>
                    );
                  }

                  return budget.transactions.map((txn, idx) => {
                    const txnDate = new Date(txn.date);
                    const isToday =
                      txnDate.toDateString() ===
                      new Date().toDateString();
                    const isYesterday =
                      new Date(
                        new Date().setDate(
                          new Date().getDate() - 1,
                        ),
                      ).toDateString() ===
                      txnDate.toDateString();

                    let formattedDate;
                    if (isToday) {
                      formattedDate = `Today, ${txnDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;
                    } else if (isYesterday) {
                      formattedDate = `Yesterday, ${txnDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;
                    } else {
                      formattedDate =
                        txnDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year:
                            txnDate.getFullYear() !==
                            new Date().getFullYear()
                              ? "numeric"
                              : undefined,
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        });
                    }

                    return (
                      <motion.div
                        key={txn.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        className="p-4 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.04)] hover:border-[rgba(17,24,39,0.08)] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <p
                              className="text-[#4CAF50] mb-0.5"
                              style={{
                                fontSize: "1.125rem",
                                fontWeight: 700,
                              }}
                            >
                              ₱{txn.amount.toLocaleString()}
                            </p>
                            {txn.subCategory && (
                              <p
                                className="text-muted-foreground"
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 500,
                                }}
                              >
                                {txn.subCategory}
                              </p>
                            )}
                          </div>
                          <p
                            className="text-muted-foreground text-right"
                            style={{
                              fontSize: "0.8rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {formattedDate}
                          </p>
                        </div>
                        {txn.note && (
                          <p
                            className="text-[#45474c]"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {txn.note}
                          </p>
                        )}
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Close Button */}
              <div className="shrink-0 p-6 pt-4 border-t border-[rgba(17,24,39,0.06)]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setViewAllExpensesBudgetId(null)
                  }
                  className="w-full py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827] hover:bg-[rgba(17,24,39,0.08)] transition-colors"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Secondary Income Modal */}
      <AnimatePresence>
        {showAddSecondaryIncome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
            style={{ background: "rgba(10,10,111,0.4)" }}
            onClick={() => setShowAddSecondaryIncome(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
              </div>

              <p
                className="text-[#111827] mb-4"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                }}
              >
                Add Secondary Income
              </p>

              {/* Category Selection */}
              <div className="mb-4">
                <label
                  className="text-[#111827] mb-2 block"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  Income Type
                </label>
                <select
                  value={newSecondaryCategory}
                  onChange={(e) =>
                    setNewSecondaryCategory(
                      e.target.value as SecondaryIncomeCategory,
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827]"
                  style={{ fontSize: "1rem" }}
                >
                  <option value="Online Work">
                    Online Work
                  </option>
                  <option value="Part-time Job">
                    Part-time Job
                  </option>
                  <option value="Business">Business</option>
                  <option value="Passive Income">
                    Passive Income
                  </option>
                  <option value="Commission">Commission</option>
                </select>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label
                  className="text-[#111827] mb-2 block"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  Monthly Amount
                </label>

                {/* Amount Display */}
                <div className="text-center mb-4">
                  <motion.p
                    key={newSecondaryAmount}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: "2.25rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: "#4CAF50",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ₱
                    {newSecondaryAmount
                      ? parseFloat(
                          newSecondaryAmount,
                        ).toLocaleString()
                      : "0"}
                  </motion.p>
                </div>

                {/* +/- Controls */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Minus Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const current =
                        parseFloat(newSecondaryAmount) || 0;
                      setNewSecondaryAmount(
                        Math.max(0, current - 100).toString(),
                      );
                    }}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4CAF50]/20 hover:bg-[#4CAF50]/30 flex items-center justify-center transition-colors"
                  >
                    <Minus
                      className="w-5 h-5 text-[#4CAF50]"
                      strokeWidth={2.5}
                    />
                  </motion.button>

                  {/* Value Input */}
                  <div className="flex-1">
                    <input
                      type="number"
                      value={newSecondaryAmount}
                      onChange={(e) =>
                        setNewSecondaryAmount(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#4CAF50]/10 text-[#111827] text-center border border-[#4CAF50]/20 focus:bg-[#4CAF50]/15 focus:border-[#4CAF50]/40 outline-none transition-all"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                      placeholder="0"
                    />
                  </div>

                  {/* Plus Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const current =
                        parseFloat(newSecondaryAmount) || 0;
                      setNewSecondaryAmount(
                        (current + 100).toString(),
                      );
                    }}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4CAF50]/20 hover:bg-[#4CAF50]/30 flex items-center justify-center transition-colors"
                  >
                    <Plus
                      className="w-5 h-5 text-[#4CAF50]"
                      strokeWidth={2.5}
                    />
                  </motion.button>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[1000, 2000, 5000, 10000].map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setNewSecondaryAmount(amount.toString())
                      }
                      className="py-2 px-2 rounded-lg bg-[#4CAF50]/10 hover:bg-[#4CAF50]/20 text-[#4CAF50] transition-colors"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      ₱{amount.toLocaleString()}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddSecondaryIncome(false);
                    setNewSecondaryAmount("");
                  }}
                  className="flex-1 py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827]"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddSecondaryIncome}
                  disabled={
                    !newSecondaryAmount ||
                    parseFloat(newSecondaryAmount) <= 0
                  }
                  className="flex-1 py-3 rounded-xl text-white disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, #4CAF50 0%, #2d8f2d 100%)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  Add Income
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Income Details Modal */}
      <AnimatePresence>
        {showIncomeDetailsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
            style={{ background: "rgba(10,10,111,0.4)" }}
            onClick={() => setShowIncomeDetailsModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="shrink-0 p-6 pb-4 border-b border-[rgba(17,24,39,0.06)]">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "rgba(76,175,80,0.15)",
                    }}
                  >
                    <DollarSign
                      className="w-6 h-6 text-[#4CAF50]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[#111827]"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 700,
                      }}
                    >
                      Income Breakdown
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {secondaryIncomes.length + 1} source{secondaryIncomes.length > 0 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={totalSpent > totalIncome ? "text-[#111827]" : "text-[#4CAF50]"}
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      ₱{totalIncome.toLocaleString()}
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Total income
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Income List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2.5">
                {(() => {
                  // Calculate budget health for border color
                  const utilizationPercentage = totalIncome > 0 ? (totalSpent / totalIncome) * 100 : 0;
                  const borderColor = 
                    utilizationPercentage >= 100 
                      ? "#EF4444" // Red for overspending
                      : utilizationPercentage >= 85 
                        ? "#FFA726" // Orange for warning
                        : "#4CAF50"; // Green for healthy
                  
                  return (
                    <>
                      {/* Primary Salary Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-4 border"
                        style={{ borderColor }}
                      >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p
                        className={totalSpent > totalIncome ? "text-[#111827]" : "text-[#4CAF50]"}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        ₱{salary.toLocaleString()}
                      </p>
                      <p
                        className="text-[#558B2F] mt-0.5"
                        style={{ fontSize: "0.875rem" }}
                      >
                        Primary Salary
                      </p>
                    </div>
                  </div>
                </motion.div>

                      {/* Secondary Incomes Cards */}
                      {secondaryIncomes.map((income, idx) => (
                        <motion.div
                          key={income.id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.1 + (idx + 1) * 0.05,
                          }}
                          className="bg-white rounded-xl p-4 border group relative"
                          style={{ borderColor }}
                        >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p
                          className={totalSpent > totalIncome ? "text-[#111827]" : "text-[#4CAF50]"}
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          ₱{income.amount.toLocaleString()}
                        </p>
                        <p
                          className="text-[#558B2F] mt-0.5"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {income.category}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSecondaryIncome(income.id);
                        }}
                        className="w-8 h-8 rounded-full bg-[rgba(76,175,80,0.15)] hover:bg-[rgba(76,175,80,0.25)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X
                          className="w-4 h-4 text-[#1B5E20]"
                          strokeWidth={2}
                        />
                      </motion.button>
                    </div>
                        </motion.div>
                      ))}
                    </>
                  );
                })()}
              </div>

              {/* Modal Footer - Close Button */}
              <div className="shrink-0 p-6 pt-4 border-t border-[rgba(17,24,39,0.06)]">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setShowIncomeDetailsModal(false)}
                  className="w-full py-3.5 rounded-xl bg-[rgba(17,24,39,0.05)] hover:bg-[rgba(17,24,39,0.08)] transition-colors"
                >
                  <span
                    className="text-[#111827]"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    Close
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Modal */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(10,10,111,0.5)" }}
            onClick={() => setAlertMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="bg-white rounded-3xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Warning Icon */}
              <div className="w-14 h-14 rounded-full bg-[#FFA726]/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle
                  className="w-7 h-7 text-[#FFA726]"
                  strokeWidth={1.7}
                />
              </div>

              <p
                className="text-muted-foreground text-center mb-6"
                style={{ fontSize: "0.9rem", lineHeight: 1.5 }}
              >
                {alertMessage}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAlertMessage(null)}
                className="w-full py-3 rounded-xl bg-[rgba(17,24,39,0.1)] text-[#111827]"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}