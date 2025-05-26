import React, { useState } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ICONS } from '../utils/constants/app-info.constant';
 
const StudentSignupLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialStep, setInitialStep] = useState(true)
  return (<>
    <div
      className="flex flex-col min-h-[70vh] border-bottom-lg "

    >
      <Header darkMode={true} />
      {/* left */}
      <div    className="flex flex-1 flex-row   border-[#B3322F] border-b-4 " >
        <div className={` 
         ${initialStep ? 'hidden md:flex' : 'flex' } 
        bg-white bg-[url(/assets/img/backgrounds/signup_bg_2.png)] bg-cover bg-center w-full md:max-w-md min-h-full items-center justify-center`}
        >
          <div className="w-full ">
            <div className="px-10 py-30">
              {children}
            </div>
          </div>
        </div>


        {/* right */}
        <div
          className={` ${initialStep ? "inline " : "hidden  "} md:flex   bg-[url(/assets/img/backgrounds/signup_bg_mobile.png)] md:bg-[url(/assets/img/backgrounds/signup_bg.png)] w-full bg-cover bg-center min-h-[100vh] text-white pl-4  justify-between align-middle items-center`}>
          <div style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }} >
            <h1 className="md:text-7xl  font-bold  text-4xl mt-40 md:mt-0 text-center md:text-left ">
              Welcome
              <br />
              Aboard!
            </h1>
            <h4 className="mt-5 text-center md:text-left text-md md:text-2xl ">
              <span className="inline-flex items-center gap-2 md:bg-transparent bg-black text-white px-8 md:px-0 md:py-0 py-2 rounded-full" onClick={() => setInitialStep(false)}>
                Let’s Find You a Home  <img alt="" className="h-10 pr-1 inline md:hidden" src={ICONS.ARROW_RIGHT} />
              </span>
            </h4>
          </div>

          {/* Give Away circle */}
          <div
            className="shadow-2xl shadow-black font-semibold text-sm bg-red-700 h-[150px] w-[150px] pt-6 fixed bottom-0 right-0 transform flex flex-col items-center justify-center text-center"
            style={{ borderTopLeftRadius: "75%" }}
          >
            <img alt="" className="h-12 pr-1 mb-1 " src={ICONS.GIFT} />
            <span>
              Sign-Up to Enter <br /> Our Giveaway!
            </span>
          </div>

        </div>





      </div>
    </div>
    <Footer />
  </>)
}


export default StudentSignupLayout