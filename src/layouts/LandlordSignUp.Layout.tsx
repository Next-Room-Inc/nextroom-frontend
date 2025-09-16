import React, { useState } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ICONS } from '@src/utils/constants/app-info.constant';

const LandlordSignupLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialStep, setInitialStep] = useState(true)



  return (<>

    <div
      className="flex flex-col min-h-[70vh] border-bottom-lg "

    >
      <Header darkMode={true} />
   
      <div className="flex flex-1 flex-row border-[#B3322F] border-b-4 " >
           {/* left */}
        <div className={` 
         ${initialStep ? 'hidden md:flex' : 'flex'} 
        bg-white bg-[url(/assets/img/backgrounds/signup_bg_2.png)] bg-cover bg-center w-4/10 md:max-w-4/10 min-h-full items-center justify-center`}
        >
          <div className="w-full">
            <div className="px-10 py-30">
              {children}
            </div>
          </div>
        </div>

        {/* right */}
        <div
          className={` ${initialStep ? "inline " : "hidden  "} md:flex bg-[url(/assets/img/backgrounds/signup_bg_mobile.png)] md:bg-[url(/assets/img/backgrounds/landlord_signup_bg.png)] w-6/10 bg-cover bg-center min-h-[100vh] text-white pl-4  justify-between align-middle items-center`}>
        </div>
      </div>
    </div>
    <Footer />
  </>)
}


export default LandlordSignupLayout