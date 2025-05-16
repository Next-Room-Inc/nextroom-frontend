import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import { NotFoundErrorPage } from "../pages/error/NotFoundErrorPage";
import Home from "../pages/home/Home";
import { ROUTES } from "../utils/constants";
import { IsLoginValidation } from "./route.validations";
import { UnderConstruction } from "../pages/error/UnderConstruction";
import Offers from "../pages/offers/Offers";

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
