import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type SearchPropertyLayoutProps = {
  children: React.ReactNode;
};

const SearchPropertyLayout: React.FC<SearchPropertyLayoutProps> = ({ children }) => (
  <>
    <div className="min-h-screen flex flex-col bg-[url('/assets/img/backgrounds/backgrounds_7.png')] bg-cover bg-no-repeat bg-fixed">
      <Header darkMode />

      {/* <main className="flex-grow flex items-center justify-center border-b-4 border-[#B3322F] pt-10 pb-30"> */}
      <main className="min-h-[100vh] border-b-4 border-[#B3322F] pt-20 pb-30">
        <div className="w-full">{children}</div>
      </main>
    </div>
    <Footer />
  </>
);

export default SearchPropertyLayout;