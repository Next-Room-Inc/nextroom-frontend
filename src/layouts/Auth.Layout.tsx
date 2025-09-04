import React from "react";
import Footer from "../components/Footer";
import { Header } from "@src/components/Header";
import { APP_INFO } from "@src/utils/constants";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div
      className="flex flex-col min-h-[70vh] custom-cursor"
      style={{
        backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/backgrounds/backgrounds_7.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header darkMode={false} />
      <main className="flex-grow flex justify-center items-center p-5">
        <div className="w-full max-w-md text-center">
          {/* <img
            alt=""
            src={APP_INFO.PRIMARY_LOGO}
            className="h-20 md:h-35 w-auto mx-auto"
          /> */}
          {children}
        </div>
      </main>
    </div>
    <Footer />
  </>
);
export default AuthLayout;
