import { motion } from "motion/react";
import { Calendar, Flame, Shield } from "lucide-react";

interface Props {
  onClose: () => void;
  streak: number;
  hasStreakFreeze: boolean;
}

export function StreakCalendar({ onClose, streak, hasStreakFreeze }: Props) {
  // Generate last 30 days
  const generateDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const isPaid = i < streak || (i === streak && hasStreakFreeze); // Simulate paid days
      const isToday = i === 0;
      const isMissed = !isPaid && i > 0;

      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        isPaid,
        isToday,
        isMissed,
      });
    }

    return days;
  };

  const days = generateDays();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl sm:rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#FF6B6B]" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[#111827]" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                Payment Streak
              </h2>
              <p className="text-[#45474c]" style={{ fontSize: "0.85rem" }}>
                Last 30 days
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#45474c] hover:text-[#111827] transition-colors"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            Done
          </button>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-2xl p-4 border border-[#FF6B6B]/20">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-[#FF6B6B]" strokeWidth={2} />
              <p className="text-[#FF6B6B]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                CURRENT STREAK
              </p>
            </div>
            <p className="text-[#111827]" style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1 }}>
              {streak}
            </p>
            <p className="text-[#45474c]" style={{ fontSize: "0.75rem" }}>days</p>
          </div>

          {hasStreakFreeze && (
            <div className="bg-gradient-to-br from-[#1565C0]/10 to-[#2d2d9e]/10 rounded-2xl p-4 border border-[#1565C0]/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                <p className="text-[#1565C0]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                  FREEZE ACTIVE
                </p>
              </div>
              <p className="text-[#111827]" style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1 }}>
                1
              </p>
              <p className="text-[#45474c]" style={{ fontSize: "0.75rem" }}>available</p>
            </div>
          )}
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div key={day} className="text-center">
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                {day[0]}
              </p>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 mb-6">
          {days.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center relative ${
                day.isPaid
                  ? "bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white"
                  : day.isMissed
                  ? "bg-[#FFE5E5] text-[#FF6B6B]"
                  : "bg-[#F3F4F6] text-[#9CA3AF]"
              } ${day.isToday ? "ring-2 ring-[#1565C0] ring-offset-2" : ""}`}
            >
              {day.isPaid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.02 + 0.1, type: "spring" }}
                  className="absolute -top-1 -right-1 w-3 h-3"
                >
                  <Flame className="w-full h-full text-[#FF6B6B]" fill="currentColor" strokeWidth={0} />
                </motion.div>
              )}
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{day.date}</span>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 p-4 bg-[#F9FAFB] rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]" />
            <span className="text-[#45474c]" style={{ fontSize: "0.75rem" }}>Paid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#FFE5E5]" />
            <span className="text-[#45474c]" style={{ fontSize: "0.75rem" }}>Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#F3F4F6]" />
            <span className="text-[#45474c]" style={{ fontSize: "0.75rem" }}>Future</span>
          </div>
        </div>

        {/* Streak Protection Info */}
        {!hasStreakFreeze && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-4 bg-[#1565C0]/5 rounded-xl border border-[#1565C0]/20"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-[#111827] mb-1" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  Streak Freeze Available!
                </p>
                <p className="text-[#45474c]" style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>
                  Get one free miss per month to protect your streak. Unlock by maintaining 14+ days.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
