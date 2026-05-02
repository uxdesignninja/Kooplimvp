import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  BadgeCheck,
  ChevronRight,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Globe,
  HelpCircle,
  FileText,
  MessageSquare,
  LogOut,
  Building,
  Link2,
  Unlink2,
  Plus,
  X,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Mail,
  MapPin,
  Pencil,
  Camera,
  ChevronDown,
  Landmark,
  Star,
  Search,
  Users,
  Check,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";
import { CooperativeJoinModal } from "./CooperativeJoinModal";

type View = "main" | "linked-banks" | "link-new" | "edit-profile";

interface LinkedBank {
  id: string;
  name: string;
  shortName: string;
  accountNumber: string;
  accountType: string;
  color: string;
  isPrimary: boolean;
  status: "active" | "pending";
}

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onLogout: () => void;
  selectedCooperative?: string; // Name of cooperative from onboarding
  onCooperativeSelect?: (coopName: string) => void; // Callback when user selects a cooperative
  userData?: {
    fullName: string;
    email: string;
    address: string;
  };
}

const coopBanks = [
  { id: "1fcoop", name: "1st Valley Credit Cooperative", shortName: "1V", color: "#0066B3" },
  { id: "acdi", name: "ACDI Multi-Purpose Coop", shortName: "AC", color: "#006B3F" },
  { id: "card-mri", name: "CARD MRI", shortName: "CM", color: "#C41E3A" },
  { id: "coop-bank", name: "Coop Bank Mindanao", shortName: "CB", color: "#003DA5" },
  { id: "ficco", name: "FICCO", shortName: "FI", color: "#782B8F" },
  { id: "lbp-coop", name: "Landbank Countryside Coop", shortName: "LC", color: "#006B3F" },
  { id: "mass-specc", name: "MASS-SPECC", shortName: "MS", color: "#F26522" },
  { id: "natcco", name: "NATCCO", shortName: "NC", color: "#0050DC" },
  { id: "climbs", name: "CLIMBS Life & Gen. Insurance", shortName: "CL", color: "#003B73" },
  { id: "pfcco", name: "Philippine Finance Coop", shortName: "PF", color: "#A51C30" },
];

export function ProfileScreen({ activeTab, onTabChange, onLogout, selectedCooperative, onCooperativeSelect, userData }: Props) {
  const [view, setView] = useState<View>("main");
  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[]>([
    {
      id: "1",
      name: "NATCCO",
      shortName: "NC",
      accountNumber: "****7823",
      accountType: "Savings",
      color: "#0050DC",
      isPrimary: true,
      status: "active",
    },
    {
      id: "2",
      name: "CARD MRI",
      shortName: "CM",
      accountNumber: "****4190",
      accountType: "Share Capital",
      color: "#C41E3A",
      isPrimary: false,
      status: "active",
    },
  ]);
  const [showUnlinkConfirm, setShowUnlinkConfirm] = useState<string | null>(null);
  const [linkStep, setLinkStep] = useState<"select" | "details" | "verifying" | "done">("select");
  const [selectedCoop, setSelectedCoop] = useState<(typeof coopBanks)[0] | null>(null);
  const [linkAccount, setLinkAccount] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleUnlink = (id: string) => {
    setLinkedBanks((prev) => prev.filter((b) => b.id !== id));
    setShowUnlinkConfirm(null);
  };

  const handleSetPrimary = (id: string) => {
    setLinkedBanks((prev) =>
      prev.map((b) => ({ ...b, isPrimary: b.id === id }))
    );
  };

  const handleLinkBank = () => {
    if (!selectedCoop || !linkAccount) return;
    setLinkStep("verifying");
    setTimeout(() => {
      const newBank: LinkedBank = {
        id: crypto.randomUUID(),
        name: selectedCoop.name,
        shortName: selectedCoop.shortName,
        accountNumber: `****${linkAccount.slice(-4)}`,
        accountType: "Savings",
        color: selectedCoop.color,
        isPrimary: linkedBanks.length === 0,
        status: "active",
      };
      setLinkedBanks((prev) => [...prev, newBank]);
      setLinkStep("done");
    }, 2000);
  };

  const resetLink = () => {
    setLinkStep("select");
    setSelectedCoop(null);
    setLinkAccount("");
    setView("linked-banks");
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-[26px] rounded-full transition-colors duration-200"
      style={{ backgroundColor: value ? "#1565C0" : "rgba(17,24,39,0.1)" }}
    >
      <motion.div
        className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-sm"
        animate={{ left: value ? 22 : 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </button>
  );

  // Map cooperative name from onboarding to display info
  const getCooperativeInfo = (coopName: string) => {
    const coopMap: Record<string, { shortName: string; color: string; initials: string }> = {
      "First Community Cooperative": { shortName: "FICCO", color: "#782B8F", initials: "FI" },
      "Oro Integrated Cooperative": { shortName: "OIC", color: "#4CAF50", initials: "OIC" },
      "Tagum Cooperative": { shortName: "TAGCOOP", color: "#F97316", initials: "TC" },
      "Maynilad Savers Cooperative": { shortName: "MSCoop", color: "#7C3AED", initials: "MSC" },
      "Cebu United Credit Cooperative": { shortName: "CUCC", color: "#0891B2", initials: "CUCC" },
    };
    return coopMap[coopName] || { shortName: "COOP", color: "#1565C0", initials: "CP" };
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <AnimatePresence mode="wait">
        {/* ==================== MAIN PROFILE ==================== */}
        {view === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <div className="flex-1 overflow-y-auto pb-24">
              {/* Header + Avatar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pt-6 pb-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[#111827]" style={{ fontSize: "1.2rem", fontWeight: 600 }}>Profile</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setView("edit-profile")}
                    className="w-9 h-9 rounded-xl bg-white border border-[rgba(17,24,39,0.06)] flex items-center justify-center transition-transform"
                  >
                    <Pencil className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                  </motion.button>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center">
                      <span className="text-white" style={{ fontSize: "1.2rem", fontWeight: 600 }}>JD</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center border-2 border-[#FAF9F7]">
                      <BadgeCheck className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                      {userData?.fullName || "Juan Dela Cruz"}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                      {userData?.email || "juan.delacruz@email.com"}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="px-2 py-0.5 rounded-md bg-[#4CAF50]/10 text-[#4CAF50]"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        Verified
                      </span>
                      <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                        Member since Feb 2026
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* My Cooperative */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-6 mb-5"
              >
                {selectedCooperative ? (
                  // Show selected cooperative from onboarding
                  <div className="w-full p-4 bg-gradient-to-br from-[#1565C0]/[0.04] to-[#2d2d9e]/[0.04] rounded-2xl border border-[#1565C0]/8">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: getCooperativeInfo(selectedCooperative).color + "14" }}
                      >
                        <span style={{ 
                          color: getCooperativeInfo(selectedCooperative).color, 
                          fontSize: "0.7rem", 
                          fontWeight: 700,
                          letterSpacing: "-0.02em"
                        }}>
                          {getCooperativeInfo(selectedCooperative).initials}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#111827] mb-0.5" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                          {selectedCooperative}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.78rem" }}>
                          My Cooperative
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-[#4CAF50]/10 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                        <span className="text-[#4CAF50]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                          Connected
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Show "Join a cooperative" button if skipped
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowJoinModal(true)}
                    className="w-full p-4 bg-white rounded-2xl border border-dashed border-[rgba(17,24,39,0.12)] transition-transform hover:border-[#1565C0]/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5 text-[#6B7085]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[#111827] mb-0.5" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                          Join a Cooperative
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.78rem" }}>
                          Connect with your financial community
                        </p>
                      </div>
                      <Plus className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
                    </div>
                  </motion.button>
                )}
              </motion.div>

              {/* Linked Cooperative Banks */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="px-6 mb-5"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView("linked-banks")}
                  className="w-full p-4 bg-gradient-to-br from-[#1565C0]/[0.04] to-[#2d2d9e]/[0.04] rounded-2xl border border-[#1565C0]/8 transition-transform"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#1565C0]/8 flex items-center justify-center">
                        <Landmark className="w-4.5 h-4.5 text-[#1565C0]" strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <p className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                          Linked Accounts
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                          {linkedBanks.length} account{linkedBanks.length !== 1 ? "s" : ""} linked
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                  </div>
                  {/* Mini preview of linked banks */}
                  {linkedBanks.length > 0 && (
                    <div className="flex gap-2">
                      {linkedBanks.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-[rgba(17,24,39,0.06)] flex-1 min-w-0"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: b.color + "12" }}
                          >
                            <span style={{ color: b.color, fontSize: "0.55rem", fontWeight: 700 }}>
                              {b.shortName}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[#111827] truncate" style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                              {b.name}
                            </p>
                            <p className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>
                              {b.accountNumber}
                            </p>
                          </div>
                          {b.isPrimary && (
                            <Star className="w-3 h-3 text-[#F5A623] shrink-0 ml-auto" strokeWidth={2} fill="#F5A623" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.button>
              </motion.div>

              {/* Account Settings */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="px-6 mb-5"
              >
                <p className="text-muted-foreground mb-2.5 px-1" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Account
                </p>
                <div className="bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] overflow-hidden">
                  {[
                    { icon: User, label: "Personal Information", detail: "Name, birthday, address" },
                    { icon: CreditCard, label: "Payment Methods", detail: "Cards, e-wallets" },
                    { icon: Smartphone, label: "Linked Devices", detail: "1 device active" },
                    { icon: FileText, label: "Documents & KYC", detail: "Fully verified" },
                  ].map((item, i, arr) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        className={`flex items-center gap-3 w-full p-4 text-left hover:bg-[rgba(17,24,39,0.01)] active:bg-[rgba(17,24,39,0.02)] transition-colors ${
                          i < arr.length - 1 ? "border-b border-[rgba(17,24,39,0.04)]" : ""
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                            {item.label}
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>{item.detail}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B0B3BE] shrink-0" strokeWidth={1.5} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Security */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-6 mb-5"
              >
                <p className="text-muted-foreground mb-2.5 px-1" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Security
                </p>
                <div className="bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] overflow-hidden">
                  <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-[rgba(17,24,39,0.01)] active:bg-[rgba(17,24,39,0.02)] transition-colors border-b border-[rgba(17,24,39,0.04)]">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>Change PIN</p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Last changed 30 days ago</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                  </button>
                  <div className="flex items-center gap-3 p-4 border-b border-[rgba(17,24,39,0.04)]">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                        Biometric Login
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                        Face ID / Fingerprint
                      </p>
                    </div>
                    <Toggle value={biometric} onChange={setBiometric} />
                  </div>
                  <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-[rgba(17,24,39,0.01)] active:bg-[rgba(17,24,39,0.02)] transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                        Privacy Settings
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                        Data sharing & visibility
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>

              {/* Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="px-6 mb-5"
              >
                <p className="text-muted-foreground mb-2.5 px-1" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Preferences
                </p>
                <div className="bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-[rgba(17,24,39,0.04)]">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                        Notifications
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                        Push & in-app alerts
                      </p>
                    </div>
                    <Toggle value={notifications} onChange={setNotifications} />
                  </div>
                  <div className="flex items-center gap-3 p-4 border-b border-[rgba(17,24,39,0.04)]">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                      <Moon className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>Dark Mode</p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Coming soon</p>
                    </div>
                    <Toggle value={darkMode} onChange={setDarkMode} />
                  </div>
                  <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-[rgba(17,24,39,0.01)] active:bg-[rgba(17,24,39,0.02)] transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>Language</p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>English (Philippines)</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-6 mb-5"
              >
                <p className="text-muted-foreground mb-2.5 px-1" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Support
                </p>
                <div className="bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] overflow-hidden">
                  {[
                    { icon: HelpCircle, label: "Help Center", detail: "FAQs & guides" },
                    { icon: MessageSquare, label: "Contact Us", detail: "Chat with support" },
                    { icon: FileText, label: "Terms & Privacy", detail: "Legal information" },
                  ].map((item, i, arr) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        className={`flex items-center gap-3 w-full p-4 text-left hover:bg-[rgba(17,24,39,0.01)] active:bg-[rgba(17,24,39,0.02)] transition-colors ${
                          i < arr.length - 1 ? "border-b border-[rgba(17,24,39,0.04)]" : ""
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                            {item.label}
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>{item.detail}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Logout */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="px-6 mb-6"
              >
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white rounded-2xl border border-red-100 text-red-500 hover:bg-red-50/50 active:scale-[0.99] transition-all"
                  style={{ fontSize: "0.85rem", fontWeight: 500 }}
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                  Log Out
                </button>
              </motion.div>

              {/* App version */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-muted-foreground pb-6"
                style={{ fontSize: "0.8rem" }}
              >
                Koopli v1.0.0 · Build 2026.02
              </motion.p>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

            {/* Logout Confirm */}
            <AnimatePresence>
              {showLogoutConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center px-8"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#FAF9F7] rounded-2xl p-6 w-full shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                        <LogOut className="w-6 h-6 text-red-500" strokeWidth={1.5} />
                      </div>
                      <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                        Log out of Koopli?
                      </p>
                      <p className="text-muted-foreground mb-5" style={{ fontSize: "0.8rem" }}>
                        You'll need to sign in again to access your account.
                      </p>
                      <div className="flex gap-3 w-full">
                        <button
                          onClick={() => setShowLogoutConfirm(false)}
                          className="flex-1 py-3 rounded-xl border border-[rgba(17,24,39,0.08)] text-[#111827] active:scale-[0.97] transition-transform"
                          style={{ fontSize: "0.85rem", fontWeight: 500 }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onLogout}
                          className="flex-1 py-3 rounded-xl bg-red-500 text-white active:scale-[0.97] transition-transform"
                          style={{ fontSize: "0.85rem", fontWeight: 500 }}
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Join Cooperative Modal */}
            <AnimatePresence>
              {showJoinModal && (
                <CooperativeJoinModal
                  onClose={() => setShowJoinModal(false)}
                  onSelect={(coopName) => {
                    onCooperativeSelect?.(coopName);
                    setShowJoinModal(false);
                  }}
                  userData={userData}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ==================== LINKED BANKS VIEW ==================== */}
        {view === "linked-banks" && (
          <motion.div
            key="linked-banks"
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
                <X className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
              </button>
              <div className="flex-1">
                <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Cooperative Banks
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                  Manage your linked accounts
                </p>
              </div>
              <button
                onClick={() => {
                  setView("link-new");
                  setLinkStep("select");
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-[0.95] transition-transform"
                style={{ backgroundColor: "#1565C0", boxShadow: "0 4px 12px rgba(21,101,192,0.25)" }}
              >
                <Plus className="w-4 h-4 text-white" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-3">
              {linkedBanks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(17,24,39,0.03)] flex items-center justify-center mb-4">
                    <Landmark className="w-7 h-7 text-[#B0B3BE]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[#111827] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    No banks linked yet
                  </p>
                  <p className="text-muted-foreground max-w-[220px] mb-5" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                    Link your cooperative bank account to send and receive funds seamlessly.
                  </p>
                  <button
                    onClick={() => {
                      setView("link-new");
                      setLinkStep("select");
                    }}
                    className="px-5 py-3 rounded-xl text-white flex items-center gap-2 active:scale-[0.97] transition-transform"
                    style={{
                      backgroundColor: "#1565C0",
                      boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      boxShadow: "0 4px 14px rgba(10,10,111,0.25)",
                    }}
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    Link a Bank
                  </button>
                </motion.div>
              )}

              {linkedBanks.map((bank, i) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-[rgba(17,24,39,0.06)] overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: bank.color + "12" }}
                      >
                        <span style={{ color: bank.color, fontSize: "0.7rem", fontWeight: 700 }}>
                          {bank.shortName}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[#111827] truncate" style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                            {bank.name}
                          </p>
                          {bank.isPrimary && (
                            <span
                              className="px-1.5 py-0.5 rounded-md bg-[#F5A623]/10 text-[#F5A623] shrink-0"
                              style={{ fontSize: "0.58rem", fontWeight: 600 }}
                            >
                              PRIMARY
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                          {bank.accountType} · {bank.accountNumber}
                        </p>
                      </div>
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: bank.status === "active" ? "#4CAF50" : "#F5A623" }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {!bank.isPrimary && (
                        <button
                          onClick={() => handleSetPrimary(bank.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1565C0]/[0.04] text-[#1565C0] active:scale-[0.97] transition-transform"
                          style={{ fontSize: "0.75rem", fontWeight: 500 }}
                        >
                          <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Set Primary
                        </button>
                      )}
                      <button
                        onClick={() => setShowUnlinkConfirm(bank.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 active:scale-[0.97] transition-transform"
                        style={{ fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        <Unlink2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Unlink
                      </button>
                    </div>
                  </div>

                  {/* Unlink Confirmation */}
                  <AnimatePresence>
                    {showUnlinkConfirm === bank.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-[rgba(17,24,39,0.05)]">
                          <p className="text-muted-foreground text-center mb-3" style={{ fontSize: "0.75rem" }}>
                            Are you sure you want to unlink {bank.name}?
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowUnlinkConfirm(null)}
                              className="flex-1 py-2.5 rounded-xl border border-[rgba(17,24,39,0.08)] text-[#111827] active:scale-[0.97] transition-transform"
                              style={{ fontSize: "0.75rem", fontWeight: 500 }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUnlink(bank.id)}
                              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white active:scale-[0.97] transition-transform"
                              style={{ fontSize: "0.75rem", fontWeight: 500 }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Info card */}
              {linkedBanks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-[#4CAF50]/5 rounded-2xl border border-[#4CAF50]/10 mt-2"
                >
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-muted-foreground" style={{ fontSize: "0.72rem", lineHeight: 1.5 }}>
                      Your linked accounts are protected with 256-bit encryption. Koopli never stores your banking
                      credentials.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        )}

        {/* ==================== LINK NEW BANK ==================== */}
        {view === "link-new" && (
          <motion.div
            key="link-new"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center gap-3">
              <button
                onClick={resetLink}
                className="w-9 h-9 rounded-xl bg-white border border-[rgba(17,24,39,0.06)] flex items-center justify-center active:scale-[0.95] transition-transform"
              >
                <X className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
              </button>
              <div>
                <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Link Cooperative Bank
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                  {linkStep === "select"
                    ? "Choose your cooperative"
                    : linkStep === "details"
                    ? "Enter account details"
                    : linkStep === "verifying"
                    ? "Verifying your account"
                    : "Account linked!"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24">
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-5">
                {["Select", "Details", "Verify"].map((s, i) => {
                  const stepIdx = linkStep === "select" ? 0 : linkStep === "details" ? 1 : 2;
                  const isActive = i <= stepIdx;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className="flex-1 h-1 rounded-full overflow-hidden bg-[rgba(17,24,39,0.06)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? "100%" : "0%" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: isActive ? "#1565C0" : "transparent" }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {/* SELECT STEP */}
                {linkStep === "select" && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2"
                  >
                    {coopBanks.map((bank, i) => (
                      <motion.button
                        key={bank.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => {
                          setSelectedCoop(bank);
                          setLinkStep("details");
                        }}
                        className={`flex items-center gap-3 w-full p-3.5 rounded-2xl border transition-all active:scale-[0.98] ${
                          selectedCoop?.id === bank.id
                            ? "bg-[#1565C0]/5 border-[#1565C0]/15"
                            : "bg-white border-[rgba(17,24,39,0.06)] hover:border-[rgba(17,24,39,0.12)]"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: bank.color + "12" }}
                        >
                          <span style={{ color: bank.color, fontSize: "0.65rem", fontWeight: 700 }}>
                            {bank.shortName}
                          </span>
                        </div>
                        <p className="flex-1 text-left text-[#111827]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                          {bank.name}
                        </p>
                        <ChevronRight className="w-4 h-4 text-[#B0B3BE]" strokeWidth={1.5} />
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* DETAILS STEP */}
                {linkStep === "details" && selectedCoop && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    {/* Selected bank */}
                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[rgba(17,24,39,0.06)]">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: selectedCoop.color + "12" }}
                      >
                        <span style={{ color: selectedCoop.color, fontSize: "0.7rem", fontWeight: 700 }}>
                          {selectedCoop.shortName}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#111827]" style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                          {selectedCoop.name}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                          Cooperative Bank
                        </p>
                      </div>
                      <button
                        onClick={() => setLinkStep("select")}
                        className="text-[#1565C0]"
                        style={{ fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        Change
                      </button>
                    </div>

                    {/* Account Number */}
                    <div>
                      <label className="text-muted-foreground block mb-1.5 px-1" style={{ fontSize: "0.75rem" }}>
                        Account Number
                      </label>
                      <input
                        value={linkAccount}
                        onChange={(e) => setLinkAccount(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter your account number"
                        className="w-full px-4 py-3.5 bg-white border border-[rgba(17,24,39,0.06)] rounded-xl outline-none text-[#111827] placeholder:text-[#D1D5DB] focus:border-[#1565C0]/20 transition-colors"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>

                    {/* Account Type */}
                    <div>
                      <label className="text-muted-foreground block mb-1.5 px-1" style={{ fontSize: "0.75rem" }}>
                        Account Type
                      </label>
                      <div className="flex gap-2">
                        {["Savings", "Share Capital", "Time Deposit"].map((t) => (
                          <button
                            key={t}
                            className="flex-1 py-3 bg-white border border-[rgba(17,24,39,0.06)] rounded-xl text-[#111827] hover:border-[#1565C0]/20 active:scale-[0.97] transition-all"
                            style={{ fontSize: "0.75rem", fontWeight: 500 }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Member ID */}
                    <div>
                      <label className="text-muted-foreground block mb-1.5 px-1" style={{ fontSize: "0.75rem" }}>
                        Member ID <span className="text-[#B0B3BE]">(optional)</span>
                      </label>
                      <input
                        placeholder="Cooperative member ID"
                        className="w-full px-4 py-3.5 bg-white border border-[rgba(17,24,39,0.06)] rounded-xl outline-none text-[#111827] placeholder:text-[#D1D5DB] focus:border-[#1565C0]/20 transition-colors"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="p-3.5 bg-[#1565C0]/[0.03] rounded-xl">
                      <p className="text-muted-foreground text-center" style={{ fontSize: "0.72rem", lineHeight: 1.5 }}>
                        🔒 We'll verify your account with {selectedCoop.name} using a secure encrypted connection. This
                        usually takes a few seconds.
                      </p>
                    </div>

                    {/* Link Button */}
                    <button
                      onClick={handleLinkBank}
                      disabled={!linkAccount}
                      className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
                      style={{
                        backgroundColor: linkAccount ? "#1565C0" : "rgba(17,24,39,0.08)",
                        boxShadow: linkAccount ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
                        color: linkAccount ? "#fff" : "#B0B3BE",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        boxShadow: linkAccount ? "0 4px 14px rgba(10,10,111,0.25)" : "none",
                      }}
                    >
                      <Link2 className="w-4 h-4" strokeWidth={1.5} />
                      Link Account
                    </button>
                  </motion.div>
                )}

                {/* VERIFYING STEP */}
                {linkStep === "verifying" && (
                  <motion.div
                    key="verifying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-14 h-14 rounded-full border-2 border-[rgba(17,24,39,0.08)] border-t-[#1565C0] mb-5"
                    />
                    <p className="text-[#111827] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                      Verifying Account
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      Securely connecting to {selectedCoop?.name}...
                    </p>
                  </motion.div>
                )}

                {/* DONE STEP */}
                {linkStep === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      className="w-20 h-20 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 15 }}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#5cbf6a] flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#111827] text-center mb-2"
                      style={{ fontSize: "1.15rem", fontWeight: 600 }}
                    >
                      Account Linked!
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-muted-foreground text-center max-w-[240px] mb-8"
                      style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
                    >
                      {selectedCoop?.name} has been successfully linked to your Koopli account.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={resetLink}
                      className="px-8 py-4 rounded-2xl text-white active:scale-[0.98] transition-transform"
                      style={{
                        backgroundColor: "#1565C0",
                      boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        boxShadow: "0 4px 14px rgba(10,10,111,0.25)",
                      }}
                    >
                      View Linked Accounts
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        )}

        {/* ==================== EDIT PROFILE VIEW ==================== */}
        {view === "edit-profile" && (
          <motion.div
            key="edit-profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="px-6 pt-6 pb-4 flex items-center gap-3">
              <button
                onClick={() => setView("main")}
                className="w-9 h-9 rounded-xl bg-white border border-[rgba(17,24,39,0.06)] flex items-center justify-center active:scale-[0.95] transition-transform"
              >
                <X className="w-4 h-4 text-[#111827]" strokeWidth={1.5} />
              </button>
              <p className="text-[#111827] flex-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                Edit Profile
              </p>
              <button
                onClick={() => setView("main")}
                className="text-[#1565C0] active:scale-[0.97] transition-transform"
                style={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                Save
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-4"
              >
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#2d2d9e] flex items-center justify-center">
                    <span className="text-white" style={{ fontSize: "1.5rem", fontWeight: 600 }}>JD</span>
                  </div>
                  <button
                    className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#FAF9F7]"
                    style={{ backgroundColor: "#1565C0", boxShadow: "0 4px 12px rgba(21,101,192,0.25)" }}
                  >
                    <Camera className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                  </button>
                </div>
                <p className="text-[#1565C0]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                  Change Photo
                </p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {[
                  { icon: User, label: "Full Name", value: userData?.fullName || "Juan Dela Cruz", placeholder: "Your full name" },
                  { icon: Mail, label: "Email", value: userData?.email || "juan.delacruz@email.com", placeholder: "Email address" },
                  { icon: Smartphone, label: "Phone", value: "+63 917 123 4567", placeholder: "Phone number" },
                  { icon: MapPin, label: "Address", value: userData?.address || "", placeholder: "City, Country" },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.label}>
                      <label className="text-muted-foreground block mb-1.5 px-1" style={{ fontSize: "0.75rem" }}>
                        {field.label}
                      </label>
                      <div className="flex items-center gap-3 px-4 py-3.5 bg-white border border-[rgba(17,24,39,0.06)] rounded-xl focus-within:border-[#1565C0]/20 transition-colors">
                        <Icon className="w-4 h-4 text-[#B0B3BE] shrink-0" strokeWidth={1.5} />
                        <input
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                          className="flex-1 bg-transparent outline-none text-[#111827] placeholder:text-[#D1D5DB]"
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Danger zone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <p className="text-red-400 mb-2.5 px-1" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                  Danger Zone
                </p>
                <button className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-red-100 text-left hover:bg-red-50/30 active:scale-[0.99] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-red-500" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                      Delete Account
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                      Permanently remove all data
                    </p>
                  </div>
                </button>
              </motion.div>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}