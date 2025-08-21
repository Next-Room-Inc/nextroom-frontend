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
  console.log("hit");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate(); // Get navigate function
  const currentPath = window.location.pathname;
  const token = localStorage.getItem("token");
  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    console.log("path", currentPath === ROUTES.BASE_PATH);

    if (!token && currentPath === ROUTES.BASE_PATH) {
      console.log("1");

      navigate(ROUTES.SIGNUP);
    } else if (!token) {
      console.log("2");

      navigate(ROUTES.LOGIN); // Redirect to login page using navigate
    } else {
      console.log("3");

      // If logged in and on the login page, redirect to the home page (or another page)
      if (currentPath === ROUTES.LOGIN) {
        navigate(ROUTES.BASE_PATH); // Redirect to home page
      }
    }
  }, [isLoggedIn, navigate, currentPath, token]);

  if (!token && currentPath !== ROUTES.LOGIN) {
    return null; // Optionally return null or a loading spinner while redirecting
  }

  return children;
};
