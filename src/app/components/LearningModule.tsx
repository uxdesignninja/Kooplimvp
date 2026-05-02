import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Play,
  BookOpen,
  Video,
  Users,
  Clock,
  ArrowRight,
  X,
  Award,
  TrendingUp,
  Heart,
  Vote,
  Check,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";

interface Props {
  onComplete: () => void;
  onBack: () => void;
  onSkip?: () => void;
  coopName?: string;
  isStandalone?: boolean;
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}

interface LearningItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "read" | "video";
  icon: React.ElementType;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  shortTitle: string;
  heroTitle: string;
  heroDescription: string;
  whyItMatters: string;
  items: Omit<LearningItem, "completed">[];
}

const modules: Module[] = [
  {
    id: "cooperative-basics",
    title: "Cooperative Basics",
    shortTitle: "M1",
    heroTitle: "Mastering Your\nCooperative",
    heroDescription: "A quick 2-minute session on how cooperatives empower your financial growth.",
    whyItMatters: "In a cooperative, you're not just a customer—you're a shareholder. Every member has an equal vote, regardless of their balance.",
    items: [
      {
        id: "coop-1",
        title: "What is a Cooperative?",
        description: "Foundational principles and structure",
        duration: "45s read",
        type: "read",
        icon: BookOpen,
      },
      {
        id: "coop-2",
        title: "Member Benefits",
        description: "Profit sharing and lower interest rates",
        duration: "1m video",
        type: "video",
        icon: Video,
      },
      {
        id: "coop-3",
        title: "Voting Rights",
        description: "How your voice shapes our future",
        duration: "30s read",
        type: "read",
        icon: Vote,
      },
    ],
  },
  {
    id: "budgeting-basics",
    title: "Budgeting Basics",
    shortTitle: "M2",
    heroTitle: "Smart Money\nManagement",
    heroDescription: "Learn the fundamentals of budgeting and how to track your spending effectively.",
    whyItMatters: "A budget is your financial roadmap. It helps you understand where your money goes and ensures you're saving for what matters most.",
    items: [
      {
        id: "budget-1",
        title: "50/30/20 Rule",
        description: "Simple budgeting framework for beginners",
        duration: "1m read",
        type: "read",
        icon: BookOpen,
      },
      {
        id: "budget-2",
        title: "Tracking Expenses",
        description: "Tools and techniques to monitor spending",
        duration: "2m video",
        type: "video",
        icon: Video,
      },
      {
        id: "budget-3",
        title: "Emergency Fund",
        description: "Why you need 3-6 months of expenses saved",
        duration: "45s read",
        type: "read",
        icon: Award,
      },
    ],
  },
  {
    id: "savings-goals",
    title: "Savings & Goals",
    shortTitle: "M3",
    heroTitle: "Building Your\nFinancial Future",
    heroDescription: "Set meaningful goals and create a savings plan that works for you.",
    whyItMatters: "Goals give your money purpose. Whether it's buying a home, starting a business, or retiring comfortably, systematic savings makes dreams achievable.",
    items: [
      {
        id: "savings-1",
        title: "SMART Goals",
        description: "How to set specific, achievable targets",
        duration: "50s read",
        type: "read",
        icon: TrendingUp,
      },
      {
        id: "savings-2",
        title: "Compound Interest",
        description: "The power of starting early",
        duration: "1m video",
        type: "video",
        icon: Video,
      },
      {
        id: "savings-3",
        title: "Paluwagan Strategies",
        description: "Leveraging group savings for faster results",
        duration: "40s read",
        type: "read",
        icon: Users,
      },
    ],
  },
  {
    id: "credit-debt",
    title: "Credit & Debt",
    shortTitle: "M4",
    heroTitle: "Understanding\nCredit & Loans",
    heroDescription: "Navigate credit wisely and manage debt effectively to build financial health.",
    whyItMatters: "Good credit opens doors to better interest rates and financial opportunities. Understanding debt helps you avoid costly mistakes and build wealth faster.",
    items: [
      {
        id: "credit-1",
        title: "Credit Score Basics",
        description: "What affects your creditworthiness",
        duration: "55s read",
        type: "read",
        icon: Award,
      },
      {
        id: "credit-2",
        title: "Good vs Bad Debt",
        description: "When borrowing makes sense",
        duration: "1m video",
        type: "video",
        icon: Video,
      },
      {
        id: "credit-3",
        title: "Debt Repayment Strategies",
        description: "Avalanche vs snowball methods",
        duration: "1m read",
        type: "read",
        icon: TrendingUp,
      },
    ],
  },
];

export function LearningModule({
  onComplete,
  onBack,
  onSkip,
  coopName,
  isStandalone = false,
  activeTab,
  onTabChange,
}: Props) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [showVideo, setShowVideo] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const learningItems = currentModule.items;

  // Calculate progress for current module only
  const currentModuleItemIds = learningItems.map(item => item.id);
  const totalItems = learningItems.length;
  const completedCount = currentModuleItemIds.filter(id => completedItems.has(id)).length;
  const progressPercentage = Math.round((completedCount / totalItems) * 100);

  const handleItemClick = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const handleContinue = () => {
    // If on last module and all items complete, finish
    if (currentModuleIndex === modules.length - 1) {
      if (completedCount === totalItems) {
        onComplete();
      } else {
        // Mark all current module items as complete and finish
        const allItemIds = learningItems.map(item => item.id);
        setCompletedItems(prev => new Set([...prev, ...allItemIds]));
        setTimeout(() => onComplete(), 300);
      }
    } else {
      // Move to next module
      if (completedCount === totalItems) {
        setCurrentModuleIndex(prev => prev + 1);
      } else {
        // Mark all current module items as complete and move to next
        const allItemIds = learningItems.map(item => item.id);
        setCompletedItems(prev => new Set([...prev, ...allItemIds]));
        setTimeout(() => setCurrentModuleIndex(prev => prev + 1), 300);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9F9FA] relative">
      {/* Header */}
      <div className="bg-[#F9F9FA] px-6 pt-6 pb-4 shrink-0 border-b border-[rgba(17,24,39,0.06)]">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 p-2 hover:bg-[rgba(17,24,39,0.05)] rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#141B2C]" strokeWidth={2} />
          </button>
          <h1 className="text-[#141B2C] absolute left-1/2 -translate-x-1/2" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
            {isStandalone ? coopName || "Learning Guide" : "Verification"}
          </h1>
          <button
            className="text-[#141B2C] px-4 py-2 rounded-lg hover:bg-[rgba(17,24,39,0.05)] transition-colors"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            Help
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: isStandalone ? "14rem" : "10rem" }}
      >
        <div className="px-6 pt-4 pb-8 space-y-6">
          {/* Module Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {modules.map((module, index) => {
              const isActive = index === currentModuleIndex;
              const moduleItemIds = module.items.map(item => item.id);
              const moduleCompleted = moduleItemIds.every(id => completedItems.has(id));

              return (
                <motion.button
                  key={module.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentModuleIndex(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#1565C0] text-white"
                      : moduleCompleted
                      ? "bg-[#79DA9E]/20 text-[#4CAF50]"
                      : "bg-[rgba(17,24,39,0.05)] text-[#9CA3AF]"
                  }`}
                  style={{ fontSize: "0.75rem", fontWeight: 600 }}
                >
                  {moduleCompleted && !isActive ? "✓ " : ""}
                  {module.shortTitle}
                </motion.button>
              );
            })}
          </div>

          {/* Module Title */}
          <motion.div
            key={currentModule.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
              Module {currentModuleIndex + 1} of {modules.length}
            </p>
            <h2 className="text-[#141B2C]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {currentModule.title}
            </h2>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-end justify-between">
              <p
                className="text-[#3F4759] uppercase tracking-wider"
                style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em" }}
              >
                CURRENT PROGRESS
              </p>
              <p className="text-[#141B2C]" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                {progressPercentage}% Complete
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#E8E8E9] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-[#79DA9E] rounded-full"
              />
            </div>
          </motion.div>

          {/* Hero Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative w-full aspect-video bg-gradient-to-br from-[#141B2C] to-[#1565C0] rounded-xl overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#95F7B9] rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#1565C0] rounded-full blur-3xl" />
              </div>

              {/* Cooperative illustration icons */}
              <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-20">
                <Users className="w-16 h-16 text-white" strokeWidth={1} />
                <Heart className="w-12 h-12 text-white" strokeWidth={1} />
                <TrendingUp className="w-14 h-14 text-white" strokeWidth={1} />
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideo(true)}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center relative"
                >
                  <Play className="w-6 h-6 text-white ml-1" fill="white" strokeWidth={0} />
                </motion.button>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mt-8 space-y-3">
              <motion.h2
                key={`hero-title-${currentModule.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#141B2C]"
                style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}
              >
                {currentModule.heroTitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < currentModule.heroTitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </motion.h2>
              <motion.p
                key={`hero-desc-${currentModule.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#45474C]"
                style={{ fontSize: "1.125rem", lineHeight: 1.625 }}
              >
                {currentModule.heroDescription}
              </motion.p>
            </div>
          </motion.div>

          {/* Learning Path */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#45474C] uppercase tracking-wider"
              style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
            >
              LEARNING PATH
            </motion.h3>

            <motion.div
              key={`items-${currentModule.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {learningItems.map((item, index) => {
                const Icon = item.icon;
                const isCompleted = completedItems.has(item.id);
                const isLocked = index > 0 && completedItems.size < index;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => !isLocked && handleItemClick(item.id)}
                    disabled={isLocked}
                    className={`w-full bg-white rounded-xl p-5 border transition-all text-left ${
                      isCompleted
                        ? "border-[#79DA9E] bg-[#79DA9E]/5"
                        : isLocked
                        ? "border-transparent opacity-50 cursor-not-allowed"
                        : "border-transparent hover:border-[#1565C0]/20 hover:shadow-md"
                    }`}
                    style={{
                      boxShadow: isCompleted ? "0px 4px 20px rgba(121, 218, 158, 0.15)" : "0px 4px 10px rgba(20, 27, 44, 0.02)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isCompleted ? "bg-[#79DA9E]" : "bg-[#F3F3F4]"
                      }`}>
                        <Icon className={`w-5 h-5 ${isCompleted ? "text-[#002110]" : "text-[#141B2C]"}`} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#1A1C1D] mb-0.5 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.5 }}>
                          {item.title}
                          {isCompleted && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Check className="w-4 h-4 text-[#4CAF50]" strokeWidth={3} />
                            </motion.span>
                          )}
                        </h4>
                        <p className="text-[#3F4759]" style={{ fontSize: "0.875rem", lineHeight: 1.4 }}>
                          {item.description}
                        </p>
                      </div>

                      {/* Duration Badge */}
                      <div className="shrink-0 bg-[#F3F3F4] rounded-full px-3 py-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#45474C]" strokeWidth={2} />
                        <span className="text-[#45474C]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Why It Matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="relative bg-[#141B2C] rounded-xl p-6 overflow-hidden"
          >
            {/* Decorative glow */}
            <div
              className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
              style={{ background: "#95F7B9" }}
            />

            <div className="relative space-y-2">
              <p
                className="text-[#95F7B9] uppercase tracking-wider"
                style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}
              >
                WHY IT MATTERS
              </p>
              <motion.p
                key={`why-matters-${currentModule.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white"
                style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.375 }}
              >
                {currentModule.whyItMatters}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute left-0 right-0 bg-white/85 backdrop-blur-md border-t border-[rgba(17,24,39,0.06)] px-8 py-6 flex items-center justify-between z-10"
        style={{
          bottom: isStandalone ? "80px" : "0",
          boxShadow: "0px -4px 20px rgba(20, 27, 44, 0.06)",
        }}
      >
        {onSkip ? (
          <button
            onClick={onSkip}
            className="text-[#6B7085] hover:text-[#111827] transition-colors text-center"
            style={{ fontSize: "1.0625rem", fontWeight: 600 }}
          >
            Skip for Now
          </button>
        ) : (
          <div />
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="px-8 py-4 rounded-2xl text-white flex items-center justify-center gap-2"
          style={{
            backgroundColor: "#66BB6A",
            fontSize: "1.0625rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(102,187,106,0.25)"
          }}
        >
          {currentModuleIndex === modules.length - 1 ? "Complete" : "Next Module"}
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </motion.button>
      </div>

      {/* Bottom Nav (if standalone) */}
      {isStandalone && activeTab && onTabChange && (
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden relative"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" strokeWidth={2} />
              </button>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p style={{ fontSize: "1rem" }}>Video player would load here</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
