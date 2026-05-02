import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ScanLine,
  UserPlus,
  Pencil,
  Trash2,
  Check,
  X,
  Users,
  Mail,
  Phone,
  QrCode,
  Download,
  Share2,
  Copy,
} from "lucide-react";
import type { GoalMember } from "./GoalsScreen";

interface Props {
  onBack: () => void;
  members: GoalMember[];
  onAddMember: (member: GoalMember) => void;
  onUpdateMember: (member: GoalMember) => void;
  onRemoveMember: (memberId: string) => void;
}

export function AddMembersScreen({ onBack, members, onAddMember, onUpdateMember, onRemoveMember }: Props) {
  const [activeView, setActiveView] = useState<"list" | "scan" | "manual" | "qr-generate">("list");
  const [editingMember, setEditingMember] = useState<GoalMember | null>(null);
  const [scanning, setScanning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form state for manual entry
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");

  // QR Code data
  const groupCode = "PLWGN-" + Math.random().toString(36).substr(2, 6).toUpperCase();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleScan = () => {
    setScanning(true);
    // Simulate QR code scan
    setTimeout(() => {
      setScanning(false);
      // Mock scanned data
      const newMember: GoalMember = {
        id: `m${Date.now()}`,
        name: "Scanned User",
        monthlyContributions: {},
        payoutOrder: members.length,
        trustScore: 100,
        penaltyCount: 0,
        isPending: true,
        paymentHistory: [],
      };
      onAddMember(newMember);
      setActiveView("list");
    }, 2000);
  };

  const handleManualAdd = () => {
    if (!formName.trim()) return;

    const newMember: GoalMember = {
      id: `m${Date.now()}`,
      name: formName.trim(),
      monthlyContributions: {},
      payoutOrder: members.length,
      trustScore: 100,
      penaltyCount: 0,
      isPending: false,
      paymentHistory: [],
    };

    onAddMember(newMember);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setActiveView("list");
  };

  const handleUpdateMember = () => {
    if (!editingMember || !formName.trim()) return;

    onUpdateMember({
      ...editingMember,
      name: formName.trim(),
    });

    setEditingMember(null);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
  };

  const openEditMember = (member: GoalMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormEmail("");
    setFormPhone("");
  };

  return (
    <div className="h-full bg-[#FAF9F7] flex flex-col">
      {/* Header */}
      <div className="bg-[#FAF9F7] px-6 pt-6 pb-5 shrink-0 border-b border-[rgba(17,24,39,0.06)]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#111827] hover:text-[#1565C0] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Back</span>
        </motion.button>
        <div>
          <h1 className="text-[#111827] mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Manage Members
          </h1>
          <p className="text-[#45474c]" style={{ fontSize: "0.875rem" }}>
            Add or edit group members
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {/* Member List View */}
          {activeView === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="pt-6 space-y-6"
            >
              {/* Add Member Options */}
              <div className="grid grid-cols-2 gap-4">
                {/* Primary Button: Generate QR Code */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView("qr-generate")}
                  className="bg-gradient-to-br from-[#1565C0] to-[#0d47a1] text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-shadow"
                  style={{
                    boxShadow: "0px 4px 12px rgba(21, 101, 192, 0.25)",
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <QrCode className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Generate QR Code</span>
                </motion.button>

                {/* Tertiary Button: Add Manually */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView("manual")}
                  className="bg-white border border-[rgba(17,24,39,0.08)] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#1565C0]/30 transition-all"
                  style={{
                    boxShadow: "0px 4px 12px rgba(20, 27, 44, 0.08)",
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1565C0]/10 flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-[#1565C0]" strokeWidth={2} />
                  </div>
                  <span className="text-[#111827]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>Add Manually</span>
                </motion.button>
              </div>

              {/* Current Members */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    Current Members
                  </h2>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1565C0]/10">
                    <Users className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                    <span className="text-[#1565C0]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{members.length}</span>
                  </div>
                </div>

                {members.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 border border-[rgba(17,24,39,0.06)] text-center"
                    style={{
                      boxShadow: "0px 4px 12px rgba(20, 27, 44, 0.04)",
                    }}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#9CA3AF]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[#111827] mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      No members yet
                    </p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.875rem" }}>
                      Add members using QR code or manually
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {members.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl p-4 border border-[rgba(17,24,39,0.06)] hover:border-[#1565C0]/20 transition-all"
                        style={{
                          boxShadow: "0px 4px 12px rgba(20, 27, 44, 0.04)",
                        }}
                      >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1565C0] to-[#0d47a1] flex items-center justify-center text-white" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                          {member.name}
                        </p>
                        <p className="text-[#45474c]" style={{ fontSize: "0.8rem" }}>
                          Trust Score: {member.trustScore || 100}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openEditMember(member)}
                        className="w-9 h-9 rounded-full bg-[#1565C0]/10 flex items-center justify-center"
                      >
                        <Pencil className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveMember(member.id)}
                        className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" strokeWidth={2} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* QR Generate View */}
          {activeView === "qr-generate" && (
            <motion.div
              key="qr-generate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center pt-12 pb-20 px-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative w-72 h-72 mb-8 bg-white rounded-3xl p-6 border-4 border-[#1565C0]"
                style={{
                  boxShadow: "0 8px 32px rgba(21, 101, 192, 0.25)",
                }}
              >
                {/* QR Code Placeholder - Using a grid pattern to simulate QR */}
                <div className="w-full h-full bg-white rounded-2xl p-4 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 w-full h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${Math.random() > 0.5 ? "bg-[#111827]" : "bg-white"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#1565C0] rounded-tl-2xl" />
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#1565C0] rounded-tr-2xl" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#1565C0] rounded-bl-2xl" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#1565C0] rounded-br-2xl" />
              </motion.div>

              <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                Share Group Code
              </h3>
              <p className="text-[#45474c] mb-6 text-center px-8" style={{ fontSize: "0.9rem" }}>
                Members can scan this QR code or use the code below to join
              </p>

              {/* Group Code */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyCode}
                className="bg-[#F3F4F6] rounded-2xl px-6 py-4 mb-8 flex items-center gap-3 cursor-pointer hover:bg-[#E5E7EB] transition-colors"
              >
                <code className="text-[#1565C0] tracking-wider" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {groupCode}
                </code>
                <motion.div
                  animate={{ scale: copiedCode ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {copiedCode ? (
                    <Check className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
                  ) : (
                    <Copy className="w-5 h-5 text-[#45474c]" strokeWidth={2} />
                  )}
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-3 max-w-sm">
                {/* Primary: Share */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: "Join Paluwagan Group",
                        text: `Join our Paluwagan group with code: ${groupCode}`,
                      });
                    }
                  }}
                  className="w-full px-6 py-4 rounded-2xl text-white flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#1565C0", fontSize: "0.95rem", fontWeight: 600, boxShadow: "0 4px 12px rgba(21,101,192,0.25)" }}
                >
                  <Share2 className="w-5 h-5" strokeWidth={2} />
                  Share Code
                </motion.button>

                {/* Secondary: Download QR */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Download QR code functionality
                    alert("QR Code downloaded!");
                  }}
                  className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#45A049] text-white shadow-lg flex items-center justify-center gap-2"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  <Download className="w-5 h-5" strokeWidth={2} />
                  Download QR Code
                </motion.button>

                {/* Tertiary: Back */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView("list")}
                  className="w-full px-6 py-4 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Back to Members
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QR Scan View */}
          {activeView === "scan" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center pt-12 pb-20"
            >
              <div className="relative w-64 h-64 mb-8">
                <div className="absolute inset-0 border-4 border-[#1565C0] rounded-3xl">
                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#1565C0] rounded-tl-3xl" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#1565C0] rounded-tr-3xl" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#1565C0] rounded-bl-3xl" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#1565C0] rounded-br-3xl" />
                </div>

                {scanning && (
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-[#1565C0] opacity-50"
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                  <ScanLine className="w-24 h-24 text-[#1565C0] opacity-30" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                {scanning ? "Scanning..." : "Position QR Code"}
              </h3>
              <p className="text-[#45474c] mb-8 text-center px-8" style={{ fontSize: "0.9rem" }}>
                {scanning ? "Reading member information" : "Align the QR code within the frame"}
              </p>

              <div className="flex gap-3">
                {!scanning && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveView("list")}
                      className="px-6 py-3 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-colors"
                      style={{ fontSize: "0.9rem", fontWeight: 600 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleScan}
                      className="px-6 py-3 rounded-2xl text-white shadow-lg"
                      style={{ backgroundColor: "#1565C0", fontSize: "0.9rem", fontWeight: 600, boxShadow: "0 4px 12px rgba(21,101,192,0.25)" }}
                    >
                      Start Scanning
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Manual Add/Edit View */}
          {(activeView === "manual" || editingMember) && (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-6 space-y-6"
            >
              <div>
                <h2 className="text-[#111827] mb-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {editingMember ? "Edit Member" : "Add Member Manually"}
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.875rem" }}>
                  {editingMember ? "Update member information" : "Fill in the member details below"}
                </p>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] placeholder:text-[#9CA3AF]"
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" strokeWidth={2} />
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="juan@email.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] placeholder:text-[#9CA3AF]"
                    style={{ fontSize: "0.95rem" }}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-[#45474c] mb-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" strokeWidth={2} />
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+63 912 345 6789"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] placeholder:text-[#9CA3AF]"
                    style={{ fontSize: "0.95rem" }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveView("list");
                    setEditingMember(null);
                    setFormName("");
                    setFormEmail("");
                    setFormPhone("");
                  }}
                  className="flex-1 px-6 py-4 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827]"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={editingMember ? handleUpdateMember : handleManualAdd}
                  disabled={!formName.trim()}
                  className="flex-1 px-6 py-4 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1565C0", fontSize: "0.95rem", fontWeight: 600, boxShadow: "0 4px 12px rgba(21,101,192,0.25)" }}
                >
                  {editingMember ? "Update Member" : "Add Member"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
