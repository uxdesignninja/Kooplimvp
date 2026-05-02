import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronRight,
  Wallet,
  Building2,
  Smartphone,
  Clock,
  Star,
  CheckCircle2,
  X,
  ArrowUpRight,
  Users,
  Globe,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";

type View = "main" | "gateway" | "bank" | "confirm" | "success";

interface Recipient {
  id: string;
  name: string;
  detail: string;
  avatar: string;
  color: string;
}

interface Gateway {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  type: "ewallet" | "remittance";
}

interface Bank {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const currencies: Currency[] = [
  { code: "PHP", symbol: "₱", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
];

const gateways: Gateway[] = [
  { id: "gcash", name: "GCash", shortName: "GC", color: "#0050DC", bgColor: "#0050DC10", type: "ewallet" },
  { id: "maya", name: "Maya", shortName: "M", color: "#00B274", bgColor: "#00B27410", type: "ewallet" },
  { id: "grabpay", name: "GrabPay", shortName: "GP", color: "#00B14F", bgColor: "#00B14F10", type: "ewallet" },
  { id: "shopeepay", name: "ShopeePay", shortName: "SP", color: "#EE4D2D", bgColor: "#EE4D2D10", type: "ewallet" },
  { id: "palawan", name: "Palawan Express", shortName: "PE", color: "#E8382D", bgColor: "#E8382D10", type: "remittance" },
  { id: "cebuana", name: "Cebuana Lhuillier", shortName: "CL", color: "#FFB800", bgColor: "#FFB80010", type: "remittance" },
  { id: "mlhuillier", name: "M Lhuillier", shortName: "ML", color: "#C41E3A", bgColor: "#C41E3A10", type: "remittance" },
  { id: "lbc", name: "LBC", shortName: "LB", color: "#E31937", bgColor: "#E3193710", type: "remittance" },
];

const banks: Bank[] = [
  { id: "bpi", name: "BPI", shortName: "BPI", color: "#A51C30", bgColor: "#A51C3010" },
  { id: "bdo", name: "BDO Unibank", shortName: "BDO", color: "#003DA5", bgColor: "#003DA510" },
  { id: "metrobank", name: "Metrobank", shortName: "MB", color: "#782B8F", bgColor: "#782B8F10" },
  { id: "unionbank", name: "UnionBank", shortName: "UB", color: "#F26522", bgColor: "#F2652210" },
  { id: "landbank", name: "Landbank", shortName: "LB", color: "#006B3F", bgColor: "#006B3F10" },
  { id: "pnb", name: "PNB", shortName: "PNB", color: "#003B73", bgColor: "#003B7310" },
  { id: "rcbc", name: "RCBC", shortName: "RC", color: "#0066B3", bgColor: "#0066B310" },
  { id: "chinabank", name: "China Bank", shortName: "CB", color: "#C8102E", bgColor: "#C8102E10" },
];

const recentRecipients: Recipient[] = [
  { id: "1", name: "Maria Santos", detail: "GCash · 0917***4521", avatar: "MS", color: "#0050DC" },
  { id: "2", name: "Juan Dela Cruz", detail: "BPI · ****7890", avatar: "JD", color: "#A51C30" },
  { id: "3", name: "Ana Reyes", detail: "Maya · 0928***1234", avatar: "AR", color: "#00B274" },
  { id: "4", name: "Carlo Mendoza", detail: "BDO · ****5678", avatar: "CM", color: "#003DA5" },
];

export function SendScreen({ activeTab, onTabChange }: Props) {
  const [view, setView] = useState<View>("main");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [providerType, setProviderType] = useState<"gateway" | "bank">("gateway");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const ewallets = gateways.filter((g) => g.type === "ewallet");
  const remittances = gateways.filter((g) => g.type === "remittance");

  const filteredBanks = searchQuery
    ? banks.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : banks;

  const getProviderName = () => {
    if (providerType === "gateway") return gateways.find((g) => g.id === selectedProvider)?.name;
    return banks.find((b) => b.id === selectedProvider)?.name;
  };

  const getProviderColor = () => {
    if (providerType === "gateway") return gateways.find((g) => g.id === selectedProvider)?.color;
    return banks.find((b) => b.id === selectedProvider)?.color;
  };

  const getProviderShort = () => {
    if (providerType === "gateway") return gateways.find((g) => g.id === selectedProvider)?.shortName;
    return banks.find((b) => b.id === selectedProvider)?.shortName;
  };

  const handleSelectProvider = (id: string, type: "gateway" | "bank") => {
    setSelectedProvider(id);
    setProviderType(type);
    setView(type === "gateway" ? "gateway" : "bank");
  };

  const handleConfirm = () => {
    if (amount && accountNumber) setView("confirm");
  };

  const handleSend = () => {
    // Save payment transaction to localStorage
    const payment = {
      id: Date.now().toString(),
      amount: amount,
      currency: selectedCurrency.code,
      recipient: recipientName,
      accountNumber: accountNumber,
      provider: getProviderName(),
      date: new Date().toISOString(),
    };

    const savedPayments = localStorage.getItem('payment_history');
    const payments = savedPayments ? JSON.parse(savedPayments) : [];
    payments.push(payment);
    localStorage.setItem('payment_history', JSON.stringify(payments));

    setView("success");
  };

  const handleReset = () => {
    setView("main");
    setAmount("");
    setSelectedProvider("");
    setAccountNumber("");
    setRecipientName("");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <AnimatePresence mode="wait">
        {/* ==================== MAIN VIEW ==================== */}
        {view === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <p className="text-[#111827]" style={{ fontSize: "1.2rem", fontWeight: 600 }}>Send Money</p>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
                Choose where to send your funds
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
              {/* Amount + Currency */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 bg-gradient-to-br from-[#1565C0] to-[#1a1a8f] rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60" style={{ fontSize: "0.9rem" }}>You send</span>
                  <button
                    onClick={() => setShowCurrencyPicker(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl hover:bg-white/15 transition-colors"
                  >
                    <span style={{ fontSize: "0.95rem" }}>{selectedCurrency.flag}</span>
                    <span className="text-white" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      {selectedCurrency.code}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-white/60" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white/40" style={{ fontSize: "1.5rem", fontWeight: 300 }}>
                    {selectedCurrency.symbol}
                  </span>
                  <input
                    value={amount}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9.]/g, "");
                      if (v.split(".").length <= 2) setAmount(v);
                    }}
                    placeholder="0.00"
                    className="flex-1 bg-transparent text-white outline-none placeholder:text-white/20"
                    style={{ fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.02em" }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Wallet className="w-3.5 h-3.5 text-white/40" strokeWidth={1.5} />
                  <span className="text-white/40" style={{ fontSize: "0.85rem" }}>
                    Available: {selectedCurrency.symbol}2,847.50
                  </span>
                </div>
              </motion.div>

              {/* Recent Recipients */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                    <p className="text-muted-foreground" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      Recent
                    </p>
                  </div>
                  <button className="text-[#1565C0]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                    See all
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                  {recentRecipients.map((r, i) => (
                    <motion.button
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      className="flex flex-col items-center gap-2 shrink-0 w-[68px] group"
                      onClick={() => {
                        const isBank = r.detail.includes("BPI") || r.detail.includes("BDO");
                        const pid = r.detail.includes("GCash")
                          ? "gcash"
                          : r.detail.includes("Maya")
                          ? "maya"
                          : r.detail.includes("BPI")
                          ? "bpi"
                          : "bdo";
                        handleSelectProvider(pid, isBank ? "bank" : "gateway");
                        setRecipientName(r.name);
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center group-active:scale-[0.95] transition-transform"
                        style={{ backgroundColor: r.color + "12" }}
                      >
                        <span style={{ color: r.color, fontSize: "0.85rem", fontWeight: 600 }}>{r.avatar}</span>
                      </div>
                      <span
                        className="text-[#111827] text-center truncate w-full"
                        style={{ fontSize: "0.8rem", fontWeight: 500 }}
                      >
                        {r.name.split(" ")[0]}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* E-Wallets */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <p className="text-muted-foreground" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    E-Wallets
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {ewallets.map((g, i) => (
                    <motion.button
                      key={g.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      onClick={() => handleSelectProvider(g.id, "gateway")}
                      className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)] transition-all active:scale-[0.97]"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: g.bgColor }}
                      >
                        <span style={{ color: g.color, fontSize: "0.8rem", fontWeight: 700 }}>{g.shortName}</span>
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-[#111827] truncate" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                          {g.name}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>Instant</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Remittance Centers */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <p className="text-muted-foreground" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    Remittance Centers
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {remittances.map((g, i) => (
                    <motion.button
                      key={g.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.04 }}
                      onClick={() => handleSelectProvider(g.id, "gateway")}
                      className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)] transition-all active:scale-[0.97]"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: g.bgColor }}
                      >
                        <span style={{ color: g.color, fontSize: "0.8rem", fontWeight: 700 }}>{g.shortName}</span>
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-[#111827] truncate" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                          {g.name}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>Pick-up</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Send to Bank */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Bank Transfer
                  </p>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 bg-white rounded-xl border border-[rgba(17,24,39,0.06)] px-3 py-2.5 mb-3 focus-within:border-[#1565C0]/20 transition-colors">
                  <Search className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search banks..."
                    className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[#B0B3BE]"
                    style={{ fontSize: "0.82rem" }}
                  />
                </div>

                <div className="space-y-2">
                  {filteredBanks.map((b, i) => (
                    <motion.button
                      key={b.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.03 }}
                      onClick={() => handleSelectProvider(b.id, "bank")}
                      className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)] transition-all active:scale-[0.97] w-full"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: b.bgColor }}
                      >
                        <span style={{ color: b.color, fontSize: "0.8rem", fontWeight: 700 }}>{b.shortName}</span>
                      </div>
                      <p className="flex-1 text-left text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {b.name}
                      </p>
                      <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

            {/* Currency Picker Modal */}
            <AnimatePresence>
              {showCurrencyPicker && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-end"
                  onClick={() => setShowCurrencyPicker(false)}
                >
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    className="w-full bg-[#FAF9F7] rounded-t-3xl p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                        Select Currency
                      </p>
                      <button
                        onClick={() => setShowCurrencyPicker(false)}
                        className="w-8 h-8 rounded-full bg-[rgba(17,24,39,0.05)] flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-[280px] overflow-y-auto">
                      {currencies.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setSelectedCurrency(c);
                            setShowCurrencyPicker(false);
                          }}
                          className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all active:scale-[0.98] ${
                            selectedCurrency.code === c.code
                              ? "bg-[#1565C0]/5 border border-[#1565C0]/15"
                              : "bg-white border border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)]"
                          }`}
                        >
                          <span style={{ fontSize: "1.2rem" }}>{c.flag}</span>
                          <div className="flex-1 text-left">
                            <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                              {c.code}
                            </p>
                            <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>{c.name}</p>
                          </div>
                          {selectedCurrency.code === c.code && (
                            <CheckCircle2 className="w-5 h-5 text-[#1565C0]" strokeWidth={1.5} />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ==================== GATEWAY / BANK DETAIL VIEW ==================== */}
        {(view === "gateway" || view === "bank") && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center gap-3">
              <button
                onClick={() => setView("main")}
                className="w-9 h-9 rounded-xl bg-white border border-[rgba(17,24,39,0.06)] flex items-center justify-center active:scale-[0.95] transition-transform"
              >
                <ArrowLeft className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
              </button>
              <div className="flex items-center gap-2.5 flex-1">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: (getProviderColor() || "#1565C0") + "12" }}
                >
                  <span
                    style={{ color: getProviderColor(), fontSize: "0.75rem", fontWeight: 700 }}
                  >
                    {getProviderShort()}
                  </span>
                </div>
                <div>
                  <p className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    {getProviderName()}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                    {view === "gateway" ? "E-Wallet / Remittance" : "Bank Transfer"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
              {/* Amount Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)]"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>Amount</p>
                  <button
                    onClick={() => setShowCurrencyPicker(true)}
                    className="flex items-center gap-1 px-2 py-1 bg-[rgba(17,24,39,0.03)] rounded-lg"
                  >
                    <span style={{ fontSize: "0.9rem" }}>{selectedCurrency.flag}</span>
                    <span className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {selectedCurrency.code}
                    </span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-[#B0B3BE]" style={{ fontSize: "1.5rem", fontWeight: 300 }}>
                    {selectedCurrency.symbol}
                  </span>
                  <input
                    value={amount}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9.]/g, "");
                      if (v.split(".").length <= 2) setAmount(v);
                    }}
                    placeholder="0.00"
                    className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[#D1D5DB]"
                    style={{ fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em" }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[rgba(17,24,39,0.05)]">
                  <Wallet className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                    Balance: {selectedCurrency.symbol}2,847.50
                  </span>
                </div>
                {/* Quick amounts */}
                <div className="flex gap-2 mt-3">
                  {[100, 500, 1000, 2000].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a.toString())}
                      className={`flex-1 py-2 rounded-xl border transition-all active:scale-[0.96] ${
                        amount === a.toString()
                          ? "bg-[#1565C0]/5 border-[#1565C0]/20 text-[#1565C0]"
                          : "bg-[rgba(17,24,39,0.02)] border-[rgba(17,24,39,0.06)] text-[#111827]"
                      }`}
                      style={{ fontSize: "0.8rem", fontWeight: 500 }}
                    >
                      {selectedCurrency.symbol}{a >= 1000 ? `${a / 1000}K` : a}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Recipient Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] space-y-4"
              >
                <p className="text-[#111827]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  Recipient Details
                </p>

                {/* Account Number / Mobile */}
                <div>
                  <label className="text-muted-foreground block mb-1.5" style={{ fontSize: "0.85rem" }}>
                    {view === "gateway" ? "Mobile Number / Account" : "Account Number"}
                  </label>
                  <input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={view === "gateway" ? "e.g. 0917 123 4567" : "e.g. 1234 5678 9012"}
                    className="w-full px-4 py-3 bg-[rgba(17,24,39,0.02)] border border-[rgba(17,24,39,0.06)] rounded-xl outline-none text-[#111827] placeholder:text-[#D1D5DB] focus:border-[#1565C0]/20 transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>

                {/* Recipient Name */}
                <div>
                  <label className="text-muted-foreground block mb-1.5" style={{ fontSize: "0.85rem" }}>
                    Recipient Name
                  </label>
                  <input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Full name of the recipient"
                    className="w-full px-4 py-3 bg-[rgba(17,24,39,0.02)] border border-[rgba(17,24,39,0.06)] rounded-xl outline-none text-[#111827] placeholder:text-[#D1D5DB] focus:border-[#1565C0]/20 transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>

                {/* Purpose (optional) */}
                <div>
                  <label className="text-muted-foreground block mb-1.5" style={{ fontSize: "0.85rem" }}>
                    Purpose <span className="text-[#B0B3BE]">(optional)</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["Family Support", "Bills", "Savings", "Business", "Others"].map((p) => (
                      <button
                        key={p}
                        className="px-3 py-2 bg-[rgba(17,24,39,0.02)] border border-[rgba(17,24,39,0.06)] rounded-xl text-[#111827] hover:border-[#1565C0]/20 transition-all active:scale-[0.97]"
                        style={{ fontSize: "0.85rem", fontWeight: 500 }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Fee Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-[#4CAF50]/5 rounded-2xl border border-[#4CAF50]/10"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#4CAF50]" strokeWidth={1.5} />
                  <p className="text-[#111827]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    No transfer fees
                  </p>
                </div>
                <p className="text-muted-foreground mt-1 ml-6" style={{ fontSize: "0.85rem" }}>
                  Koopli covers all fees for your first 5 transfers this month
                </p>
              </motion.div>
            </div>

            {/* Continue Button */}
            <div className="px-6 pt-2"
              style={{ paddingBottom: "max(5rem, calc(5rem + env(safe-area-inset-bottom, 0px)))" }}
            >
              <button
                onClick={handleConfirm}
                disabled={!amount || !accountNumber}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
                style={{
                  backgroundColor: amount && accountNumber ? "#1565C0" : "rgba(17,24,39,0.08)",
                  color: amount && accountNumber ? "#fff" : "#B0B3BE",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                Continue
              </button>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        )}

        {/* ==================== CONFIRMATION VIEW ==================== */}
        {view === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="px-6 pt-6 pb-4 flex items-center gap-3">
              <button
                onClick={() => setView(providerType === "gateway" ? "gateway" : "bank")}
                className="w-9 h-9 rounded-xl bg-white border border-[rgba(17,24,39,0.06)] flex items-center justify-center active:scale-[0.95] transition-transform"
              >
                <ArrowLeft className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
              </button>
              <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                Confirm Transfer
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
              {/* Amount Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-6"
              >
                <p className="text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>Sending</p>
                <p className="text-[#111827]" style={{ fontSize: "2.2rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  {selectedCurrency.symbol}
                  {parseFloat(amount || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className="text-muted-foreground mt-1" style={{ fontSize: "0.85rem" }}>
                  {selectedCurrency.code} · {selectedCurrency.name}
                </span>
              </motion.div>

              {/* Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] space-y-4"
              >
                {[
                  { label: "To", value: recipientName || "—" },
                  { label: "Account", value: accountNumber || "—" },
                  { label: "Via", value: getProviderName() || "—" },
                  { label: "Fee", value: "Free", highlight: true },
                  {
                    label: "Total",
                    value: `${selectedCurrency.symbol}${parseFloat(amount || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    bold: true,
                  },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between ${
                      i < 4 ? "pb-3.5 border-b border-[rgba(17,24,39,0.05)]" : ""
                    }`}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: row.bold ? "1rem" : "0.9rem",
                        fontWeight: row.bold ? 600 : 500,
                        color: row.highlight ? "#4CAF50" : "#111827",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Security note */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-[#1565C0]/[0.03] rounded-2xl"
              >
                <p className="text-muted-foreground text-center" style={{ fontSize: "0.72rem", lineHeight: 1.5 }}>
                  🔒 This transaction is secured with end-to-end encryption. Funds will arrive within 1-3 minutes.
                </p>
              </motion.div>
            </div>

            {/* Send Button */}
            <div className="px-6 pt-2 space-y-3"
              style={{ paddingBottom: "max(5rem, calc(5rem + env(safe-area-inset-bottom, 0px)))" }}
            >
              <button
                onClick={handleSend}
                className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                  fontSize: "0.9rem",
                  fontWeight: 600
                }}
              >
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                Send Now
              </button>
              <button
                onClick={() => setView(providerType === "gateway" ? "gateway" : "bank")}
                className="w-full py-3 rounded-2xl text-[#111827] flex items-center justify-center transition-all active:scale-[0.98]"
                style={{ fontSize: "0.82rem", fontWeight: 500 }}
              >
                Go Back
              </button>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        )}

        {/* ==================== SUCCESS VIEW ==================== */}
        {view === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full"
          >
            <div className="flex-1 flex flex-col items-center justify-center px-8">
              {/* Success animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 250, damping: 15 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#5cbf6a] flex items-center justify-center"
                >
                  <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={1.5} />
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#111827] text-center mb-2"
                style={{ fontSize: "1.2rem", fontWeight: 600 }}
              >
                Transfer Sent!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground text-center mb-2"
                style={{ fontSize: "0.85rem" }}
              >
                {selectedCurrency.symbol}
                {parseFloat(amount || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                sent to
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="text-[#111827] text-center"
                style={{ fontSize: "0.95rem", fontWeight: 600 }}
              >
                {recipientName || accountNumber}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground text-center mt-1"
                style={{ fontSize: "0.78rem" }}
              >
                via {getProviderName()}
              </motion.p>

              {/* Transaction ref */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 px-4 py-3 bg-[rgba(17,24,39,0.03)] rounded-xl"
              >
                <p className="text-muted-foreground text-center" style={{ fontSize: "0.7rem" }}>
                  Ref: Koopli-{Date.now().toString(36).toUpperCase().slice(-8)}
                </p>
              </motion.div>
            </div>

            <div className="px-6 pt-2 space-y-3"
              style={{ paddingBottom: "max(5rem, calc(5rem + env(safe-area-inset-bottom, 0px)))" }}
            >
              <button
                onClick={handleReset}
                className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: "#1565C0",
                  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                  fontSize: "0.9rem",
                  fontWeight: 600
                }}
              >
                Send Another
              </button>
              <button
                onClick={() => onTabChange("home")}
                className="w-full py-3 rounded-2xl text-[#1565C0] flex items-center justify-center transition-all active:scale-[0.98]"
                style={{ fontSize: "0.82rem", fontWeight: 500 }}
              >
                Back to Home
              </button>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}