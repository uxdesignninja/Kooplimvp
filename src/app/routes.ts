import { createBrowserRouter } from "react-router";
import Welcome from "./components/onboarding/Welcome";
import Carousel from "./components/onboarding/Carousel";
import CountrySelect from "./components/auth/CountrySelect";
import PhoneEntry from "./components/auth/PhoneEntry";
import OTPVerify from "./components/auth/OTPVerify";
import KYCIntro from "./components/kyc/Intro";
import KYCPortraitCapture from "./components/kyc/PortraitCapture";
import KYCIDCapture from "./components/kyc/IDCapture";
import KYCProcessing from "./components/kyc/Processing";
import KYCSuccess from "./components/kyc/Success";
import FinancialIntent from "./components/setup/FinancialIntent";
import SetGoal from "./components/setup/SetGoal";
import EnableCredit from "./components/setup/EnableCredit";
import AIAssistant from "./components/setup/AIAssistant";
import Home from "./components/dashboard/Home";
import MobileFrame from "./components/layout/MobileFrame";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileFrame,
    children: [
      { index: true, Component: Welcome },
      { path: "onboarding", Component: Carousel },
      { path: "auth/country", Component: CountrySelect },
      { path: "auth/phone", Component: PhoneEntry },
      { path: "auth/otp", Component: OTPVerify },
      { path: "kyc/intro", Component: KYCIntro },
      { path: "kyc/portrait", Component: KYCPortraitCapture },
      { path: "kyc/id", Component: KYCIDCapture },
      { path: "kyc/processing", Component: KYCProcessing },
      { path: "kyc/success", Component: KYCSuccess },
      { path: "setup/intent", Component: FinancialIntent },
      { path: "setup/goal", Component: SetGoal },
      { path: "setup/credit", Component: EnableCredit },
      { path: "setup/ai", Component: AIAssistant },
      { path: "dashboard", Component: Home },
    ],
  },
]);
