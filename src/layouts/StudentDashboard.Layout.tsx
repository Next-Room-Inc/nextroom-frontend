import FooterNew from "@src/components/FooterNew";
import React from "react";
import AuthenticateduserLayout from "./Authenticateduser.Layout";
import { Header } from "@src/components/Header";

type StudentDashboardLayoutProps = {
  children: React.ReactNode;
};

const StudentDashboardLayout: React.FC<StudentDashboardLayoutProps> = ({ children }) => (
  <>
    <AuthenticateduserLayout>
      <div className="min-h-screen flex flex-col bg-[url('/assets/img/backgrounds/backgrounds_7.png')] bg-cover bg-no-repeat bg-fixed">
        <Header darkMode />

        {/* <main className="flex-grow flex items-center justify-center border-b-4 border-[#B3322F] pt-10 pb-30"> */}
        <main className="min-h-[100vh] border-b-4 border-[#B3322F] pt-20 pb-30">
          <div className="w-full">{children}</div>
        </main>
      </div>
      <FooterNew />
    </AuthenticateduserLayout>
  </>
);

export default StudentDashboardLayout;