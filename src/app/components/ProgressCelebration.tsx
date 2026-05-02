import { motion } from "motion/react";
import { Sparkles, TrendingUp } from "lucide-react";

interface Props {
  percentage: number;
  goalName: string;
  onContinue: () => void;
}

export function ProgressCelebration({ percentage, goalName, onContinue }: Props) {
  const getMilestone = (pct: number) => {
    if (pct >= 100) return { emoji: "🏆", title: "Goal Completed!", message: "Amazing achievement!", color: "#4CAF50" };
    if (pct >= 75) return { emoji: "🔥", title: "Almost There!", message: "Just a little more to go!", color: "#FF6B6B" };
    if (pct >= 50) return { emoji: "🌟", title: "Halfway Hero!", message: "You're crushing it!", color: "#1565C0" };
    if (pct >= 25) return { emoji: "🎯", title: "Quarter Way There!", message: "Great progress!", color: "#FFA726" };
    return null;
  };

  const milestone = getMilestone(percentage);
  if (!milestone) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onContinue}
    >
      {/* Confetti */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "50%", y: "50%", opacity: 1, scale: 1 }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: `${50 + (Math.random() - 0.5) * 100}%`,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 1.5 + Math.random(),
            ease: "easeOut",
          }}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            backgroundColor: [milestone.color, "#4CAF50", "#1565C0", "#FFA726", "#EC4899"][i % 5],
          }}
        />
      ))}

      {/* Celebration Card */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Background Glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${milestone.color}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative">
          {/* Emoji with pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-8xl mb-4"
          >
            {milestone.emoji}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#111827] mb-2"
            style={{ fontSize: "1.75rem", fontWeight: 800 }}
          >
            {milestone.title}
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#45474c] mb-1"
            style={{ fontSize: "1rem" }}
          >
            {milestone.message}
          </motion.p>

          {/* Goal Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#111827] mb-6"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            "{goalName}"
          </motion.p>

          {/* Progress Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
            style={{ backgroundColor: `${milestone.color}15` }}
          >
            <TrendingUp className="w-5 h-5" style={{ color: milestone.color }} strokeWidth={2} />
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: milestone.color }}>
              {percentage}%
            </span>
            <Sparkles className="w-5 h-5" style={{ color: milestone.color }} strokeWidth={2} />
          </motion.div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="w-full py-4 rounded-2xl text-white"
            style={{
              background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}dd)`,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
