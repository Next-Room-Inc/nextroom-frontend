import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { APP_INFO } from "../utils/constants";

const OnboardingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div className="min-h-screen flex flex-col bg-[url('/assets/img/backgrounds/backgrounds_7.png')] bg-cover bg-no-repeat bg-fixed">
      <Header darkMode={true} />

      <div className={"flex items-center justify-center min-h-screen border-[#B3322F] border-b-4"} >
        <div className=" w-full ">
          {children}
        </div>
      </div>

    </div>
    <Footer />
  </>
);
export default OnboardingLayout;
