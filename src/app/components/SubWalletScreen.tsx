import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Plus,
  Plane,
  Home as HomeIcon,
  Briefcase,
  Landmark,
  ShoppingCart,
  Car,
  GraduationCap,
  Heart,
  Check,
  Trash2,
  Edit3,
  UserPlus,
  X,
  ChevronRight,
} from "lucide-react";
import { BottomNav, type TabId } from "./BottomNav";

export interface SubWallet {
  id: string;
  name: string;
  icon: string;
  balance: number;
  autoInvest: boolean;
  users?: { id: string; name: string; email: string; avatar?: string }[];
}

interface SubWalletScreenProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onBack: () => void;
}

const iconOptions = [
  { id: "search", Icon: Plus, label: "Custom" },
  { id: "home", Icon: HomeIcon, label: "Home" },
  { id: "briefcase", Icon: Briefcase, label: "Work" },
  { id: "landmark", Icon: Landmark, label: "Savings" },
  { id: "plane", Icon: Plane, label: "Travel" },
  { id: "shopping", Icon: ShoppingCart, label: "Shopping" },
  { id: "car", Icon: Car, label: "Auto" },
  { id: "education", Icon: GraduationCap, label: "Education" },
  { id: "heart", Icon: Heart, label: "Heart" },
];

export function SubWalletScreen({
  activeTab,
  onTabChange,
  onBack,
}: SubWalletScreenProps) {
  const [subWallets, setSubWallets] = useState<SubWallet[]>([
    {
      id: "1",
      name: "Family monthly allowance",
      icon: "heart",
      balance: 8200.0,
      autoInvest: true,
      users: [
        {
          id: "u1",
          name: "Sarah Chen",
          email: "sarah@email.com",
          avatar: "SC",
        },
        {
          id: "u2",
          name: "Mike Ross",
          email: "mike@email.com",
          avatar: "MR",
        },
      ],
    },
    {
      id: "2",
      name: "House renovation",
      icon: "home",
      balance: 15000.0,
      autoInvest: false,
      users: [],
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<SubWallet | null>(null);
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null);

  // Form state
  const [walletName, setWalletName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("home");
  const [autoInvest, setAutoInvest] = useState(false);
  const [walletAmount, setWalletAmount] = useState("");

  // User form state
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getIcon = (iconId: string) => {
    const icon = iconOptions.find((i) => i.id === iconId);
    return icon?.Icon || HomeIcon;
  };

  const handleCreateWallet = () => {
    if (!walletName.trim()) return;

    const newWallet: SubWallet = {
      id: crypto.randomUUID(),
      name: walletName,
      icon: selectedIcon,
      balance: parseFloat(walletAmount) || 0,
      autoInvest,
      users: [],
    };

    setSubWallets((prev) => [...prev, newWallet]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditWallet = () => {
    if (!walletName.trim() || !selectedWallet) return;

    setSubWallets((prev) =>
      prev.map((w) =>
        w.id === selectedWallet.id
          ? { ...w, name: walletName, icon: selectedIcon, autoInvest, balance: parseFloat(walletAmount) || w.balance }
          : w
      )
    );
    setShowEditModal(false);
    setSelectedWallet(null);
    resetForm();
  };

  const handleDeleteWallet = () => {
    if (!selectedWallet) return;
    setSubWallets((prev) => prev.filter((w) => w.id !== selectedWallet.id));
    setShowDeleteModal(false);
    setSelectedWallet(null);
    setExpandedWallet(null);
  };

  const handleAddUser = () => {
    if (!userName.trim() || !userEmail.trim() || !selectedWallet) return;

    const newUser = {
      id: crypto.randomUUID(),
      name: userName,
      email: userEmail,
      avatar: userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };

    setSubWallets((prev) =>
      prev.map((w) =>
        w.id === selectedWallet.id
          ? { ...w, users: [...(w.users || []), newUser] }
          : w
      )
    );

    setShowAddUserModal(false);
    setUserName("");
    setUserEmail("");
  };

  const resetForm = () => {
    setWalletName("");
    setSelectedIcon("home");
    setAutoInvest(false);
    setWalletAmount("");
  };

  const openEditModal = (wallet: SubWallet) => {
    setSelectedWallet(wallet);
    setWalletName(wallet.name);
    setSelectedIcon(wallet.icon);
    setAutoInvest(wallet.autoInvest);
    setWalletAmount(wallet.balance.toString());
    setShowEditModal(true);
  };

  const openDeleteModal = (wallet: SubWallet) => {
    setSelectedWallet(wallet);
    setShowDeleteModal(true);
  };

  const openAddUserModal = (wallet: SubWallet) => {
    setSelectedWallet(wallet);
    setShowAddUserModal(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4 shrink-0"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#111827] hover:text-[#1565C0] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
          </button>
          <button
            onClick={() => { resetForm(); setShowCreateModal(true); }}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-[0.95]"
            style={{ backgroundColor: "#1565C0", boxShadow: "0 4px 14px rgba(10,10,111,0.25)" }}
            aria-label="Create Sub Wallet"
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>
        <div>
          <h1 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Sub Wallets
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            {subWallets.length === 0
              ? "Organize & manage your funds"
              : `${subWallets.length} wallet${subWallets.length !== 1 ? "s" : ""} created`}
          </p>
        </div>
      </div>

      {/* Sub Wallets List */}
      <div
        className="flex-1 overflow-y-auto px-6 pb-24 space-y-4"
        style={{ paddingBottom: "max(6rem, calc(6rem + env(safe-area-inset-bottom)))" }}
      >
        {subWallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 px-8 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[rgba(10,10,111,0.06)] flex items-center justify-center mb-5">
              <WalletCards className="w-9 h-9 text-[#1565C0]/40" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
              No Sub Wallets Yet
            </h3>
            <p className="text-muted-foreground max-w-[240px] mb-6" style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
              Create your first sub wallet to organize and manage your funds separately.
            </p>
            <button
              onClick={() => { resetForm(); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white transition-all active:scale-[0.98]"
              style={{ backgroundColor: "#1565C0", fontSize: "0.9rem", fontWeight: 600, boxShadow: "0 6px 20px rgba(10,10,111,0.22)" }}
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Create Sub Wallet
            </button>
          </div>
        ) : (
          subWallets.map((wallet) => {
            const Icon = getIcon(wallet.icon);
            const isExpanded = expandedWallet === wallet.id;

            return (
              <motion.div
                key={wallet.id}
                layout
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)",
                  border: "1px solid rgba(198, 198, 205, 0.15)",
                }}
              >
                <button
                  onClick={() =>
                    setExpandedWallet(isExpanded ? null : wallet.id)
                  }
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-[rgba(17,24,39,0.01)] transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-[rgba(149,247,185,0.2)] flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-[#319560]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#111827] truncate" style={{ fontSize: "1.0625rem", fontWeight: 700 }}>
                      {wallet.name}
                    </h3>
                    <p className="text-[#45474c]" style={{ fontSize: "0.875rem" }}>
                      ₱{wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-5 h-5 text-[#C6C6CD] transition-transform"
                    strokeWidth={2}
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-[rgba(198,198,205,0.15)] overflow-hidden"
                    >
                      <div className="p-5 space-y-4">
                        {/* Auto-invest status */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f3f3f4]">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[rgba(149,247,185,0.2)] flex items-center justify-center">
                              <Heart className="w-4 h-4 text-[#319560]" strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-[#111827]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                                Auto-Invest
                              </p>
                              <p className="text-[#45474c]" style={{ fontSize: "0.75rem" }}>
                                {wallet.autoInvest ? "Enabled" : "Disabled"}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-11 h-6 rounded-full transition-colors ${
                              wallet.autoInvest ? "bg-[#95f7b9]" : "bg-[#e2e2e3]"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                                wallet.autoInvest ? "translate-x-5" : "translate-x-0.5"
                              }`}
                              style={{ marginTop: "2px" }}
                            />
                          </div>
                        </div>

                        {/* Users list */}
                        {wallet.users && wallet.users.length > 0 && (
                          <div>
                            <p className="text-[#45474c] mb-2" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Shared with
                            </p>
                            <div className="space-y-2">
                              {wallet.users.map((user) => (
                                <div
                                  key={user.id}
                                  className="flex items-center gap-3 p-2.5 rounded-lg bg-[#f3f3f4]"
                                >
                                  <div className="w-9 h-9 rounded-full bg-[#1565C0] flex items-center justify-center text-white shrink-0" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                                    {user.avatar}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[#111827] truncate" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                                      {user.name}
                                    </p>
                                    <p className="text-[#45474c] truncate" style={{ fontSize: "0.75rem" }}>
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          <button
                            onClick={() => openAddUserModal(wallet)}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(10,10,111,0.04)] hover:bg-[rgba(10,10,111,0.08)] transition-colors active:scale-95"
                          >
                            <UserPlus className="w-5 h-5 text-[#1565C0]" strokeWidth={1.5} />
                            <span className="text-[#1565C0]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              Add User
                            </span>
                          </button>
                          <button
                            onClick={() => openEditModal(wallet)}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(59,165,73,0.08)] hover:bg-[rgba(59,165,73,0.12)] transition-colors active:scale-95"
                          >
                            <Edit3 className="w-5 h-5 text-[#4CAF50]" strokeWidth={1.5} />
                            <span className="text-[#4CAF50]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              Edit
                            </span>
                          </button>
                          <button
                            onClick={() => openDeleteModal(wallet)}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(239,68,68,0.08)] hover:bg-[rgba(239,68,68,0.12)] transition-colors active:scale-95"
                          >
                            <Trash2 className="w-5 h-5 text-[#ef4444]" strokeWidth={1.5} />
                            <span className="text-[#ef4444]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              Delete
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(showCreateModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center"
            onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
              setSelectedWallet(null);
              resetForm();
            }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal header */}
              <div className="px-6 pt-5 pb-4 border-b border-[rgba(198,198,205,0.15)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    {showEditModal ? "Edit Sub Wallet" : "Create Sub Wallet"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      setSelectedWallet(null);
                      resetForm();
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Modal content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Wallet name input */}
                <div>
                  <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Wallet Name
                  </label>
                  <input
                    type="text"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    placeholder="e.g. Travel fund, Rent, Q4 Tax Reserve"
                    className="w-full px-5 py-4 rounded-xl bg-[#e2e2e3] text-[#111827] placeholder:text-[#76777d] border-none focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                    style={{ fontSize: "1.0625rem", fontWeight: 500 }}
                  />
                </div>

                {/* Amount input */}
                <div>
                  <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {showEditModal ? "Current Balance" : "Initial Balance"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#111827]" style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                      ₱
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={walletAmount}
                      onChange={(e) => setWalletAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-5 py-4 pl-10 rounded-xl bg-[#e2e2e3] text-[#111827] placeholder:text-[#76777d] border-none focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                      style={{ fontSize: "1.0625rem", fontWeight: 500 }}
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Icon selection */}
                <div>
                  <label className="block text-[#45474c] mb-3" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Visual Anchor
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {iconOptions.map(({ id, Icon: IconComponent }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedIcon(id)}
                        className={`aspect-square rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                          selectedIcon === id
                            ? "bg-[#141b2c] shadow-[0px_0px_0px_2px_#f3f3f4,0px_0px_0px_4px_#141b2c]"
                            : "bg-white hover:bg-[#f3f3f4]"
                        }`}
                        style={{
                          boxShadow:
                            selectedIcon !== id
                              ? "0px 4px 20px 0px rgba(20, 27, 44, 0.04)"
                              : undefined,
                        }}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            selectedIcon === id ? "text-white" : "text-[#141b2c]"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-invest toggle */}
                <div className="bg-white rounded-xl p-5" style={{ boxShadow: "0px 4px 20px 0px rgba(20, 27, 44, 0.04)" }}>
                  <button
                    type="button"
                    onClick={() => setAutoInvest(!autoInvest)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-lg bg-[rgba(149,247,185,0.2)] flex items-center justify-center">
                        <Heart className="w-6 h-6 text-[#319560]" strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <p className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 700 }}>
                          Auto-Invest Liquidity
                        </p>
                        <p className="text-[#45474c]" style={{ fontSize: "0.875rem" }}>
                          Deploy idle capital automatically
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-14 h-8 rounded-full transition-colors ${
                        autoInvest ? "bg-[#95f7b9]" : "bg-[#e2e2e3]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                          autoInvest ? "translate-x-7" : "translate-x-1"
                        }`}
                        style={{ marginTop: "4px" }}
                      />
                    </div>
                  </button>
                </div>

                {/* Security info */}
                <div className="bg-[#141b2c] rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-5 h-5 mt-0.5">
                      <svg className="w-full h-full text-[#95f7b9]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#95f7b9] mb-1" style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Vault Security Protocol
                      </p>
                      <p className="text-[#7c8498]" style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>
                        All sub-wallets are protected by multi-signature governance and instant withdrawal liquidity paths.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal actions */}
              <div className="p-6 border-t border-[rgba(198,198,205,0.15)] space-y-3">
                <button
                  onClick={showEditModal ? handleEditWallet : handleCreateWallet}
                  disabled={!walletName.trim()}
                  className="w-full py-4 rounded-xl bg-[#141b2c] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a2138] active:scale-[0.98] transition-all"
                  style={{ fontSize: "1.0625rem", fontWeight: 700, boxShadow: "0px 20px 25px -5px rgba(20, 27, 44, 0.2)" }}
                >
                  {showEditModal ? "Save Changes" : "Create Sub Wallet"}
                </button>
                <p className="text-center text-[rgba(69,71,76,0.6)]" style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Authorized Transaction • Precision Vault v4.2
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedWallet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedWallet(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-[rgba(239,68,68,0.1)] flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-[#ef4444]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[#111827] text-center mb-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Delete Sub Wallet?
              </h3>
              <p className="text-[#45474c] text-center mb-6" style={{ fontSize: "0.9375rem" }}>
                Are you sure you want to delete "{selectedWallet.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedWallet(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#f3f3f4] text-[#111827] hover:bg-[#e2e2e3] active:scale-95 transition-all"
                  style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteWallet}
                  className="flex-1 py-3 rounded-xl bg-[#ef4444] text-white hover:bg-[#dc2626] active:scale-95 transition-all"
                  style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddUserModal && selectedWallet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center"
            onClick={() => {
              setShowAddUserModal(false);
              setSelectedWallet(null);
              setUserName("");
              setUserEmail("");
            }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden"
            >
              {/* Modal header */}
              <div className="px-6 pt-5 pb-4 border-b border-[rgba(198,198,205,0.15)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    Add User
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddUserModal(false);
                      setSelectedWallet(null);
                      setUserName("");
                      setUserEmail("");
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </button>
                </div>
                <p className="text-[#45474c] mt-2" style={{ fontSize: "0.875rem" }}>
                  Share access to "{selectedWallet.name}"
                </p>
              </div>

              {/* Modal content */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter user's full name"
                    className="w-full px-5 py-4 rounded-xl bg-[#e2e2e3] text-[#111827] placeholder:text-[#76777d] border-none focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                    style={{ fontSize: "1.0625rem", fontWeight: 500 }}
                  />
                </div>

                <div>
                  <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="user@email.com"
                    className="w-full px-5 py-4 rounded-xl bg-[#e2e2e3] text-[#111827] placeholder:text-[#76777d] border-none focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                    style={{ fontSize: "1.0625rem", fontWeight: 500 }}
                  />
                </div>

                <div className="bg-[#f3f3f4] rounded-xl p-4">
                  <p className="text-[#45474c]" style={{ fontSize: "0.8125rem", lineHeight: "1.5" }}>
                    The user will receive an email invitation to access this sub wallet. They'll be able to view transactions and add funds.
                  </p>
                </div>
              </div>

              {/* Modal actions */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleAddUser}
                  disabled={!userName.trim() || !userEmail.trim()}
                  className="w-full py-4 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
                  style={{
                    backgroundColor: "#1565C0",
                    boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                    fontSize: "1.0625rem",
                    fontWeight: 600
                  }}
                >
                  Add User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WalletCards({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth || 2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}