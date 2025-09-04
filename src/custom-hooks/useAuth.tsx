// useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@src/utils/constants";
import * as interfaces from "@src/utils/interfaces";

interface LoginResponse {
  token: string;
  user: interfaces.StudentUser;
}

const getStoredUser = (): interfaces.StudentUser | null => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch { return null; }
};

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<interfaces.StudentUser | null>(getStoredUser());

  // handleLogin
  const handleLogin = (data: LoginResponse) => {
    const { token, user: student } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(student));

    setIsLoggedIn(true);
    setUser(student);

    navigate(ROUTES.STUDENTS_DASHBOARD); // Redirect to onboarding
  };

  // handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    navigate(ROUTES.BASE_PATH); // Redirect to login
  };

  // handleUpdateUser
  const handleUpdateUser = (userPayload: Partial<interfaces.StudentUser>) => {
    const updatedUser: interfaces.StudentUser = {
      ...user,
      ...userPayload,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return {
    handleUpdateUser,
    isLoggedIn,
    user,
    handleLogin,
    handleLogout,
    setUser,
  };
};

export default useAuth;
