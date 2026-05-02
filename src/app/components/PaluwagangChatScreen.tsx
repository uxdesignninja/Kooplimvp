import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, Image as ImageIcon, Smile, ThumbsUp, Heart, CheckCheck, Sparkles } from "lucide-react";
import type { Goal } from "./GoalsScreen";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: "text" | "image" | "system" | "achievement";
  imageUrl?: string;
  isAdmin?: boolean;
  reactions?: { emoji: string; count: number; users: string[] }[];
  status?: "sent" | "delivered" | "read";
  achievementType?: "payment" | "streak" | "milestone";
}

interface Props {
  goal: Goal;
  onBack: () => void;
  currentUserId: string;
}

export function PaluwagangChatScreen({ goal, onBack, currentUserId }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: "system",
      senderName: "System",
      message: "Chat started. You can now communicate with the group admin.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      type: "system",
    },
    {
      id: "2",
      senderId: goal.adminId || "",
      senderName: "Juan Cruz",
      message: "Welcome to Team Paluwagan! Feel free to reach out if you need any help.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: "text",
      isAdmin: true,
      status: "read",
      reactions: [
        { emoji: "👍", count: 2, users: ["user1", "user2"] },
      ],
    },
    {
      id: "3",
      senderId: "system",
      senderName: "System",
      message: "Maria Santos completed their payment! 🎉",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: "achievement",
      achievementType: "payment",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [selectedMessageForReaction, setSelectedMessageForReaction] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAdmin = currentUserId === goal.adminId;
  const currentMember = goal.members?.find((m) => m.id === currentUserId);

  const quickReplies = isAdmin
    ? ["Payment received ✓", "Reminder: Payment due soon", "Thank you!", "Let me check"]
    : ["Payment sent!", "When is next payout?", "Thank you!", "Noted"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (customMessage?: string) => {
    const messageText = customMessage || inputMessage.trim();
    if (!messageText) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentMember?.name || "You",
      message: messageText,
      timestamp: new Date().toISOString(),
      type: "text",
      isAdmin: isAdmin,
      status: "sent",
      reactions: [],
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setShowQuickReplies(false);

    // Simulate status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: "delivered" as const } : m))
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: "read" as const } : m))
      );
    }, 2000);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === emoji);
          if (existingReaction) {
            const hasReacted = existingReaction.users.includes(currentUserId);
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: hasReacted ? r.count - 1 : r.count + 1,
                      users: hasReacted
                        ? r.users.filter((u) => u !== currentUserId)
                        : [...r.users, currentUserId],
                    }
                  : r
              ).filter((r) => r.count > 0),
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...(msg.reactions || []),
                { emoji, count: 1, users: [currentUserId] },
              ],
            };
          }
        }
        return msg;
      })
    );
    setSelectedMessageForReaction(null);
  };

  const handleUploadProof = () => {
    setIsUploading(true);
    // Simulate image upload
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: currentMember?.name || "You",
        message: "Payment proof uploaded",
        timestamp: new Date().toISOString(),
        type: "image",
        imageUrl: "https://via.placeholder.com/400x300/1565C0/ffffff?text=Payment+Receipt",
        isAdmin: isAdmin,
        status: "sent",
        reactions: [],
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsUploading(false);

      // Add celebration message
      setTimeout(() => {
        const celebrationMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: "system",
          senderName: "System",
          message: `${currentMember?.name || "You"} uploaded payment proof! 🎉`,
          timestamp: new Date().toISOString(),
          type: "achievement",
          achievementType: "payment",
        };
        setMessages((prev) => [...prev, celebrationMessage]);
      }, 500);
    }, 1500);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#111827] mb-1" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Group Chat
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-[#45474c]" style={{ fontSize: "0.875rem" }}>
                {goal.name} · {goal.members?.length || 0} members
              </p>
              {typingUsers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <div className="flex gap-0.5">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1 h-1 rounded-full bg-[#1565C0]"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-1 h-1 rounded-full bg-[#1565C0]"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-1 h-1 rounded-full bg-[#1565C0]"
                    />
                  </div>
                  <span className="text-[#1565C0]" style={{ fontSize: "0.75rem" }}>
                    typing...
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => {
          const isOwnMessage = msg.senderId === currentUserId;
          const isSystemMessage = msg.type === "system";
          const isAchievement = msg.type === "achievement";

          if (isSystemMessage) {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-[rgba(17,24,39,0.05)] rounded-full px-4 py-2">
                  <p className="text-[#45474c] text-center" style={{ fontSize: "0.8rem" }}>
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          }

          if (isAchievement) {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex justify-center"
              >
                <div className="bg-gradient-to-r from-[#4CAF50]/10 to-[#45A049]/10 border border-[#4CAF50]/20 rounded-2xl px-5 py-3 max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#4CAF50]" strokeWidth={2} />
                    <p className="text-[#4CAF50]" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                      ACHIEVEMENT
                    </p>
                  </div>
                  <p className="text-[#111827] text-center" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {msg.message}
                  </p>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] ${isOwnMessage ? "items-end" : "items-start"} flex flex-col group`}>
                {!isOwnMessage && (
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <p className="text-[#45474c]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      {msg.senderName}
                    </p>
                    {msg.isAdmin && (
                      <span className="bg-[#1565C0] text-white rounded-full px-2 py-0.5" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                        Admin
                      </span>
                    )}
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={() => setSelectedMessageForReaction(msg.id)}
                  className={`rounded-2xl px-4 py-3 relative ${
                    isOwnMessage
                      ? "bg-gradient-to-br from-[#1565C0] to-[#0d47a1] text-white"
                      : "bg-white border border-[rgba(17,24,39,0.08)] text-[#111827]"
                  }`}
                  style={{
                    boxShadow: isOwnMessage
                      ? "0 2px 8px rgba(21,101,192,0.15)"
                      : "0 2px 8px rgba(20,27,44,0.04)",
                  }}
                >
                  {msg.type === "image" && msg.imageUrl && (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={msg.imageUrl}
                      alt="Payment proof"
                      className="rounded-xl mb-2 w-full"
                    />
                  )}
                  <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>{msg.message}</p>

                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-1 mt-2 flex-wrap"
                    >
                      {msg.reactions.map((reaction, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReaction(msg.id, reaction.emoji)}
                          className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                            reaction.users.includes(currentUserId)
                              ? "bg-[#1565C0]/20 border border-[#1565C0]/30"
                              : "bg-white/10 border border-white/20"
                          }`}
                        >
                          <span>{reaction.emoji}</span>
                          <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                            {reaction.count}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                {/* Quick reaction buttons on hover */}
                <AnimatePresence>
                  {selectedMessageForReaction === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex gap-1 mt-1 bg-white rounded-full px-2 py-1.5 border border-[rgba(17,24,39,0.08)] shadow-lg"
                    >
                      {["👍", "❤️", "🎉", "🔥", "👏"].map((emoji) => (
                        <motion.button
                          key={emoji}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReaction(msg.id, emoji)}
                          className="text-lg hover:bg-[#F3F4F6] rounded-full w-8 h-8 flex items-center justify-center"
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`flex items-center gap-1.5 mt-1.5 px-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                    {formatTime(msg.timestamp)}
                  </p>
                  {isOwnMessage && msg.status && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {msg.status === "read" ? (
                        <CheckCheck className="w-3.5 h-3.5 text-[#4CAF50]" strokeWidth={2} />
                      ) : msg.status === "delivered" ? (
                        <CheckCheck className="w-3.5 h-3.5 text-[#9CA3AF]" strokeWidth={2} />
                      ) : (
                        <CheckCheck className="w-3.5 h-3.5 text-[#9CA3AF]" strokeWidth={2} />
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-white border-t border-[rgba(17,24,39,0.06)] px-6 py-4">
        {/* Quick Replies */}
        <AnimatePresence>
          {showQuickReplies && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar"
            >
              {quickReplies.map((reply, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(reply)}
                  className="px-3 py-1.5 rounded-full bg-[#1565C0]/10 text-[#1565C0] border border-[#1565C0]/20 hover:bg-[#1565C0]/20 transition-colors whitespace-nowrap shrink-0"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  {reply}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadProof}
            disabled={isUploading}
            className="w-11 h-11 rounded-full bg-[#1565C0]/10 flex items-center justify-center shrink-0 disabled:opacity-50 hover:bg-[#1565C0]/20 transition-colors"
          >
            {isUploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ImageIcon className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
              </motion.div>
            ) : (
              <ImageIcon className="w-5 h-5 text-[#1565C0]" strokeWidth={2} />
            )}
          </motion.button>

          <div className="flex-1 flex items-center gap-2 bg-[#F3F4F6] rounded-full px-5 py-3 border border-[rgba(17,24,39,0.04)]">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onFocus={() => setShowQuickReplies(false)}
              placeholder={isAdmin ? "Send a message to members..." : "Message admin..."}
              className="flex-1 bg-transparent text-[#111827] placeholder:text-[#9CA3AF] outline-none"
              style={{ fontSize: "0.95rem" }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuickReplies(!showQuickReplies)}
            >
              <Smile className="w-5 h-5 text-[#9CA3AF] hover:text-[#1565C0] transition-colors" strokeWidth={2} />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{
              backgroundColor: inputMessage.trim()
                ? "#1565C0"
                : "rgba(17,24,39,0.08)",
              boxShadow: inputMessage.trim() ? "0 2px 8px rgba(21,101,192,0.25)" : "none",
            }}
          >
            <Send className="w-5 h-5 text-white" strokeWidth={2} />
          </motion.button>
        </div>

        {/* Helper text */}
        <p className="text-[#9CA3AF] mt-3 text-center" style={{ fontSize: "0.75rem" }}>
          {isAdmin ? "You can broadcast messages to all members" : "Chat privately with the admin"}
        </p>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
