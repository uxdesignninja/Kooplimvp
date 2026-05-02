import { motion, AnimatePresence } from "motion/react";
import { Award, X, Sparkles } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  xp: number;
}

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: Props) {
  return (
    <AnimatePresence>
      {achievement && (
        <>
          {/* Confetti Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "50vw",
                  y: "30vh",
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: 0,
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ["#FF6B6B", "#4CAF50", "#1565C0", "#FFA726", "#EC4899"][
                    i % 5
                  ],
                }}
              />
            ))}
          </motion.div>

          {/* Achievement Card */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full mx-4"
          >
            <div
              className="relative bg-white rounded-3xl p-5 border shadow-2xl overflow-hidden"
              style={{ borderColor: achievement.color }}
            >
              {/* Sparkle Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${achievement.color}, transparent 70%)`,
                }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[rgba(17,24,39,0.05)] hover:bg-[rgba(17,24,39,0.1)] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[#45474c]" strokeWidth={2} />
              </button>

              <div className="flex items-start gap-4 relative">
                {/* Icon */}
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 relative"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <span style={{ fontSize: "2rem" }}>{achievement.icon}</span>

                  {/* Sparkle Accent */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-5 h-5" style={{ color: achievement.color }} strokeWidth={2} />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4" style={{ color: achievement.color }} strokeWidth={2} />
                      <p
                        className="uppercase tracking-wider"
                        style={{ fontSize: "0.7rem", fontWeight: 700, color: achievement.color }}
                      >
                        Achievement Unlocked
                      </p>
                    </div>
                    <h3 className="text-[#111827] mb-1" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                      {achievement.title}
                    </h3>
                    <p className="text-[#45474c]" style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                      {achievement.description}
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${achievement.color}15` }}
                    >
                      <Sparkles className="w-3 h-3" style={{ color: achievement.color }} strokeWidth={2} />
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: achievement.color }}>
                        +{achievement.xp} XP
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Achievement definitions
export const ACHIEVEMENTS = {
  FIRST_PAYMENT: {
    id: "first_payment",
    title: "First Payment",
    description: "You made your first payment!",
    icon: "🔥",
    color: "#FF6B6B",
    xp: 10,
  },
  WEEK_WARRIOR: {
    id: "week_warrior",
    title: "Week Warrior",
    description: "7-day payment streak achieved!",
    icon: "💪",
    color: "#1565C0",
    xp: 25,
  },
  PERFECT_MONTH: {
    id: "perfect_month",
    title: "Perfect Month",
    description: "All bills paid before due date this month!",
    icon: "🎯",
    color: "#4CAF50",
    xp: 50,
  },
  GROUP_STARTER: {
    id: "group_starter",
    title: "Group Starter",
    description: "Created your first Paluwagan group!",
    icon: "🤝",
    color: "#8B5CF6",
    xp: 30,
  },
  TRUST_BUILDER: {
    id: "trust_builder",
    title: "Trust Builder",
    description: "Reached 100% trust score!",
    icon: "💎",
    color: "#0EA5E9",
    xp: 40,
  },
  FIRST_GOAL: {
    id: "first_goal",
    title: "Goal Setter",
    description: "Created your first savings goal!",
    icon: "🌱",
    color: "#4CAF50",
    xp: 15,
  },
  GOAL_CRUSHER: {
    id: "goal_crusher",
    title: "Goal Crusher",
    description: "Completed your first savings goal!",
    icon: "🎊",
    color: "#FFA726",
    xp: 100,
  },
  SPEED_DEMON: {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Paid 3 bills in one day!",
    icon: "⚡",
    color: "#F97316",
    xp: 20,
  },
  COMMUNITY_STAR: {
    id: "community_star",
    title: "Community Star",
    description: "Completed 3 Paluwagan cycles!",
    icon: "🌟",
    color: "#EC4899",
    xp: 75,
  },
  MULTI_TASKER: {
    id: "multi_tasker",
    title: "Multi-Tasker",
    description: "3 active goals at once!",
    icon: "🏅",
    color: "#8B5CF6",
    xp: 35,
  },
};
