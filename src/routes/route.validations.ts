import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6
import useAuth from "../custom-hooks/useAuth";
import { ROUTES } from "../utils/constants";

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
 
  useEffect(() => {
     const token = localStorage.getItem("token");
    console.log(token,currentPath,ROUTES.HOME)
    if (!token && currentPath === ROUTES.HOME) {
      navigate(ROUTES.SIGNUP);
    } else if (!token) {
      navigate(currentPath); // Redirect to login page using navigate
    } else {
      // If logged in and on the login page, redirect to the home page (or another page)
      if (currentPath === ROUTES.LOGIN) {
        navigate(ROUTES.HOME); // Redirect to home page
      }
    }
   }, [isLoggedIn, navigate, currentPath, token]);
 
  

  if (!token && currentPath !== ROUTES.LOGIN) {
    return null; // Optionally return null or a loading spinner while redirecting
  }

  return children;
};
