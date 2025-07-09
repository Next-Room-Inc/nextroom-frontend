// useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();  // Get navigate function

  const handleLogin = async (token: string) => {
    localStorage.setItem("token", token); 
    setIsLoggedIn(true);
    navigate(ROUTES.ONBOARDING);  // Redirect to home page
    // navigate(ROUTES.BAESPATH);  // Redirect to home page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(ROUTES.LOGIN);  // Redirect to login
  };

  return { isLoggedIn, handleLogin, handleLogout };
};

export default useAuth;
