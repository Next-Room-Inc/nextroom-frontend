
import ForgotPassword from "@src/pages/authentication/ForgotPassword";
import ResendVerification from "@src/pages/authentication/ResendVerification";
import ResetPassword from "@src/pages/authentication/ResetPassword";
import SignupEmailVerification from "@src/pages/authentication/SignupEmailVerification";
import VerifyEmail from "@src/pages/authentication/VerifyEmail";
import { NotFoundErrorPage } from "@src/pages/error/NotFoundErrorPage";
import { UnderConstruction } from "@src/pages/error/UnderConstruction";
import Home from "@src/pages/home/Home";
import StudentDashboard from "@src/pages/student-dashboard/StudentDashboard";
import { ROUTES } from "@src/utils/constants";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { OnboardingValidation } from "./onboarding.validations";
import { IsLoginValidation } from "./route.validations";

const errorElement = <NotFoundErrorPage />

const routeArray = [
  [ROUTES.BASE_PATH, < Home />],
  [ROUTES.SIGNUP_EMAIL_VERIFICATION, < SignupEmailVerification />],
  [ROUTES.STUDENTS_DASHBOARD, <IsLoginValidation> <OnboardingValidation><StudentDashboard /></OnboardingValidation> </IsLoginValidation>],
  [ROUTES.BASE_PATH, <Navigate to={ROUTES.HOME} replace />],

  // Auth
  // [ROUTES.SIGNUP, <Signup />],
  [ROUTES.FORGOT_PASSWORD, <ForgotPassword />],
  [ROUTES.RESET_PASSWORD, <ResetPassword />],
  [ROUTES.VERIFY_EMAIL, <VerifyEmail />],
  [ROUTES.RESEND_VERIFICATION, <ResendVerification />],
  // [ROUTES.LOGIN, <IsLoginValidation><Login /></IsLoginValidation>],

  [ROUTES.UNDER_CONSTRUCTION, <UnderConstruction />],
] as [string, any][];

// ************************* Routes ************************** //
export const routes = createBrowserRouter([
  ...routeArray.map(([path, element]) => ({
    path,
    element,
    errorElement
  })),
]);
