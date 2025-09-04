import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6
import useAuth from "@src/custom-hooks/useAuth";
import { ROUTES } from "@src/utils/constants";

interface IsLoginValidationProps {
  children: ReactNode;
}

export const IsLoginValidation: React.FC<IsLoginValidationProps> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate(); // Get navigate function
  const currentPath = window.location.pathname;
  const token = localStorage.getItem("token");
  //

  useEffect(() => {
    const token = localStorage.getItem("token");
    //
    //

    // if (!token && currentPath === ROUTES.BASE_PATH) {
    if (!token) {
      //
      navigate(ROUTES.BASE_PATH);
    }
    //   navigate(ROUTES.BASE_PATH);
    // } else if (!token) {
    //

    //   navigate(ROUTES.BASE_PATH); // Redirect to login page using navigate
    // } else {
    //

    // // If logged in and on the login page, redirect to the home page (or another page)
    // if (currentPath === ROUTES.LOGIN) {
    //   navigate(ROUTES.BASE_PATH); // Redirect to home page
    // }
    // }
  }, [isLoggedIn, navigate, currentPath, token]);

  if (!token && currentPath !== ROUTES.LOGIN) {
    return null; // Optionally return null or a loading spinner while redirecting
  }

  return children;
};
