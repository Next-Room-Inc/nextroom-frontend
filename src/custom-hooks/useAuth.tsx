// useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

interface LoginResponse {
  token: string;
  student: User;
}

const useAuth = () => {
  const navigate = useNavigate();

  const getStoredUser = (): User | null => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(getStoredUser());

  const handleLogin = (data: LoginResponse) => {
    const { token, student } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(student));
    
    setIsLoggedIn(true);
    setUser(student);

    navigate(ROUTES.ONBOARDING); // Redirect to onboarding
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    navigate(ROUTES.LOGIN); // Redirect to login
  };

  return {
    isLoggedIn,
    user,
    handleLogin,
    handleLogout,
    setUser,
  };
};

export default useAuth;
