import React from "react";
import { ChatButton } from "../components/ChatButton";
import useAuth from "@src/custom-hooks/useAuth";

const AuthenticateduserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      {isLoggedIn && <ChatButton />}
      {children}
    </>
  );
};

export default AuthenticateduserLayout;
