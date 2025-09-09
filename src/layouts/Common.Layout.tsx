import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import AuthenticateduserLayout from "./Authenticateduser.Layout";

const CommonLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <>
    {/* // <AuthenticateduserLayout> */}
    <div className="min-h-screen flex flex-col bg-[url('/assets/img/backgrounds/backgrounds_7.png')] bg-cover bg-no-repeat bg-fixed">
      <Header darkMode />

      <main className="min-h-[100vh] border-b-4 border-[#B3322F] pt-30 pb-10">
        <div className="w-full">{children}</div>
      </main>
    </div>
    <Footer />
    {/* </AuthenticateduserLayout > */}
  </>
);

export default CommonLayout;