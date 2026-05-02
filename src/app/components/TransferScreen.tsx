import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, Wallet, Info, X, ChevronRight } from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";
import svgPaths from "../../imports/Send/svg-7lb0a2p9by";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onBack: () => void;
  currency?: string;
}

export function TransferScreen({ activeTab, onTabChange, onBack, currency = "USD" }: Props) {
  const [selectedMode, setSelectedMode] = useState<"direct" | "subwallet" | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0">
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
          <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Transfer
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            Move funds securely
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-24">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2
            className="text-[#111827] mb-3"
            style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            Select Transfer Mode
          </h2>
          <p className="text-[#45474c]" style={{ fontSize: "1rem", lineHeight: 1.625 }}>
            Choose the optimal path for your capital movement.
          </p>
        </motion.div>

        {/* Transfer Options */}
        <div className="space-y-4 mb-12">
          {/* Send Directly Option */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelectedMode("direct")}
            className="w-full bg-white rounded-2xl p-5 text-left transition-all border border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)]"
            style={{
              boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
            }}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1565C0]/10 to-[#2d2d9e]/10 flex items-center justify-center shrink-0">
                <Send className="w-6 h-6 text-[#1565C0]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[#111827] mb-1"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  Send Directly
                </h3>
                <p className="text-[#45474c]" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                  Instant transmission to external accounts and global recipients.
                </p>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-5 h-5 text-[#C6C6CD] shrink-0" strokeWidth={1.5} />
            </div>
          </motion.button>

          {/* Add to Sub-Wallet Option */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.3 }}
            onClick={() => setSelectedMode("subwallet")}
            className="w-full bg-white rounded-2xl p-5 text-left transition-all border border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)]"
            style={{
              boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
            }}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6 text-[#4CAF50]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[#111827] mb-1"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  Add to Sub-Wallet
                </h3>
                <p className="text-[#45474c]" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                  Organize your funds into custom categories for better management.
                </p>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-5 h-5 text-[#C6C6CD] shrink-0" strokeWidth={1.5} />
            </div>
          </motion.button>
        </div>

        {/* Security Information */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#f3f3f4] rounded-xl p-6"
        >
          <div className="flex gap-4">
            <div className="shrink-0">
              <Info className="w-5 h-5 text-[#45474c]" strokeWidth={1.5} />
            </div>
            <div>
              <h4
                className="text-[#45474c] mb-1 uppercase"
                style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}
              >
                Security Protocol
              </h4>
              <p className="text-[#3b475c]" style={{ fontSize: "0.875rem", lineHeight: 1.625 }}>
                All internal and external transfers are protected by bank-grade encryption and real-time fraud
                monitoring.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Temporary notification for selected mode */}
      <AnimatePresence>
        {selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-5 right-5 z-50 bg-[#1565C0] text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between"
            onAnimationComplete={() => {
              if (selectedMode) {
                setTimeout(() => setSelectedMode(null), 3000);
              }
            }}
          >
            <p style={{ fontSize: "0.9rem" }}>
              {selectedMode === "direct" ? "Direct transfer" : "Sub-wallet transfer"} feature coming soon!
            </p>
            <button
              onClick={() => setSelectedMode(null)}
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
            >
              <X className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}