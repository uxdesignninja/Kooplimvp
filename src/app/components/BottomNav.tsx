import { useState } from "react";
import { Home, Target, MoreHorizontal, BarChart3, Send, Settings, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type TabId = "home" | "budget" | "payment" | "goals" | "settings" | "academy";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const mainTabs: { id: TabId; icon: typeof Home; label: string }[] = [
  { id: "home",    icon: Home,      label: "Home"    },
  { id: "budget",  icon: BarChart3, label: "Budget"  },
  { id: "payment", icon: Send,      label: "Payment" },
  { id: "goals",   icon: Target,    label: "Goals"   },
];

const moreTabs: { id: TabId; icon: typeof Settings; label: string }[] = [
  { id: "academy",  icon: GraduationCap, label: "Financial Academy" },
  { id: "settings", icon: Settings,      label: "Settings" },
];

export function BottomNav({ activeTab, onTabChange }: Props) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreActive = activeTab === "settings" || activeTab === "academy";

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMoreMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setShowMoreMenu(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring", damping: 25 }}
              className="absolute bottom-20 right-6 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[rgba(17,24,39,0.08)]"
              style={{ minWidth: "200px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {moreTabs.map((item, idx) => {
                const Icon = item.icon;
                const active = item.id === activeTab;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ backgroundColor: "rgba(21,101,192,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onTabChange(item.id);
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-5 py-4 flex items-center gap-3 transition-colors"
                    style={{
                      borderBottom: idx < moreTabs.length - 1 ? "1px solid rgba(17,24,39,0.06)" : "none",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      strokeWidth={1.5}
                      style={{ color: active ? "#1565C0" : "#45474c" }}
                    />
                    <span
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: active ? 600 : 500,
                        color: active ? "#1565C0" : "#111827",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-[rgba(17,24,39,0.06)] px-6 pt-3 flex justify-around z-20"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))" }}
      >
        {mainTabs.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 transition-colors min-w-[44px] min-h-[44px] justify-center"
            >
              <Icon
                className="w-6 h-6"
                strokeWidth={1.5}
                style={{ color: active ? "#1565C0" : "#B0B3BE" }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#1565C0" : "#B0B3BE",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className="flex flex-col items-center gap-1 px-3 py-1 transition-colors min-w-[44px] min-h-[44px] justify-center"
        >
          <MoreHorizontal
            className="w-6 h-6"
            strokeWidth={1.5}
            style={{ color: moreActive || showMoreMenu ? "#1565C0" : "#B0B3BE" }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: moreActive || showMoreMenu ? 600 : 400,
              color: moreActive || showMoreMenu ? "#1565C0" : "#B0B3BE",
            }}
          >
            More
          </span>
        </button>
      </div>
    </>
  );
}