import { motion } from "motion/react";
import { CheckCircle2, Clock, XCircle, Eye, Download } from "lucide-react";

interface PaymentRecord {
  month: number;
  amount: number;
  date: string;
  status: "approved" | "pending" | "rejected";
  referenceNumber?: string;
  proofImageUrl?: string;
  rejectionReason?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  submittedAt?: string;
}

interface Props {
  paymentHistory: PaymentRecord[];
  monthNames: string[];
  monthlyTarget: number;
  onViewProof?: (proofUrl: string) => void;
  limit?: number; // How many items to show initially (undefined = show all)
}

export function PaymentHistoryEnhanced({
  paymentHistory,
  monthNames,
  monthlyTarget,
  onViewProof,
  limit,
}: Props) {
  const sortedHistory = [...paymentHistory].sort((a, b) => b.month - a.month);
  const displayHistory = limit ? sortedHistory.slice(0, limit) : sortedHistory;
  const isLimitedView = limit !== undefined;

  const getStatusBadge = (status: PaymentRecord["status"]) => {
    switch (status) {
      case "approved":
        return null; // Don't show badge for approved (amount is green already)
      case "pending":
        return (
          <div className="px-2 py-0.5 rounded-full bg-[#FFA726]/10 text-[#FFA726] flex items-center gap-1 mt-1" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
            <Clock className="w-2.5 h-2.5" strokeWidth={2} />
            PENDING
          </div>
        );
      case "rejected":
        return (
          <div className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 flex items-center gap-1 mt-1" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
            <XCircle className="w-2.5 h-2.5" strokeWidth={2} />
            REJECTED
          </div>
        );
    }
  };

  const getStatusIcon = (status: PaymentRecord["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />;
      case "pending":
        return <Clock className="w-5 h-5 text-[#FFA726]" strokeWidth={2} />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" strokeWidth={2} />;
    }
  };

  const getStatusBg = (status: PaymentRecord["status"]) => {
    switch (status) {
      case "approved":
        return "bg-[#4CAF50]/10";
      case "pending":
        return "bg-[#FFA726]/10";
      case "rejected":
        return "bg-red-500/10";
    }
  };

  return (
    <div className="space-y-2">
      {sortedHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(17,24,39,0.04)] flex items-center justify-center mb-3">
            <Clock className="w-7 h-7 text-[#B0B3BE]" strokeWidth={1.5} />
          </div>
          <p className="text-[#111827] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
            No Payment History
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            Your payment submissions will appear here
          </p>
        </div>
      ) : (
        <>
          {displayHistory.map((record, idx) => (
          <motion.div
            key={record.month}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-xl hover:bg-[rgba(17,24,39,0.02)] transition-colors cursor-pointer"
            onClick={() => {
              if (record.proofImageUrl && onViewProof) {
                onViewProof(record.proofImageUrl);
              }
            }}
          >
            {/* Status Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getStatusBg(record.status)}`}>
              {getStatusIcon(record.status)}
            </div>

            {/* Payment Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[#111827] mb-0.5" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {monthNames[record.month]} 2026
              </p>
              {record.status === "rejected" && record.rejectionReason ? (
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>
                  Rejected • <span className="text-red-500">{record.rejectionReason}</span>
                </p>
              ) : (
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                  {record.status === "approved" && record.verifiedBy && `Verified by ${record.verifiedBy}`}
                  {record.status === "pending" && record.submittedAt && record.submittedAt}
                  {record.status === "pending" && !record.submittedAt && "Awaiting verification"}
                </p>
              )}
            </div>

            {/* Amount & Status */}
            <div className="text-right shrink-0">
              <p
                className={record.status === "approved" ? "text-[#4CAF50]" : "text-[#111827]"}
                style={{ fontSize: "0.9rem", fontWeight: 700 }}
              >
                ₱{record.amount.toLocaleString()}
              </p>
              {getStatusBadge(record.status)}
            </div>
          </motion.div>
        ))}
        </>
      )}

      {/* Download History Option - Only show in full view */}
      {sortedHistory.length > 0 && !isLimitedView && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-white border border-[rgba(17,24,39,0.1)] text-[#111827] hover:bg-[#FAF9F7] transition-colors flex items-center justify-center gap-2 mt-4"
          style={{ fontSize: "0.9rem", fontWeight: 600 }}
        >
          <Download className="w-4 h-4" strokeWidth={2} />
          Download Payment History
        </motion.button>
      )}
    </div>
  );
}
