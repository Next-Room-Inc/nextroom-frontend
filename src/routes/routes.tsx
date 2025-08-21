import { createBrowserRouter } from "react-router-dom";
import Login from "@src/pages/authentication/Login";
import Signup from "@src/pages/authentication/Signup";
import { NotFoundErrorPage } from "@src/pages/error/NotFoundErrorPage";
import Home from "@src/pages/home/Home";
import { ROUTES } from "@src/utils/constants";
import { IsLoginValidation } from "./route.validations";
import { UnderConstruction } from "@src/pages/error/UnderConstruction";
import Offers from "@src/pages/offers/Offers";
import ForgotPassword from "@src/pages/authentication/ForgotPassword";
import ResetPassword from "@src/pages/authentication/ResetPassword";
import Onboarding from "@src/pages/onboarding/Onboarding";
import SearchProperty from "@src/pages/search-property/SearchProperty";
import VerifyEmail from "@src/pages/authentication/VerifyEmail";
import StudentExperianceCenter from "@src/pages/student-experiance-center/StudentExperianceCenter";
import NewsRoom from "@src/pages/newsroom/NewsRoom";
import ResendVerification from "@src/pages/authentication/ResendVerification";
import Blogs from "@src/pages/blogs/Blogs";
import Chat from "@src/pages/chat/Chat";
import { OnboardingValidation } from "./onboarding.validations";
import LandLordsDashboard from "@src/pages/dashboard/landlord-dashboard/LandLordsDashboard";
import StudentsDashboard from "@src/pages/dashboard/student-dashboard/StudentsDashboard";

export const routes = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.ONBOARDING,
    element: (
      <IsLoginValidation>
        <OnboardingValidation>
          <Onboarding />
        </OnboardingValidation>
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.BASE_PATH || ROUTES.OFFERS,
    element: (
      <IsLoginValidation>
        <Offers />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    element: <VerifyEmail />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.RESEND_VERIFICATION,
    element: <ResendVerification />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <IsLoginValidation>
        <Login />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.SEARCH_PROPERTY,
    element: (
      <IsLoginValidation>
        <SearchProperty />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.SEARCH_PROPERTY_TABS,
    element: (
      <IsLoginValidation>
        <SearchProperty />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.STUDENT_EXPERIANCE_CENTER,
    element: <StudentExperianceCenter />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.NEWSROOM,
    element: <NewsRoom />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.BLOGS,
    element: <Blogs />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.CHAT,
    element: <Chat />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.STUDENTS_DASHBOARD,
    element: (
      <IsLoginValidation>
        <StudentsDashboard />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.STUDENTS_DASHBOARD_TABS,
    element: (
      <IsLoginValidation>
        <StudentsDashboard />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.LANDLORDS_DASHBOARD,
    element: (
      <IsLoginValidation>
        <LandLordsDashboard />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.LANDLORDS_DASHBOARD_TABS,
    element: (
      <IsLoginValidation>
        <LandLordsDashboard />
      </IsLoginValidation>
    ),
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.UNDER_CONSTRUCTION,
    element: <UnderConstruction />,
    errorElement: <NotFoundErrorPage />,
  },
]);
