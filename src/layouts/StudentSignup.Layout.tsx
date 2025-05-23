import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";

const StudentSignupLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div
      className="flex flex-col min-h-[70vh] border-bottom-lg "

    >
      <Header darkMode={true} />
      <div className="flex flex-1 flex-row   border-[#B3322F] border-b-4 "  >
        <div className=" bg-white bg-[url(/assets/img/backgrounds/signup_bg_2.png)] bg-cover bg-center w-full md:max-w-md min-h-full items-center flex justify-center"
        >
          <div className="w-full ">
            <div className="px-10 py-30">
              {children}
            </div>
          </div>
        </div>

        <div

          className="hidden md:flex  bg-[url(/assets/img/backgrounds/signup_bg.png)] w-full bg-cover bg-center min-h-[100vh] text-white pl-4  justify-between align-middle items-center">
          <div style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }} >
            <h1 className="text-7xl   font-bold  ">
              Welcome
              <br />
              Aboard!
            </h1>
            <h4 className="text-2xl mt-5  tracking-tight">
              Let's Find You A Home.
            </h4>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
)


export default StudentSignupLayout