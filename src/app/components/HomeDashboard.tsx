import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  Target,
  TrendingUp,
  Send,
  Plus,
  Bell,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";
import type { Goal } from "./GoalsScreen";
import svgPaths from "../../imports/svg-jljhjxeiyz";
import { formatCurrency, getCurrencySymbol } from "../utils/currency";
import { useEffect, useState } from "react";

function TransferIcon({ className = "w-5 h-5", strokeColor = "currentColor" }: { className?: string; strokeColor?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.p2b534d00} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M3 6.72998H21" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p129aa380} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M21 17.27H3" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

interface Props {
  goals: Goal[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  currency?: string;
}

export function HomeDashboard({ goals, activeTab, onTabChange, currency = "PHP" }: Props) {
  const currencySymbol = getCurrencySymbol(currency);

  // Load budget data from localStorage
  const [budgetData, setBudgetData] = useState<any>(null);

  const loadBudgetData = () => {
    const savedBudgets = localStorage.getItem('budgetTracker_budgets');
    const savedSalary = localStorage.getItem('budgetTracker_salary');
    if (savedBudgets) {
      const budgets = JSON.parse(savedBudgets);
      const totalSpent = budgets.reduce((sum: number, b: any) => sum + b.spent, 0);
      const budgetByCategory = budgets.map((b: any) => ({
        category: b.category,
        spent: b.spent,
        target: b.targetAmount,
      }));
      setBudgetData({
        totalSpent,
        salary: savedSalary ? parseFloat(savedSalary) : null,
        categories: budgetByCategory,
        budgetCount: budgets.length,
      });
    } else {
      setBudgetData(null);
    }
  };

  useEffect(() => {
    loadBudgetData();
  }, []);

  // Refresh data when tab becomes active
  useEffect(() => {
    if (activeTab === 'home') {
      loadBudgetData();
      loadPaymentData();
    }
  }, [activeTab]);

  // Calculate goals stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // Load payment data from localStorage
  const [paymentStats, setPaymentStats] = useState<any>(null);

  const loadPaymentData = () => {
    const savedPayments = localStorage.getItem('payment_history');
    if (savedPayments) {
      const payments = JSON.parse(savedPayments);

      // Calculate this month's total
      const now = new Date();
      const thisMonth = payments.filter((p: any) => {
        const pDate = new Date(p.date);
        return pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear();
      });

      const thisMonthTotal = thisMonth.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);

      // Calculate last 7 days for activity chart
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayPayments = payments.filter((p: any) => {
          const pDate = new Date(p.date);
          return pDate.toDateString() === date.toDateString();
        });
        const dayTotal = dayPayments.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);
        last7Days.push(dayTotal);
      }

      // Calculate last month for trend
      const lastMonth = payments.filter((p: any) => {
        const pDate = new Date(p.date);
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return pDate.getMonth() === lastMonthDate.getMonth() && pDate.getFullYear() === lastMonthDate.getFullYear();
      });
      const lastMonthTotal = lastMonth.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);

      const trend = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;

      setPaymentStats({
        thisMonth: thisMonthTotal,
        lastMonth: lastMonthTotal,
        trend: trend,
        recentCount: thisMonth.length,
        last7Days: last7Days,
        hasPayments: payments.length > 0,
      });
    } else {
      setPaymentStats({
        hasPayments: false,
      });
    }
  };

  useEffect(() => {
    loadPaymentData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4 flex items-center justify-between"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-muted-foreground" style={{ fontSize: '0.9rem' }}>Good morning</p>
          <p className="text-[#111827]" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Welcome back</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-11 h-11 rounded-xl bg-white border border-[rgba(17,24,39,0.06)] flex items-center justify-center relative"
        >
          <Bell className="w-6 h-6 text-[#111827]" strokeWidth={1.5} />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4CAF50]"
          />
        </motion.button>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-4">

        {/* Budget Tracker Analytics Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(249,115,22,0.15)" }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(17,24,39,0.06)] cursor-pointer"
          style={{ boxShadow: "0 4px 20px rgba(20,27,44,0.04)" }}
          onClick={() => onTabChange("budget")}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#fb923c] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[#111827]" style={{ fontSize: '1rem', fontWeight: 600 }}>Budget Tracker</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                  {budgetData?.budgetCount > 0 ? `${budgetData.budgetCount} active budgets` : 'Track your spending'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#F97316]" strokeWidth={2} />
          </div>

          {budgetData && budgetData.budgetCount > 0 ? (
            <>
              {/* Spending Overview */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F97316', lineHeight: 1 }}>
                    ₱{budgetData.totalSpent.toLocaleString()}
                  </p>
                  {budgetData.salary && (
                    <p className="text-muted-foreground" style={{ fontSize: '0.85rem' }}>
                      of ₱{budgetData.salary.toLocaleString()}
                    </p>
                  )}
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>Total spent this month</p>
              </div>

              {/* Mini Bar Chart */}
              <div className="space-y-2">
                {budgetData.categories.slice(0, 3).map((cat: any, idx: number) => {
                  const maxSpent = Math.max(...budgetData.categories.map((c: any) => c.spent), 1);
                  const barWidth = (cat.spent / maxSpent) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#111827]" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                          {cat.category}
                        </span>
                        <span className="text-[#F97316]" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          ₱{cat.spent.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[rgba(17,24,39,0.05)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ delay: 0.2 + idx * 0.1, duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #F97316 0%, #fb923c 100%)' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#F97316]/10 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-[#F97316]" strokeWidth={1.5} />
              </div>
              <p className="text-[#111827] mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>No Budget Yet</p>
              <p className="text-muted-foreground mb-4" style={{ fontSize: '0.85rem' }}>
                Start tracking your expenses
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onTabChange("budget"); }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#fb923c] text-white"
                style={{ fontSize: '0.85rem', fontWeight: 600 }}
              >
                Create Budget
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Goals Analytics Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(76,175,80,0.15)" }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(17,24,39,0.06)] cursor-pointer"
          style={{ boxShadow: "0 4px 20px rgba(20,27,44,0.04)" }}
          onClick={() => onTabChange("goals")}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#5cbf6a] flex items-center justify-center">
                <Target className="w-5 h-5 text-white" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[#111827]" style={{ fontSize: '1rem', fontWeight: 600 }}>Finance Goals</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                  {totalGoals > 0 ? `${totalGoals} active ${totalGoals === 1 ? 'goal' : 'goals'}` : 'Set your targets'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
          </div>

          {totalGoals > 0 ? (
            <>
              {/* Progress Overview */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4CAF50', lineHeight: 1 }}>
                    {overallProgress.toFixed(0)}%
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: '0.85rem' }}>
                    overall progress
                  </p>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                  ₱{totalSaved.toLocaleString()} of ₱{totalTarget.toLocaleString()}
                </p>
              </div>

              {/* Progress Ring & Stats */}
              <div className="flex items-center gap-4">
                {/* Mini Circular Progress */}
                <div className="relative" style={{ width: 80, height: 80 }}>
                  <svg width={80} height={80} style={{ transform: "rotate(-90deg)" }}>
                    <circle
                      cx={40}
                      cy={40}
                      r={32}
                      fill="none"
                      stroke="rgba(17,24,39,0.05)"
                      strokeWidth={6}
                    />
                    <motion.circle
                      cx={40}
                      cy={40}
                      r={32}
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth={6}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 32}
                      initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - overallProgress / 100) }}
                      transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" strokeWidth={2} />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="bg-[#4CAF50]/5 rounded-xl p-2.5">
                    <p className="text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 500 }}>COMPLETED</p>
                    <p className="text-[#4CAF50]" style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>
                      {completedGoals}
                    </p>
                  </div>
                  <div className="bg-[rgba(17,24,39,0.03)] rounded-xl p-2.5">
                    <p className="text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 500 }}>IN PROGRESS</p>
                    <p className="text-[#111827]" style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>
                      {totalGoals - completedGoals}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-[#4CAF50]" strokeWidth={1.5} />
              </div>
              <p className="text-[#111827] mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>No Goals Yet</p>
              <p className="text-muted-foreground mb-4" style={{ fontSize: '0.85rem' }}>
                Set your first savings goal
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onTabChange("goals"); }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4CAF50] to-[#5cbf6a] text-white"
                style={{ fontSize: '0.85rem', fontWeight: 600 }}
              >
                Create Goal
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Payment Analytics Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(21,101,192,0.15)" }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 border border-[rgba(17,24,39,0.06)] cursor-pointer"
          style={{ boxShadow: "0 4px 20px rgba(20,27,44,0.04)" }}
          onClick={() => onTabChange("payment")}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center">
                <Send className="w-5 h-5 text-white" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[#111827]" style={{ fontSize: '1rem', fontWeight: 600 }}>Payments</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                  Transaction activity
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
          </div>

          {paymentStats && paymentStats.hasPayments ? (
            <>
              {/* Payment Stats */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1565C0', lineHeight: 1 }}>
                    ₱{paymentStats.thisMonth.toLocaleString()}
                  </p>
                  {paymentStats.trend !== 0 && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${paymentStats.trend > 0 ? 'bg-[#4CAF50]/10' : 'bg-[#BA1A1A]/10'}`}>
                      {paymentStats.trend > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-[#4CAF50]" strokeWidth={2.5} />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-[#BA1A1A]" strokeWidth={2.5} />
                      )}
                      <span className={paymentStats.trend > 0 ? 'text-[#4CAF50]' : 'text-[#BA1A1A]'} style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                        {Math.abs(paymentStats.trend).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                  Sent this month • {paymentStats.recentCount} transactions
                </p>
              </div>

              {/* Activity Visualization */}
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {paymentStats.last7Days.map((amount: number, idx: number) => {
                  const maxAmount = Math.max(...paymentStats.last7Days, 1);
                  const height = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(height, amount > 0 ? 20 : 0)}%` }}
                      transition={{ delay: 0.4 + idx * 0.05, duration: 0.4, ease: "easeOut" }}
                      className="bg-gradient-to-t from-[#1565C0] to-[#2d2d9e] rounded-t-sm"
                      style={{ minHeight: amount > 0 ? '8px' : '2px', backgroundColor: amount === 0 ? 'rgba(17,24,39,0.05)' : undefined }}
                    />
                  );
                })}
              </div>

              {/* Recent Activity Label */}
              <div className="flex items-center justify-between pt-2 border-t border-[rgba(17,24,39,0.05)]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Last 7 days activity</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); onTabChange("payment"); }}
                  className="text-[#1565C0]"
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Pay Bills →
                </motion.button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-3">
                <Send className="w-8 h-8 text-[#1565C0]" strokeWidth={1.5} />
              </div>
              <p className="text-[#111827] mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>No Transactions Yet</p>
              <p className="text-muted-foreground mb-4" style={{ fontSize: '0.85rem' }}>
                Pay your bills on time, every time
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onTabChange("payment"); }}
                className="px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#1565C0", boxShadow: "0 4px 12px rgba(21,101,192,0.25)", fontSize: '0.85rem', fontWeight: 600 }}
              >
                Pay Bills
              </motion.button>
            </div>
          )}
        </motion.div>

      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
