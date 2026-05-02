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
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onBack: () => void;
}

type BudgetCategoryType = "Food" | "Transportation" | "Housing" | "Shopping" | "Health";

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
}

const categoryConfig: Record<BudgetCategoryType, { icon: React.ElementType; color: string }> = {
  Food: { icon: Utensils, color: "#F97316" },
  Transportation: { icon: Bus, color: "#1565C0" },
  Housing: { icon: Home, color: "#4CAF50" },
  Shopping: { icon: ShoppingBag, color: "#BA1A1A" },
  Health: { icon: HeartPulse, color: "#059669" },
};

// Circular Progress Component
function CircularProgress({ spent, salary, size = 140 }: { spent: number; salary: number; size?: number }) {
  const percentage = salary > 0 ? Math.min((spent / salary) * 100, 100) : 0;
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = isNaN(percentage) ? circumference : circumference - (percentage / 100) * circumference;

  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, [spent, salary]);

  // Determine color based on spending
  const getColor = () => {
    if (percentage >= 100) return "#FFA726"; // Orange for over budget
    if (percentage >= 85) return "#FFA726"; // Orange for near limit
    if (percentage >= 50) return "#4CAF50"; // Green
    return "#4CAF50"; // Green for healthy
  };

  const strokeColor = getColor();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={8}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.3s ease",
          }}
        />
      </svg>
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          {percentage >= 100 ? (
            <AlertCircle className="w-6 h-6 text-[#FFA726]" strokeWidth={2} />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" strokeWidth={2} />
          )}
        </div>
      </div>
    </div>
  );
}

// Slider styles for range input
const sliderStyles = `
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1565C0;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(21, 101, 192, 0.3);
    transition: transform 0.1s ease;
  }
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.05);
  }
  input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1565C0;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(21, 101, 192, 0.3);
    transition: transform 0.1s ease;
  }
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
  }
  input[type="range"]::-moz-range-thumb:active {
    transform: scale(1.05);
  }

  /* White slider thumb for salary slider */
  input[type="range"].salary-slider::-webkit-slider-thumb {
    background: white;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
  }
  input[type="range"].salary-slider::-moz-range-thumb {
    background: white;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
  }

  /* Green slider thumb for budget expense slider */
  input[type="range"].expense-slider::-webkit-slider-thumb {
    background: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
  }
  input[type="range"].expense-slider::-moz-range-thumb {
    background: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
  }
`;

export function BudgetTrackerScreen({ activeTab, onTabChange, onBack }: Props) {
  const [salary, setSalary] = useState<number | null>(() => {
    const saved = localStorage.getItem('budgetTracker_salary');
    return saved ? parseFloat(saved) : null;
  });
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('budgetTracker_budgets');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedBudget, setExpandedBudget] = useState<string | null>(null);
  const [showSalaryInput, setShowSalaryInput] = useState(false);
  const [showCreateBudget, setShowCreateBudget] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState<BudgetCategoryType>("Food");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  const [sliderAmount, setSliderAmount] = useState<number>(0);
  const [transactionNote, setTransactionNote] = useState("");
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [editingBudgetAmount, setEditingBudgetAmount] = useState("");
  const [showEditBudget, setShowEditBudget] = useState<string | null>(null);
  const [deleteConfirmBudgetId, setDeleteConfirmBudgetId] = useState<string | null>(null);
  const [menuOpenBudgetId, setMenuOpenBudgetId] = useState<string | null>(null);
  const [setTargetBudgetId, setSetTargetBudgetId] = useState<string | null>(null);
  const [viewAllExpensesBudgetId, setViewAllExpensesBudgetId] = useState<string | null>(null);

  // Persist salary to localStorage
  useEffect(() => {
    if (salary !== null) {
      localStorage.setItem('budgetTracker_salary', salary.toString());
    } else {
      localStorage.removeItem('budgetTracker_salary');
    }
  }, [salary]);

  // Persist budgets to localStorage
  useEffect(() => {
    localStorage.setItem('budgetTracker_budgets', JSON.stringify(budgets));
  }, [budgets]);

  const totalBudgeted = budgets.reduce((sum, b) => sum + (b.targetAmount || 0), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const exceedsSalary = salary !== null && totalBudgeted > salary;
  const remainingSalary = salary !== null ? salary - totalSpent : 0;

  const availableCategories = (Object.keys(categoryConfig) as BudgetCategoryType[]).filter(
    (cat) => !budgets.some((b) => b.category === cat)
  );

  const handleCreateBudget = () => {
    const newBudget: Budget = {
      id: Date.now().toString(),
      category: newBudgetCategory,
      targetAmount: newBudgetAmount && parseFloat(newBudgetAmount) > 0 ? parseFloat(newBudgetAmount) : null,
      spent: 0,
      transactions: [],
    };

    setBudgets([...budgets, newBudget]);
    setNewBudgetAmount("");
    setShowCreateBudget(false);
  };

  const handleAddTransaction = (budgetId: string) => {
    if (sliderAmount <= 0) return;

    setBudgets((prev) =>
      prev.map((b) => {
        if (b.id === budgetId) {
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            amount: sliderAmount,
            date: new Date().toISOString(),
            note: transactionNote || undefined,
          };
          return {
            ...b,
            spent: b.spent + sliderAmount,
            transactions: [newTransaction, ...b.transactions],
          };
        }
        return b;
      })
    );

    setSliderAmount(0);
    setTransactionNote("");
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
            targetAmount: editingBudgetAmount && parseFloat(editingBudgetAmount) > 0 ? parseFloat(editingBudgetAmount) : null,
          };
        }
        return b;
      })
    );

    setEditingBudgetAmount("");
    setShowEditBudget(null);
  };

  const getStatus = (spent: number, target: number | null): "healthy" | "on-track" | "near-limit" | "over-budget" | "no-target" => {
    if (target === null) return "no-target";
    const pct = (spent / target) * 100;
    if (pct >= 100) return "over-budget";
    if (pct >= 85) return "near-limit";
    if (pct >= 50) return "on-track";
    return "healthy";
  };

  // Generate last 7 days spending data for graph
  const getWeeklyData = (transactions: Transaction[]) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];

      const dayTotal = transactions
        .filter(txn => {
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
      <style>{sliderStyles}</style>
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
          <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
        </motion.button>
        <div>
          <p className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Budget Tracker
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            {salary !== null ? `Monthly Salary: ₱${salary.toLocaleString()}` : "Manage your spending"}
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
              <AlertTriangle className="w-5 h-5 text-[#BA1A1A] shrink-0" strokeWidth={1.7} />
              <div className="flex-1">
                <p className="text-[#BA1A1A]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Budget Exceeds Salary
                </p>
                <p className="text-[#45474c]" style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                  Your total budgeted amount (₱{totalBudgeted.toLocaleString()}) exceeds your monthly salary (₱
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
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: salary !== null && totalSpent <= salary
              ? "#1565C0"
              : salary !== null && totalSpent > salary
              ? "linear-gradient(135deg, #BA1A1A 0%, #8B0000 100%)"
              : "#1565C0",
            boxShadow: "0px 8px 32px rgba(10,10,111,0.2)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute rounded-full bg-white/5 pointer-events-none"
            style={{ width: 180, height: 180, top: -40, right: -30 }}
          />
          <div
            className="absolute rounded-full bg-white/5 pointer-events-none"
            style={{ width: 100, height: 100, top: 30, right: 20 }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-white/70 uppercase tracking-widest mb-1" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
                Monthly Salary
              </p>
              <p className="text-white/50" style={{ fontSize: "0.8rem" }}>
                Budget allocation overview
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSalaryInput(!showSalaryInput)}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label={salary === null ? "Set salary" : "Edit salary"}
            >
              <Edit2 className="w-4 h-4 text-white" strokeWidth={2} />
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
                <div className="text-center mb-4">
                  <motion.p
                    key={salary || 0}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-white"
                    style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}
                  >
                    ₱{salary ? salary.toLocaleString() : "0"}
                  </motion.p>
                </div>

                {/* Slider */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={salary || 0}
                    onChange={(e) => {
                      setSalary(parseFloat(e.target.value));
                    }}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer salary-slider"
                    style={{
                      background: `linear-gradient(to right, white 0%, white ${
                        ((salary || 0) / 100000) * 100
                      }%, rgba(255,255,255,0.2) ${
                        ((salary || 0) / 100000) * 100
                      }%, rgba(255,255,255,0.2) 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-white/60" style={{ fontSize: "0.7rem" }}>
                      ₱0
                    </span>
                    <span className="text-white/60" style={{ fontSize: "0.7rem" }}>
                      ₱100,000
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSalaryInput(false)}
                  className="w-full py-3 rounded-xl text-white bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Save Salary
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Display Mode */}
          {salary !== null && !showSalaryInput && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
              {/* Amount and Health Status */}
              <div className="mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-white mb-2"
                  style={{ fontSize: "2.75rem", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  ₱{salary.toLocaleString()}
                </motion.div>

                {/* Health Indicator */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {totalSpent <= salary ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                      <span className="text-[#4CAF50]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                        Healthy
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-[#FFA726]" strokeWidth={2} />
                      <span className="text-[#FFA726]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                        Over Budget
                      </span>
                    </>
                  )}
                  <span className="text-white/60 ml-1" style={{ fontSize: "0.85rem" }}>
                    {totalSpent > 0 ? `${Math.round((totalSpent / salary) * 100)}% utilized` : "No spending yet"}
                  </span>
                </motion.div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                >
                  <p className="text-white/60 mb-1" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                    ALLOCATED
                  </p>
                  <p className="text-white" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                    ₱{totalBudgeted.toLocaleString()}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                >
                  <p className="text-white/60 mb-1" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                    REMAINING
                  </p>
                  <p
                    className={remainingSalary < 0 ? "text-[#FFA726]" : "text-[#4CAF50]"}
                    style={{ fontSize: "1.125rem", fontWeight: 700 }}
                  >
                    ₱{Math.abs(remainingSalary).toLocaleString()}
                  </p>
                </motion.div>
              </div>

              {/* Circular Progress Ring */}
              <div className="flex justify-center">
                <CircularProgress
                  spent={totalSpent}
                  salary={salary}
                  size={140}
                />
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {salary === null && !showSalaryInput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <DollarSign className="w-8 h-8 text-white" strokeWidth={1.7} />
              </div>
              <p className="text-white mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
                Set Your Monthly Salary
              </p>
              <p className="text-white/60 mb-4" style={{ fontSize: "0.85rem" }}>
                Start tracking your budget by setting your salary
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSalaryInput(true)}
                className="px-6 py-3 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
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
            style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-[#1565C0]" strokeWidth={1.5} />
            </div>
            <p className="text-[#111827] mb-2" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
              No Budget Tracked Yet
            </p>
            <p className="text-muted-foreground mb-5" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
              Start tracking your expenses by creating your first budget category.
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
              <p className="text-[#111827] uppercase tracking-widest" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                Your Budgets
              </p>
              {availableCategories.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateBudget(true)}
                  className="text-[#1565C0] flex items-center gap-2 px-4 py-2.5 -mr-4 rounded-xl hover:bg-[#1565C0]/5 active:bg-[#1565C0]/10 transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600, minHeight: "44px", minWidth: "44px" }}
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                  <span>Add Budget</span>
                </motion.button>
              )}
            </div>

            <div className="space-y-4">
              {budgets.map((budget, idx) => {
                const config = categoryConfig[budget.category];
                const pct = budget.targetAmount && budget.targetAmount > 0 ? (budget.spent / budget.targetAmount) * 100 : 0;
                const remaining = budget.targetAmount !== null ? budget.targetAmount - budget.spent : 0;
                const status = getStatus(budget.spent, budget.targetAmount);
                const isExpanded = expandedBudget === budget.id;
                const weekData = getWeeklyData(budget.transactions);
                const maxWeekAmount = Math.max(...weekData.map(d => d.amount), 1);

                const statusColor =
                  status === "over-budget" || status === "near-limit"
                    ? "#BA1A1A"
                    : status === "healthy"
                    ? "#4CAF50"
                    : status === "no-target"
                    ? "#1565C0"
                    : "#F97316";

                return (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] relative"
                    style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)", overflow: "visible" }}
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${config.color}20` }}
                        >
                          <config.icon className="w-7 h-7" style={{ color: config.color }} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#111827]" style={{ fontSize: "1.0625rem", fontWeight: 700 }}>
                            {budget.category}
                          </p>
                          <p className="text-[#45474c]" style={{ fontSize: "0.875rem" }}>
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
                              setMenuOpenBudgetId(menuOpenBudgetId === budget.id ? null : budget.id);
                            }}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.05)] transition-colors shrink-0"
                            aria-label="Menu"
                          >
                            <MoreVertical className="w-5 h-5 text-[#45474c]" strokeWidth={2} />
                          </motion.button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {menuOpenBudgetId === budget.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-[rgba(17,24,39,0.08)] overflow-hidden z-50"
                                style={{ minWidth: "180px" }}
                              >
                                <motion.button
                                  whileHover={{ backgroundColor: "rgba(17,24,39,0.03)" }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSetTargetBudgetId(budget.id);
                                    setEditingBudgetAmount(budget.targetAmount !== null ? budget.targetAmount.toString() : "");
                                    setMenuOpenBudgetId(null);
                                  }}
                                  className="w-full px-4 py-3 text-left flex items-center gap-3"
                                >
                                  <Target className="w-4 h-4 text-[#4CAF50]" strokeWidth={1.7} />
                                  <span className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                                    Set Budget
                                  </span>
                                </motion.button>
                                <div className="h-px bg-[rgba(17,24,39,0.06)]" />
                                <motion.button
                                  whileHover={{ backgroundColor: "rgba(186,26,26,0.05)" }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmBudgetId(budget.id);
                                    setMenuOpenBudgetId(null);
                                  }}
                                  className="w-full px-4 py-3 text-left flex items-center gap-3"
                                >
                                  <Trash2 className="w-4 h-4 text-[#BA1A1A]" strokeWidth={1.7} />
                                  <span className="text-[#BA1A1A]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
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
                              animate={{ width: `${Math.min(pct, 100)}%` }}
                              transition={{ delay: 0.3 + idx * 0.05, duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: statusColor }}
                            />
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="uppercase tracking-wide"
                              style={{ fontSize: "0.7rem", fontWeight: 600, color: statusColor }}
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
                              <span className="text-[#45474c] uppercase tracking-wide" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                                {pct.toFixed(0)}% utilized
                              </span>
                              <span className="text-[#45474c] uppercase tracking-wide" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                                ₱{Math.max(0, remaining).toLocaleString()} remaining
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="uppercase tracking-wide"
                            style={{ fontSize: "0.7rem", fontWeight: 600, color: statusColor }}
                          >
                            No Target Set
                          </span>
                          <span className="text-[#45474c] uppercase tracking-wide" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                            Deducted from salary
                          </span>
                        </div>
                      )}

                      {/* Add Expense Button - Show when collapsed */}
                      {!isExpanded && (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setExpandedBudget(budget.id);
                            setEditingBudgetId(null);
                            setSliderAmount(0);
                            setTransactionNote("");
                          }}
                          className="w-full py-2.5 rounded-xl bg-[rgba(17,24,39,0.03)] text-[#1565C0] flex items-center justify-center gap-2 hover:bg-[rgba(17,24,39,0.05)] transition-colors"
                          style={{ fontSize: "0.85rem", fontWeight: 600 }}
                        >
                          <Plus className="w-4 h-4" strokeWidth={2} />
                          Add Expense
                        </motion.button>
                      )}
                    </div>

                    {/* Expanded Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-[rgba(17,24,39,0.06)] overflow-hidden"
                        >
                          <div className="divide-y divide-[rgba(17,24,39,0.06)]">
                            {/* Section 1: Weekly Spending */}
                            <div className="p-5 pb-6">
                              <div className="flex items-center justify-between mb-4">
                                <p className="text-[#111827]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                                  Weekly Spending
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <TrendingUp className="w-3.5 h-3.5" style={{ color: config.color }} strokeWidth={2} />
                                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: config.color }}>
                                    Last 7 Days
                                  </span>
                                </div>
                              </div>

                              {/* Bar Chart */}
                              <div className="bg-[#FAF9F7] rounded-xl p-4">
                                <div className="flex items-end justify-between gap-2 h-28">
                                  {weekData.map((data, dayIdx) => {
                                    const barHeight = maxWeekAmount > 0 ? (data.amount / maxWeekAmount) * 100 : 0;
                                    return (
                                      <div key={dayIdx} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full flex flex-col justify-end items-center" style={{ height: '100px' }}>
                                          {data.amount > 0 && (
                                            <motion.div
                                              initial={{ height: 0 }}
                                              animate={{ height: `${barHeight}%` }}
                                              transition={{ delay: 0.1 + dayIdx * 0.05, duration: 0.6, ease: "easeOut" }}
                                              className="w-full rounded-t-lg relative group"
                                              style={{
                                                background: `linear-gradient(180deg, ${config.color} 0%, ${config.color}90 100%)`,
                                                minHeight: data.amount > 0 ? '8px' : '0px'
                                              }}
                                            >
                                              {/* Tooltip */}
                                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <div className="bg-[#111827] text-white px-2 py-1 rounded-lg whitespace-nowrap" style={{ fontSize: '0.7rem' }}>
                                                  ₱{data.amount.toLocaleString()}
                                                </div>
                                              </div>
                                            </motion.div>
                                          )}
                                        </div>
                                        <span className="text-muted-foreground" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                                          {data.day}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Section 2: Recent Expenses */}
                            {budget.transactions.length > 0 && (
                              <div className="p-5 pb-6">
                                <div className="flex items-center justify-between mb-4">
                                  <p className="text-[#111827]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                                    Recent Expenses
                                  </p>
                                  {budget.transactions.length > 3 && (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setViewAllExpensesBudgetId(budget.id)}
                                      className="text-[#1565C0] text-sm"
                                      style={{ fontSize: "0.85rem", fontWeight: 600 }}
                                    >
                                      View All ({budget.transactions.length})
                                    </motion.button>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  {budget.transactions.slice(0, 3).map((txn, txnIdx) => {
                                    const txnDate = new Date(txn.date);
                                    const isToday = txnDate.toDateString() === new Date().toDateString();
                                    const formattedDate = isToday
                                      ? `Today, ${txnDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
                                      : txnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });

                                    return (
                                      <motion.div
                                        key={txn.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: txnIdx * 0.05 }}
                                        className="p-3 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.04)]"
                                      >
                                        <div className="flex items-start justify-between gap-3 mb-1">
                                          <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 700 }}>
                                            ₱{txn.amount.toLocaleString()}
                                          </p>
                                          <p className="text-muted-foreground text-right" style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>
                                            {formattedDate}
                                          </p>
                                        </div>
                                        {txn.note && (
                                          <p className="text-[#45474c] truncate" style={{ fontSize: "0.85rem" }}>
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
                              <p className="text-[#111827] mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                                Add Expense
                              </p>

                              {/* Amount Display */}
                              <div className="text-center mb-4">
                                <motion.p
                                  key={editingBudgetId === budget.id ? sliderAmount : 0}
                                  initial={{ scale: 1.2, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                  style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1, color: "#4CAF50" }}
                                >
                                  ₱{editingBudgetId === budget.id ? sliderAmount.toLocaleString() : "0"}
                                </motion.p>
                              </div>

                              {/* Slider */}
                              <div className="mb-4">
                                <input
                                  type="range"
                                  min="0"
                                  max={salary !== null ? Math.min(salary, 10000) : 1000}
                                  step="10"
                                  value={editingBudgetId === budget.id ? sliderAmount : 0}
                                  onChange={(e) => {
                                    setEditingBudgetId(budget.id);
                                    setSliderAmount(parseFloat(e.target.value));
                                  }}
                                  className="w-full h-2 rounded-full appearance-none cursor-pointer expense-slider"
                                  style={{
                                    background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${
                                      ((editingBudgetId === budget.id ? sliderAmount : 0) /
                                        (salary !== null ? Math.min(salary, 10000) : 1000)) *
                                      100
                                    }%, rgba(17,24,39,0.1) ${
                                      ((editingBudgetId === budget.id ? sliderAmount : 0) /
                                        (salary !== null ? Math.min(salary, 10000) : 1000)) *
                                      100
                                    }%, rgba(17,24,39,0.1) 100%)`,
                                  }}
                                />
                                <div className="flex justify-between mt-1.5">
                                  <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                                    ₱0
                                  </span>
                                  <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                                    ₱{salary !== null ? Math.min(salary, 10000).toLocaleString() : "1,000"}
                                  </span>
                                </div>
                              </div>

                              {/* Note Input */}
                              <input
                                type="text"
                                placeholder="Note (optional)"
                                value={editingBudgetId === budget.id ? transactionNote : ""}
                                onChange={(e) => {
                                  setEditingBudgetId(budget.id);
                                  setTransactionNote(e.target.value);
                                }}
                                className="w-full px-4 py-3 rounded-lg border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827] mb-5"
                                style={{ fontSize: "0.95rem" }}
                              />

                              {/* Bottom Buttons */}
                              <div className="flex items-center justify-end gap-4">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setExpandedBudget(null);
                                    setEditingBudgetId(null);
                                    setSliderAmount(0);
                                    setTransactionNote("");
                                  }}
                                  className="text-[#45474c] hover:text-[#111827] transition-colors px-3"
                                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                                >
                                  Close
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleAddTransaction(budget.id)}
                                  className="py-3 px-6 rounded-xl text-white"
                                  style={{
                                    backgroundColor: "#1565C0",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    boxShadow: "0 4px 14px rgba(10,10,111,0.25)",
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
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="bg-white rounded-t-3xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
              </div>

              <p className="text-[#111827] mb-4" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                Create New Budget
              </p>

              {availableCategories.length === 0 ? (
                <p className="text-muted-foreground mb-4" style={{ fontSize: "0.9rem" }}>
                  You've created budgets for all available categories.
                </p>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="text-[#111827] mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      Category
                    </label>
                    <select
                      value={newBudgetCategory}
                      onChange={(e) => setNewBudgetCategory(e.target.value as BudgetCategoryType)}
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

                  <div className="mb-5">
                    <label className="text-[#111827] mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      Target Amount (Optional)
                    </label>
                    <p className="text-muted-foreground mb-2" style={{ fontSize: "0.75rem" }}>
                      Leave empty to track spending without a limit. Expenses are always deducted from salary.
                    </p>
                    <input
                      type="number"
                      placeholder="Enter budget limit (optional)"
                      value={newBudgetAmount}
                      onChange={(e) => setNewBudgetAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-[#FAF9F7] text-[#111827]"
                      style={{ fontSize: "1rem" }}
                    />
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCreateBudget(false)}
                      className="flex-1 py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827]"
                      style={{ fontSize: "0.95rem", fontWeight: 600 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateBudget}
                      className="flex-1 py-3 rounded-xl text-white"
                      style={{
                        backgroundColor: "#1565C0",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        boxShadow: "0 4px 14px rgba(10,10,111,0.25)",
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-[#BA1A1A]/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-[#BA1A1A]" strokeWidth={1.7} />
              </div>

              <p className="text-[#111827] text-center mb-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Delete Budget?
              </p>
              <p className="text-muted-foreground text-center mb-6" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                This action cannot be undone. All expenses and data for this budget will be permanently removed.
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirmBudgetId(null)}
                  className="flex-1 py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827]"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
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
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
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
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="bg-white rounded-t-3xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-[#4CAF50]" strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                    Set Budget
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                    Optional spending limit
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-[#111827] mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                  Target Amount
                </label>
                <p className="text-muted-foreground mb-2" style={{ fontSize: "0.75rem" }}>
                  Leave empty to remove target and track spending only
                </p>
                <input
                  type="number"
                  placeholder="Enter target amount"
                  value={editingBudgetAmount}
                  onChange={(e) => setEditingBudgetAmount(e.target.value)}
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
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
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
                    background: "linear-gradient(135deg, #4CAF50 0%, #2d8f2d 100%)",
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
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="bg-white rounded-t-3xl w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="shrink-0 p-6 pb-4 border-b border-[rgba(17,24,39,0.06)]">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 bg-[rgba(17,24,39,0.15)] rounded-full" />
                </div>

                {(() => {
                  const budget = budgets.find(b => b.id === viewAllExpensesBudgetId);
                  if (!budget) return null;
                  const config = categoryConfig[budget.category];

                  return (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${config.color}20` }}
                      >
                        <config.icon className="w-6 h-6" style={{ color: config.color }} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                          {budget.category} Expenses
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                          {budget.transactions.length} {budget.transactions.length === 1 ? 'transaction' : 'transactions'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 700 }}>
                          ₱{budget.spent.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
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
                  const budget = budgets.find(b => b.id === viewAllExpensesBudgetId);
                  if (!budget || budget.transactions.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                          No expenses yet
                        </p>
                      </div>
                    );
                  }

                  return budget.transactions.map((txn, idx) => {
                    const txnDate = new Date(txn.date);
                    const isToday = txnDate.toDateString() === new Date().toDateString();
                    const isYesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() === txnDate.toDateString();

                    let formattedDate;
                    if (isToday) {
                      formattedDate = `Today, ${txnDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
                    } else if (isYesterday) {
                      formattedDate = `Yesterday, ${txnDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
                    } else {
                      formattedDate = txnDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: txnDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
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
                          <p className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                            ₱{txn.amount.toLocaleString()}
                          </p>
                          <p className="text-muted-foreground text-right" style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                            {formattedDate}
                          </p>
                        </div>
                        {txn.note && (
                          <p className="text-[#45474c]" style={{ fontSize: "0.9rem" }}>
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
                  onClick={() => setViewAllExpensesBudgetId(null)}
                  className="w-full py-3 rounded-xl bg-[rgba(17,24,39,0.05)] text-[#111827] hover:bg-[rgba(17,24,39,0.08)] transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
