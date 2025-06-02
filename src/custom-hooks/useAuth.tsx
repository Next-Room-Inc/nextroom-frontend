// useAuth.ts
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();  // Get navigate function
  const [searchParams] = useSearchParams();

  const handleLogin = async (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate(ROUTES.OFFERS);  // Redirect to home page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(ROUTES.LOGIN);  // Redirect to login
  };

  const handleSignupRedirect = () => {
   const  basePath = ROUTES.SIGNUP
    const refTag = searchParams.get('refTag');
    const queryParams = new URLSearchParams();
    if (refTag?.trim()) {
      queryParams.set('refTag', refTag);
    }
    const targetPath = queryParams.toString()
      ? `${basePath}?${queryParams.toString()}`
      : basePath;

    return navigate(targetPath);
  };

  return { isLoggedIn, handleLogin, handleLogout, handleSignupRedirect };
};

export default useAuth;
