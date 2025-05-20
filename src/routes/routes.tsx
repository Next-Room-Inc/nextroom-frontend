import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import { NotFoundErrorPage } from "../pages/error/NotFoundErrorPage";
import Home from "../pages/home/Home";
import { ROUTES } from "../utils/constants";
import { IsLoginValidation } from "./route.validations";
import { UnderConstruction } from "../pages/error/UnderConstruction";
import Offers from "../pages/offers/Offers";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";

export const routes = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: ROUTES.BAESPATH || ROUTES.OFFERS,
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
    path: ROUTES.LOGIN,
    element: (
      <IsLoginValidation>
        <Login />
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
