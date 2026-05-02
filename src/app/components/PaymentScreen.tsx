import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ScanLine,
  Upload,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Copy,
  Download,
  History,
  Zap,
  Clock,
  ExternalLink,
  Award,
  TrendingUp,
  Gift,
  Star,
  Sparkles,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";
import { AchievementToast, ACHIEVEMENTS } from "./AchievementToast";
import { StreakCalendar } from "./StreakCalendar";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onBack: () => void;
  currency?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  xp: number;
}

type PaymentStep = "main" | "scan" | "gateway" | "link" | "details" | "success";
type PaymentGateway = "gcash" | "maya" | "dragonpay" | "bank" | "card" | null;

interface PaymentHistoryItem {
  id: string;
  biller: string;
  amount: number;
  gateway: PaymentGateway;
  date: string;
  status: "success" | "pending" | "failed";
  referenceNumber: string;
}

const paymentGateways = [
  {
    id: "gcash" as const,
    name: "GCash",
    description: "Pay via GCash app",
    color: "#0052E0",
    bgColor: "rgba(0,82,224,0.1)",
    initial: "G",
  },
  {
    id: "maya" as const,
    name: "Maya",
    description: "Pay via Maya app",
    color: "#141B2C",
    bgColor: "rgba(20,27,44,0.05)",
    initial: "M",
  },
  {
    id: "dragonpay" as const,
    name: "Dragonpay",
    description: "Online banking & OTC",
    color: "#FF3B30",
    bgColor: "rgba(255,59,48,0.1)",
    icon: "🐉",
  },
  {
    id: "bank" as const,
    name: "Bank Transfer",
    description: "InstaPay / PESONet",
    color: "#191C1D",
    bgColor: "#E7E8E9",
    icon: "🏦",
  },
  {
    id: "card" as const,
    name: "Credit or Debit Card",
    description: "Visa, Mastercard, JCB",
    color: "#141B2C",
    bgColor: "#141B2C",
    icon: "💳",
  },
];

const commonBillers = [
  { name: "Manila Electric Company (MERALCO)", category: "Utilities" },
  { name: "Manila Water Company", category: "Utilities" },
  { name: "Maynilad Water Services", category: "Utilities" },
  { name: "PLDT Home", category: "Telecoms" },
  { name: "Globe Telecom", category: "Telecoms" },
  { name: "Smart Communications", category: "Telecoms" },
  { name: "Converge ICT", category: "Telecoms" },
  { name: "Sky Cable", category: "Telecoms" },
  { name: "SSS (Social Security System)", category: "Government" },
  { name: "PhilHealth", category: "Government" },
  { name: "Pag-IBIG Fund", category: "Government" },
  { name: "BIR (Bureau of Internal Revenue)", category: "Government" },
  { name: "Cignal TV", category: "Cable/Satellite" },
  { name: "Cablelink", category: "Cable/Satellite" },
];

export function PaymentScreen({ activeTab, onTabChange, onBack, currency = "PHP" }: Props) {
  const [step, setStep] = useState<PaymentStep>("main");
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>(null);
  const [linkedGateways, setLinkedGateways] = useState<Set<PaymentGateway>>(new Set());
  const [amount, setAmount] = useState("");
  const [biller, setBiller] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [referenceNote, setReferenceNote] = useState("");

  // Link gateway form fields
  const [linkMobileNumber, setLinkMobileNumber] = useState("");
  const [linkAccountName, setLinkAccountName] = useState("");

  // Biller dropdown state
  const [showBillerDropdown, setShowBillerDropdown] = useState(false);

  // Payment history (mock data)
  const [paymentHistory] = useState<PaymentHistoryItem[]>([
    {
      id: "1",
      biller: "Manila Electric Company (MERALCO)",
      amount: 2450,
      gateway: "gcash",
      date: "2 days ago",
      status: "success",
      referenceNumber: "TRX-9982-441A-X9P",
    },
    {
      id: "2",
      biller: "PLDT Home",
      amount: 1299,
      gateway: "maya",
      date: "1 week ago",
      status: "success",
      referenceNumber: "TRX-8871-330B-Y8M",
    },
    {
      id: "3",
      biller: "Manila Water Company",
      amount: 890,
      gateway: "gcash",
      date: "2 weeks ago",
      status: "success",
      referenceNumber: "TRX-7760-229C-Z7L",
    },
  ]);

  // Gamification elements
  const [paymentStreak, setPaymentStreak] = useState(7); // 7 consecutive on-time payments
  const [billsPaidThisMonth, setBillsPaidThisMonth] = useState(3); // Bills paid this month
  const [showStreakCalendar, setShowStreakCalendar] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [hasStreakFreeze, setHasStreakFreeze] = useState(false);

  const handleScanQR = () => {
    // Simulate QR scan - in real app, this would use device camera
    alert("QR Scanner would open camera here");
  };

  const handleUploadQR = () => {
    // Simulate QR upload
    alert("File picker would open here");
  };

  const handleGatewaySelect = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway);
    // Check if gateway is already linked
    if (linkedGateways.has(gateway)) {
      setStep("details");
    } else {
      setStep("link");
    }
  };

  const handleLinkGateway = () => {
    if (selectedGateway && linkMobileNumber && linkAccountName) {
      setLinkedGateways((prev) => new Set(prev).add(selectedGateway));
      setLinkMobileNumber("");
      setLinkAccountName("");
      setStep("details");
    }
  };

  const handleContinueToReview = () => {
    if (amount && biller && accountNumber) {
      // Add to payment history
      setStep("success");
    }
  };

  const handleViewReceipt = () => {
    // Could open a receipt modal or navigate to receipt details
    alert("Receipt feature coming soon!");
  };

  const handleBackToMain = () => {
    setStep("main");
    setSelectedGateway(null);
    setAmount("");
    setBiller("");
    setAccountNumber("");
    setReferenceNote("");
    setLinkMobileNumber("");
    setLinkAccountName("");
  };

  const handleBackToHome = () => {
    handleBackToMain();
    onTabChange("home");
  };

  const handleRepeatPayment = (historyItem: PaymentHistoryItem) => {
    setBiller(historyItem.biller);
    setSelectedGateway(historyItem.gateway);
    setStep("details");
  };

  const getStepTitle = () => {
    switch (step) {
      case "main":
        return "Payment";
      case "scan":
        return "Scan QR Code";
      case "gateway":
        return "Payment";
      case "link":
        return "Link Payment Gateway";
      case "details":
        return "Payment Details";
      case "success":
        return "";
      default:
        return "Payment";
    }
  };

  const handleStepBack = () => {
    if (step === "details") {
      // Check if gateway is linked, if so go back to gateway, otherwise to link
      if (selectedGateway && linkedGateways.has(selectedGateway)) {
        setStep("gateway");
      } else {
        setStep("link");
      }
    } else if (step === "link") setStep("gateway");
    else if (step === "gateway") setStep("main"); // Go back to main payment screen
    else if (step === "scan") setStep("main"); // Go back to main payment screen
    else onBack(); // Only go completely back if on main screen
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      {/* Main Screen Header */}
      {step === "main" && (
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
              Payment
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              Manage your bills and transactions
            </p>
          </div>
        </div>
      )}

      {/* Other Steps Header */}
      {step !== "success" && step !== "main" && (
        <div className="bg-[#FAF9F7] px-5 pt-5 pb-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStepBack}
            className="flex items-center gap-2 text-[#111827] hover:text-[#1565C0] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
          </motion.button>
          {step !== "gateway" && (
            <div className="mt-4">
              <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {getStepTitle()}
              </h1>
              {step === "link" && (
                <p className="text-muted-foreground mt-1" style={{ fontSize: "0.8rem" }}>
                  Connect your account for faster future payments
                </p>
              )}
              {step === "scan" && (
                <p className="text-muted-foreground mt-1" style={{ fontSize: "0.8rem" }}>
                  Scan a QR code to pay bills instantly
                </p>
              )}
              {step === "details" && (
                <p className="text-muted-foreground mt-1" style={{ fontSize: "0.8rem" }}>
                  Review and confirm your payment information
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {step === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 pt-6 space-y-6"
            >
              {/* Gamification Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowStreakCalendar(true)}
                  className="bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-2xl p-4 border border-[#FF6B6B]/20 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-[#FF6B6B]" strokeWidth={2} />
                    <p className="text-[#FF6B6B]" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                      STREAK
                    </p>
                  </div>
                  <p className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1 }}>
                    {paymentStreak}
                  </p>
                  <p className="text-[#45474C]" style={{ fontSize: "0.7rem", marginTop: "2px" }}>
                    On-time payments
                  </p>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-[#4CAF50]/10 to-[#66BB6A]/10 rounded-2xl p-4 border border-[#4CAF50]/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" strokeWidth={2} />
                    <p className="text-[#4CAF50]" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                      BILLS PAID
                    </p>
                  </div>
                  <p className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1 }}>
                    {billsPaidThisMonth}
                  </p>
                  <p className="text-[#45474C]" style={{ fontSize: "0.7rem", marginTop: "2px" }}>
                    bills this month
                  </p>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-[#111827] mb-4" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("gateway")}
                    className="p-5 bg-white rounded-2xl border border-[rgba(198,198,205,0.15)] text-left transition-all"
                    style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1565C0]/10 to-[#2d2d9e]/10 flex items-center justify-center mb-3">
                      <Zap className="w-6 h-6 text-[#1565C0]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      Pay Now
                    </h3>
                    <p className="text-[#45474C]" style={{ fontSize: "0.8rem" }}>
                      Quick payment to any biller
                    </p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("scan")}
                    className="p-5 bg-white rounded-2xl border border-[rgba(198,198,205,0.15)] text-left transition-all"
                    style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50]/10 to-[#66BB6A]/10 flex items-center justify-center mb-3">
                      <ScanLine className="w-6 h-6 text-[#4CAF50]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      Scan QR
                    </h3>
                    <p className="text-[#45474C]" style={{ fontSize: "0.8rem" }}>
                      Scan to pay instantly
                    </p>
                  </motion.button>
                </div>
              </div>

              {/* Banner Ad Section - Jollibee Spaghetti Promo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #D52B1E 0%, #C41230 50%, #8B0000 100%)",
                  boxShadow: "0px 4px 20px 0px rgba(213, 43, 30, 0.25)",
                }}
              >
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-[#FFD700] mb-1" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                        Sponsored · Jollibee
                      </p>
                      <h3 className="text-white mb-2" style={{ fontSize: "1.3rem", fontWeight: 800, lineHeight: 1.2, textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                        Jolly Spaghetti Solo Meal
                      </h3>
                      <p className="text-white/95 mb-4" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                        Spaghetti + Chickenjoy + Drink
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FFD700] px-4 py-2 rounded-xl" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
                          <p className="text-[#D52B1E]" style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.02em" }}>
                            Only ₱149
                          </p>
                        </div>
                        <p className="text-white/90" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          Limited Time!
                        </p>
                      </div>
                    </div>
                    <div className="text-7xl opacity-30">🍝</div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12" />
              </motion.div>

              {/* Payment History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                    <h2 className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                      Recent Transactions
                    </h2>
                  </div>
                  <button className="text-[#1565C0]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {paymentHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="bg-white rounded-2xl p-4 border border-[rgba(198,198,205,0.15)]"
                      style={{ boxShadow: "0px 2px 10px 0px rgba(20, 27, 44, 0.03)" }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              backgroundColor: paymentGateways.find((g) => g.id === item.gateway)?.bgColor,
                            }}
                          >
                            {item.gateway && paymentGateways.find((g) => g.id === item.gateway)?.initial ? (
                              <span
                                className="font-bold"
                                style={{
                                  fontSize: "0.875rem",
                                  color: paymentGateways.find((g) => g.id === item.gateway)?.color,
                                }}
                              >
                                {paymentGateways.find((g) => g.id === item.gateway)?.initial}
                              </span>
                            ) : (
                              <span style={{ fontSize: "1rem" }}>
                                {paymentGateways.find((g) => g.id === item.gateway)?.icon || "💳"}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-[#111827]" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                              {item.biller}
                            </p>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-[#45474C]" strokeWidth={1.5} />
                              <p className="text-[#45474C]" style={{ fontSize: "0.75rem" }}>
                                {item.date}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>
                            ₱{item.amount.toLocaleString()}
                          </p>
                          <span
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              backgroundColor:
                                item.status === "success"
                                  ? "#4CAF50"
                                  : item.status === "pending"
                                  ? "#FF9800"
                                  : "#F44336",
                              color: "white",
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[rgba(17,24,39,0.06)]">
                        <p className="text-[#45474C]" style={{ fontSize: "0.75rem" }}>
                          Ref: {item.referenceNumber}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRepeatPayment(item)}
                          className="text-[#1565C0] flex items-center gap-1"
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          Pay Again
                          <ChevronRight className="w-3 h-3" strokeWidth={2} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "scan" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 pt-8"
            >
              {/* Sponsored Ad Banner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 rounded-2xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, #D52B1E 0%, #C41230 50%, #8B0000 100%)",
                  boxShadow: "0 4px 12px rgba(213, 43, 30, 0.3)"
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-8 -translate-x-8" />

                <div className="relative p-4">
                  {/* Sponsored tag */}
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <p className="text-white/90" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.03em" }}>
                      SPONSORED
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    {/* Jollibee Logo/Icon */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                        <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>🍗</span>
                      </div>
                    </div>

                    {/* Ad Content */}
                    <div className="flex-1">
                      <p className="text-[#FFD700] mb-1" style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                        Jollibee
                      </p>
                      <p className="text-white mb-2" style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.15, textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                        ChickenJoy Bucket Treat!
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#FFD700] px-3 py-1 rounded-full">
                          <p className="text-[#D52B1E]" style={{ fontSize: "0.95rem", fontWeight: 900, letterSpacing: "0.02em" }}>
                            Only ₱599
                          </p>
                        </div>
                        <p className="text-white/95" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          8-pc Family Bundle
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* QR Scanner Section */}
              <div className="mb-10">
                <h2 className="text-[#000000] mb-6" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Scan QR Code
                </h2>

                {/* Scanner Box */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-64 h-64 bg-gradient-to-br from-[#F3F4F5] to-[#E8E9EA] rounded-2xl p-1 shadow-lg">
                    {/* Corner Accents with pulse animation */}
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-[#1565C0] rounded-tl"
                    />
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-[#1565C0] rounded-tr"
                    />
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-[#1565C0] rounded-bl"
                    />
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-[#1565C0] rounded-br"
                    />

                    {/* Scanner Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ScanLine className="w-15 h-15 text-[#C6C6CD] opacity-40" strokeWidth={1.5} />
                    </div>

                    {/* Scanning Line - animated */}
                    <motion.div
                      animate={{ top: ["20%", "80%", "20%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#1565C0] to-transparent"
                      style={{ filter: "blur(1px)" }}
                    />

                    {/* Dashed Border */}
                    <div className="absolute inset-0 border-2 border-dashed border-[rgba(198,198,205,0.3)] rounded-2xl pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ScanLine className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
                  </motion.div>
                  <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                    Align QR code within frame
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUploadQR}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-[#1565C0]/30 bg-[#1565C0]/5 text-[#1565C0] flex items-center justify-center gap-2 hover:bg-[#1565C0]/10 transition-colors"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  <Upload className="w-4 h-4" strokeWidth={2} />
                  Upload QR from Gallery
                </motion.button>
              </div>

              {/* Divider with OR */}
              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-[rgba(198,198,205,0.2)]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[#FAF9F7] text-[#45474C]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    OR
                  </span>
                </div>
              </div>

              {/* Payment Gateway Selection Button */}
              <div>
                <h2 className="text-[#000000] mb-1" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Select Payment Gateway
                </h2>
                <p className="text-[#45474C] mb-6" style={{ fontSize: "0.875rem" }}>
                  Choose a method to complete your payment.
                </p>

                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setStep("gateway")}
                  className="w-full py-4 px-5 rounded-2xl text-white flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 6px 20px rgba(10,10,111,0.22)",
                  }}
                >
                  View Payment Options
                  <ChevronRight className="w-5 h-5" strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "gateway" && (
            <motion.div
              key="gateway"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 pt-8"
            >
              {/* Pro Tip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 bg-gradient-to-r from-[#1565C0]/8 to-[#2d2d9e]/8 rounded-2xl p-4 border border-[#1565C0]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1565C0]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#111827] mb-1" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      Pro Tip: Link your gateway once
                    </p>
                    <p className="text-[#45474C]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                      Save time on future payments by linking your preferred payment method now
                    </p>
                  </div>
                </div>
              </motion.div>

              <h2 className="text-[#000000] mb-1" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Select Payment Gateway
              </h2>
              <p className="text-[#45474C] mb-6" style={{ fontSize: "0.875rem" }}>
                Choose a method to complete your payment.
              </p>

              <div className="space-y-4">
                {paymentGateways.map((gateway, idx) => {
                  const isLinked = linkedGateways.has(gateway.id);
                  return (
                    <motion.button
                      key={gateway.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                      whileHover={{ scale: 1.02, y: -2, boxShadow: "0px 8px 24px 0px rgba(20, 27, 44, 0.1)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleGatewaySelect(gateway.id)}
                      className="relative w-full bg-white rounded-2xl border border-[rgba(198,198,205,0.15)] p-5 flex items-center justify-between hover:border-[#1565C0]/40 transition-all overflow-hidden"
                      style={{ boxShadow: "0px 4px 16px 0px rgba(20, 27, 44, 0.04)" }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: gateway.bgColor }}
                        >
                          {gateway.initial ? (
                            <span
                              className="font-bold"
                              style={{ fontSize: "1.125rem", color: gateway.color }}
                            >
                              {gateway.initial}
                            </span>
                          ) : (
                            <span style={{ fontSize: "1.25rem" }}>{gateway.icon}</span>
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-[#000000]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                              {gateway.name}
                            </p>
                            {isLinked && (
                              <span className="px-2 py-0.5 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full" style={{ fontSize: "0.625rem", fontWeight: 600 }}>
                                LINKED
                              </span>
                            )}
                          </div>
                          <p className="text-[#45474C]" style={{ fontSize: "0.75rem" }}>
                            {gateway.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-[#76777D]" strokeWidth={2} />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === "link" && (
            <motion.div
              key="link"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 pt-8"
            >
              {/* Selected Gateway Display */}
              {selectedGateway && (
                <div className="mb-8">
                  <div className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-[rgba(198,198,205,0.15)]">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: paymentGateways.find((g) => g.id === selectedGateway)?.bgColor,
                      }}
                    >
                      {paymentGateways.find((g) => g.id === selectedGateway)?.initial ? (
                        <span
                          className="font-bold"
                          style={{
                            fontSize: "1.5rem",
                            color: paymentGateways.find((g) => g.id === selectedGateway)?.color,
                          }}
                        >
                          {paymentGateways.find((g) => g.id === selectedGateway)?.initial}
                        </span>
                      ) : (
                        <span style={{ fontSize: "1.75rem" }}>
                          {paymentGateways.find((g) => g.id === selectedGateway)?.icon}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[#000000] mb-1" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                        {paymentGateways.find((g) => g.id === selectedGateway)?.name}
                      </p>
                      <p className="text-[#45474C]" style={{ fontSize: "0.875rem" }}>
                        Link your account for faster payments
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Link Account Form */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[#45474C] text-xs tracking-widest uppercase mb-2 block">
                    ACCOUNT NAME
                  </label>
                  <input
                    type="text"
                    value={linkAccountName}
                    onChange={(e) => setLinkAccountName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 bg-white rounded-xl border border-[rgba(198,198,205,0.15)] text-[#191C1D] placeholder:text-[#E1E3E4]"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                <div>
                  <label className="text-[#45474C] text-xs tracking-widest uppercase mb-2 block">
                    MOBILE NUMBER / ACCOUNT ID
                  </label>
                  <input
                    type="text"
                    value={linkMobileNumber}
                    onChange={(e) => setLinkMobileNumber(e.target.value)}
                    placeholder="e.g. 09171234567"
                    className="w-full px-4 py-4 bg-white rounded-xl border border-[rgba(198,198,205,0.15)] text-[#191C1D] placeholder:text-[#E1E3E4]"
                    style={{ fontSize: "1rem" }}
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#f3f3f4] rounded-xl p-4 mb-8">
                <p className="text-[#45474c]" style={{ fontSize: "0.875rem", lineHeight: 1.625 }}>
                  Your payment information is encrypted and stored securely. You can manage or remove linked accounts in Settings.
                </p>
              </div>

              {/* Link Button */}
              <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FAF9F7] via-[#FAF9F7] to-transparent pt-4 pb-8 px-6 z-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLinkGateway}
                  disabled={!linkMobileNumber || !linkAccountName}
                  className="w-full py-4 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 6px 20px rgba(10,10,111,0.22)",
                  }}
                >
                  Link Account & Continue
                  <ChevronRight className="inline w-4 h-4 ml-2" strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 pt-6"
            >
              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#45474C]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                    STEP 2 OF 3
                  </p>
                  <p className="text-[#1565C0]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                    66% Complete
                  </p>
                </div>
                <div className="w-full h-1.5 bg-[rgba(17,24,39,0.08)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#1565C0] to-[#2d2d9e] rounded-full"
                  />
                </div>
              </motion.div>

              {/* Selected Gateway Display */}
              <div className="mb-8">
                <p className="text-[#45474C] text-xs tracking-widest uppercase mb-3">PAYING VIA</p>
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-[rgba(198,198,205,0.15)]">
                  <div className="flex items-center gap-4">
                    {selectedGateway && (
                      <>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor:
                              paymentGateways.find((g) => g.id === selectedGateway)?.bgColor,
                          }}
                        >
                          <span style={{ fontSize: "1.25rem" }}>
                            {paymentGateways.find((g) => g.id === selectedGateway)?.icon || "💳"}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#191C1D]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                            {paymentGateways.find((g) => g.id === selectedGateway)?.name}
                          </p>
                          <p className="text-[#45474C]" style={{ fontSize: "0.875rem" }}>
                            **** 4592
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <button className="p-2">
                    <ChevronRight className="w-4 h-4 text-[#45474C]" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-8">
                <p className="text-[#45474C] text-xs tracking-widest uppercase mb-2 text-center">
                  AMOUNT TO PAY
                </p>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45474C]" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                    ₱
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, "");
                      setAmount(val);
                    }}
                    placeholder="0.00"
                    className="w-full text-center py-6 text-[#E1E3E4] placeholder:text-[#E1E3E4] focus:text-[#191C1D] bg-transparent border-0 outline-none"
                    style={{ fontSize: "3rem", fontWeight: 700 }}
                  />
                  <div className="h-1 bg-[#95F7B9] rounded-full w-16 mx-auto" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="text-[#45474C] text-xs tracking-widest uppercase mb-2 block">
                    BILLER INSTITUTION
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={biller}
                      onChange={(e) => setBiller(e.target.value)}
                      onFocus={() => setShowBillerDropdown(true)}
                      placeholder="Select Biller..."
                      className="w-full px-4 py-4 pr-10 bg-white rounded-xl border border-[rgba(198,198,205,0.15)] text-[#191C1D] placeholder:text-[#191C1D]/40"
                      style={{ fontSize: "1rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowBillerDropdown(!showBillerDropdown)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    >
                      <ChevronDown className="w-5 h-5 text-[#45474C]" strokeWidth={1.5} />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {showBillerDropdown && (
                        <>
                          {/* Backdrop */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowBillerDropdown(false)}
                          />

                          {/* Dropdown Menu */}
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[rgba(198,198,205,0.15)] shadow-lg max-h-64 overflow-y-auto z-20"
                          >
                            {commonBillers
                              .filter((b) =>
                                biller
                                  ? b.name.toLowerCase().includes(biller.toLowerCase())
                                  : true
                              )
                              .map((billerItem, idx) => (
                                <motion.button
                                  key={idx}
                                  type="button"
                                  whileHover={{ backgroundColor: "rgba(21,101,192,0.05)" }}
                                  onClick={() => {
                                    setBiller(billerItem.name);
                                    setShowBillerDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left transition-colors border-b border-[rgba(198,198,205,0.08)] last:border-b-0"
                                >
                                  <p className="text-[#191C1D]" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                                    {billerItem.name}
                                  </p>
                                  <p className="text-[#45474C]" style={{ fontSize: "0.75rem" }}>
                                    {billerItem.category}
                                  </p>
                                </motion.button>
                              ))}
                            {commonBillers.filter((b) =>
                              biller
                                ? b.name.toLowerCase().includes(biller.toLowerCase())
                                : true
                            ).length === 0 && (
                              <div className="px-4 py-6 text-center">
                                <p className="text-[#45474C]" style={{ fontSize: "0.875rem" }}>
                                  No billers found. You can type manually.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="text-[#45474C] text-xs tracking-widest uppercase mb-2 block">
                    ACCOUNT NUMBER
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="w-full px-4 py-5 bg-white rounded-xl border border-[rgba(198,198,205,0.15)] text-[#191C1D] placeholder:text-[#E1E3E4]"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                <div>
                  <label className="text-[#45474C] text-xs tracking-widest uppercase mb-2 block">
                    REFERENCE NOTE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={referenceNote}
                    onChange={(e) => setReferenceNote(e.target.value)}
                    placeholder="e.g. October Utilities"
                    className="w-full px-4 py-5 bg-white rounded-xl border border-[rgba(198,198,205,0.15)] text-[#191C1D] placeholder:text-[#E1E3E4]"
                    style={{ fontSize: "1rem" }}
                  />
                </div>
              </div>

              {/* Continue Button */}
              <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FAF9F7] via-[#FAF9F7] to-transparent pt-4 pb-8 px-6 z-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinueToReview}
                  disabled={!amount || !biller || !accountNumber}
                  className="w-full py-4 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 6px 20px rgba(10,10,111,0.22)",
                  }}
                >
                  Continue to Review
                  <ChevronRight className="inline w-4 h-4 ml-2" strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-full p-6"
            >
              {/* Confetti effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 400, opacity: 1 }}
                    animate={{
                      y: 900,
                      x: Math.random() * 400,
                      rotate: Math.random() * 360,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ["#1565C0", "#4CAF50", "#FF6B6B", "#FFD700", "#FF8E53"][
                        Math.floor(Math.random() * 5)
                      ],
                    }}
                  />
                ))}
              </div>

              {/* Success Icon with pulse */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-24 h-24 rounded-xl bg-[rgba(149,247,185,0.2)] flex items-center justify-center relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl shadow-[0px_32px_64px_-12px_rgba(149,247,185,0.4)]"
                  />
                  <div className="w-16 h-16 rounded-xl bg-[#95F7B9] flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-black" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#191C1D] mb-2 text-center"
                style={{ fontSize: "1.875rem", fontWeight: 700 }}
              >
                Payment Successful! 🎉
              </motion.h1>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="mb-6 bg-gradient-to-r from-[#1565C0]/10 to-[#2d2d9e]/10 rounded-2xl px-6 py-3 border border-[#1565C0]/30"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
                  <p className="text-[#1565C0]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                    Streak continues! {paymentStreak + 1} on-time payments 🎯
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#45474C] text-center mb-10"
                style={{ fontSize: "1rem", lineHeight: 1.625 }}
              >
                Your transaction has been securely processed
              </motion.p>

              {/* Receipt Card */}
              <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
                {/* Amount */}
                <div className="text-center mb-8 pb-8 border-b border-[#F3F4F5]">
                  <p className="text-[#45474C] text-xs tracking-widest uppercase mb-3">
                    TOTAL AMOUNT PAID
                  </p>
                  <p className="text-[#191C1D]" style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.05em" }}>
                    ₱{amount || "4,250.00"}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <p className="text-[#45474C] text-xs tracking-widest uppercase mb-1">
                      RECIPIENT / BILLER
                    </p>
                    <p className="text-[#191C1D]" style={{ fontSize: "1rem", fontWeight: 500 }}>
                      {biller || "Manila Electric Company (MERALCO)"}
                    </p>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[#45474C] text-xs tracking-widest uppercase mb-1">
                        REFERENCE NUMBER
                      </p>
                      <p className="text-[#191C1D] font-mono tracking-tight" style={{ fontSize: "1rem" }}>
                        TRX-9982-441A-X9P
                      </p>
                    </div>
                    <button className="p-2 hover:bg-[rgba(17,24,39,0.05)] rounded-lg transition-colors">
                      <Copy className="w-3 h-3 text-[#45474C]" strokeWidth={2} />
                    </button>
                  </div>

                  <div>
                    <p className="text-[#45474C] text-xs tracking-widest uppercase mb-1">DATE & TIME</p>
                    <p className="text-[#191C1D]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      PHT
                    </p>
                  </div>

                  <div>
                    <p className="text-[#45474C] text-xs tracking-widest uppercase mb-1">
                      PAYMENT GATEWAY
                    </p>
                    <p className="text-[#191C1D]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {paymentGateways.find((g) => g.id === selectedGateway)?.name || "Bank Transfer"}
                    </p>
                  </div>
                </div>

                {/* Success Indicator Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#95F7B9]" />
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-md space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBackToMain}
                  className="w-full py-4 rounded-2xl text-white"
                  style={{
                    backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 6px 20px rgba(10,10,111,0.22)",
                  }}
                >
                  Done
                </motion.button>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewReceipt}
                    className="py-3 rounded-2xl border border-[rgba(17,24,39,0.1)] bg-white text-[#191C1D] flex items-center justify-center gap-2"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Receipt
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBackToHome}
                    className="py-3 rounded-2xl border border-[rgba(17,24,39,0.1)] bg-white text-[#191C1D]"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    Go Home
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(step === "main") && (
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      )}

      {/* Gamification Overlays */}
      <AchievementToast
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />

      {showStreakCalendar && (
        <StreakCalendar
          onClose={() => setShowStreakCalendar(false)}
          streak={paymentStreak}
          hasStreakFreeze={hasStreakFreeze}
        />
      )}
    </div>
  );
}
