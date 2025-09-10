import ForgotPassword from "@src/pages/authentication/ForgotPassword";
import Login from "@src/pages/authentication/Login";
import ResendVerification from "@src/pages/authentication/ResendVerification";
import ResetPassword from "@src/pages/authentication/ResetPassword";
import Signup from "@src/pages/authentication/Signup";
import VerifyEmail from "@src/pages/authentication/VerifyEmail";
import Blogs from "@src/pages/blogs/Blogs";
import Chat from "@src/pages/chat/Chat";
import LandLordsDashboard from "@src/pages/dashboard/landlord-dashboard/LandLordsDashboard";
import StudentsDashboard from "@src/pages/dashboard/student-dashboard/StudentsDashboard";
import { NotFoundErrorPage } from "@src/pages/error/NotFoundErrorPage";
import { UnderConstruction } from "@src/pages/error/UnderConstruction";
import Home from "@src/pages/home/Home";
import NewsRoom from "@src/pages/newsroom/NewsRoom";
import Onboarding from "@src/pages/onboarding/Onboarding";
import PrivacyPolicy from "@src/pages/privacy-policy/PrivacyPolicy";
import SearchProperty from "@src/pages/search-property/SearchProperty";
import StudentExperianceCenter from "@src/pages/student-experiance-center/StudentExperianceCenter";
import SupportDetails from "@src/pages/support/SupportDetails";
import TermsAndConditions from "@src/pages/terms-and-conditions/TermsAndConditions";
import { ROUTES } from "@src/utils/constants";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { OnboardingValidation } from "./onboarding.validations";
import { IsLoginValidation } from "./route.validations";
import Support from "@src/pages/support/Support";

const errorElement = <NotFoundErrorPage />

const routeArray = [
  [ROUTES.HOME, < Home />],
  [ROUTES.ONBOARDING, <IsLoginValidation> <OnboardingValidation><Onboarding /></OnboardingValidation> </IsLoginValidation>],
  [ROUTES.BASE_PATH, <Navigate to={ROUTES.SEARCH_PROPERTY} replace />],

  // Auth
  [ROUTES.SIGNUP, <Signup />],
  [ROUTES.FORGOT_PASSWORD, <ForgotPassword />],
  [ROUTES.RESET_PASSWORD, <ResetPassword />],
  [ROUTES.VERIFY_EMAIL, <VerifyEmail />],
  [ROUTES.RESEND_VERIFICATION, <ResendVerification />],
  [ROUTES.LOGIN, <IsLoginValidation><Login /></IsLoginValidation>],

  // Misc
  [ROUTES.PRIVACY_POLICY, <PrivacyPolicy />],
  [ROUTES.TERMS_AND_CONDITIONS, <TermsAndConditions />],
  [ROUTES.SUPPORT, <Support />],

  [ROUTES.STUDENT_EXPERIANCE_CENTER, <StudentExperianceCenter />],
  [ROUTES.NEWSROOM, <NewsRoom />],
  [ROUTES.BLOGS, <Blogs />],
  [ROUTES.CHAT, <Chat />],
  [ROUTES.UNDER_CONSTRUCTION, <UnderConstruction />],
] as [string, JSX.Element][];

// ************************* Routes ************************** //
export const routes = createBrowserRouter([
  ...routeArray.map(([path, element]) => ({
    path,
    element,
    errorElement
  })),

  // Search
  ...[ROUTES.SEARCH_PROPERTY, ROUTES.SEARCH_PROPERTY_TABS].map((path) => ({
    path, errorElement, element: <IsLoginValidation><SearchProperty /> </IsLoginValidation>
  }),
  ),

  // Dashboards
  ...[ROUTES.STUDENTS_DASHBOARD, ROUTES.STUDENTS_DASHBOARD_TABS].map(path => ({
    element: (< IsLoginValidation >
      <StudentsDashboard />
    </IsLoginValidation >),
    path,
    errorElement,
  })),
  ...[ROUTES.LANDLORDS_DASHBOARD, ROUTES.LANDLORDS_DASHBOARD_TABS].map(path => ({
    element: (< IsLoginValidation >
      <LandLordsDashboard />
    </IsLoginValidation >),
    path,
    errorElement,
  })),
]);
