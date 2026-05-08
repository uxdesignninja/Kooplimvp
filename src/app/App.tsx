import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { OnboardingIdentity } from "./components/OnboardingIdentity";
import { KYCFlow, type KYCData } from "./components/KYCFlow";
import { FinancialPreferences, type FinancialPreferencesData } from "./components/FinancialPreferences";
import { LearningModule } from "./components/LearningModule";
import { OnboardingSuccess } from "./components/OnboardingSuccess";
import { EmailVerificationPrompt } from "./components/EmailVerificationPrompt";
import { HomeDashboard } from "./components/HomeDashboard";
import { GoalsScreen, type Goal } from "./components/GoalsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BudgetTrackerScreen } from "./components/BudgetTrackerScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import type { TabId } from "./components/BottomNav";
import { DEMO_GOALS } from "./data/demoGoals";

type Step =
  | "welcome"
  | "login"
  | "identity"         // Step 1 — Account Creation
  | "kyc"              // Step 2 — KYC & Identity Verification
  | "financialPrefs"   // Step 3 — Financial Preferences
  | "learning"         // Step 4 — Financial Academy
  | "emailVerification" // Email Verification Prompt
  | "success"          // Success — Dashboard Ready
  | "dashboard";

export default function App() {
  const [step, setStep] = useState<Step>("welcome");
  const [goals, setGoals] = useState<Goal[]>([
    // Demo goals for showcasing payment verification
    ...DEMO_GOALS,
  ]);
  const [activeTab, setActiveTab] = useState<TabId>("home");

  // Onboarding state passed between steps
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [kycData, setKycData] = useState<KYCData | null>(null);
  const [financialPrefs, setFinancialPrefs] = useState<FinancialPreferencesData | null>(null);
  const [userCurrency, setUserCurrency] = useState<string>("USD"); // Track user's currency
  const [learningSkipped, setLearningSkipped] = useState(false); // Track if learning was skipped
  const [kycSkipped, setKycSkipped] = useState(false); // Track if KYC was skipped

  // Enable safe-area-inset support for notched devices
  useState(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      const content = meta.getAttribute("content") || "";
      if (!content.includes("viewport-fit=cover")) {
        meta.setAttribute("content", content + ", viewport-fit=cover");
      }
    }
  });

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
  };

  return (
    <div className="size-full bg-[#FAF9F7] sm:flex sm:items-center sm:justify-center sm:bg-[#e8e8f4] sm:p-4">
      {/* Mobile Frame — full-bleed on small screens, framed on desktop */}
      <div
        className="relative w-full h-full sm:max-w-[390px] sm:max-h-[844px] bg-[#FAF9F7] sm:rounded-[2.5rem] overflow-hidden sm:shadow-2xl sm:shadow-[rgba(10,10,111,0.12)]"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {/* Fake Status Bar — only visible on desktop frame */}
        <div className="hidden sm:flex items-center justify-between px-8 pt-3 pb-1">
          <span className="text-[#111827]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full bg-[#111827]"
                  style={{ height: 4 + i * 2 }}
                />
              ))}
            </div>
            <div
              className="w-4 h-2.5 border border-[#111827] rounded-sm relative"
              style={{ borderWidth: 1.2 }}
            >
              <div
                className="absolute inset-0.5 bg-[#111827] rounded-[1px]"
                style={{ right: "20%" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="h-full sm:h-[calc(100%-2rem)] overflow-hidden relative"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          <AnimatePresence mode="wait">

            {/* ── Welcome landing ── */}
            {step === "welcome" && (
              <WelcomeScreen
                key="welcome"
                onLogin={() => setStep("login")}
                onSignup={() => setStep("identity")}
              />
            )}

            {/* ── Login (hardcoded: test@email.com / 123456) ── */}
            {step === "login" && (
              <LoginScreen
                key="login"
                onLogin={() => {
                  setActiveTab("home");
                  setStep("dashboard");
                }}
                onBack={() => setStep("welcome")}
                onSignup={() => setStep("identity")}
              />
            )}

            {/* ── Step 1: Account Creation ── */}
            {step === "identity" && (
              <OnboardingIdentity
                key="identity"
                onComplete={(name, email) => {
                  setUserName(name);
                  setUserEmail(email);
                  setStep("kyc");
                }}
                onLogin={() => setStep("login")}
                onBack={() => setStep("welcome")}
              />
            )}

            {/* ── Step 2: KYC & Identity Verification ── */}
            {step === "kyc" && (
              <KYCFlow
                key="kyc"
                onComplete={(data) => {
                  setKycData(data);
                  setUserCurrency(data.currency); // Save user's currency
                  setKycSkipped(false); // KYC was completed
                  setStep("financialPrefs");
                }}
                onBack={() => setStep("identity")}
                onSkip={() => {
                  // Skip only KYC - continue to Financial Preferences
                  setKycSkipped(true); // Mark KYC as skipped
                  setStep("financialPrefs");
                }}
              />
            )}

            {/* ── Step 3: Financial Preferences ── */}
            {step === "financialPrefs" && (
              <FinancialPreferences
                key="financialPrefs"
                onComplete={(data) => {
                  setFinancialPrefs(data);
                  setStep("learning");
                }}
                onBack={() => setStep("kyc")}
                onSkip={(data) => {
                  setFinancialPrefs(data);
                  setLearningSkipped(true);
                  setStep("emailVerification");
                }}
              />
            )}

            {/* ── Step 4: Financial Academy ── */}
            {step === "learning" && (
              <LearningModule
                key="learning"
                onComplete={() => setStep("emailVerification")}
                onBack={() => setStep("financialPrefs")}
                onSkip={() => {
                  setLearningSkipped(true);
                  setStep("emailVerification");
                }}
                coopName={financialPrefs?.coopBankName || undefined}
              />
            )}

            {/* ── Email Verification Prompt ── */}
            {step === "emailVerification" && (
              <EmailVerificationPrompt
                key="emailVerification"
                userEmail={userEmail}
                onVerify={() => setStep("success")}
                onSkip={() => setStep("success")}
              />
            )}

            {/* ── Success & Dashboard Ready ── */}
            {step === "success" && (
              <OnboardingSuccess
                key="success"
                onComplete={() => {
                  setActiveTab("home");
                  setStep("dashboard");
                }}
                userName={userName}
                financialPrefs={financialPrefs}
                learningSkipped={learningSkipped}
                kycSkipped={kycSkipped}
              />
            )}

            {/* ── Dashboard tabs ── */}
            {step === "dashboard" && activeTab === "home" && (
              <HomeDashboard
                key="dashboard-home"
                goals={goals}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                currency={userCurrency}
              />
            )}

            {step === "dashboard" && activeTab === "budget" && (
              <BudgetTrackerScreen
                key="budget-tracker"
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onBack={() => setActiveTab("home")}
              />
            )}

            {step === "dashboard" && activeTab === "payment" && (
              <PaymentScreen
                key="payment"
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onBack={() => setActiveTab("home")}
                currency={userCurrency}
              />
            )}

            {step === "dashboard" && activeTab === "goals" && (
              <GoalsScreen
                key="dashboard-goals"
                goals={goals}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onAddGoal={(goal) => setGoals((prev) => [...prev, goal])}
                onUpdateGoal={(updated) =>
                  setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)))
                }
                onDeleteGoal={(id) => setGoals((prev) => prev.filter((g) => g.id !== id))}
              />
            )}

            {step === "dashboard" && activeTab === "settings" && (
              <ProfileScreen
                key="dashboard-settings"
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onLogout={() => {
                  setStep("welcome");
                  setActiveTab("home");
                  setGoals([]);
                  setUserName("");
                  setUserEmail("");
                  setKycData(null);
                  setFinancialPrefs(null);
                  setLearningSkipped(false);
                  setKycSkipped(false);
                }}
                selectedCooperative={financialPrefs?.coopBankName || ""}
                onCooperativeSelect={(coop) => {
                  setFinancialPrefs((prev) => prev ? { ...prev, coopBankName: coop } : null);
                }}
                userData={{
                  fullName: userName,
                  email: userEmail,
                  address: kycData?.address || "",
                }}
              />
            )}

            {step === "dashboard" && activeTab === "academy" && (
              <LearningModule
                key="dashboard-academy"
                onComplete={() => setActiveTab("home")}
                onBack={() => setActiveTab("home")}
                onSkip={() => setActiveTab("home")}
                isStandalone={true}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}