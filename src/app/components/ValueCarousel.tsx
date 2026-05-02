import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wallet, Target, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const slides = [
  {
    icon: Wallet,
    headline: "Send and manage money effortlessly.",
    subtext: "One wallet for all your currencies. Send money home in seconds with minimal fees.",
    gradient: "from-[#1565C0] to-[#2d2d9e]",
  },
  {
    icon: Target,
    headline: "Finance Goals alone or together.",
    subtext: "Set shared finance goals with family. Track progress together in real time.",
    gradient: "from-[#1565C0] to-[#4CAF50]",
  },
  {
    icon: Sparkles,
    headline: "Build credit. Get smarter with AI.",
    subtext: "Your personal AI advisor helps you build credit and make better financial decisions.",
    gradient: "from-[#1565C0] to-[#4040b0]",
  },
];

export function ValueCarousel({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="flex flex-col h-full px-8 pt-12"
      style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))" }}
    >
      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="text-muted-foreground transition-colors py-1 px-2"
          style={{ fontSize: '0.95rem' }}
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center text-center gap-8"
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
              <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>

            <div className="space-y-3 max-w-[300px]">
              <h2 className="text-[#111827] tracking-tight" style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.25 }}>
                {slide.headline}
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                {slide.subtext}
              </p>
            </div>

            {current === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(17,24,39,0.06)] w-full max-w-[260px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1565C0]/10 to-[#2d2d9e]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#1565C0]" strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: '0.9rem', fontWeight: 500 }} className="text-[#111827]">Credit Score</p>
                    <p style={{ fontSize: '0.85rem' }} className="text-muted-foreground">Building · 620</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                backgroundColor: i === current ? '#1565C0' : 'rgba(17,24,39,0.1)',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            backgroundColor: '#1565C0',
            fontSize: '1.0625rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(21,101,192,0.25)'
          }}
        >
          {current === slides.length - 1 ? "Get Started" : "Continue"}
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}