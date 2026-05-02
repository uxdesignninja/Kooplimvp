import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  SendHorizontal,
  PiggyBank,
  TrendingUp,
  Receipt,
  Target,
  CreditCard,
  Lightbulb,
  ArrowDownLeft,
  Bot,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const suggestions = [
  { icon: Receipt, label: "Budget allocation", prompt: "Help me create a monthly budget allocation plan." },
  { icon: PiggyBank, label: "Savings strategy", prompt: "What's the best savings strategy for my income level?" },
  { icon: TrendingUp, label: "Improve credit", prompt: "How can I improve my credit score quickly?" },
  { icon: Target, label: "Goal planning", prompt: "Help me plan milestones for my savings goals." },
  { icon: CreditCard, label: "Reduce spending", prompt: "Analyze my spending and suggest areas to cut back." },
  { icon: Lightbulb, label: "Investment tips", prompt: "What are some beginner-friendly investment options?" },
];

const aiResponses: Record<string, string> = {
  "Help me create a monthly budget allocation plan.":
    "Great choice! Based on your income, I'd recommend the 50/30/20 rule:\n\n• **50%** → Needs (rent, bills, groceries)\n• **30%** → Wants (dining, entertainment)\n• **20%** → Savings & debt repayment\n\nWould you like me to break this down with your actual numbers?",
  "What's the best savings strategy for my income level?":
    "Here are 3 strategies that work well:\n\n• **Pay yourself first** — Auto-transfer 15-20% of each paycheck to savings\n• **Round-up savings** — Round every purchase up and save the difference\n• **Challenge saving** — Start with $1/week and increase by $1 each week\n\nWant me to set up an automated savings plan for you?",
  "How can I improve my credit score quickly?":
    "Your current score is **620**. Here's a quick improvement plan:\n\n• Keep credit utilization below 30% (you're at 38%)\n• Set up autopay for all bills to avoid late payments\n• Don't close old credit accounts\n• Consider a credit-builder loan through Koopli\n\nStick with this and you could see a 40-60 point increase in 3-6 months!",
  "Help me plan milestones for my savings goals.":
    "Let's break your goals into achievable milestones:\n\n• **Month 1-3** → Build a $500 mini emergency fund\n• **Month 4-6** → Increase monthly savings by 10%\n• **Month 7-9** → Hit 50% of your primary goal\n• **Month 10-12** → Reach your target!\n\nI can send you weekly progress nudges. Want me to enable that?",
  "Analyze my spending and suggest areas to cut back.":
    "Based on your recent transactions, here's what I see:\n\n• **Dining out** — $340/mo (28% above average)\n• **Subscriptions** — $87/mo (3 unused services detected)\n• **Transport** — $180/mo (consider carpooling?)\n\nCutting the unused subscriptions alone saves you **$1,044/year**! Want me to flag these?",
  "What are some beginner-friendly investment options?":
    "Great that you're thinking about investing! Some options:\n\n• **High-yield savings** — 4.5% APY, zero risk\n• **Index funds** — Low-cost, diversified exposure to the market\n• **Government bonds** — Stable returns, very low risk\n• **Koopli Smart Invest** — AI-managed micro-investing starting at $5\n\nWant me to simulate potential returns for any of these?",
};

const defaultResponse =
  "That's a great question! Let me think about this...\n\nBased on your financial profile, I'd recommend reviewing your monthly spending patterns first. I can help you create a personalized action plan.\n\nWould you like me to dive deeper into any specific area?";

export function AIScreen({ activeTab, onTabChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[text.trim()] || defaultResponse;
      const aiMsg: Message = { id: crypto.randomUUID(), role: "ai", text: response };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleChipClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[#111827]" style={{ fontSize: '1.1rem', fontWeight: 600 }}>Koopli AI</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
              <p className="text-muted-foreground" style={{ fontSize: '0.85rem' }}>Always ready to help</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-4">
        <AnimatePresence mode="popLayout">
          {/* Welcome State */}
          {!hasMessages && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center pt-6 pb-4"
            >
              {/* AI Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center mb-5 shadow-lg shadow-[#1565C0]/15"
              >
                <Bot className="w-8 h-8 text-white" strokeWidth={1.5} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#111827] text-center mb-2"
                style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.3 }}
              >
                How can I help you today?
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-muted-foreground text-center max-w-[260px] mb-7"
                style={{ fontSize: '0.82rem', lineHeight: 1.5 }}
              >
                Ask me anything about budgeting, saving, credit, or your financial goals.
              </motion.p>

              {/* Suggestion Chips */}
              <div className="w-full space-y-2.5">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground"
                  style={{ fontSize: '0.75rem', fontWeight: 500 }}
                >
                  Suggestions
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.button
                        key={s.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + i * 0.06 }}
                        onClick={() => handleChipClick(s.prompt)}
                        className="flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] hover:border-[#1565C0]/20 hover:bg-[#1565C0]/[0.02] transition-all active:scale-[0.97]"
                      >
                        <Icon className="w-4 h-4 text-[#1565C0]" strokeWidth={1.5} />
                        <span className="text-[#111827]" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {s.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Quick insight card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full mt-6 p-4 bg-gradient-to-br from-[#1565C0]/5 to-[#2d2d9e]/5 rounded-2xl border border-[#1565C0]/8"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4CAF50] to-[#5cbf6a] flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[#111827] mb-0.5" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Daily Tip</p>
                    <p className="text-muted-foreground" style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                      Automate your savings — people who set up auto-transfers save 3x more on average.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
            >
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center shrink-0 mr-2 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[#1565C0] text-white rounded-2xl rounded-br-lg"
                    : "bg-white border border-[rgba(17,24,39,0.06)] rounded-2xl rounded-bl-lg"
                }`}
              >
                <p
                  className={msg.role === "user" ? "text-white" : "text-[#111827]"}
                  style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start mb-3"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center shrink-0 mr-2 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </div>
              <div className="bg-white border border-[rgba(17,24,39,0.06)] rounded-2xl rounded-bl-lg px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-1.5 h-1.5 rounded-full bg-[#1565C0]/30"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: dot * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline chips after conversation started */}
        {hasMessages && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="py-3"
          >
            <p className="text-muted-foreground mb-2" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
              Ask about...
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {suggestions.slice(0, 4).map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    onClick={() => handleChipClick(s.prompt)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-[rgba(17,24,39,0.06)] hover:border-[#1565C0]/20 transition-all active:scale-[0.97] shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#1565C0]" strokeWidth={1.5} />
                    <span className="text-[#111827] whitespace-nowrap" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 pt-2"
        style={{ paddingBottom: "max(5rem, calc(5rem + env(safe-area-inset-bottom, 0px)))" }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-white rounded-2xl border border-[rgba(17,24,39,0.08)] px-4 py-1.5 focus-within:border-[#1565C0]/30 transition-colors shadow-sm"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Koopli AI anything..."
            className="flex-1 py-2.5 bg-transparent outline-none text-[#111827] placeholder:text-[#B0B3BE]"
            style={{ fontSize: '0.85rem' }}
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-[0.93] disabled:opacity-30"
            style={{ backgroundColor: input.trim() ? '#1565C0' : 'rgba(17,24,39,0.06)' }}
          >
            <SendHorizontal
              className="w-4 h-4"
              strokeWidth={1.5}
              style={{ color: input.trim() ? '#fff' : '#B0B3BE' }}
            />
          </button>
        </form>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}