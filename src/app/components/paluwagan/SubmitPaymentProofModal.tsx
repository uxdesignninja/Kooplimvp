import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Camera, Image as ImageIcon, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  monthlyTarget: number;
  monthName: string;
  onSubmit: (proofData: {
    image: File | null;
    referenceNumber: string;
    amount: number;
    date: string;
  }) => void;
}

export function SubmitPaymentProofModal({
  isOpen,
  onClose,
  monthlyTarget,
  monthName,
  onSubmit,
}: Props) {
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [amount, setAmount] = useState(monthlyTarget.toString());
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      image: proofImage,
      referenceNumber,
      amount: Number(amount),
      date: paymentDate,
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setProofImage(null);
      setImagePreview(null);
      setReferenceNumber("");
      setAmount(monthlyTarget.toString());
      setPaymentDate(new Date().toISOString().split("T")[0]);
    }, 1500);
  };

  const canSubmit = proofImage && referenceNumber.trim().length > 0 && Number(amount) > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full sm:max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success State Overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="w-12 h-12 text-[#4CAF50]" strokeWidth={2} />
                  </motion.div>
                  <p className="text-[#111827]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                    Proof Submitted!
                  </p>
                  <p className="text-muted-foreground mt-2" style={{ fontSize: "0.9rem" }}>
                    Awaiting admin verification
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[rgba(17,24,39,0.06)]">
              <div>
                <h3 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  Submit Payment Proof
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                  {monthName} Contribution
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
              >
                <X className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5 overflow-y-auto" style={{ maxHeight: "calc(90vh - 180px)" }}>
              {/* Image Upload Area */}
              <div>
                <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  Payment Receipt Screenshot <span className="text-[#F97316]">*</span>
                </label>

                {!imagePreview ? (
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="w-full h-48 rounded-2xl border-2 border-dashed border-[#1565C0]/30 bg-[#1565C0]/5 hover:border-[#1565C0]/50 hover:bg-[#1565C0]/10 transition-all flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-[#1565C0]/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-[#1565C0]" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="text-[#111827] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                          Upload Screenshot
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                          GCash, Maya, or Bank Receipt
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(17,24,39,0.1)]">
                          <Camera className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                          <span className="text-[#111827]" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                            Camera
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(17,24,39,0.1)]">
                          <ImageIcon className="w-4 h-4 text-[#1565C0]" strokeWidth={2} />
                          <span className="text-[#111827]" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                            Gallery
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Payment proof"
                      className="w-full h-48 object-cover rounded-2xl border border-[rgba(17,24,39,0.1)]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setProofImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                    >
                      <X className="w-5 h-5 text-white" strokeWidth={2} />
                    </motion.button>
                    <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-[#4CAF50] text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                      ✓ UPLOADED
                    </div>
                  </div>
                )}
              </div>

              {/* Reference Number */}
              <div>
                <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  Reference Number <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g. REF123456789"
                  className="w-full px-4 py-3.5 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  Amount Sent
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    ₱
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-8 pr-4 py-3.5 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                    style={{ fontSize: "0.95rem", fontWeight: 600 }}
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-muted-foreground block mb-2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#FAF9F7] rounded-xl border border-[rgba(17,24,39,0.08)] outline-none focus:border-[#1565C0] transition-colors"
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2.5 p-4 bg-[#FFA726]/5 rounded-xl border border-[#FFA726]/20">
                <div className="w-5 h-5 rounded-full bg-[#FFA726] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>!</span>
                </div>
                <p className="text-[#111827]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  <strong>This will be verified by the admin.</strong> Uploading fake receipts may result in penalties or removal from the group.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-3 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-1 py-3.5 rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-colors"
                style={{ fontSize: "0.95rem", fontWeight: 600 }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 py-3.5 rounded-2xl text-white transition-all"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  backgroundColor: canSubmit ? "#1565C0" : "rgba(17,24,39,0.12)",
                  color: canSubmit ? "white" : "rgba(17,24,39,0.35)",
                  boxShadow: canSubmit ? "0 4px 12px rgba(21,101,192,0.25)" : "none",
                }}
              >
                Submit Proof
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
