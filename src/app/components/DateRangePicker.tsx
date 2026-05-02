import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(day: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = day.getTime();
  return t > start.getTime() && t < end.getTime();
}

function formatDate(d: Date | null) {
  if (!d) return "Select...";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function DateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange }: Props) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [modalOpen, setModalOpen] = useState(false);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(viewYear, viewMonth, i));
    return days;
  }, [viewMonth, viewYear]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const openModal = (which: "start" | "end") => {
    setSelecting(which);
    // Navigate calendar to the relevant date
    const ref = which === "start" ? startDate : endDate;
    if (ref) {
      setViewMonth(ref.getMonth());
      setViewYear(ref.getFullYear());
    }
    setModalOpen(true);
  };

  const handleDayClick = (day: Date) => {
    if (selecting === "start") {
      onStartDateChange(day);
      if (endDate && day.getTime() >= endDate.getTime()) onEndDateChange(null);
      setSelecting("end");
    } else {
      if (startDate && day.getTime() <= startDate.getTime()) {
        onStartDateChange(day);
        onEndDateChange(null);
        setSelecting("end");
      } else {
        onEndDateChange(day);
      }
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <div>
      {/* Start/End display buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => openModal("start")}
          className="flex-1 p-3.5 rounded-xl border transition-all text-left"
          style={{
            borderColor: startDate ? "#1565C0" : "rgba(17,24,39,0.08)",
            backgroundColor: startDate ? "rgba(10,10,111,0.03)" : "white",
          }}
        >
          <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Start Date
          </p>
          <p style={{ fontSize: "0.95rem", fontWeight: 500, color: startDate ? "#111827" : "#9ca3af" }}>
            {formatDate(startDate)}
          </p>
        </button>
        <button
          onClick={() => openModal("end")}
          className="flex-1 p-3.5 rounded-xl border transition-all text-left"
          style={{
            borderColor: endDate ? "#1565C0" : "rgba(17,24,39,0.08)",
            backgroundColor: endDate ? "rgba(10,10,111,0.03)" : "white",
          }}
        >
          <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            End Date
          </p>
          <p style={{ fontSize: "0.95rem", fontWeight: 500, color: endDate ? "#111827" : "#9ca3af" }}>
            {formatDate(endDate)}
          </p>
        </button>
      </div>

      {/* Calendar Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Modal sheet */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full sm:max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <h3 className="text-[#111827]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {selecting === "start" ? "Select Start Date" : "Select End Date"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors"
                >
                  <X className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Selected range display */}
              <div className="flex gap-3 mx-6 mb-5">
                <div
                  className="flex-1 p-3 rounded-xl border text-left"
                  style={{
                    borderColor: selecting === "start" ? "#1565C0" : "rgba(17,24,39,0.08)",
                    backgroundColor: selecting === "start" ? "rgba(10,10,111,0.03)" : "white",
                  }}
                >
                  <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Start
                  </p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 500, color: startDate ? "#111827" : "#9ca3af" }}>
                    {formatDate(startDate)}
                  </p>
                </div>
                <div
                  className="flex-1 p-3 rounded-xl border text-left"
                  style={{
                    borderColor: selecting === "end" ? "#1565C0" : "rgba(17,24,39,0.08)",
                    backgroundColor: selecting === "end" ? "rgba(10,10,111,0.03)" : "white",
                  }}
                >
                  <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    End
                  </p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 500, color: endDate ? "#111827" : "#9ca3af" }}>
                    {formatDate(endDate)}
                  </p>
                </div>
              </div>

              {/* Month nav */}
              <div className="flex items-center justify-between px-6 mb-4">
                <button onClick={prevMonth} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors">
                  <ChevronLeft className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                </button>
                <p className="text-[#111827]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                  {MONTHS[viewMonth]} {viewYear}
                </p>
                <button onClick={nextMonth} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[rgba(17,24,39,0.04)] transition-colors">
                  <ChevronRight className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 px-5 mb-2">
                {DAYS.map((d, i) => (
                  <div key={i} className="text-center text-muted-foreground" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-y-1 px-5 pb-4">
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;

                  const isStart = isSameDay(day, startDate);
                  const isEnd = isSameDay(day, endDate);
                  const inRange = isInRange(day, startDate, endDate);
                  const isToday = isSameDay(day, today);

                  let rangeBg = "transparent";
                  if (inRange) rangeBg = "rgba(59,165,73,0.15)";
                  let roundLeft = false;
                  let roundRight = false;
                  if (isStart && endDate) { roundLeft = true; rangeBg = "rgba(59,165,73,0.15)"; }
                  if (isEnd && startDate) { roundRight = true; rangeBg = "rgba(59,165,73,0.15)"; }

                  return (
                    <div
                      key={day.getTime()}
                      className="relative flex items-center justify-center"
                      style={{
                        height: 44,
                        background: (inRange || (isStart && endDate) || (isEnd && startDate)) ? rangeBg : "transparent",
                        borderTopLeftRadius: (roundLeft || (inRange && day.getDay() === 0)) ? 22 : 0,
                        borderBottomLeftRadius: (roundLeft || (inRange && day.getDay() === 0)) ? 22 : 0,
                        borderTopRightRadius: (roundRight || (inRange && day.getDay() === 6)) ? 22 : 0,
                        borderBottomRightRadius: (roundRight || (inRange && day.getDay() === 6)) ? 22 : 0,
                      }}
                    >
                      <button
                        onClick={() => handleDayClick(day)}
                        className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: isStart ? "#1565C0" : isEnd ? "transparent" : "transparent",
                          border: isEnd
                            ? "2px solid #1565C0"
                            : isToday && !isStart
                            ? "1px solid rgba(17,24,39,0.15)"
                            : "none",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: isStart || isEnd ? 600 : 400,
                            color: isStart
                              ? "white"
                              : isEnd
                              ? "#1565C0"
                              : inRange
                              ? "#4CAF50"
                              : "#111827",
                          }}
                        >
                          {day.getDate()}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Confirm button */}
              {startDate && endDate && (
                <div className="px-6 pt-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: "#1565C0",
                      boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
                      fontSize: "1rem",
                      fontWeight: 600
                    }}
                  >
                    Confirm — {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}