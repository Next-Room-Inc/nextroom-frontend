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
import LandlordSignUp from "@src/pages/landlord-signup/LandlordSignUp";
import Landlord from "@src/pages/landlord/Landlord";
import NewsRoom from "@src/pages/newsroom/NewsRoom";
import Onboarding from "@src/pages/onboarding/Onboarding";
import { AboutUs } from "@src/pages/others/about-us/AboutUs";
import Contact from "@src/pages/others/contact/Contact";
import PrivacyPolicy from "@src/pages/others/privacy-policy/PrivacyPolicy";
import Saftey from "@src/pages/others/safety/Safety";
import TermsAndConditions from "@src/pages/others/terms-and-conditions/TermsAndConditions";
import SearchProperty from "@src/pages/search-property/SearchProperty";
import StudentExperianceCenter from "@src/pages/student-experiance-center/StudentExperianceCenter";
import { ROUTES } from "@src/utils/constants";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { OnboardingValidation } from "./onboarding.validations";
import { IsLoginValidation } from "./route.validations";

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
  [ROUTES.SAFETY, <Saftey />],
  [ROUTES.CONTACT, <Contact />],
  [ROUTES.ABOUT_US, <AboutUs />],

  [ROUTES.STUDENT_EXPERIANCE_CENTER, <StudentExperianceCenter />],
  [ROUTES.NEWSROOM, <NewsRoom />],
  [ROUTES.LANDLORD, <Landlord />],
  [ROUTES.LANDLORD_SIGNUP, <LandlordSignUp />],
  [ROUTES.BLOGS, <Blogs />],
  [ROUTES.CHAT, <Chat />],
  [ROUTES.UNDER_CONSTRUCTION, <UnderConstruction />],
] as [string, React.ReactElement][];

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
