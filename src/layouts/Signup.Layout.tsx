import React from "react";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import { APP_INFO } from "../utils/constants";


const Header = () => {

  return <>
    <div className="   text-white bg-cover bg-center min-h-30 flex xl:flex-row flex-col  bg-[url(/assets/img/backgrounds/singup_fighter_header_bg.png)] "

    >
      <div className="xl:w-[45%] w-[100%] flex  items-center justify-center xl:mt-0 mt-5">

        <img
          src={`${APP_INFO.IMG_BASE_URL}/icons/win_free_rent_summer_logo.svg`}
          className=" w-80 mx-auto xl:flex hidden"
          alt="Overlay circle"
        />
        <img
          src={`${APP_INFO.IMG_BASE_URL}/icons/win_free_rent_summer_logo_mobile.svg`}
          className=" xl:60 md:w-100 w-60 mx-auto xl:hidden flex"
          alt="Overlay circle"
        />


      </div>

      <div className="xl:w-[15%] w-[100%] flex items-center justify-center md:mt-10 mt-5">
        <div>
          <button
            className={`  bg-white hover:bg-black hover:text-white cursor-pointer text-[#B00000] font-semibold py-2 md:px-10 px-6 rounded-full w-full  `}
          >
            SIGN UP BELOW
          </button>
          <img
            src={`${APP_INFO.IMG_BASE_URL}/icons/down_arrow.svg`}
            className="w-10 h-10 animate-bounce mt-5 mx-auto"
            alt="Scroll down"
            loading="lazy"
          />
        </div>
      </div>

      <div className="xl:w-[45%] w-[100%] flex items-center overflow-hidden relatives">


        <div className="md:flex md:relative xl:w-[45%] items-center absolute left-0 xl:ml-0 -ml-5">
          <img src="assets/img/groups/Byward_Market/backup-white-logo.png" alt="Theo" className=" xl:h-15 md:h-25 h-10 bottom-5 left-10 xl:left-0 xl:bottom-0 xl:relative absolute shadow-3xl shadow-black " />
          <img src="assets/img/icons/alma_fighter_3.svg" alt="Theo" className="xl:h-40 md:h-90 h-51   " />
        </div>

        <div className="md:w-[10%]  md:p-0 p-10 mx-auto z-99 ">
          <img src="assets/img/icons/vs.svg" alt="Alma" className="xl:h-30 md:h-90 h-30  " />
        </div>

        <div className="md:flex md:relative xl:w-[45%] items-center absolute right-0   xl:-mr-0 -mr-5 ">
          <img src="assets/img/icons/theo_fighter_3.svg" alt="Theo" className="xl:h-40 md:h-90 h-51   " />
          <img src="assets/img/groups/Theo/white-logo.png" alt="Theo" className=" xl:h-15 md:h-25 h-10 bottom-5 right-10 xl:right-0 xl:bottom-0 xl:relative absolute shadow-3xl shadow-black " />
        </div>

        {/* <div className="md:inline-block md:relative md:w-[45%] absolute right-0 md:ml-0 -mr-5">
          <img src="assets/img/icons/theo_fighter_3.svg" alt="Theo" className="md:h-40 h-51  " />
          <img src="assets/img/groups/Theo/white-logo.png" alt="Theo" className=" md:h-15 h-10 bottom-5 right-10 md:left-0 md:bottom-0  md:inline-block  absolute   shadow-3xl shadow-black " />
        </div> */}



      </div>

    </div>



  </>
}
const SignupLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div
      className="flex flex-col min-h-[70vh]"
      style={{
        backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/backgrounds/backgrounds_7.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      <main className="flex-grow flex justify-center items-center p-5">
        <div className="w-full max-w-md text-center">
          <img
            alt=""
            src={APP_INFO.PRIMARY_LOGO}
            className="h-20 md:h-35 w-auto mx-auto"
          />
          {children}
        </div>
      </main>
    </div>
    <Footer />
  </>
);
export default SignupLayout;
